"use client"

import React from 'react';
import { motion } from 'framer-motion';
import Navbaronly from '../../components/navbaronly/page';


export default function Meditation() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div>
      <div>
        <Navbaronly />
      </div>
      <div className="min-h-screen font-thin bg-gray-100 py-2 px-6 lg:px-24">
        <div className="max-w-5xl mx-auto">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-4xl font-thin text-center text-gray-800 mb-8"
          >
            About Meditation
          </motion.h1>

          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-10"
          >
            <h2 className="text-2xl font-normal text-gray-700 mb-4">Origins</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Meditation has evolved over centuries, originally rooted in various
              spiritual and religious traditions. In the past, the term often
              referred to practices aimed at spiritual growth, such as
              experiencing a divine presence, fostering compassion, or realizing
              one’s true essence as pure consciousness. Different spiritual
              traditions developed their own meditative practices, each with
              unique goals and techniques, many of which are still practiced
              today.
            </p>
          </motion.section>

       
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-10"
          >
            <h2 className="text-2xl font-normal text-gray-700 mb-4">Current Times</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Today, meditation has expanded far beyond its spiritual roots,
              encompassing a wide range of practices for numerous purposes. It is
              no longer confined to spirituality, as people meditate for
              relaxation, health benefits, stress relief, and personal growth.
              Some meditate to enhance mental clarity, while others may do so upon
              their doctor's recommendation to lower blood pressure. Knowing your
              purpose for meditation is key to choosing the right practice for
              you.
            </p>
          </motion.section>

         
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-10"
          >
            <h2 className="text-2xl font-normal text-gray-700 mb-4">
              Meditation vs. Meditative State
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              The term "meditation" is sometimes used interchangeably with
              "meditative state." For instance, someone might say, "I went into
              meditation while watching the sunset." A profound shift in awareness
              can occur naturally, such as seeing a deer in a sunlit meadow, which
              may bring about inner peace. Meditation practices aim to evoke these
              natural, peaceful experiences for the mind.
            </p>
          </motion.section>

       
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-10"
          >
            <h2 className="text-2xl font-normal text-gray-700 mb-4">
              Meditation Involves a Shift in Focus
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              In meditation, we shift our awareness from the usual, outward-focused
              activity of the mind. In our daily activities, the mind is engaged
              in tasks like observing, analyzing, and deciding. Meditation allows
              us to shift gears, let go of this mental focus, and experience a more
              peaceful, silent state.
            </p>
          </motion.section>


          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-10"
          >
            <h2 className="text-2xl font-normal text-gray-700 mb-4">
              Learning to Meditate
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Learning to meditate is a personal journey. Some people learn best
              from a teacher or structured course, while others discover meditation
              on their own. You may need to try several methods before finding the
              one that resonates with you. There's no one "right" way to meditate.
              Explore different techniques until you find what works for you.
            </p>
          </motion.section>

          
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-10"
          >
            <hr className="border-t border-gray-300 my-10" />
            <h1 className="text-4xl font-thin flex items-center justify-center text-center text-gray-800 mb-8">
              Benefits of Meditation
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              There are many reasons why people meditate. For some it is part of a spiritual journey and has to do with expansion of awareness and how they perceive and experience life. Some simply want to relax, and this benefit of meditation is self-evident...
            </p>
         
            <ul className="list-disc pl-8 text-lg text-gray-600 leading-relaxed mb-6">
              <li>Lower blood pressure</li>
              <li>Better sleep</li>
              <li>Less anxiety</li>
              <li>Faster healing</li>
              <li>Decreased use of drugs, alcohol, and cigarettes</li>
              <li>Lower cholesterol</li>
              <li>Stronger immune response</li>
              <li>Reduction of stress hormones</li>
            </ul>
          </motion.section>
        </div>
      </div>
      <div className=" text-center  text-black ">
     <p className="text-sm">Copyright
    © 2024 Yoga Wellness Tracker <br />All rights reserved.
    
  </p>
</div>
    </div>
  );
}
