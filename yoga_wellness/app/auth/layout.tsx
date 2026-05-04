import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaArrowLeft } from 'react-icons/fa';

const AuthLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="h-full flex items-center justify-between bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400">
      {/* Left Side Text */}
      <div className="text-white max-w-sm ml-[88px] relative mb-44">
        {/* Image overlapping the h1 */}
        <img src="/logo.png" alt="Yoga Wellness Tracker" className="h-[400px] w-[400px]  absolute top-0 left-0 z-10" />
        <h1 className="text-[36px] font-bold mt-[270px] relative z-20">Yoga Wellness Tracker</h1>
        <h3 className="font-normal text-[22px] text-orange-400 relative z-20">helps you connect, grow, and thrive in your journey to better health!</h3>
        
        {/* Button below the h3 tag */}
        <Link href="/servicespage">
  <Button className="bg-red-500  hover:bg-red-800  rounded-lg mt-6 mx-32 flex items-center">
    <FaArrowLeft className="mr-2" />  
    Back
  </Button>
</Link>
      </div>
 
      {/* Right Side Login Form */}
      <div className="w-full max-w-md mr-[200px]">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
