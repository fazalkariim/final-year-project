"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbaronly from '@/components/navbaronly/page';
import { motion } from 'framer-motion';

const Services = () => {
  return (
    <div className='cursor-pointer'>
      <Navbaronly />

      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.8 }} 
        className="bg-gray-100 min-h-screen py-10"
      >
        <motion.header 
          initial={{ y: -50, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.2, duration: 0.8 }} 
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-thin text-center text-gray-800 mb-8">
            Our Services
          </h1>
          <p className="text-lg text-gray-600">
            Explore the features that enhance your yoga experience.
          </p>
        </motion.header>

        <div className="flex flex-wrap justify-center">
       
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            className="bg-white shadow-md rounded-lg m-4 p-6 w-80 text-center"
          >
            <Image src="/pose.png" alt="Real-time Detection" width={200} height={100} className="mx-auto mb-4 rounded-full" />
            <h2 className="text-xl font-semibold mb-2">Pose Detection and Monitoring</h2>
            <p className="text-gray-600">
              Monitor your yoga poses in real-time to improve your practice.
            </p>
          </motion.div>

         
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            className="bg-white shadow-md rounded-lg m-4 p-6 w-80 text-center"
          >
            <Image src="/games.jpg" alt="Mindful Game" width={100} height={100} className="mx-auto mb-4 rounded-full" />
            <h2 className="text-xl font-semibold mb-2">Mental Health and Wellness Games</h2>
            <p className="text-gray-600">
              Engage in games designed to support mental health and well-being.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            className="bg-white shadow-md rounded-lg m-4 p-6 w-80 text-center"
          >
            <Image src="/future.png" alt="Personalized Plans" width={100} height={100} className="mx-auto mb-4 rounded-full" />
            <h2 className="text-xl font-semibold mb-2">Personalized Plans</h2>
            <p className="text-gray-600">
              Receive tailored yoga plans that fit your individual needs and goals.
            </p>
          </motion.div>

          
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            className="bg-white shadow-md rounded-lg m-4 p-6 w-80 text-center"
          >
            <Image src="/dposes.jpg" alt="Yoga Pose Library" width={150} height={100} className="mx-auto mb-4 rounded-full" />
            <h2 className="text-xl font-semibold mb-2">Yoga Pose Library</h2>
            <p className="text-gray-600">
              Access a comprehensive library of yoga poses with detailed instructions.
            </p>
          </motion.div>

         
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            className="bg-white shadow-md rounded-lg m-4 p-6 w-80 text-center"
          >
            <Image src="/111.jpg" alt="Breathing Exercises" width={150} height={100} className="mx-auto mb-4 rounded-full" />
            <h2 className="text-xl font-semibold mb-2">Breathing Exercises and Meditation</h2>
            <p className="text-gray-600">
              Practice guided breathing exercises and meditation for relaxation.
            </p>
          </motion.div>

        
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            className="bg-white shadow-md rounded-lg m-4 p-6 w-80 text-center"
          >
            <Image src="/chalange.jpg" alt="Goal-Based Challenges" width={100} height={100} className="mx-auto mb-4 rounded-md" />
            <h2 className="text-xl font-semibold mb-2">Goal-Based Yoga Challenges</h2>
            <p className="text-gray-600">
              Participate in challenges that motivate you to achieve your yoga goals.
            </p>
          </motion.div>

         
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            className="bg-white shadow-md rounded-lg m-4 p-6 w-80 text-center"
          >
            <Image src="/group.jpg" alt="Virtual Group Sessions" width={100} height={100} className="mx-auto mb-4 h-[66px] rounded-md" />
            <h2 className="text-xl font-semibold mb-2">Community and Virtual Group Sessions</h2>
            <p className="text-gray-600">
              Join a supportive community and participate in group yoga sessions online.
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ y: 50, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.4, duration: 0.8 }} 
          className="text-center mt-10"
        >
          
        </motion.div>

        <div className=" text-center pt-20 text-black ">
     <p className="text-sm">Copyright
    © 2024 Yoga Wellness Tracker <br />All rights reserved.
  </p>
</div>
      </motion.div>
    </div>
  );
};

export default Services;
