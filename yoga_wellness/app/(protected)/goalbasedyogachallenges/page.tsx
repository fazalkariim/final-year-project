'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { format, addDays } from 'date-fns'

interface Challenge {
  days: number
  title: string
  imagesToShow: number
}

const CHALLENGES: Challenge[] = [
  { days: 7, title: '7 Days Challenge', imagesToShow: 3 },
  { days: 15, title: '15 Days Challenge', imagesToShow: 5 },
  { days: 30, title: '30 Days Challenge', imagesToShow: 7 }
  
]

// Example mock leaderboard data for all challenges
const mockLeaderboard = [
  // 7-day challenge users
  { username: 'fazalkarim', completed: 3, total: 7, challengeDays: 7 },
  { username: 'Null', completed: 0, total: 7, challengeDays: 7 },
  { username: 'Null', completed: 0, total: 7, challengeDays: 7 },
  { username: 'Null', completed: 0, total: 7, challengeDays: 7 },
  { username: 'Null', completed: 0, total: 7, challengeDays: 7 },
  { username: 'Null', completed: 0, total: 7, challengeDays: 7 },

  // 15-day challenge users
  { username: 'fazalkarim', completed: 3, total: 15, challengeDays: 15 },
  { username: 'Null', completed: 0, total: 15, challengeDays: 15 },
  { username: 'Null', completed: 0, total: 15, challengeDays: 15 },
  { username: 'Null', completed: 0, total: 15, challengeDays: 15 },
  { username: 'Null', completed: 0, total: 15, challengeDays: 15 },
  { username: 'Null', completed: 0, total: 15, challengeDays: 15 },
 
  // 30-day challenge users
  { username: 'fazalkarim', completed: 3, total: 30, challengeDays: 30 },
   
]

export default function Goalbasedyogachallenges() {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null)
  const [completedIndexes, setCompletedIndexes] = useState<number[]>([])
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [showLeaderboard, setShowLeaderboard] = useState(false)

  const handleJoinChallenge = (challenge: Challenge) => {
    setSelectedChallenge(challenge)
    setCompletedIndexes([])
    setStartDate(new Date())
    setShowLeaderboard(false)
  }

  const markAsDone = (index: number) => {
    if (!completedIndexes.includes(index)) {
      setCompletedIndexes(prev => [...prev, index])
    }
  }

  const getCurrentDay = (): number => {
    if (!startDate) return 0
    const diff = Math.floor((new Date().getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    return Math.min(diff + 1, selectedChallenge?.days ?? 0)
  }

  const getEndDate = (): string => {
    if (!startDate || !selectedChallenge) return ''
    return format(addDays(startDate, selectedChallenge.days - 1), 'PPP')
  }


// Define image sets
const poseImagesMap: { [key: string]: string[] } = {
  "7-day": [
    '/mountainposee.jpg',
    '/cat-cow.jpg',
    '/Downward-Dog.jpg',
  ],
  "15-day": [
    '/warrior2posee.jpg',
    '/triangleposee.jpg',
    '/Chair-Pose.jpg',
    '/Bridge-Pose.jpg',
    '/seatedforwardbendd.jpg',
  ],
  "30-day": [
    '/crowposee.jpg',
    '/camelposee.jpg',
    '/wheelposee.jpg',
    '/dancerposee.jpg',
    '/pigeonposee.jpg',
    '/boatposee.jpg',
    '/lotusposee.jpg',
  ],
}
const [zoomedIndex, setZoomedIndex] = useState<number | null>(null)

const toggleZoom = (index: number) => {
  setZoomedIndex(prev => (prev === index ? null : index))
}

const renderPoses = () => {
  if (!selectedChallenge) return null

  const posesToShow = poseImagesMap[`${selectedChallenge.days}-day`] || []

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {posesToShow.map((poseImage, index) => {
        const isDone = completedIndexes.includes(index)
        const isZoomed = zoomedIndex === index

        return (
          <div
  key={index}
  className={`relative p-4 border rounded-lg shadow text-center bg-gray-100 transition-all duration-300 ${
    isZoomed ? 'z-10 scale-110' : ''
  }`}
  onClick={() => toggleZoom(index)}
>
  <p className="font-semibold mb-2">Pose {index + 1}</p>

  <div className={`overflow-hidden rounded-lg transition-all duration-300 ${isZoomed ? 'h-[300px]' : 'h-[200px]'}`}>
    <Image
      src={poseImage}
      alt={`Pose ${index + 1}`}
      width={300}
      height={200}
      className={`rounded w-full h-full object-contain cursor-pointer transition-transform duration-300 ${
        isZoomed ? 'scale-105' : 'scale-100'
      }`}
    />
  </div>

  {!isDone ? (
    <button
      onClick={(e) => {
        e.stopPropagation()
        markAsDone(index)
      }}
      className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
    >
      Mark as Done
    </button>
  ) : (
    <p className="mt-2 text-green-600 font-bold">✅ Completed</p>
  )}
</div>

        )
      })}
    </div>
  )
}




  const renderProgress = () => {
    if (!selectedChallenge || !startDate) return null
    const currentDay = getCurrentDay()
    const percent = Math.round((completedIndexes.length / selectedChallenge.imagesToShow) * 100)

    return (
      <div className="my-6 bg-gray-100 p-4 rounded-lg ">
        <p><strong>Start Date:</strong> {format(startDate, 'PPP')}</p>
        <p><strong>End Date:</strong> {getEndDate()}</p>
        <p><strong>Today is Day:</strong> {currentDay}</p>
        <div className="w-full bg-gray-300 h-4 rounded mt-2">
          <div className="bg-blue-500 h-4 rounded" style={{ width: `${percent}%` }} />
        </div>
        <p className="text-sm text-right mt-1">{percent}% Completed</p>
      </div>
    )
  }

 const renderLeaderboard = () => {
  if (!showLeaderboard || !selectedChallenge) return null

  // Filter users for the selected challenge days
  const filteredLeaderboard = mockLeaderboard.filter(
    user => user.challengeDays === selectedChallenge.days
  )

  return (
    <div className="mt-16 p-6 rounded-lg shadow-lg bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 text-white">
      <h3 className="text-2xl font-bold mb-6 text-center drop-shadow-lg">{selectedChallenge.title} Leaderboard</h3>
      <table className="w-full text-left border border-white/50 rounded overflow-hidden">
        <thead>
          <tr className="bg-white/20">
            <th className="p-3 border border-white/30">Username</th>
            <th className="p-3 border border-white/30">Days Completed</th>
            <th className="p-3 border border-white/30">Total Days</th>
            <th className="p-3 border border-white/30">Progress (%)</th>
          </tr>
        </thead>
        <tbody>
          {filteredLeaderboard.length > 0 ? (
            filteredLeaderboard.map((user, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white/10' : 'bg-white/05'}>
                <td className="p-3 border border-white/30">{user.username}</td>
                <td className="p-3 border border-white/30">{user.completed}</td>
                <td className="p-3 border border-white/30">{user.total}</td>
                <td className="p-3 border border-white/30">
                  {Math.round((user.completed / user.total) * 100)}%
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="p-6 text-center text-white/80">
                No data available for this challenge yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}


  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6"> Yoga Challenges</h1>

      {!selectedChallenge ? (
        <div className="flex flex-col items-center gap-4">



          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  <div
    onClick={() => handleJoinChallenge(CHALLENGES[0])}
    className="cursor-pointer transition-transform hover:scale-105"
  >
    <Image
      src="/7dchalllenge.jpg"
      alt="7 Day Challenge"
      width={200}
      height={100}
      className="rounded-lg shadow"
    />
    <p className="text-center font-bold mt-2 bg-gradient-to-r from-white via-white to-white text-gray-800 px-3 py-1  rounded-md shadow-sm">Posture Reset</p>
  </div>
  <div
    onClick={() => handleJoinChallenge(CHALLENGES[1])}
    className="cursor-pointer transition-transform hover:scale-105"
  >
    <Image
      src="/15dchalllenge.jpg"
      alt="15 Day Challenge"
      width={200}
      height={100}
      className="rounded-lg shadow"
    />
      <p className="text-center font-bold mt-2 bg-gradient-to-r from-white via-white to-white text-gray-800 px-3 py-1  rounded-md shadow-sm">Strength & Flexibility</p>
  </div>
  <div
    onClick={() => handleJoinChallenge(CHALLENGES[2])}
    className="cursor-pointer transition-transform hover:scale-105"
  >
    <Image
      src="/30dchalllenge.jpg"
      alt="30 Day Challenge"
      width={200}
      height={100}
      className="rounded-lg shadow"
      
    />
      <p className="text-center font-bold mt-2 bg-gradient-to-r from-white via-white to-white text-gray-800 px-3 py-1  rounded-md shadow-sm">
  Mind-Body Mastery
</p>
  </div>
</div>



        </div>
      ) : (
        <>
          {renderProgress()}
          {renderPoses()}

          <div className="mt-8 flex justify-between">
            <button
              onClick={() => {
                setSelectedChallenge(null)
                setCompletedIndexes([])
                setStartDate(null)
                setShowLeaderboard(false)
              }}
              className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              🔙 Back
            </button>

            <button
              onClick={() => setShowLeaderboard(prev => !prev)}
              className="px-6 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
            >
              📊 {showLeaderboard ? 'Hide' : 'View'} Leaderboard
            </button>
          </div>

          {renderLeaderboard()}
        </>
      )}
    </div>
  )
}
