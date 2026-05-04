import { LoginButton } from "@/components/auth/login-button";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Navbaronly = () => {
  return (
    <div>
      <nav className="fixed top-0 left-0  w-full border-b-2 bg-white z-50 h-[70px]">
        <ul className="flex font-outfit items-center justify-center space-x-4 py-3 w-full relative">
          <li className="absolute left-0 ml-4">
            <Image src="/logo.png" alt="Logo" width={120} height={50} className="object-contain" />
          </li>
          <li>
            <Link href="/">
              <Button variant="ghost" size="lg" className="hover:bg-red-500 hover:font-bold hover:text-white rounded-2xl">
                Home
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/meditationpage">
              <Button variant="ghost" className="hover:bg-red-500 hover:font-bold hover:text-white rounded-2xl">
                Meditation
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/posespage">
              <Button variant="ghost" className="hover:bg-red-500 hover:font-bold hover:text-white rounded-2xl">
                Poses
              </Button>
            </Link>
          </li>
          
          <li>
            <Link href="/servicespage">
              <Button variant="ghost" className="hover:bg-red-500 hover:font-bold hover:text-white rounded-2xl">
                Services
              </Button>
            </Link>
          </li>
          <li className="ml-auto absolute right-5 text-red-500 border rounded-full hover:rounded-full border-red-500">
            <LoginButton>
              <Button variant="ghost" size="lg" className="font-bold hover:bg-red-500 hover:text-white hover:rounded-full">
                Join us
              </Button>
            </LoginButton>
          </li>
        </ul>
      </nav>

     
      <div className="h-[80px]"></div>

    </div>
  );
};

export default Navbaronly;
