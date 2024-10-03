from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import os
import time
import cv2


# Import utility functions
from utils.face_extraction import extract_faces_from_video
from utils.prediction import predict_faces

# utils/face_extraction.py


app = Flask(__name__)
CORS(app)

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

# Route to handle image and video upload and prediction
# Route to handle image and video upload and prediction
@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided.'}), 400

    uploaded_file = request.files['file']
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
        # Extract faces from the video
        faces = extract_faces_from_video(file_path)
        is_video = True  # Mark that we are dealing with a video
    elif file_extension in ['.jpg', '.jpeg', '.png']:  # Add more image formats as needed
        # Extract faces from the image
        faces = extract_faces_from_image(file_path)
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
            'frame_number': pred.get('frame_number', None),  # frame_number might not exist for images
            'timestamp': pred.get('timestamp', None),        # timestamp might not exist for images
            'confidence': round(pred['confidence'] * 100, 2)
        }
        response['details'].append(frame_info)

    # Clean up
    os.remove(file_path)

    # Return the full response
    return jsonify(response)


if __name__ == '__main__':
    app.run(debug=True)
