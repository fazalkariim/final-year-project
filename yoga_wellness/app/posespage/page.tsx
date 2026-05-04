"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbaronly from '@/components/navbaronly/page';

import Image from 'next/image';
 

interface YogaPose {
  id: number;
  name: string;
  description: string;
  image: string;
}

const yogaPoses: YogaPose[] =

[
  { 
    id: 1, 
    name: 'Downward Dog', 
    description: 'A rejuvenating stretch that improves flexibility and strengthens the arms and legs. This pose encourages blood flow to the brain and helps alleviate stress. As you press your heels into the ground, you’ll notice a release in the hamstrings and calves, promoting overall leg strength. This pose is also excellent for building endurance and preparing the body for more complex asanas.', 
    image: '/Downward-Dog.jpg' 
  },
  { 
    id: 2, 
    name: "Child's Pose", 
    description: 'A relaxing stretch for the lower back, hips, and thighs. Ideal for calming the mind and body, Child\'s Pose encourages deep breathing and mindfulness. It’s a great pose to practice between more challenging asanas, allowing for recovery and grounding. This gentle stretch can help alleviate tension in the back and neck, promoting relaxation and serenity.', 
    image: '/Child-Pose,.jpg' 
  },
  { 
    id: 3, 
    name: 'Bound Angle', 
    description: 'A foundational pose that enhances posture, balance, and focus. This seated stretch opens the hips and groin, making it beneficial for increasing flexibility. It encourages a lengthening of the spine and promotes a sense of grounding. Regular practice can help alleviate discomfort in the hips and lower back, fostering a deeper connection to the body.', 
    image: '/Bound-Angle-Pose.jpg' 
  },
  { 
    id: 4, 
    name: 'Bridge Pose', 
    description: 'An empowering pose that opens the chest and strengthens the legs and hips. This backbend enhances spinal flexibility and can help alleviate tension in the back and shoulders. It also stimulates the abdominal organs, improving digestion. Bridge Pose encourages emotional release, making it a great choice for those looking to connect with their inner strength.', 
    image: '/Bridge-Pose.jpg' 
  },
  { 
    id: 5, 
    name: 'Cat Cow', 
    description: 'A strong, grounding pose that builds focus and leg strength while stretching the arms. This dynamic movement promotes spinal flexibility and enhances body awareness. It can be a great way to relieve back pain and improve posture. Flowing between Cat and Cow allows for a mindful connection with breath, making it a perfect warm-up for any yoga practice.', 
    image: '/cat-cow.jpg' 
  },
  { 
    id: 6, 
    name: 'Cobra Pose', 
    description: 'A backbend that stretches the chest, shoulders, and abdominal muscles. Cobra Pose enhances spinal strength and flexibility while stimulating the digestive organs. This pose opens the heart, encouraging emotional release and boosting confidence. Practicing Cobra regularly can also help counteract the effects of prolonged sitting.', 
    image: '/Cobra-Pose.jpg' 
  },
  { 
    id: 7, 
    name: 'Bridge Pose', 
    description: 'A gentle backbend that opens the chest and strengthens the spine and legs. It encourages blood flow throughout the body, providing rejuvenation and energy. This pose can help alleviate anxiety and stress while fostering a sense of calm. As you engage your core and glutes, you’ll build stability and strength in the lower body.', 
    image: '/Bound-Angle-Pose.jpg' 
  },
  { 
    id: 8, 
    name: 'Pigeon Pose', 
    description: 'A deep stretch for the legs and torso, enhancing balance and flexibility. This pose opens the hips and alleviates tension in the glutes, making it beneficial for runners and those with tight hips. Pigeon Pose encourages mindfulness and can help release emotional blockages. It’s an excellent way to improve lower body flexibility and stability.', 
    image: '/Pigeon-Pose.jpg' 
  },
  { 
    id: 9, 
    name: 'Seated Forward Bend', 
    description: 'A calming stretch that lengthens the spine and hamstrings, promoting relaxation. This pose encourages introspection and can help relieve stress and anxiety. As you fold forward, you’ll find a deeper connection to your breath, enhancing your overall sense of well-being. It can also help improve posture by lengthening the spine.', 
    image: '/Forward-Bend.jpg' 
  },
  { 
    id: 10, 
    name: 'Toe Stretch', 
    description: 'A powerful standing pose that strengthens the legs and stimulates the abdominal organs. This pose promotes balance and stability while encouraging awareness of the feet and lower body. It can also enhance flexibility in the ankles and improve circulation. Incorporating Toe Stretch into your practice can help you feel more grounded and connected to the earth.', 
    image: '/Toe-Stretch-Pose.webp' 
  },
  { 
    id: 11, 
    name: 'Reverse Tabletop', 
    description: 'A dynamic movement that stretches the spine, improving flexibility and relieving tension. This pose engages the core while opening the chest and shoulders. It can help counteract the effects of sitting, providing relief to the back and enhancing overall posture. Practicing Reverse Tabletop regularly can strengthen the arms and legs, promoting balance and stability.', 
    image: '/Reverse-Tabletop.webp' 
  },
  { 
    id: 12, 
    name: 'Tree Pose', 
    description: 'A core-focused pose that strengthens the abdominal muscles and improves balance. This pose cultivates concentration and encourages a deep connection to the ground. By grounding through one leg, you’ll enhance stability and build confidence. Regular practice can also improve posture and promote mental clarity.', 
    image: '/Tree-Pose.jpg' 
  },
 
  { 
    id: 13, 
    name: 'Mountain Pose', 
    description: 'Mountain Pose is a foundational standing posture in yoga that promotes grounding and stability. Begin by standing tall with your feet together, pressing firmly into the ground. Engage your leg muscles while keeping your toes relaxed. Lengthen your spine, drawing your shoulders back and down, away from your ears. Let your arms hang naturally at your sides, palms facing forward. Take a deep breath in, lifting your chest and extending through the crown of your head. As you exhale, relax your face and soften your gaze. Focus on your breath, feeling the rise and fall of your chest. This pose encourages body awareness and improves posture. Hold for several breaths, embracing the stillness and strength of your body.', 
    image: '/mountain.webp' 
  },
  { 
    id: 14, 
    name: 'Corpse Pose', 
    description: 'Corpse Pose is a deeply restorative posture typically practiced at the end of a yoga session. To begin, lie flat on your back with your legs extended and feet hip-width apart, allowing them to relax outward. Place your arms alongside your body, palms facing up, and ensure your shoulders are relaxed and away from your ears. Close your eyes and take slow, deep breaths, inviting relaxation into your entire body. Focus on releasing tension from each part of your body, starting from your toes and moving up to the crown of your head. This pose promotes a sense of calm and helps integrate the benefits of your practice. Stay in this position for several minutes, allowing your mind to quiet and your body to rejuvenate. Corpse Pose is an essential practice for achieving mindfulness and restoring energy.', 
    image: '/Corpse Pose.jpg' 
  },
  { 
    id: 15, 
    name: 'Eagle Pose', 
    description: 'Eagle Pose is a standing balance posture that enhances focus, flexibility, and strength. Begin by standing tall with your feet hip-width apart, then shift your weight to one leg. Bend your opposite knee and wrap that leg around the standing leg, trying to hook your foot behind the calf. Simultaneously, extend your arms forward and cross one arm over the other at the elbows, bending at the elbows to bring your palms together. Keep your gaze steady on a point in front of you to maintain balance. Engage your core and hold the pose, feeling a stretch in your shoulders and legs. After a few breaths, unwind and switch sides. Eagle Pose promotes concentration, improves coordination, and stretches the major muscle groups.', 
    image: '/Eagle.jpg' 
  },
  { 
    id: 16, 
    name: 'Shoulder Bridge Pose', 
    description: 'Shoulder Bridge Pose is a gentle backbend that strengthens the back and opens the chest. To begin, lie on your back with your knees bent and feet flat on the floor, hip-width apart. Press your feet into the ground as you lift your hips towards the ceiling, rolling your shoulders underneath you for support. Keep your arms at your sides or interlace your fingers beneath your back for added stability. Engage your glutes and core to maintain balance, allowing your chest to lift while keeping your neck relaxed. Breathe deeply, feeling the stretch across your front body and the strengthening in your back. Hold for several breaths before gently lowering your hips back to the ground. This pose can help relieve tension in the lower back and improve posture.', 
    image: '/Shoulder-Bridge.jpg' 
  },
  { 
    id: 17, 
    name: 'Pigeon Pose', 
    description: 'Pigeon Pose is a deep hip opener that stretches the hip flexors and glutes. Start in a tabletop position, then bring your right knee forward, placing it behind your right wrist while extending your left leg straight back. Keep your hips square to the mat, and flex your right foot to protect the knee. As you inhale, lengthen your spine, and as you exhale, gently fold forward over your right leg, resting your forehead on the mat or a block. This pose allows for a deep release of tension in the hips and lower back. Breathe deeply and hold for several breaths, feeling the stretch deepen with each exhale. Afterward, switch sides to balance the body. Pigeon Pose can enhance flexibility and relieve stress.', 
    image: '/Pigeon-Pose.jpg' 
  },
  { 
    id: 18, 
    name: 'Half Lord of the Fishes Pose', 
    description: 'Half Lord of the Fishes Pose is a seated twist that promotes spinal mobility and digestion. Begin seated with your legs extended in front of you, then bend your right knee and place your foot outside your left thigh. Keep your left leg extended or bend it for more comfort. Inhale, lengthen your spine, and as you exhale, twist to the right, placing your left elbow on the outside of your right knee for support. Keep your shoulders relaxed and gaze over your shoulder to deepen the twist. Hold the pose for several breaths, feeling the stretch along your spine and in your hips. Afterward, release and switch sides. This pose helps improve posture, relieve tension in the back, and stimulate the digestive organs.', 
    image: '/Half-Lord-Pose.jpg' 
  },
  { 
    id: 19, 
    name: 'Chair Pose', 
    description: 'A balancing pose that improves posture and concentration by grounding through one leg. This powerful pose strengthens the legs and core while enhancing stamina. Chair Pose also promotes flexibility in the back and hips, making it beneficial for overall body awareness. Practicing this pose can help cultivate resilience and focus, both on and off the mat.', 
    image: '/Chair-Pose.jpg' 
  },
  { 
    id: 20, 
    name: 'Supported Fish', 
    description: 'A core-strengthening pose that builds endurance and stability. This restorative pose opens the chest and heart, promoting emotional release and relaxation. Supported Fish encourages deep breathing, which can enhance lung capacity and overall respiratory health. Incorporating this pose into your practice can help alleviate tension in the neck and shoulders, providing a sense of calm.', 
    image: '/Supported-Fish-Pose.jpg' 
  },
];

const Poses: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedPose, setSelectedPose] = useState<YogaPose | null>(null);

 
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

 
  const handlePoseClick = (pose: YogaPose) => {
    setSelectedPose(pose);
  };


  const handleCloseDetails = () => {
    setSelectedPose(null);
  };

 
  const filteredPoses = yogaPoses.filter(pose =>
    pose.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div  >
      <Navbaronly />

      <div  className="min-h-screen mt-2 bg-white">
        <header className="text-center mb-8">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-4xl font-thin text-center   text-gray-800 mb-4"
          >
            Yoga Poses
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-lg text-gray-600"
          >
            Explore different yoga poses and improve your practice.
          </motion.p>
        </header>

   
        <div className="text-center mb-6">
          <motion.input
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            type="text"
            placeholder="Search for a yoga pose..."
            className="w-80 px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

    
        <motion.div
          className="flex flex-wrap justify-center"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          {filteredPoses.length > 0 ? (
            filteredPoses.map(pose => (
              <motion.div
                key={pose.id}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="bg-white shadow-lg rounded-lg m-4 p-6 w-80 text-center cursor-pointer"
                onClick={() => handlePoseClick(pose)}
              >
                <Image 
                  src={pose.image} 
                  alt={pose.name} 
                  width={300} 
                  height={200} 
                  className={`object-cover rounded-md mb-4  transition-all duration-300 ${selectedPose?.id === pose.id ? 'transform scale-105 border-4 border-blue-500' : ''}`} 
                />
                <h2 className="text-xl font-semibold mb-2 text-gray-800">{pose.name}</h2>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-600">No poses found.</p>
          )}
        </motion.div>

        {selectedPose && (
          <div className="fixed inset-0 bg-black bg-opacity-50 mt-16 flex  items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md max-h-[90%] overflow-y-auto">
              <Image 
                src={selectedPose.image} 
                alt={selectedPose.name} 
                width={500} 
                height={400} 
                className="object-cover mb-1 mt-8 rounded-lg"
              />
              <h2 className="text-2xl font-semibold mb-4">{selectedPose.name}</h2>
              <p className="text-gray-700 mb-4">{selectedPose.description}</p>
              <button
                onClick={handleCloseDetails}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg "
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      <div className=" text-center  text-black ">
     <p className="text-sm">Copyright
    © 2024 Yoga Wellness Tracker <br />All rights reserved.
    
  </p>
</div>
    </div>
  );
};

export default Poses;
