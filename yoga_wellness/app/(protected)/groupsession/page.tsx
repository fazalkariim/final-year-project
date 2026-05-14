"use client";

import React, { useEffect, useState } from "react";
import {
  Pause,
  Play,
  Square,
  Wind,
  Brain,
  ArrowLeft,
  Music,
  Timer,
} from "lucide-react";

const GroupSessionPage = () => {
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const [breathingPhase, setBreathingPhase] = useState<
    "inhale" | "wait" | "exhale"
  >("inhale");

  const [selectedAudioTrack, setSelectedAudioTrack] = useState<string | null>(
    null
  );

  const audioTracks = [
    { name: "Low Frequency (4Hz)", url: "/4Hz.m4a" },
    {
      name: "Medium Frequency (14Hz)",
      url: "/power Focus - 14Hz Beta Waves.m4a",
    },
    {
      name: "High Frequency (14Hz - 30Hz)",
      url: "/Beta Waves 14-30 Hz.m4a",
    },
  ];

  // ---------------- TIMER ----------------

  const handleStartTimer = (duration: number) => {
    if (!duration) return;

    setTimeLeft(duration);
    setIsPaused(false);
    setBreathingPhase("inhale");
    startAudioPlayback();
  };

  const handlePauseResume = () => {
    setIsPaused((prev) => !prev);

    if (audio) {
      if (isPaused) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  };

  const handleStopTimer = () => {
    setTimeLeft(null);
    setIsPaused(false);
    stopAudioPlayback();
  };

  // ---------------- AUDIO ----------------

  const startAudioPlayback = () => {
    if (!audio && selectedAudioTrack) {
      const newAudio = new Audio(selectedAudioTrack);

      newAudio.loop = true;
      newAudio.play();

      setAudio(newAudio);
    }
  };

  const stopAudioPlayback = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setAudio(null);
    }
  };

  // ---------------- TIMER EFFECT ----------------

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (timeLeft !== null && timeLeft > 0 && !isPaused) {
      timer = setTimeout(() => {
        setTimeLeft((prev) => (prev ?? 0) - 1);
      }, 1000);
    }

    if (timeLeft === 0) {
      alert("Session Completed Successfully!");

      setTimeLeft(null);
      stopAudioPlayback();
    }

    return () => clearTimeout(timer);
  }, [timeLeft, isPaused]);

  // ---------------- BREATHING EFFECT ----------------

  useEffect(() => {
    if (!isPaused && selectedSession === "Deep Breathing") {
      const interval = setInterval(() => {
        setBreathingPhase((prev) => {
          if (prev === "inhale") return "wait";
          if (prev === "wait") return "exhale";
          return "inhale";
        });
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isPaused, selectedSession]);

  // ---------------- CLEANUP ----------------

  useEffect(() => {
    return () => {
      stopAudioPlayback();
    };
  }, []);

  // ---------------- FORMAT TIME ----------------

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // ---------------- PHASE COLORS ----------------

  const phaseStyles = {
    inhale: {
      border: "border-emerald-400",
      bg: "bg-emerald-500/10",
      text: "Inhale",
    },
    wait: {
      border: "border-yellow-400",
      bg: "bg-yellow-500/10",
      text: "Hold",
    },
    exhale: {
      border: "border-sky-400",
      bg: "bg-sky-500/10",
      text: "Exhale",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        {/* HEADER */}

        <div className="mb-10 text-center">
          <h1 className="text-5xl font-black tracking-tight">
            Meditation & Breathing
          </h1>

          <p className="mt-4 text-lg text-slate-400">
            Relax your mind, improve focus, and build mindfulness.
          </p>
        </div>

        {/* SESSION SELECT */}

        {!selectedSession && (
          <div className="grid gap-8 md:grid-cols-2">
            {/* BREATHING CARD */}

            <div
              onClick={() => setSelectedSession("Deep Breathing")}
              className="group cursor-pointer rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-emerald-400/50 hover:bg-white/10"
            >
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-500/20">
                <Wind size={38} className="text-emerald-400" />
              </div>

              <h2 className="mb-3 text-3xl font-bold">
                Deep Breathing Session
              </h2>

              <p className="leading-7 text-slate-400">
                Calm your nervous system with guided inhale, hold, and exhale
                breathing exercises.
              </p>

              <button className="mt-8 rounded-xl bg-emerald-500 px-6 py-3 font-semibold transition hover:bg-emerald-600">
                Start Session
              </button>
            </div>

            {/* MEDITATION CARD */}

            <div
              onClick={() => setSelectedSession("Mindful Meditation")}
              className="group cursor-pointer rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-violet-400/50 hover:bg-white/10"
            >
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-violet-500/20">
                <Brain size={38} className="text-violet-400" />
              </div>

              <h2 className="mb-3 text-3xl font-bold">
                Mindful Meditation
              </h2>

              <p className="leading-7 text-slate-400">
                Improve concentration and mindfulness using peaceful guided
                meditation sessions.
              </p>

              <button className="mt-8 rounded-xl bg-violet-500 px-6 py-3 font-semibold transition hover:bg-violet-600">
                Start Session
              </button>
            </div>
          </div>
        )}

        {/* ================= BREATHING SESSION ================= */}

        {selectedSession === "Deep Breathing" && (
          <div className="mx-auto max-w-4xl rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            {/* TOP */}

            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-4xl font-black text-emerald-400">
                  Deep Breathing
                </h2>

                <p className="mt-2 text-slate-400">
                  Follow the breathing circle and sync your breath.
                </p>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/70 px-5 py-4">
                <Timer className="text-emerald-400" />

                <select
                  onChange={(e) =>
                    handleStartTimer(Number(e.target.value))
                  }
                  className="bg-transparent outline-none"
                >
                  <option value="">Select Duration</option>
                  <option value={60}>1 Minute</option>
                  <option value={120}>2 Minutes</option>
                  <option value={180}>3 Minutes</option>
                  <option value={300}>5 Minutes</option>
                  <option value={600}>10 Minutes</option>
                </select>
              </div>
            </div>

            {/* BREATHING CIRCLE */}

            {timeLeft !== null && (
              <div className="mt-14 flex flex-col items-center">
                <div
                  className={`flex h-72 w-72 items-center justify-center rounded-full border-[18px] ${phaseStyles[breathingPhase].border} ${phaseStyles[breathingPhase].bg} shadow-2xl transition-all duration-1000`}
                >
                  <div className="text-center">
                    <h3 className="text-4xl font-black">
                      {phaseStyles[breathingPhase].text}
                    </h3>

                    <p className="mt-4 text-5xl font-bold text-slate-200">
                      {formatTime(timeLeft)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* BUTTONS */}

            <div className="mt-14 flex flex-wrap justify-center gap-5">
              <button
                onClick={handlePauseResume}
                className="flex items-center gap-2 rounded-2xl bg-yellow-500 px-7 py-4 font-semibold transition hover:bg-yellow-600"
              >
                {isPaused ? <Play size={20} /> : <Pause size={20} />}
                {isPaused ? "Resume" : "Pause"}
              </button>

              <button
                onClick={handleStopTimer}
                className="flex items-center gap-2 rounded-2xl bg-red-500 px-7 py-4 font-semibold transition hover:bg-red-600"
              >
                <Square size={18} />
                Stop
              </button>

              <button
                onClick={() => {
                  handleStopTimer();
                  setSelectedSession(null);
                }}
                className="flex items-center gap-2 rounded-2xl bg-slate-700 px-7 py-4 font-semibold transition hover:bg-slate-600"
              >
                <ArrowLeft size={18} />
                Back
              </button>
            </div>
          </div>
        )}

        {/* ================= MEDITATION SESSION ================= */}

        {selectedSession === "Mindful Meditation" && (
          <div className="mx-auto max-w-4xl rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            {/* TOP */}

            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-4xl font-black text-violet-400">
                  Mindful Meditation
                </h2>

                <p className="mt-2 text-slate-400">
                  Focus your attention and relax with calming meditation audio.
                </p>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/70 px-5 py-4">
                <Timer className="text-violet-400" />

                <select
                  onChange={(e) =>
                    handleStartTimer(Number(e.target.value))
                  }
                  className="bg-transparent outline-none"
                >
                  <option value="">Select Duration</option>
                  <option value={60}>1 Minute</option>
                  <option value={120}>2 Minutes</option>
                  <option value={300}>5 Minutes</option>
                  <option value={600}>10 Minutes</option>
                  <option value={900}>15 Minutes</option>
                </select>
              </div>
            </div>

            {/* AUDIO */}

            <div className="mt-10 rounded-3xl border border-white/10 bg-slate-900/60 p-6">
              <div className="mb-4 flex items-center gap-3">
                <Music className="text-violet-400" />
                <h3 className="text-2xl font-bold">Meditation Audio</h3>
              </div>

              <select
                onChange={(e) => setSelectedAudioTrack(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-800 px-5 py-4 outline-none"
              >
                <option value="">Choose Audio Track</option>

                {audioTracks.map((track, index) => (
                  <option key={index} value={track.url}>
                    {track.name}
                  </option>
                ))}
              </select>
            </div>

            {/* TIMER */}

            {timeLeft !== null && (
              <div className="mt-14 text-center">
                <div className="mx-auto flex h-64 w-64 items-center justify-center rounded-full border-[16px] border-violet-400 bg-violet-500/10 shadow-2xl">
                  <div>
                    <p className="text-lg text-slate-300">
                      Remaining Time
                    </p>

                    <h3 className="mt-3 text-6xl font-black">
                      {formatTime(timeLeft)}
                    </h3>
                  </div>
                </div>
              </div>
            )}

            {/* BUTTONS */}

            <div className="mt-14 flex flex-wrap justify-center gap-5">
              <button
                onClick={handlePauseResume}
                className="flex items-center gap-2 rounded-2xl bg-yellow-500 px-7 py-4 font-semibold transition hover:bg-yellow-600"
              >
                {isPaused ? <Play size={20} /> : <Pause size={20} />}
                {isPaused ? "Resume" : "Pause"}
              </button>

              <button
                onClick={handleStopTimer}
                className="flex items-center gap-2 rounded-2xl bg-red-500 px-7 py-4 font-semibold transition hover:bg-red-600"
              >
                <Square size={18} />
                Stop
              </button>

              <button
                onClick={() => {
                  handleStopTimer();
                  setSelectedSession(null);
                }}
                className="flex items-center gap-2 rounded-2xl bg-slate-700 px-7 py-4 font-semibold transition hover:bg-slate-600"
              >
                <ArrowLeft size={18} />
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupSessionPage;