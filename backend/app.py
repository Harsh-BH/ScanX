# app.py

from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import os
import time

# Import utility functions
from utils.face_extraction import extract_faces_from_video
from utils.prediction import predict_faces

app = Flask(__name__)
CORS(app)

# Ensure an 'uploads' directory exists
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Route for home page
@app.route('/')
def index():
    return render_template('index.html')

# Route to handle video upload and prediction
@app.route('/predict', methods=['POST'])
def predict():
    if 'video' not in request.files:
        return jsonify({'error': 'No video file provided.'}), 400

    video_file = request.files['video']
    if video_file.filename == '':
        return jsonify({'error': 'Empty filename.'}), 400

    # Save the uploaded video file
    video_path = os.path.join(app.config['UPLOAD_FOLDER'], video_file.filename)
    video_file.save(video_path)

    start_time = time.time()

    # Extract faces from the video
    faces = extract_faces_from_video(video_path)
    if not faces:
        os.remove(video_path)
        return jsonify({'error': 'No faces detected in the video.'}), 400

    # Predict using the model
    predictions = predict_faces(faces)

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

    # Include per-frame predictions if desired
    for pred in predictions:
        frame_info = {
            'frame_number': pred['frame_number'],
            'timestamp': pred['timestamp'],
            'confidence': round(pred['confidence'] * 100, 2)
        }
        response['details'].append(frame_info)

    # Clean up
    os.remove(video_path)

    # Return the full response
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
