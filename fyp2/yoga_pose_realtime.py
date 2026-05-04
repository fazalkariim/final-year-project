# yoga_pose_realtime.py

import cv2
import numpy as np
import mediapipe as mp
import tensorflow as tf
import time
from tensorflow.keras.applications.mobilenet import MobileNet, preprocess_input
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.layers import GlobalAveragePooling2D
import joblib
import pickle

# 1) Mediapipe Pose
mp_pose = mp.solutions.pose
pose_detector = mp_pose.Pose(static_image_mode=False, min_detection_confidence=0.5)

# 2) MobileNet + global average pooling
base_model = MobileNet(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
global_pool = GlobalAveragePooling2D()

# Load SVM + label encoder
SVM_MODEL_FILE = "svm_pose_model.joblib"
LABEL_ENCODER_FILE = "label_encoder.pkl"

svm_clf = joblib.load(SVM_MODEL_FILE)
with open(LABEL_ENCODER_FILE, "rb") as f:
    label_encoder = pickle.load(f)

def extract_keypoints(frame):
    """
    Return shape (66,) or None if no pose detected.
    """
    img_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = pose_detector.process(img_rgb)
    if not results.pose_landmarks:
        return None

    keyp = []
    for lm in results.pose_landmarks.landmark:
        keyp.append(lm.x)
        keyp.append(lm.y)
    return np.array(keyp, dtype=np.float32)

def extract_mobilenet_features(frame):
    """
    Return (1024,) deep features from MobileNet.
    """
    img_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    arr = img_to_array(img_rgb)
    arr = cv2.resize(arr, (224, 224))
    arr = np.expand_dims(arr, axis=0)
    arr = preprocess_input(arr)
    features = base_model.predict(arr, verbose=0)
    pooled   = global_pool(features).numpy()  # shape (1, 1024)
    return pooled[0]

def main():
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        print("Error: cannot open webcam.")
        return

    print("Press 'q' to quit.")
    frame_count = 0

    while True:
        start_capture = time.time()
        ret, frame = cap.read()
        if not ret:
            break
        capture_ms = (time.time() - start_capture) * 1000.0

        frame_count += 1
        # Mirror flip
        frame = cv2.flip(frame, 1)

        # Keypoints
        start_key = time.time()
        keypoints = extract_keypoints(frame)
        key_ms = (time.time() - start_key) * 1000.0

        # MobileNet features
        start_mob = time.time()
        mob_feats = extract_mobilenet_features(frame)
        mob_ms = (time.time() - start_mob) * 1000.0

        # SVM Inference
        start_infer = time.time()
        if keypoints is not None:
            merged = np.concatenate([keypoints, mob_feats], axis=0).reshape(1, -1)  # shape (1, 1090)
            preds_proba = svm_clf.predict_proba(merged)[0]
            idx = np.argmax(preds_proba)
            conf = preds_proba[idx]
            label = label_encoder.inverse_transform([idx])[0]
        else:
            label = "No pose detected"
            conf = 0.0
        infer_ms = (time.time() - start_infer) * 1000.0

        # Overlay
        if keypoints is not None:
            cv2.putText(frame, f"{label} ({conf:.2f})", (10, 30),
                        cv2.FONT_HERSHEY_SIMPLEX, 1, (0,255,0), 2)
        else:
            cv2.putText(frame, label, (10, 30),
                        cv2.FONT_HERSHEY_SIMPLEX, 1, (0,0,255), 2)

        # Display
        start_display = time.time()
        cv2.imshow("Yoga Pose Detection (MobileNet + SVM)", frame)
        disp_ms = (time.time() - start_display) * 1000.0

        # Print timing (optional)
        print(f"Frame {frame_count} | Capture: {capture_ms:.2f} ms | "
              f"Keypoints: {key_ms:.2f} ms | MobileNet: {mob_ms:.2f} ms | "
              f"Inference: {infer_ms:.2f} ms | Display: {disp_ms:.2f} ms => "
              f"Label: {label}, Conf: {conf:.2f}")

        # Quit
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
