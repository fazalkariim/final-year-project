"use client";
import React from "react";

export default function PoseDetectionIframe() {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-slate-100">
      <iframe
        src="http://localhost:3001/Posedetection"
        title="Pose Detection & Monitoring"
        className="w-full h-full border-0 rounded-lg shadow-lg"
        style={{ minHeight: "80vh", minWidth: "80vw" }}
      />
      <button
        onClick={async () => {
          try {
            const res = await fetch('http://localhost:5001/run_test2', {
              method: 'POST',
            });
            const data = await res.json();
            if (data.success) {
              // No alert
            } else {
              // Optionally, you can still alert errors, or also remove this if you want silence on error too
            }
          } catch (err) {
            alert('Failed to call API: ' + err);
          }
        }}
        className="px-6 py-3 hover:bg-red-600 text-white font-semibold rounded-lg bg-red-400 transition"
      >
        Pose Detection & Monitoring
      </button>
    </div>
  );
}
