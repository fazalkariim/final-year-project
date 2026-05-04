# extract_train_test_keypoints.py

import os
import cv2
import numpy as np
import mediapipe as mp
import tensorflow as tf
from tensorflow.keras.applications.mobilenet import MobileNet, preprocess_input
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.layers import GlobalAveragePooling2D

# ---------------------------------------------------------------------
# CONFIGURATION
# ---------------------------------------------------------------------
DATASET_DIR = "dataset"   # Folder containing TRAIN/ and TEST/
TRAIN_SUBDIR = "TRAIN"
TEST_SUBDIR  = "TEST"

IMAGE_SIZE = (224, 224)

# Output .npy files
KEYPOINTS_TRAIN = "keypoints_train.npy"
LABELS_TRAIN    = "labels_train.npy"
KEYPOINTS_TEST  = "keypoints_test.npy"
LABELS_TEST     = "labels_test.npy"

# 1) Mediapipe Pose
mp_pose = mp.solutions.pose
pose_detector = mp_pose.Pose(static_image_mode=True, min_detection_confidence=0.5)

# 2) MobileNet base + global average pooling
base_model = MobileNet(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
global_pool = GlobalAveragePooling2D()

def extract_keypoints(image):
    """
    Extract 33 pose landmarks => shape (66,) for (x,y).
    Returns None if no landmarks found.
    """
    img_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    results = pose_detector.process(img_rgb)
    if not results.pose_landmarks:
        return None

    # 33 landmarks => 66 floats
    keypoints = []
    for lm in results.pose_landmarks.landmark:
        keypoints.append(lm.x)
        keypoints.append(lm.y)
    return np.array(keypoints, dtype=np.float32)

def extract_mobilenet_features(image):
    """
    Extract deep features from MobileNet -> shape (1024,).
    """
    img_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    arr = img_to_array(img_rgb)
    arr = cv2.resize(arr, IMAGE_SIZE)
    arr = np.expand_dims(arr, axis=0)
    arr = preprocess_input(arr)  # MobileNet's preprocess
    features = base_model.predict(arr, verbose=0)   # e.g., shape (1, 7, 7, 1024)
    pooled   = global_pool(features).numpy()        # shape: (1, 1024)
    return pooled[0]                                # (1024,)

def extract_features_from_subset(subset_folder):
    """
    For a folder like dataset/TRAIN or dataset/TEST:
      - Each subfolder is a pose label.
      - Returns X, y arrays for that subset.
    """
    X_list = []
    y_list = []

    for pose_class in os.listdir(subset_folder):
        pose_class_folder = os.path.join(subset_folder, pose_class)
        if not os.path.isdir(pose_class_folder):
            continue

        # Iterate images
        for img_file in os.listdir(pose_class_folder):
            if not img_file.lower().endswith((".jpg", ".jpeg", ".png")):
                continue
            img_path = os.path.join(pose_class_folder, img_file)
            image = cv2.imread(img_path)
            if image is None:
                print(f"Warning: cannot read {img_path}")
                continue

            # 1) Keypoints
            keyp = extract_keypoints(image)
            if keyp is None:
                # No pose
                continue

            # 2) MobileNet features
            mob_feats = extract_mobilenet_features(image)

            # 3) Merge => shape (66 + 1024 = 1090)
            merged = np.concatenate([keyp, mob_feats], axis=0)
            X_list.append(merged)
            y_list.append(pose_class)

    X_arr = np.array(X_list, dtype=np.float32)
    y_arr = np.array(y_list)
    return X_arr, y_arr

def main():
    train_folder = os.path.join(DATASET_DIR, TRAIN_SUBDIR)
    test_folder  = os.path.join(DATASET_DIR, TEST_SUBDIR)

    # Extract for TRAIN
    X_train, y_train = extract_features_from_subset(train_folder)
    print(f"TRAIN: extracted {X_train.shape[0]} samples, feature dim: {X_train.shape[1]}")
    np.save(KEYPOINTS_TRAIN, X_train)
    np.save(LABELS_TRAIN,    y_train)

    # Extract for TEST
    X_test, y_test = extract_features_from_subset(test_folder)
    print(f"TEST: extracted {X_test.shape[0]} samples, feature dim: {X_test.shape[1]}")
    np.save(KEYPOINTS_TEST, X_test)
    np.save(LABELS_TEST,    y_test)

    print("Extraction complete. Saved npy files for TRAIN and TEST.")

if __name__ == "__main__":
    main()
