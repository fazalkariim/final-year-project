"use client";

import { LoginButton } from "@/components/auth/login-button";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Activity, HeartPulse, Sparkles } from "lucide-react";

const HomePage = () => {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br  from-white via-sky-50 to-orange-50 text-slate-900 px-6">
      {/* Navbar - old style */}
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

      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-24 top-20 h-80 w-80 rounded-full bg-sky-300/50 blur-[120px]"
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        <motion.div
          className="absolute right-0 top-40 h-96 w-96 rounded-full bg-orange-300/40 blur-[130px]"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 7, repeat: Infinity }}
        />

        <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-200/50 blur-[110px]" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10  flex min-h-screen max-w-7xl flex-col items-center justify-between gap-12 px-5 pt-32 md:flex-row">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-200 bg-white/70 px-4 py-2 text-sm font-medium text-red-500 shadow-sm backdrop-blur">
            <Sparkles className="h-4 w-4" />
            Your personal yoga wellness companion
          </div>

          <h1 className="font-outfit text-6xl font-extrabold leading-tight tracking-tight md:text-5xl">
            Transform Your Body With{" "}
            <span className="bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
              Yoga Wellness
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Track your yoga journey, improve flexibility, follow guided poses,
            meditate daily, and build a healthier lifestyle with a clean wellness
            experience.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <LoginButton>
              <Button className="h-12 rounded-full bg-red-500 px-8 text-base font-bold text-white shadow-xl shadow-red-500/25 hover:bg-red-600">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </LoginButton>

            <Link href="/posespage">
              <Button
                variant="outline"
                className="h-12 rounded-full border-slate-300 bg-white/70 px-8 text-base font-semibold backdrop-blur hover:bg-slate-100"
              >
                Explore Poses
              </Button>
            </Link>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
            <div className="rounded-3xl border border-white/70 bg-white/70 p-4 shadow-sm backdrop-blur">
              <h3 className="text-2xl font-bold text-slate-900">50+</h3>
              <p className="text-sm text-slate-500">Yoga Poses</p>
            </div>

            <div className="rounded-3xl border border-white/70 bg-white/70 p-4 shadow-sm backdrop-blur">
              <h3 className="text-2xl font-bold text-slate-900">24/7</h3>
              <p className="text-sm text-slate-500">Wellness</p>
            </div>

            <div className="rounded-3xl border border-white/70 bg-white/70 p-4 shadow-sm backdrop-blur">
              <h3 className="text-2xl font-bold text-slate-900">100%</h3>
              <p className="text-sm text-slate-500">Healthy Flow</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="relative flex w-full max-w-xl justify-center"
          initial={{ opacity: 0, scale: 0.85, x: 80 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-300/50 to-orange-300/40 blur-[80px]" />

          <div className="relative rounded-[3rem] border border-white/70 bg-white/50 p-6 shadow-2xl shadow-sky-200/60 backdrop-blur-xl">
            <Image
              src="/bgg.png"
              alt="Yoga Wellness"
              width={560}
              height={560}
              quality={100}
              priority
              className="object-contain"
            />
          </div>

          <motion.div
            className="absolute -left-2 top-16 hidden rounded-3xl border border-white/70 bg-white/80 p-4 shadow-xl backdrop-blur md:block"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-red-100 p-3 text-red-500">
                <HeartPulse className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold">Mind Balance</p>
                <p className="text-xs text-slate-500">Daily meditation</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-16 -right-2 hidden rounded-3xl  z-100 border border-white/70 bg-white/80 p-4 shadow-xl backdrop-blur md:block"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-sky-100 p-3 text-sky-500">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold">Body Progress</p>
                <p className="text-xs text-slate-500">Track improvement</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <motion.footer
        className="relative z-10 border-t mt-6 border-white/70 bg-white/70 py-4 text-center text-sm text-slate-500 backdrop-blur"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        © 2024 Yoga Wellness Tracker. All rights reserved.
      </motion.footer>
    </main>
  );
};

export default HomePage;