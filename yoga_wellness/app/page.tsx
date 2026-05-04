"use client";

import { LoginButton } from "@/components/auth/login-button";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <div className="h-screen w-full relative">
     
      <div className="absolute inset-0 z-40">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <Image
            src="/bgg.png"
            alt="Background"
            width={600}
            height={600}
            quality={100}
            className="mt-24 ml-16 object-cover"
          />
        </motion.div>
      </div>

     
      <motion.nav
        className="absolute top-0 left-0 w-full border-b-2 bg-white z-40"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 50 }}
      >
        <ul className="flex font-outfit items-center justify-center space-x-4 py-3 w-full relative">
          
          <li className="absolute left-0 ml-4">
            <Image
              src="/logo.png"
              alt="Logo"
              width={120}
              height={50}
              className="object-contain"
            />
          </li>

          
          <li>
            <Button
              variant="ghost"
              size="lg"
              className="hover:bg-red-500 hover:font-bold hover:text-white rounded-2xl"
            >
              Home
            </Button>
          </li>
          <li>
            <Link href="/meditationpage">
              <Button
                variant="ghost"
                className="hover:bg-red-500 hover:font-bold hover:text-white rounded-2xl"
              >
                Meditation
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/servicespage">
              <Button
                variant="ghost"
                className="hover:bg-red-500 hover:font-bold hover:text-white rounded-2xl"
              >
                Services
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/posespage">
              <Button
                variant="ghost"
                className="hover:bg-red-500 hover:font-bold hover:text-white rounded-2xl"
              >
                Poses
              </Button>
            </Link>
          </li>

          
          <li className="ml-auto absolute right-5 text-red-500 border rounded-full hover:rounded-full border-red-500">
            <LoginButton>
              <Button
                variant="ghost"
                size="lg"
                className="font-bold hover:bg-red-500 hover:text-white hover:rounded-full"
              >
                Join us
              </Button>
            </LoginButton>
          </li>
        </ul>
      </motion.nav>

     
      <div className="flex space-x-4 z-0">
        
        <motion.div
          className="bg-sky-400 rounded-tl-none rounded-full h-[400px] w-[300px] z-0 ml-5 blur-[140px]"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        <motion.div
          className="bg-sky-400 ml-32 rounded-full h-[400px] w-[400px] z-0 blur-[140px]"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
        />
        <motion.div
          className="bg-white ml-60 rounded-full h-[300px] w-[300px] z-0 mt-[200px] blur-[30px]"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.div
          className="bg-sky-400 mt-28 rounded-full h-[400px] w-[300px] z-0 blur-[150px]"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.7 }}
        />

     
        <motion.p
          className="pr-[290px] mt-48 text-[45px] font-outfit"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
        >
          <span style={{ color: "#ff5722" }}>YOGA WELLNESS TRACKER</span> TO
          SHAPE YOUR BODY
        </motion.p>
      </div>

     
      <motion.div
        className="absolute bottom-0 w-full text-center text-black py-2 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <p className="text-sm">
          © 2024 Yoga Wellness Tracker
          <br />
          All rights reserved.
        </p>
      </motion.div>
    </div>
  );
};

export default HomePage;
