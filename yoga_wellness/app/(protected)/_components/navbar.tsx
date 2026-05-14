"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@/components/auth/user-button";

import {
  Activity,
  Brain,
  Dumbbell,
  Gamepad2,
  Settings,
  Sparkles,
} from "lucide-react";

export const Navbar = () => {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/Posedetection",
      label: "Advanced Features",
      icon: Sparkles,
    },
    {
      href: "/Routinecreation",
      label: "Routine Creation",
      icon: Dumbbell,
    },
    {
      href: "/poses",
      label: "Yoga Poses",
      icon: Activity,
    },
    {
      href: "/game",
      label: "Group Session",
      icon: Gamepad2,
    },
    {
      href: "/groupsession",
      label: "Meditation Exercise",
      icon: Brain,
    },
    {
      href: "/settings",
      label: "Select Your Goal",
      icon: Settings,
    },
  ];

  return (
    <div className="sticky top-0 z-50 w-full">
      <nav className="flex w-full items-center justify-between border-b border-white/10 bg-slate-900/80 px-4 py-3 shadow-xl backdrop-blur-xl">
        
        {/* LOGO */}

        <div className="mr-4 hidden lg:block">
          <h1 className="bg-gradient-to-r from-emerald-400 to-violet-400 bg-clip-text text-xl font-black text-transparent">
            Yoga Wellness
          </h1>

          <p className="text-[10px] text-slate-400">
            Mind • Body • Balance
          </p>
        </div>

        {/* NAV ITEMS */}

        <div className="flex flex-wrap items-center justify-center gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-emerald-500 to-violet-500 text-white shadow-md"
                    : "border border-white/10 bg-white/5 text-slate-300 hover:border-emerald-400/40 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon
                  size={15}
                  className={`transition-transform duration-300 group-hover:scale-110 ${
                    isActive ? "text-white" : "text-slate-400"
                  }`}
                />

                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* USER BUTTON */}

        <div className="ml-3 flex items-center">
          <div className="rounded-xl border border-white/10 bg-white/5 p-1">
            <UserButton />
          </div>
        </div>
      </nav>
    </div>
  );
};