"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Activity, Gamepad2, Trophy, ArrowRight } from "lucide-react";

export default function PoseDetection() {
  const router = useRouter();

  const cards = [
    {
      title: "Pose Detection & Monitoring",
      desc: "Track your yoga posture in real-time using AI powered detection system.",
      icon: <Activity size={38} className="text-emerald-400" />,
      color: "emerald",
      action: async () => {
        try {
          await fetch("http://localhost:5001/run_test2", {
            method: "POST",
          });
        } catch (err) {
          alert("Failed to call API: " + err);
        }
      },
    },
    {
      title: "Wellness Games",
      desc: "Improve focus and mental health through interactive mindfulness games.",
      icon: <Gamepad2 size={38} className="text-violet-400" />,
      color: "violet",
      action: () => router.push("/mentalhealthnwellnessgames"),
    },
    {
      title: "Goal Based Yoga Challenges",
      desc: "Follow structured yoga challenges based on your fitness goals.",
      icon: <Trophy size={38} className="text-amber-400" />,
      color: "amber",
      action: () => router.push("/goalbasedyogachallenges"),
    },
  ];

  return (
    <div className="min-h-[519px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-4 text-white">
      <div className="mx-auto max-w-6xl">
        
        {/* HEADER */}
        <div className="mb-7 text-center">
          <h1 className="text-5xl font-black tracking-tight">
            Explore Advanced Features
          </h1>
          <p className="mt-4 text-slate-400 text-lg">
            Choose a module to continue your yoga journey
          </p>
        </div>

        {/* CARDS */}
        <div className="grid gap-8 md:grid-cols-3">
          {cards.map((item, i) => (
            <div
              key={i}
              onClick={item.action}
              className="group cursor-pointer rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:bg-white/10 hover:border-white/20"
            >
              {/* ICON */}
              <div
                className={`mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10`}
              >
                {item.icon}
              </div>

              {/* TITLE */}
              <h2 className="mb-3 text-2xl font-bold">{item.title}</h2>

              {/* DESCRIPTION */}
              <p className="text-slate-400 leading-relaxed">
                {item.desc}
              </p>

              {/* BUTTON LOOK */}
              <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-white/70 group-hover:text-white">
                Open Feature
                <ArrowRight size={18} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}