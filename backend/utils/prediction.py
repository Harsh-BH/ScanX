# utils/prediction.py

import numpy as np
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.applications.xception import preprocess_input
from models.xception_model import load_xception_model

# Load the model (ensure the correct path to weights)
model = load_xception_model('xception_deepfake_image_5o.h5')

# utils/prediction.py

# utils/prediction.py

def predict_faces(faces):
    predictions = []
    for face_info in faces:
        face = face_info['face_image']
        x = img_to_array(face)
        x = preprocess_input(x)
        x = np.expand_dims(x, axis=0)
        prob = model.predict(x)[0][0]
        predictions.append({
            'frame_number': face_info['frame_number'],
            'timestamp': face_info['timestamp'],
            'confidence': prob
        })
    return predictions

