"use client"

import React, { useState } from "react"

type Pose = {
  title: string
  src: string
  description: string[]
}

const poses: Pose[] = [
  {
    title: "Hatha Yoga",
    src: "/Hatha_Yoga.mp4",
    description: [
      "A slow-paced yoga focusing on posture and breathing.",
      "Promotes physical and mental relaxation.",
      "Improves body alignment and flexibility.",
      "Ideal for stress relief and mindfulness.",
      "Enhances lung capacity with controlled breathing.",
      "Gentle for people of all fitness levels.",
      "Supports better sleep and emotional balance.",
      "Great entry point for yoga beginners."
    ]
  },
  {
    title: "Kundalini Yoga",
    src: "/Kundalini_Yoga.mp4",
    description: [
      "Focuses on spiritual energy at the base of the spine.",
      "Involves dynamic breathing and chanting.",
      "Boosts creativity, energy, and awareness.",
      "Promotes emotional healing and clarity.",
      "Strengthens nervous and immune systems.",
      "Integrates meditation with active movement.",
      "Increases mental resilience and focus.",
      "Awakens inner power and consciousness."
    ]
  },
  {
    title: "Vinyasa Yoga",
    src: "/Vinyasa_Yoga.mp4",
    description: [
      "A dynamic flow linking movement with breath.",
      "Encourages continuous, smooth transitions.",
      "Builds endurance, flexibility, and strength.",
      "Increases heart rate and cardiovascular health.",
      "Fosters creativity through varied sequences.",
      "Helps release stored physical tension.",
      "Improves body awareness and coordination.",
      "Perfect for those who enjoy fast-paced yoga."
    ]
  },
  {
    title: "Chakrasana Yoga",
    src: "/chakrasanaposeee.mp4",
    description: [
      "Also known as the Wheel Pose in yoga.",
      "Opens the chest and strengthens the back.",
      "Stretches shoulders, arms, and thighs.",
      "Stimulates thyroid and pituitary glands.",
      "Improves spinal flexibility and posture.",
      "Builds stamina and energizes the body.",
      "Boosts mood and reduces stress.",
      "Best practiced with proper warm-up."
    ]
  },
  {
    title: "Power Yoga",
    src: "/poweryogaaa.mp4",
    description: [
      "A vigorous style based on Vinyasa yoga.",
      "Increases stamina, strength, and metabolism.",
      "Focuses on fast-paced movements and poses.",
      "Builds core and full-body strength.",
      "Great for weight loss and toning muscles.",
      "Demands physical effort and breath control.",
      "Combines athletic training with yoga.",
      "Ideal for those seeking an intense workout."
    ]
  },
  {
    title: "Yin Yoga",
    src: "/yinyogaaa.mp4",
    description: [
      "A slow, passive style of yoga.",
      "Targets deep connective tissues and joints.",
      "Improves flexibility and joint mobility.",
      "Promotes inner calm and stillness.",
      "Poses are held for 3–5 minutes each.",
      "Encourages acceptance and self-awareness.",
      "Balances high-energy (yang) practices.",
      "Perfect for relaxation and recovery."
    ]
  },
  {
    title: "Bakasan Pose",
    src: "/bakasanposeee.mp4",
    description: [
      "Also known as the Crow Pose.",
      "An arm balance that boosts confidence.",
      "Strengthens wrists, arms, and core.",
      "Enhances focus and body control.",
      "Improves coordination and stability.",
      "Builds upper body strength.",
      "Teaches patience and persistence.",
      "Ideal for intermediate-level yogis."
    ]
  },
  {
    title: "Lyengar Yoga",
    src: "/lyengaryogaaaa.mp4",
    description: [
      "Focuses on alignment and precision in poses.",
      "Uses props like blocks, belts, and chairs.",
      "Ideal for injury recovery and beginners.",
      "Improves posture and muscular balance.",
      "Increases stamina through static holds.",
      "Teaches deep body awareness.",
      "Combines strength, flexibility, and discipline.",
      "Reduces physical and mental tension."
    ]
  },
  {
    title: "Child Pose",
    src: "/childposeee.mp4",
    description: [
      "A gentle resting pose in yoga.",
      "Relieves back and neck tension.",
      "Calms the mind and body.",
      "Encourages deep, slow breathing.",
      "Stretches hips, thighs, and ankles.",
      "Used to recover between active poses.",
      "Promotes emotional grounding.",
      "Safe for all yoga practitioners."
    ]
  }
]

export default function PosePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [expanded, setExpanded] = useState<number[]>([])

  const toggleDescription = (index: number) => {
    setExpanded((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    )
  }

  const filteredPoses = poses.filter((pose) =>
    pose.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] px-6 py-8">
      
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Yoga Pose Library
        </h1>

        <p className="text-gray-300 mt-2 text-sm md:text-base">
          Explore different yoga styles, improve flexibility & mindfulness
        </p>
      </div>

      {/* Search */}
      <div className="max-w-2xl mx-auto mb-10">
        <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-3 shadow-xl">
          <input
            type="text"
            placeholder="Search yoga poses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent text-white placeholder:text-gray-400 outline-none px-3 py-2"
          />
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
        {filteredPoses.map((pose, index) => {
          const isExpanded = expanded.includes(index)

          return (
            <div
              key={index}
              className="group bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl hover:scale-[1.02] transition-all duration-300"
            >
              
              {/* Video */}
              <div className="relative overflow-hidden">
                <video
                  controls
                  className="w-full h-[220px] object-cover"
                >
                  <source src={pose.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                <div className="absolute top-4 left-4 bg-red-500/90 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                  Yoga Session
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {pose.title}
                </h2>

                <ul className="space-y-2 text-sm text-gray-300 leading-relaxed">
                  {(isExpanded
                    ? pose.description
                    : pose.description.slice(0, 3)
                  ).map((line, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2"
                    >
                      <span className="text-red-400 mt-1">•</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <button
                  onClick={() => toggleDescription(index)}
                  className="mt-5 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white text-sm font-semibold px-5 py-2 rounded-xl transition-all duration-300 shadow-lg"
                >
                  {isExpanded ? "Show Less" : "Show More"}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}