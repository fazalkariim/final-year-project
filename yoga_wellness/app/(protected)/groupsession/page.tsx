"use client";

import React, { useState, useEffect } from "react";

// meditation exercise

const GroupSessionPage = () => {
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [breathingPhase, setBreathingPhase] = useState<"inhale" | "wait" | "exhale">("inhale");
  const [selectedAudioTrack, setSelectedAudioTrack] = useState<string | null>(null);

  // Dummy audio tracks (replace these with your actual audio file paths)
  const audioTracks = [
    { name: "Low frequency (4Hz)", url: "/4Hz.m4a" },
    { name: "Medium frequency (14Hz)", url: "/power Focus - 14Hz Beta Waves.m4a" },
    { name: "High frequency (14hz to 30hz)", url: "/Beta Waves 14-30 Hz.m4a" },
  ];

  // Start timer and audio
  const handleStartTimer = (duration: number) => {
    setTimeLeft(duration);
    setIsPaused(false);
    startAudioPlayback();
    setBreathingPhase("inhale");
  };

  // Pause or resume timer
  const handlePauseResume = () => {
    setIsPaused(!isPaused);
    if (audio) {
      if (isPaused) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  };

  // Stop timer and reset audio
  const handleStopTimer = () => {
    setTimeLeft(null);
    setIsPaused(false);
    stopAudioPlayback();
  };

  // Start playing the selected audio
  const startAudioPlayback = () => {
    if (!audio && selectedAudioTrack) {
      const newAudio = new Audio(selectedAudioTrack);
      setAudio(newAudio);
      newAudio.loop = true;
      newAudio.play();
    }
  };

  // Stop audio playback
  const stopAudioPlayback = () => {
    if (audio) {
      audio.pause();
      setAudio(null);
    }
  };

  // Timer logic
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (timeLeft && timeLeft > 0 && !isPaused) {
      timer = setTimeout(() => setTimeLeft((prev) => (prev ?? 0) - 1), 1000);
    } else if (timeLeft === 0) {
      alert("Time's up! Great job!");
      setTimeLeft(null);
      stopAudioPlayback();
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timeLeft, isPaused]);

  // Breathing phase logic
  useEffect(() => {
    if (!isPaused) {
      const breathingInterval = setInterval(() => {
        setBreathingPhase((prev) => {
          if (prev === "inhale") return "wait";
          if (prev === "wait") return "exhale";
          return "inhale";
        });
      }, 3000); // Change phase every 3 seconds
      return () => clearInterval(breathingInterval);
    }
  }, [isPaused]);

  // Stop audio when the component unmounts (user leaves the page)
  useEffect(() => {
    return () => {
      stopAudioPlayback();
    };
  }, []);

  return (
    <div className="pt-6">
      <div className="max-w-xl mx-auto bg-slate-100 shadow-lg rounded-lg p-4">
        {!selectedSession && (
          <>
            <h1 className="text-3xl font-bold text-center mb-6">
              Select one option!
            </h1>
            <div className="flex flex-col gap-6">
              <button
                onClick={() => setSelectedSession("Deep Breathing")}
                className="px-6 py-3 hover:bg-orange-300 text-white font-semibold rounded-lg bg-red-400"
              >
                Deep Breathing
              </button>
              <button
                onClick={() => setSelectedSession("Mindful Meditation")}
                className="px-6 py-3 hover:bg-orange-300 text-white font-semibold rounded-lg bg-red-400"
              >
                Mindful Meditation
              </button>
            </div>
          </>
        )}

        {selectedSession === "Deep Breathing" && (
          <div>
            <h2 className="text-3xl text-red-500 font-semibold text-center mb-3">
              Deep Breathing Session
            </h2>
            <div className="mb-4">
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Select Time Duration:
              </label>
              <select
                onChange={(e) => handleStartTimer(Number(e.target.value))}
                className="border border-gray-300 rounded-md px-4 py-2"
              >
                <option value="">Select Duration</option>
                <option value={20}>20 sec</option>
                <option value={30}>30 sec</option>
                <option value={40}>40 sec</option>
                <option value={50}>50 sec</option>
                <option value={60}>1 min</option>
                <option value={120}>2 min</option>
                <option value={180}>3 min</option>
                <option value={240}>4 min</option>
                <option value={300}>5 min</option>
                <option value={360}>6 min</option>
              </select>
            </div>

            {timeLeft !== null && (
              <div className="text-center">
                <div className="flex justify-center items-center mb-6">
                  <div
                    className={`w-40 h-40 rounded-full flex justify-center items-center border-[20px] transition-all duration-2000 ${
                      breathingPhase === "inhale"
                        ? "border-green-400"
                        : breathingPhase === "wait"
                        ? "border-yellow-400"
                        : "border-blue-400"
                    }`}
                  >
                    <span className="text-2xl font-bold">
                      {breathingPhase === "inhale"
                        ? "Inhale"
                        : breathingPhase === "wait"
                        ? "Hold"
                        : "Exhale"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-6 mt-4 justify-center">
              <button
                onClick={handlePauseResume}
                className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
              >
                {isPaused ? "Resume" : "Pause"}
              </button>
              <button
                onClick={handleStopTimer}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Stop
              </button>
            </div>


        <button
              onClick={() => setSelectedSession(null)}
              className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
            >
              Back
            </button>
          </div>
        )}

       {selectedSession === "Mindful Meditation" && (
  <div>
    <h2 className="text-3xl text-red-500 font-semibold text-center mb-3">
      Mindful Meditation Session
    </h2>

    {/* Guided Meditation Instructions */}
    
    {/* Meditation Timer with Bell */}
    <div className="mb-4">
      <label className="block text-lg font-medium text-gray-700 mb-2">
        Select Meditation Duration:
      </label>
      <select
        onChange={(e) => handleStartTimer(Number(e.target.value))}
        className="border border-gray-300 rounded-md px-4 py-2"
      >
        <option value="">Select Duration</option>
        <option value={60}>1 min</option>
        <option value={120}>2 min</option>
        <option value={180}>3 min</option>
        <option value={300}>5 min</option>
        <option value={600}>10 min</option>
      </select>
    </div>

    {/* Audio Selection and Controls */}
    <div className="mt-6">
      <label className="block text-lg font-medium text-gray-700 mb-2">
        Select Audio Track:
      </label>
      <select
        onChange={(e) => setSelectedAudioTrack(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2 w-full mb-4"
      >
        {audioTracks.map((track, index) => (
          <option key={index} value={track.url}>
            {track.name}
          </option>
        ))}
      </select>
    </div>

    {/* Breath Counter */}
    

    {/* Timer Display */}
    {timeLeft !== null && (
      <div className="text-center">
        <h3 className="text-3xl font-semibold text-gray-800 mb-5">
          {Math.floor(timeLeft / 60)}:
          {timeLeft % 60 < 10 ? "0" : ""}
          {timeLeft % 60}
        </h3>
      </div>
    )}

    {/* Control Buttons */}
    <div className="flex gap-6 mt-4 justify-center">
      <button
        onClick={handlePauseResume}
        className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
      >
        {isPaused ? "Resume" : "Pause"}
      </button>
      <button
        onClick={handleStopTimer}
        className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Stop
      </button>
    </div>

    {/* Back Button */}
    <button
      onClick={() => setSelectedSession(null)}
      className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
    >
      Back
    </button>
  </div>
)}

       
      </div>
    </div>
  );
};

export default GroupSessionPage;