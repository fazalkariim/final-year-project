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
    <div className="relative">
      <div className="mt-4 flex items-center justify-center font-bold text-stone-700 text-2xl">
        What is your Primary Goal!
      </div>

      {isComplete && selectedGoal ? (
        <div className="mt-4 text-center bg-gradient-to-r from-white via-white to-red-200 p-6 rounded shadow-lg mx-auto w-2/4">
          
          
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-700 mb-6">
              Your Selected Answers:
            </h3>
            <ul className="list-disc list-inside text-gray-600">
              {selectedAnswers.map((answer, index) => (
                <li key={index} className="mb-2">
                  <strong>{index + 1}: </strong> {answer}
                </li>
              ))}
            </ul>
          </div>


          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-green-800 mb-4">
              Suggested Yoga for you!
            </h3>
            <p className="text-blue-600 font-bold text-2xl">
              {yogaSuggestions[selectedGoal]}
            </p>
          </div>
          
        </div>
      ) : selectedGoal ? (
        <div className="mt-3  text-center bg-gradient-to-r from-red-100 via-white to-white p-6 rounded shadow-lg mx-auto w-[600px]">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {questions[selectedGoal][currentQuestionIndex].question}
          </h2>
          <div className="flex flex-col items-center space-y-4">
            {questions[selectedGoal][currentQuestionIndex].options.map(
              (option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className=" bg-white text-gray-800 rounded shadow-md w-2/4 p-1 hover:bg-red-400 hover:text-white hover:font-semibold hover:shadow-lg"
                >
                  {option}
                </button>
              )
            )}
          </div>
          <div className="space-x-4 mt-6">
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
              disabled={currentQuestionIndex === 0}
            >
              Back
            </button>
          </div>
        </div>
      ) : (
        <div className="ml-[90px] mt-3">
          {/* Images with text links */}
          <div className="relative group">
            <Image
              src="/backpain.jpg"
              alt="Back Pain Relief"
              width={200}
              height={200}
              onClick={() => handleImageClick("BackPain")}
              className="cursor-pointer h-[130px] rounded-full w-[130px] absolute ml-[350px] mt-[190px] transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:border-4 group-hover:border-red-500"
            />
            <div className="absolute ml-[370px] mt-[320px] text-center text-red-400 font-semibold text-xl ">
              Back Pain
            </div>
          </div>
          <div className="relative group">
            <Image
              src="/strength.jpg"
              alt="Strength Building"
              width={200}
              height={200}
              onClick={() => handleImageClick("Strength")}
              className="cursor-pointer h-[130px] rounded-full w-[130px] absolute ml-[50px] mt-[190px] transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:border-4 group-hover:border-red-500"
            />
            <div className="absolute ml-[80px] mt-[320px] text-center text-red-400 font-semibold text-xl ">
              Strength
            </div>
          </div>

          <div className="relative group">
            <Image
              src="/flexibility.png"
              alt="Flexibility Improvement"
              width={200}
              height={200}
              onClick={() => handleImageClick("Flexibility")}
              className="cursor-pointer h-[130px] rounded-full w-[130px] absolute ml-[200px] mt-[30px] transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:border-4 group-hover:border-blue-500"
            />
            <div className="absolute ml-[230px] mt-[160px] text-center text-red-400 font-semibold text-xl ">
              Flexibility
            </div>
          </div>


          <div className="relative group">
          <Image
            src="/jointspain.jpg"
            alt="Joint Pain Relief"
            width={200}
            height={200}
            onClick={() => handleImageClick("JointPain")}
            className="h-[130px] rounded-full w-[130px] absolute ml-[650px] mt-[190px] cursor-pointer transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:border-4 group-hover:border-red-500"
          />
          <div className="absolute ml-[670px] mt-[320px] text-center text-red-400 font-semibold text-xl">
            Joint Pain
          </div>
        </div>


        <div className="relative group">
          <Image
            src="/mindfullness.jpg"
            alt="Mindfulness Training"
            width={200}
            height={200}
            onClick={() => handleImageClick("Mindfulness")}
            className="h-[130px] rounded-full w-[130px] absolute ml-[500px] mt-[30px] cursor-pointer transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:border-4 group-hover:border-blue-500"
          />
          <div className="absolute ml-[520px] mt-[160px] text-center text-red-400 font-semibold text-xl">
           Mindfulness
          </div>
        </div>

        <div className="relative group">
          <Image
            src="/neck pain.webp"
            alt="Neck Pain Relief"
            width={200}
            height={200}
            onClick={() => handleImageClick("NeckPain")}
            className="h-[130px] rounded-full w-[130px] absolute ml-[950px] mt-[190px] cursor-pointer transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:border-4 group-hover:border-red-500"
          />
          <div className="absolute ml-[970px] mt-[320px] text-center text-red-400 font-semibold text-xl">
            Neck Pain
          </div>
        </div>

        <div className="relative group">
          <Image
            src="/relaxation.jpg"
            alt="Relaxation Techniques"
            width={200}
            height={200}
            onClick={() => handleImageClick("Relaxation")}
            className="h-[130px] rounded-full w-[130px] absolute ml-[800px] mt-[30px] cursor-pointer transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:border-4 group-hover:border-blue-500"
          /> 
          <div className="absolute ml-[830px] mt-[160px] text-center text-red-400 font-semibold text-xl">
            Relaxation
          </div>
        </div>
        
      
        </div>
      )}
    </div>
  );
}
