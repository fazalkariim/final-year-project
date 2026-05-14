"use client";

import React, { useState } from "react";
import Image from "next/image";
import { format, addDays } from "date-fns";
import { Trophy, ArrowLeft, BarChart3 } from "lucide-react";

interface Challenge {
  days: number;
  title: string;
  imagesToShow: number;
}

const CHALLENGES: Challenge[] = [
  { days: 7, title: "7 Days Challenge", imagesToShow: 3 },
  { days: 15, title: "15 Days Challenge", imagesToShow: 5 },
  { days: 30, title: "30 Days Challenge", imagesToShow: 7 },
];

const mockLeaderboard = [
  { username: "fazalkarim", completed: 3, total: 7, challengeDays: 7 },
  { username: "user2", completed: 5, total: 15, challengeDays: 15 },
  { username: "user3", completed: 10, total: 30, challengeDays: 30 },
];

export default function Goalbasedyogachallenges() {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [completedIndexes, setCompletedIndexes] = useState<number[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const handleJoinChallenge = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setCompletedIndexes([]);
    setStartDate(new Date());
    setShowLeaderboard(false);
  };

  const markAsDone = (index: number) => {
    if (!completedIndexes.includes(index)) {
      setCompletedIndexes((prev) => [...prev, index]);
    }
  };

  const getCurrentDay = () => {
    if (!startDate) return 0;
    const diff = Math.floor(
      (Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    return diff + 1;
  };

  const getEndDate = () => {
    if (!startDate || !selectedChallenge) return "";
    return format(addDays(startDate, selectedChallenge.days - 1), "PPP");
  };

  const poseImagesMap: { [key: string]: string[] } = {
    "7-day": ["/mountainposee.jpg", "/cat-cow.jpg", "/Downward-Dog.jpg"],
    "15-day": [
      "/warrior2posee.jpg",
      "/triangleposee.jpg",
      "/Chair-Pose.jpg",
      "/Bridge-Pose.jpg",
      "/seatedforwardbendd.jpg",
    ],
    "30-day": [
      "/crowposee.jpg",
      "/camelposee.jpg",
      "/wheelposee.jpg",
      "/dancerposee.jpg",
      "/pigeonposee.jpg",
      "/boatposee.jpg",
      "/lotusposee.jpg",
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white px-6 py-12">

      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-black tracking-tight">
          Yoga Challenges
        </h1>
        <p className="text-slate-400 mt-3">
          Track your progress and improve daily
        </p>
      </div>

      {/* CHALLENGES */}
      {!selectedChallenge && (
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {CHALLENGES.map((c, i) => (
            <div
              key={i}
              onClick={() => handleJoinChallenge(c)}
              className="cursor-pointer rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:-translate-y-2 hover:bg-white/10 transition"
            >
              <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-amber-500/20 mb-5">
                <Trophy className="text-amber-400" />
              </div>

              <h2 className="text-2xl font-bold mb-2">{c.title}</h2>
              <p className="text-slate-400">
                Complete {c.days} days yoga journey with structured poses.
              </p>

              <div className="mt-6 text-sm text-amber-300 font-semibold">
                Start Challenge →
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SELECTED CHALLENGE */}
      {selectedChallenge && (
        <div className="max-w-6xl mx-auto">

          {/* TOP BAR */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">

            <div>
              <h2 className="text-3xl font-bold text-amber-400">
                {selectedChallenge.title}
              </h2>
              <p className="text-slate-400">
                Day {getCurrentDay()} • Ends {getEndDate()}
              </p>
            </div>

            <button
              onClick={() => setShowLeaderboard(!showLeaderboard)}
              className="flex items-center gap-2 bg-white/10 px-5 py-3 rounded-xl hover:bg-white/20"
            >
              <BarChart3 size={18} />
              {showLeaderboard ? "Hide" : "Show"} Leaderboard
            </button>
          </div>

          {/* PROGRESS */}
          <div className="mb-10 bg-white/5 border border-white/10 p-5 rounded-2xl">
            <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-400"
                style={{
                  width: `${(completedIndexes.length /
                    selectedChallenge.imagesToShow) *
                    100}%`,
                }}
              />
            </div>
            <p className="text-right text-sm mt-2 text-slate-400">
              {Math.round(
                (completedIndexes.length /
                  selectedChallenge.imagesToShow) *
                  100
              )}
              % completed
            </p>
          </div>

          {/* POSes */}
          <div className="grid md:grid-cols-3 gap-6">
            {(poseImagesMap[`${selectedChallenge.days}-day`] || []).map(
              (img, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center"
                >
                  <Image
                    src={img}
                    alt=""
                    width={300}
                    height={200}
                    className="rounded-xl"
                  />

                  {!completedIndexes.includes(i) ? (
                    <button
                      onClick={() => markAsDone(i)}
                      className="mt-4 w-full py-2 bg-emerald-500 rounded-xl hover:bg-emerald-600"
                    >
                      Mark Done
                    </button>
                  ) : (
                    <p className="mt-4 text-emerald-400 font-bold">
                      Completed ✓
                    </p>
                  )}
                </div>
              )
            )}
          </div>

          {/* BACK */}
          <div className="mt-10 text-center">
            <button
              onClick={() => setSelectedChallenge(null)}
              className="flex items-center gap-2 mx-auto bg-white/10 px-6 py-3 rounded-xl hover:bg-white/20"
            >
              <ArrowLeft size={18} />
              Back
            </button>
          </div>

          {/* LEADERBOARD */}
          {showLeaderboard && (
            <div className="mt-12 bg-white/5 border border-white/10 p-6 rounded-2xl">
              <h3 className="text-xl font-bold mb-4 text-amber-400">
                Leaderboard
              </h3>

              <table className="w-full text-left text-sm">
                <thead className="text-slate-400">
                  <tr>
                    <th>Name</th>
                    <th>Progress</th>
                    <th>%</th>
                  </tr>
                </thead>
                <tbody>
                  {mockLeaderboard.map((u, i) => (
                    <tr key={i} className="border-t border-white/10">
                      <td className="py-2">{u.username}</td>
                      <td>
                        {u.completed}/{u.total}
                      </td>
                      <td>
                        {Math.round((u.completed / u.total) * 100)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}