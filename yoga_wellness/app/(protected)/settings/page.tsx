"use client";

import Image from "next/image";
import React, { useState } from "react";

type Question = {
  question: string;
  options: string[];
};

type QuestionsData = {
  [key: string]: Question[];
};

export default function Setting() {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  const questions: QuestionsData = {
    BackPain: [
      {
        question: "What is the primary cause of back pain?",
        options: [
          "Poor posture",
          "Excessive exercise",
          "Drinking coffee",
          "Not enough sunlight",
        ],
      },
      {
        question: "Which exercise is best for back pain relief?",
        options: ["Yoga", "Weightlifting", "Running", "Cycling"],
      },
      {
        question: "How many hours of rest are recommended for back pain?",
        options: ["4 hours", "6 hours", "8 hours", "10 hours"],
      },
      {
        question: "Which exercise is best for back pain relief?",
        options: ["Yoga", "Weightlifting", "Running", "Cycling"],
      },
      {
        question: "How many hours of rest are recommended for back pain?",
        options: ["4 hours", "6 hours", "8 hours", "10 hours"],
      },
      {
        question: "What kind of back pain do you feel most often?",
        options: ["Sharp pain","Dull ache","Stiffness"," Burning sensation"],
      },
    ],


    Strength: [
      {
        question: "How would you rate your current strength level?",
        options: ["Beginner","Intermediate","Advanced"],
      },
      {
        question: "Do you regularly do strength training?",
        options: ["Yes","No"],
      },
      {
        question: "How many days a week do you practics strength yoga ?",
        options: ["1-2 days", "3-4 days","5+ days"],
      },
      {
        question: "Which body area do you want to focus on for strength?",
        options: ["full-body","Core","Arms","Legs"],
      },
      {
        question: "Are you confortable with strength poses?",
        options: ["Yes","No"],
      },
      {
        question: " Do you have any limitations while performing strength exercises?",
        options: ["Yes,joint issues ","Yes, muscle issues","Yes, breathing issues","No limitations"],
      },
    ],



    Flexibility: [
      {
        question: "How would you rate your current flexibility?",
        options: [
          "Poor",
          "Average",
          "Good",
          "Excellent",
        ],
      },
      {
        question: "Do you regularly do stretching exercise?",
        options: ["Yes","No"],
      },
      {
        question: "Which area needs improvement in flexibility??",
        options: ["Hamstrings" ,"Shoulders"," Hips"," Entire body"],
      },
      {
        question: "Which body area do you want to focus on for flexibility?",
        options: ["full-body", "Back", "Legs", "Shoulders"],
      },
      {
        question: "Are you comfortable with strectching poses?",
        options: ["Yes","NO"],
      },
      {
        question: " What is your goal for improving flexibility?",
        options: ["Better posture","Increased range of motion","Enhanced performance","Overall wellness"],
      },
    ],

    Relaxation: [
      {
        question: "How often do you feel stressed or anxious?",
        options: ["Daily"," Weekly"," Occasionally"," Rarely"],
      },
      {
        question: "What relaxation techniques have you tried before?",
        options: ["Meditation","Deep breathing","Yoga","None"],
      },
      {
        question: "What time of day do you feel most stressed?",
        options: ["Morning","Afternoon","Evening","Night"],
      },
      {
        question: "What helps you relax the most?",
        options: ["Quite time","Physical activity","Listening to music","Other"],
      },
      {
        question: "How long can you dedicate to relaxation exercises?",
        options: ["Less then 10 mint","10-20 mint","20-30 mint","more the 30 minut"],
      },
      {
        question: "What is your primary goal for relaxation?",
        options: ["Reducing stress","Improving sleep","Enhancing focus","Feeling refreshed"],
      },
    ],



    Mindfulness: [
      {
        question: "How often do you practice mindfulness techniques?",
        options: ["Daily","Weekly","Rarely","Never"],
      },
      {
        question: "What is your primary reason for seeking mindfulness?",
        options: ["Stress reduction","Improved focus","Emotional balance"," General well-being"],
      },
      {
        question: "What challenges you the most in mindfulness practices?",
        options: ["Staying Focused "," Finding Time","Understanding techniques","Others"],
      },
      {
        question: "How do you usually feel after mindfulness exercises?",
        options: ["Relaxed","Energized","Neutral","No noticeable change"],
      },
      {
        question: "What type of mindfulness activity appeals to you most?",
        options: ["Meditation","Breathing exercise","Guided Visualization","Journaling"],
      },
      {
       question: "How long can you stay focused during mindfulness activities?",
       options: ["5-10 mints"," 10-20 mints","20-30 mints","more than 30 mints"],
      },
    
    ],



    JointPain: [
      {
        question: "How often do you experience joint pain?",
        options: ["Daily","Weekly","Rarely","Occasionally"],
      },
      {
        question: "Which joints are most affected?",
        options: ["Knees","Shoulders","Hips","Other"],
      },
      {
        question: "What type of joint pain do you experience?",
        options: ["Sharp pain","Aching","stiffness","Swelling"],
      },
      {
        question: "How do you usually manage your joint pain?",
        options: ["Meditation","Physical therapy","Rest","Other"],
      },
      {
        question: "When is your joint pain most noticeable?",
        options: ["Morning","After activity","Evening","Constantly"],
      },
      {
      question: "Do you have a medical diagnosis related to joint pain?",
      options: ["Arthritis","Tendoitis","Bursitis","None"],
      },
    ],



    NeckPain: [
      {
        question: "How often do you experience neck pain?",
        options: ["Daily","Weekly","Rarely","Occasionally"],
      },
      {
        question: "What type of neck pain do you experience?",
      options: ["Throbbing pain","stiffness","Sharp pain","Radiating pain"],
      },
      {
        question: "When is your neck pain most noticeable?",
      options: ["Morning","Evening","After physical activity","After screen use"],
      },
      {
        question: "What activities worsen your neck pain?",
      options: ["working on a computer ","Sleeping in the wrong posture","Physical exertion","Stress-related tension"],
      },
      {
        question: "How do you currently manage your neck pain?",
      options: ["Over the counter painkiller","Physical therapy","Massage techniques","I dont't manage it"],
      },
      {
        question: "How severe is your neck pain on a scale of 1 to 10?",
      options: ["1-3 (Mild)","4-6 (Moderate)","7-9 (Severe)","10 (Unbearable)"],
      },
    ],
    
  };

  const yogaSuggestions: { [key: string]: string } = {
    BackPain: "Lyengar Yoga",
    Strength: "power Yoga",
    Flexibility: "Bakasan Yoga",
    Mindfulness: "Kundalini Yoga",
    JointPain: "Vinyasa Yoga",
    Relaxation: "Yin Yoga",
    NeckPain: "Hatha Yoga",

  };

  const handleImageClick = (goal: string) => {
    setSelectedGoal(goal);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setIsComplete(false);
  };

  const handleOptionClick = (option: string) => {
    setSelectedAnswers((prevAnswers) => [...prevAnswers, option]);

    if (
      selectedGoal &&
      currentQuestionIndex < questions[selectedGoal].length - 1
    ) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
      setSelectedAnswers((prevAnswers) =>
        prevAnswers.slice(0, prevAnswers.length - 1)
      );
    }
  };

 return (
  <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] px-4 py-8">
    
    {/* Heading */}
    <div className="text-center mb-3">
      <h1 className="text-4xl md:text-5xl  font-bold bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent">
        Select Your Primary Goal
      </h1>
      <p className="text-gray-400 mt-1 text-sm md:text-base">
        Personalized yoga recommendations based on your wellness needs
      </p>
    </div>

    {/* Result Section */}
    {isComplete && selectedGoal ? (
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8">

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">
            Your Wellness Summary
          </h2>

          <div className="px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 text-green-300 text-sm font-semibold">
            Completed
          </div>
        </div>

        {/* Answers */}
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-5">
            Selected Answers
          </h3>

          <div className="space-y-3">
            {selectedAnswers.map((answer, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4"
              >
                <div className="h-9 w-9 rounded-full bg-gradient-to-r from-red-500 to-orange-400 flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>

                <p className="text-gray-200">{answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendation */}
        <div className="mt-8 bg-gradient-to-r from-red-500/20 to-orange-400/20 border border-red-500/20 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-semibold text-white mb-3">
            Recommended Yoga Style
          </h3>

          <p className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent">
            {yogaSuggestions[selectedGoal]}
          </p>

          <p className="text-gray-300 mt-4">
            Based on your responses and wellness goals
          </p>
        </div>
      </div>
    ) : selectedGoal ? (
      
// {/* Question Card */}
<div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">

  {/* Top Progress */}
  <div className="p-4 border-b border-white/10">
    
    <div className="flex justify-between mb-2">
      <span className="text-xs text-gray-300">
        Question {currentQuestionIndex + 1} /{" "}
        {questions[selectedGoal].length}
      </span>

      <span className="text-xs text-orange-300 font-semibold">
        {selectedGoal}
      </span>
    </div>

    <div className="w-full bg-gray-700 rounded-full h-1.5 overflow-hidden">
      <div
        className="bg-gradient-to-r from-red-500 to-orange-400 h-full rounded-full transition-all duration-500"
        style={{
          width: `${
            ((currentQuestionIndex + 1) /
              questions[selectedGoal].length) *
            100
          }%`,
        }}
      />
    </div>
  </div>

  {/* Question */}
  <div className="p-5">
    
    <h2 className="text-xl font-bold text-white text-center leading-snug mb-6">
      {questions[selectedGoal][currentQuestionIndex].question}
    </h2>

    {/* Options */}
    <div className="grid gap-2.5">
      {questions[selectedGoal][currentQuestionIndex].options.map(
        (option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            className="group rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-left transition-all duration-300 hover:bg-gradient-to-r hover:from-red-500 hover:to-orange-400"
          >
            <div className="flex items-center justify-between">
              
              <span className="text-sm font-medium text-gray-200 group-hover:text-white">
                {option}
              </span>

              <div className="h-6 w-6 rounded-full border border-gray-500 flex items-center justify-center text-xs text-gray-400 group-hover:border-white group-hover:text-white">
                →
              </div>

            </div>
          </button>
        )
      )}
    </div>

    {/* Back Button */}
    <div className="mt-6">
      <button
        onClick={handleBack}
        disabled={currentQuestionIndex === 0}
        className="px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-sm text-white hover:bg-white/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        ← Back
      </button>
    </div>

  </div>
</div>
    ) : (

      // /* Goals Section */

<div className="max-w-5xl mx-auto">

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

    {[
      {
        key: "BackPain",
        title: "Back Pain",
        emoji: "🦴",
        desc: "Improve posture & reduce discomfort",
        gradient: "from-red-500 to-orange-400",
      },
      {
        key: "Strength",
        title: "Strength",
        emoji: "💪",
        desc: "Build power & body endurance",
        gradient: "from-blue-500 to-cyan-400",
      },
      {
        key: "Flexibility",
        title: "Flexibility",
        emoji: "🧘",
        desc: "Increase mobility & balance",
        gradient: "from-pink-500 to-rose-400",
      },
      {
        key: "JointPain",
        title: "Joint Pain",
        emoji: "🦵",
        desc: "Gentle recovery & joint support",
        gradient: "from-yellow-500 to-amber-400",
      },
      {
        key: "Mindfulness",
        title: "Mindfulness",
        emoji: "🧠",
        desc: "Enhance focus & inner peace",
        gradient: "from-violet-500 to-fuchsia-400",
      },
      {
        key: "NeckPain",
        title: "Neck Pain",
        emoji: "🙆",
        desc: "Relieve tension & stiffness",
        gradient: "from-emerald-500 to-green-400",
      },
      {
        key: "Relaxation",
        title: "Relaxation",
        emoji: "🌙",
        desc: "Calm your mind & body",
        gradient: "from-indigo-500 to-blue-400",
      },
    ].map((goal, index) => (
      <div
        key={index}
        onClick={() => handleImageClick(goal.key)}
        className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:border-white/20 hover:shadow-2xl text-center flex flex-col items-center justify-center"
      >

        {/* Glow Effect */}
        <div
          className={`absolute inset-0 opacity-10 bg-gradient-to-br ${goal.gradient}`}
        />

        {/* Emoji Icon */}
        <div
          className={`h-20 w-20 rounded-2xl bg-gradient-to-br ${goal.gradient} flex items-center justify-center text-4xl shadow-xl mb-6 group-hover:scale-110 transition-transform duration-300`}
        >
          {goal.emoji}
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center">

          <h2 className="text-2xl font-bold text-white mb-2">
            {goal.title}
          </h2>

          <p className="text-sm text-gray-300 leading-relaxed max-w-[220px]">
            {goal.desc}
          </p>

          {/* Button */}
          <div
            className={`mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r ${goal.gradient} px-4 py-2 text-sm font-semibold text-white shadow-lg`}
          >
            Start Assessment
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </div>
        </div>

        {/* Decorative Blur */}
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/5 blur-2xl" />

      </div>
    ))}
  </div>
</div>
    )}
  </div>
);
}
