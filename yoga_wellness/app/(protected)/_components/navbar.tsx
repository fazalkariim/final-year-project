"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";

export const Navbar = ()=>{
    const pathname = usePathname();
    return(
        <nav className="  bg-secondary flex justify-between  items-center mx-auto p-2 rounded-xl w-[1100px] shadow-sm">
           <div className="flex gap-x-8">
           
            <Button 
              asChild
              variant={pathname === "/Posedetection" ? "default" : "outline"} 
              >
                <Link href="/Posedetection">
                  Explore Advance Features
                </Link>

            </Button>
           
            <Button 
              asChild
              variant={pathname === "/Routinecreation" ? "default" : "outline"} 
              >
                <Link href="/Routinecreation">
                  Routime Creation                              
                </Link>
            </Button>
            













            <Button 
              asChild
              variant={pathname === "/poses" ? "default" : "outline"} 
              >
                <Link href="/poses">
                  Yoga Poses
                </Link>
            </Button>
          
            <Button 
              asChild
              variant={pathname === "/game" ? "default" : "outline"} 
              >
                <Link href="/game">
                  Group Session
                </Link>
            </Button>

            <Button 
              asChild
              variant={pathname === "/groupsession" ? "default" : "outline"}            
              >
                <Link href="/groupsession">
                  Meditation exercise
                </Link>
            </Button>
            
            
            <Button
              asChild
              variant={pathname === "/settings" ? "default" : "outline"}
              >
                <Link href="/settings">
                Seleck your Goal!
                </Link>
            </Button>

            
            {/* <Button 
              asChild
              variant={pathname === "/server" ? "default" : "outline"}
              >
                <Link href="/server">
                 User Info
                </Link>
            </Button>      */}
           </div>
           <UserButton/>
        </nav>
    );
};