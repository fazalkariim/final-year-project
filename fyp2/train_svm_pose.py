# train_svm_pose.py

import numpy as np
import pickle
import joblib
from sklearn.svm import SVC
from sklearn.preprocessing import LabelEncoder

# The .npy files produced by the extraction script
KEYPOINTS_TRAIN = "keypoints_train.npy"
LABELS_TRAIN    = "labels_train.npy"
KEYPOINTS_TEST  = "keypoints_test.npy"
LABELS_TEST     = "labels_test.npy"

MODEL_OUTPUT    = "svm_pose_model.joblib"
ENCODER_OUTPUT  = "label_encoder.pkl"

def main():
    # 1) Load training data
    X_train = np.load(KEYPOINTS_TRAIN)  # e.g. shape: (N_train, 1090)
    y_train = np.load(LABELS_TRAIN)
    print("[TRAIN] shapes:", X_train.shape, y_train.shape)

    # 2) Encode labels
    le = LabelEncoder()
    y_train_enc = le.fit_transform(y_train)
    print("Classes:", le.classes_)

    # 3) Train an SVM (RBF kernel, probability=True for predict_proba)
    clf = SVC(kernel='rbf', probability=True)
    clf.fit(X_train, y_train_enc)
    print("SVM training completed.")

    # 4) Evaluate on test data (optional)
    try:
        X_test = np.load(KEYPOINTS_TEST)
        y_test = np.load(LABELS_TEST)
        y_test_enc = le.transform(y_test)  # same label encoder
        acc = clf.score(X_test, y_test_enc)
        print(f"[TEST] shapes: {X_test.shape}, {y_test.shape}")
        print(f"Test Accuracy: {acc*100:.2f}%")
    except FileNotFoundError:
        print("No test files found, skipping test evaluation.")
    except ValueError as e:
        print("Error evaluating test data:", e)

    # 5) Save the model
    joblib.dump(clf, MODEL_OUTPUT)
    print(f"SVM saved to '{MODEL_OUTPUT}'")

    with open(ENCODER_OUTPUT, "wb") as f:
        pickle.dump(le, f)
    print(f"Label encoder saved to '{ENCODER_OUTPUT}'")

if __name__ == "__main__":
    main()
