from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import os
import time
import cv2
from models.huggingface_model import detect_plagiarism, detect_ai_generated_code  # Import plagiarism and AI code detection
from utils.face_extraction import extract_faces_from_video
from utils.prediction import predict_faces
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

# Connect to MongoDB (using MongoClient)
client = MongoClient(os.getenv('DATABASE_URL'))
db = client['ScanX']  # Replace 'your_database' with your actual database name
videos_collection = db['videos']

def extract_faces_from_image(image_path):
    # Load the image
    image = cv2.imread(image_path)
    
    if image is None:
        return []  # Return an empty list if the image can't be loaded

    # Convert the image to grayscale
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Load the Haar Cascade face detector
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

    # Detect faces in the image
    faces = face_cascade.detectMultiScale(gray_image, scaleFactor=1.1, minNeighbors=5)

    # Prepare a list to store extracted faces
    extracted_faces = []

    for (x, y, w, h) in faces:
        # Crop the face from the image
        face = image[y:y + h, x:x + w]
        extracted_faces.append(face)

    return extracted_faces


# Ensure an 'uploads' directory exists
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Route for home page
@app.route('/')
def index():
    return render_template('index.html')

# New route for combined functionality: face detection, plagiarism check, and AI detection
@app.route('/analyze', methods=['POST'])
def analyze():
    # Ensure that code and necessary fields are provided in the request
    if 'code' not in request.json or 'reference_codes' not in request.json or 'ai_codes' not in request.json:
        return jsonify({'error': 'Code, reference codes, and AI-generated codes must be provided.'}), 400

    response = {}
    start_time = time.time()

    # Code-based analysis (Plagiarism and AI detection)
    code_snippet = request.json['code']
    reference_codes = request.json['reference_codes']
    ai_codes = request.json['ai_codes']

    # Detect plagiarism
    is_plagiarized, plagiarism_score = detect_plagiarism(code_snippet, reference_codes)

    # Detect AI-generated code
    is_ai_generated, ai_similarity_score = detect_ai_generated_code(code_snippet, ai_codes)

    response['code_analysis'] = {
        'is_plagiarized': is_plagiarized,
        'plagiarism_score': plagiarism_score,
        'is_ai_generated': is_ai_generated,
        'ai_similarity_score': ai_similarity_score
    }

    response['processing_time'] = round(time.time() - start_time, 2)

    # Return the full response
    return jsonify(response)


# Existing prediction route
@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files or 'userId' not in request.form:
        return jsonify({'error': 'No file or user ID provided.'}), 400

    uploaded_file = request.files['file']
    user_id = request.form['userId']  # MetaMask public address

    if uploaded_file.filename == '':
        return jsonify({'error': 'Empty filename.'}), 400

    # Save the uploaded file
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], uploaded_file.filename)
    uploaded_file.save(file_path)

    start_time = time.time()

    # Check file extension to determine if it's a video or image
    file_extension = os.path.splitext(uploaded_file.filename)[1].lower()
    is_video = False
    if file_extension in ['.mp4', '.avi', '.mov']:  # Add more video formats as needed
        faces = extract_faces_from_video(file_path)
        is_video = True  # Mark that we are dealing with a video
        file_type = 'video'
    elif file_extension in ['.jpg', '.jpeg', '.png']:  # Add more image formats as needed
        faces = extract_faces_from_image(file_path)
        is_video = False
        file_type = 'image'
    else:
        os.remove(file_path)
        return jsonify({'error': 'Unsupported file format. Please upload an image or video.'}), 400

    if not faces:
        os.remove(file_path)
        return jsonify({'error': 'No faces detected in the file.'}), 400

    # Predict using the model
    predictions = predict_faces(faces, is_video)

    # Extract confidence values from predictions
    confidence_values = [pred['confidence'] for pred in predictions]

    # Ensure there are confidence values to calculate
    if len(confidence_values) == 0:
        avg_prediction = 0
    else:
        avg_prediction = sum(confidence_values) / len(confidence_values)

    # Convert average prediction to percentage
    confidence_percentage = avg_prediction * 100

    # Determine the label based on the average prediction
    threshold = 0.5  # Adjust this threshold based on your model's performance
    label = 'Real' if avg_prediction < threshold else 'Fake'

    processing_time = time.time() - start_time

    # Response structure
    response = {
        'prediction': label,
        'confidence': round(confidence_percentage, 2),
        'total_faces_analyzed': len(predictions),
        'processing_time': round(processing_time, 2),
        'details': []
    }

    # Include per-frame predictions if desired (only for videos)
    for pred in predictions:
        frame_info = {
            'frame_number': pred.get('frame_number', None),
            'timestamp': pred.get('timestamp', None),
            'confidence': round(pred['confidence'] * 100, 2)
        }
        response['details'].append(frame_info)

    # Store the result in MongoDB
    video_record = {
    'fileName': uploaded_file.filename,
    'length': os.path.getsize(file_path) / 1000000,  # File size in MB
    'confidence': round(confidence_percentage, 2),
    'prediction': label,
    'totalFaces': len(predictions),
    'processingTime': round(processing_time, 2),
    'userId': user_id,  # MetaMask public address
    'createdAt': time.strftime('%Y-%m-%d %H:%M:%S'),
    'fileType': file_type  # Add this line
}

    try:
        result = videos_collection.insert_one(video_record)
        response['db_id'] = str(result.inserted_id)
    except Exception as e:
        print(f"Error saving to MongoDB: {e}")
        response['db_error'] = str(e)

    # Clean up uploaded file
    os.remove(file_path)

    # Return the full response
    return jsonify(response)


@app.route('/videos', methods=['GET'])
def get_videos():
    try:
        # Retrieve all video records from MongoDB
        videos = videos_collection.find()
        # Convert MongoDB cursor to list and jsonify
        video_list = []
        for video in videos:
            video['_id'] = str(video['_id'])  # Convert ObjectId to string
            video_list.append(video)
        return jsonify(video_list), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500



if __name__ == '__main__':
    app.run(debug=True)
