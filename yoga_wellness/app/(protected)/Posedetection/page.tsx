"use client";

// Explore more features

import React from "react";
import { useRouter } from "next/navigation";

export default function PoseDetection() {
  const router = useRouter();

  return (
    <div className="pt-6">
      <div className="max-w-xl mx-auto bg-slate-100 shadow-lg rounded-lg p-6">
        
        <div className="flex flex-col gap-6">
          <button
            onClick={async () => {
              try {
                const res = await fetch('http://localhost:5001/run_test2', {
                  method: 'POST',
                });
                const data = await res.json();
                if (data.success) {
                  // No alertc
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
          <button
            onClick={() => router.push("/mentalhealthnwellnessgames")}
            className="px-6 py-3 hover:bg-red-600 text-white font-semibold rounded-lg bg-red-400 transition"
          >
            Wellness Games
          </button>
          <button
            onClick={() => router.push("/goalbasedyogachallenges")}
            className="px-6 py-3 hover:bg-red-600 text-white font-semibold rounded-lg bg-red-400 transition"
          >
            Goal Based Yoga Challenges
          </button>
        </div>
      </div>
    </div>
  );
}
