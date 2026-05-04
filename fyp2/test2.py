import cv2
import math
import numpy as np
import mediapipe as mp
import tensorflow as tf
from tensorflow.keras.applications.mobilenet import MobileNet, preprocess_input
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.layers import GlobalAveragePooling2D
import joblib
import pickle
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

###########################################
# ANGLE DEFINITIONS FOR EACH POSE
###########################################
POSE_ANGLE_DEFS = {
    "warrior2": [
        {
            'desc': "Left knee angle",
            'landmarks': (23, 25, 27),
            'ideal_angle': 90.0,
            'tolerance': 10.0,
            'feedback_low': "Bend your left knee more.",
            'feedback_high': "Straighten your left knee a bit."
        },
        {
            'desc': "Left arm angle",
            'landmarks': (11, 13, 15),
            'ideal_angle': 180.0,
            'tolerance': 15.0,
            'feedback_low': "Straighten your left arm more.",
            'feedback_high': "Don't hyperextend left elbow."
        }
    ],
    "tree": [
        {
            'desc': "Standing leg knee angle",
            'landmarks': (24, 26, 28),
            'ideal_angle': 180.0,
            'tolerance': 20.0,
            'feedback_low': "Straighten your standing leg more.",
            'feedback_high': "Don't lock out your standing leg."
        }
    ],
    "plank": [
        {
            'desc': "Body line angle (shoulder-hip-ankle)",
            'landmarks': (12, 24, 28),
            'ideal_angle': 180.0,
            'tolerance': 10.0,
            'feedback_low': "Lift hips for a straight line.",
            'feedback_high': "Lower hips slightly (overextended)."
        }
    ],
    "downdog": [
        {
            'desc': "Hips angle (shoulder-hip-ankle)",
            'landmarks': (11, 23, 27),
            'ideal_angle': 90.0,
            'tolerance': 15.0,
            'feedback_low': "Raise your hips more (press chest toward thighs).",
            'feedback_high': "Soften knees if over-arched."
        }
    ],
    "goddess": [
        {
            'desc': "Left knee angle",
            'landmarks': (23, 25, 27),
            'ideal_angle': 90.0,
            'tolerance': 15.0,
            'feedback_low': "Bend your left knee more for goddess.",
            'feedback_high': "Straighten your left knee if too deep."
        },
        {
            'desc': "Right knee angle",
            'landmarks': (24, 26, 28),
            'ideal_angle': 90.0,
            'tolerance': 15.0,
            'feedback_low': "Bend your right knee more for goddess.",
            'feedback_high': "Straighten your right knee if too deep."
        }
    ]
}

def angle_2d(a, b, c):
    """
    Returns angle at point B for (A,B,C) in degrees, or None if invalid.
    a,b,c are (x, y).
    """
    ba = (a[0] - b[0], a[1] - b[1])
    bc = (c[0] - b[0], c[1] - b[1])
    dot = ba[0]*bc[0] + ba[1]*bc[1]
    mag_ba = math.hypot(*ba)
    mag_bc = math.hypot(*bc)
    if mag_ba*mag_bc == 0:
        return None
    cos_angle = dot / (mag_ba * mag_bc)
    cos_angle = max(-1.0, min(1.0, cos_angle))
    return math.degrees(math.acos(cos_angle))

def main():
    # Load SVM & label encoder
    SVM_MODEL_FILE = "svm_pose_model.joblib"
    LABEL_ENCODER_FILE = "label_encoder.pkl"

    svm_clf = joblib.load(SVM_MODEL_FILE)
    with open(LABEL_ENCODER_FILE, "rb") as f:
        label_encoder = pickle.load(f)

    # Setup Mediapipe Pose + MobileNet
    mp_pose = mp.solutions.pose
    pose_detector = mp_pose.Pose(static_image_mode=False, min_detection_confidence=0.5)

    base_model = MobileNet(weights='imagenet', include_top=False, input_shape=(224,224,3))
    global_pool = GlobalAveragePooling2D()

    # Helper functions
    def extract_keypoints(frame):
        img_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = pose_detector.process(img_rgb)
        if not results.pose_landmarks:
            return None
        # 33 landmarks => 66 floats
        keyp = []
        for lm in results.pose_landmarks.landmark:
            keyp.append(lm.x)
            keyp.append(lm.y)
        return np.array(keyp, dtype=np.float32)

    def extract_mobilenet_features(frame):
        img_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        arr = img_to_array(img_rgb)
        arr = cv2.resize(arr, (224,224))
        arr = np.expand_dims(arr, axis=0)
        arr = preprocess_input(arr)
        features = base_model.predict(arr, verbose=0)
        pooled = global_pool(features).numpy()  # shape (1, 1024)
        return pooled[0]

    # List to store performed poses and their accuracy
    performed_poses = []

    # Start webcam
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        print("Error: cannot open webcam.")
        return

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # Flip horizontally
        frame = cv2.flip(frame, 1)

        # 1) Extract keypoints (66-dim)
        keypoints = extract_keypoints(frame)
        # 2) Extract MobileNet features (1024-dim)
        mob_feats = extract_mobilenet_features(frame)

        # Merge => shape (1090,)
        if keypoints is not None:
            merged = np.concatenate([keypoints, mob_feats], axis=0).reshape(1, -1)

            # SVM inference
            preds_proba = svm_clf.predict_proba(merged)[0]  # shape: (num_classes,)
            idx = np.argmax(preds_proba)
            conf = preds_proba[idx]
            pred_label = label_encoder.inverse_transform([idx])[0]

            if conf >= 0.70:
                # Track the pose and confidence
                performed_poses.append((pred_label, conf))
                # Show the pose + conf
                cv2.putText(frame, f"{pred_label} ({conf:.2f})", (10,30),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0,255,0), 2)
                # Do angle checks if we have definitions
                feedback_lines = []
                if pred_label in POSE_ANGLE_DEFS:
                    # Let's do a fresh mediapipe pass or reuse the same pass
                    # We'll just reuse the same pass in keypoints (we do have the landmarks in results, but let's demonstrate).
                    # Actually, let's re-run for angles with the same pass. We need pixel coords for angle_2d though, so let's do that carefully:
                    # We'll do the original results' .pose_landmarks data to get pixel coords.

                    # For angles, we might want the 'results' from earlier, so let's do that:
                    img_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                    pose_results = pose_detector.process(img_rgb)

                    if pose_results.pose_landmarks:
                        h, w, _ = frame.shape
                        def get_lm(lid):
                            lm = pose_results.pose_landmarks.landmark[lid]
                            return (lm.x * w, lm.y * h)

                        for angle_def in POSE_ANGLE_DEFS[pred_label]:
                            desc = angle_def['desc']
                            A_id, B_id, C_id = angle_def['landmarks']
                            ideal = angle_def['ideal_angle']
                            tol   = angle_def['tolerance']
                            fb_low  = angle_def['feedback_low']
                            fb_high = angle_def['feedback_high']

                            A = get_lm(A_id)
                            B = get_lm(B_id)
                            C = get_lm(C_id)
                            angle_val = angle_2d(A, B, C)
                            if angle_val is not None:
                                low_bound = ideal - tol
                                high_bound = ideal + tol
                                if angle_val < low_bound:
                                    feedback_lines.append(f"{desc}: {fb_low} ({angle_val:.1f}°)")
                                elif angle_val > high_bound:
                                    feedback_lines.append(f"{desc}: {fb_high} ({angle_val:.1f}°)")
                                else:
                                    feedback_lines.append(f"{desc}: Good! ({angle_val:.1f}°)")
                            else:
                                feedback_lines.append(f"{desc}: angle not found.")
                    else:
                        feedback_lines.append("No pose landmarks for angle checks.")
                else:
                    feedback_lines.append(f"No angle definitions for: {pred_label}")

                # Draw feedback lines
                y0 = 60
                for i, line in enumerate(feedback_lines):
                    cv2.putText(frame, line, (10, y0 + i*25),
                                cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0,255,0), 2)
            else:
                # Confidence < 0.70 => show "No pose detected"
                cv2.putText(frame, "No pose detected (low confidence)", (10,30),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0,0,255), 2)
        else:
            cv2.putText(frame, "No pose detected (no keypoints)", (10,30),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0,0,255), 2)

        cv2.imshow("Real-Time Pose - MobileNet + SVM", frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

    # Generate PDF report after session ends
    if performed_poses:
        pdf_filename = "pose_report.pdf"
        c = canvas.Canvas(pdf_filename, pagesize=letter)
        width, height = letter
        c.setFont("Helvetica-Bold", 16)
        c.drawString(50, height - 50, "Yoga Pose Session Report")
        c.setFont("Helvetica", 12)
        y = height - 90
        c.drawString(50, y, "Pose Name")
        c.drawString(250, y, "Accuracy (%)")
        y -= 20
        c.line(50, y, 400, y)
        y -= 20
        for pose, acc in performed_poses:
            c.drawString(50, y, str(pose))
            c.drawString(250, y, f"{acc*100:.2f}")
            y -= 20
            if y < 50:
                c.showPage()
                y = height - 50
        c.save()
        print(f"PDF report generated: {pdf_filename}")
    else:
        print("No poses were performed to generate a report.")


if __name__ == "__main__":
    main()
