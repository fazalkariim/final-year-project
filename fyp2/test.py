import cv2
import math
import mediapipe as mp

mp_pose = mp.solutions.pose

# Helper function to compute angle (in degrees) between points A, B, C (with B as vertex)
def angle_2d(a, b, c):
    """
    Returns angle ABC (in degrees), or None if invalid.
    a,b,c are (x, y) in 2D pixel coords.
    """
    ba = (a[0] - b[0], a[1] - b[1])
    bc = (c[0] - b[0], c[1] - b[1])
    dot = ba[0]*bc[0] + ba[1]*bc[1]
    mag_ba = math.hypot(*ba)
    mag_bc = math.hypot(*bc)
    if mag_ba * mag_bc == 0:
        return None
    cos_angle = dot / (mag_ba*mag_bc)
    cos_angle = max(-1.0, min(1.0, cos_angle))  # clamp
    return math.degrees(math.acos(cos_angle))

# We'll define a dictionary: each pose has a list of angle checks.
# Each angle check is a dict with:
# {
#   'landmarks': (A,B,C),
#   'ideal_angle': float,
#   'tolerance': float,
#   'feedback_low': "str",
#   'feedback_high': "str",
#   'desc': "angle description",
# }
# The landmark IDs are from Mediapipe: 
#   left_hip=23, left_knee=25, left_ankle=27
#   right_hip=24, right_knee=26, right_ankle=28
#   left_shoulder=11, left_elbow=13, left_wrist=15
#   right_shoulder=12, right_elbow=14, right_wrist=16
#   etc.

POSE_ANGLE_DEFS = {
    "warrior2": [
        # Example: front knee angle = 90 ± 10
        {
            'desc': "Left knee angle",
            'landmarks': (23, 25, 27),   # (left_hip, left_knee, left_ankle)
            'ideal_angle': 90.0,
            'tolerance': 10.0,
            'feedback_low': "Bend your left knee more.",
            'feedback_high': "Straighten your left knee a bit."
        },
        # Example: left arm angle = ~180 ± 15 
        # We'll measure (left_shoulder, left_elbow, left_wrist) for a nearly straight line
        {
            'desc': "Left arm angle",
            'landmarks': (11, 13, 15),   # (left_shoulder, left_elbow, left_wrist)
            'ideal_angle': 180.0,
            'tolerance': 15.0,
            'feedback_low': "Straighten your left arm more.",
            'feedback_high': "Don't hyperextend left elbow."
        }
    ],
    "tree": [
        # In Tree pose, for example:
        #   We might check left knee angle if user lifts left foot, etc.
        {
            'desc': "Standing leg knee angle",
            'landmarks': (24, 26, 28),   # right side or left side depends on user
            'ideal_angle': 180.0,
            'tolerance': 20.0,
            'feedback_low': "Standing leg - straighten your knee more.",
            'feedback_high': "Check if you're overextending your standing leg."
        },
        # Another random angle: arms overhead? We measure (shoulder, elbow, wrist).
        {
            'desc': "Arms overhead angle",
            'landmarks': (12, 14, 16),   # (right_shoulder, right_elbow, right_wrist)
            'ideal_angle': 180.0,
            'tolerance': 30.0,
            'feedback_low': "Lift your arms more overhead.",
            'feedback_high': "Don't hyperextend elbows overhead."
        }
    ],
    "plank": [
        # Example: measure angle from shoulder-hip-ankle => near 180 ± 10
        {
            'desc': "Body line angle (shoulder-hip-ankle)",
            'landmarks': (12, 24, 28), # (right_shoulder, right_hip, right_ankle)
            'ideal_angle': 180.0,
            'tolerance': 10.0,
            'feedback_low': "Lift your hips (body not straight).",
            'feedback_high': "Lower your hips slightly (keep body in one line)."
        }
    ],
    "downdog": [
        # Example: measure angle formed by wrists-hips-ankles or shoulders-hips-ankles 
        # to see if user's legs & spine form a 'V' shape
        {
            'desc': "Hips angle (shoulder-hip-ankle)",
            'landmarks': (11, 23, 27), # left side example
            'ideal_angle': 90.0,
            'tolerance': 15.0,
            'feedback_low': "Raise your hips more (press chest toward thighs).",
            'feedback_high': "Soften the knees or reduce hip angle if over-arched."
        }
    ]
}

def main():
    # Ask user for pose
    valid_poses = list(POSE_ANGLE_DEFS.keys())  # e.g. ["warrior2","tree","plank","downdog"]
    print("Available poses:", valid_poses)
    chosen_pose = input("Which pose would you like to practice? ").strip().lower()

    if chosen_pose not in POSE_ANGLE_DEFS:
        print(f"Pose '{chosen_pose}' not recognized. Exiting.")
        return

    # Mediapipe Pose
    pose_detector = mp_pose.Pose(static_image_mode=False, min_detection_confidence=0.5)

    # Start webcam
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        print("Error: cannot open webcam.")
        return

    angle_checks = POSE_ANGLE_DEFS[chosen_pose]
    print(f"You chose pose: {chosen_pose}. We'll check {len(angle_checks)} angles.\nPress 'q' to quit.")

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # Flip
        frame = cv2.flip(frame, 1)
        h, w, _ = frame.shape

        # BGR->RGB
        img_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = pose_detector.process(img_rgb)

        # We'll store feedback lines, then put them on the frame
        feedback_lines = []

        if results.pose_landmarks:
            # Helper to retrieve a landmark's x,y in pixel coords
            def get_lm(id):
                lm = results.pose_landmarks.landmark[id]
                return (lm.x * w, lm.y * h)
            
            for angle_def in angle_checks:
                desc = angle_def['desc']
                (A_id, B_id, C_id) = angle_def['landmarks']
                ideal = angle_def['ideal_angle']
                tol   = angle_def['tolerance']
                fb_low  = angle_def['feedback_low']
                fb_high = angle_def['feedback_high']

                # Compute angle
                A = get_lm(A_id)
                B = get_lm(B_id)
                C = get_lm(C_id)
                angle_val = angle_2d(A, B, C)
                if angle_val is not None:
                    # Compare with desired range
                    low_bound = ideal - tol
                    high_bound = ideal + tol
                    if angle_val < low_bound:
                        feedback_lines.append(f"{desc}: {fb_low} (angle ~ {angle_val:.1f})")
                    elif angle_val > high_bound:
                        feedback_lines.append(f"{desc}: {fb_high} (angle ~ {angle_val:.1f})")
                    else:
                        feedback_lines.append(f"{desc}: Good! (angle ~ {angle_val:.1f})")
                else:
                    feedback_lines.append(f"{desc}: angle not found.")
        else:
            feedback_lines.append("No pose landmarks detected.")

        # Display feedback lines on frame
        y0 = 30
        for i, line in enumerate(feedback_lines):
            cv2.putText(frame, line, (10, y0 + i*25), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0,255,0), 2)

        cv2.imshow("Yoga Pose Feedback", frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            print("User quit.")
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
