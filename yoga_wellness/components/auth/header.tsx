import {Poppins} from "next/font/google";
import Image from "next/image";
import {cn} from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight:["600"],
});

interface HeaderProps{
    label:string;
};

export const Header=({
    label,
}: HeaderProps)=>{
    return(
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
           <h1 className={cn(
           "text-3xl font-semibold",
           font.className,
           )}>

{/* <Image
        src="/YWTT.png" 
        alt="loading" 
        width={80}           
        height={80}           
        priority   
        className=" rounded-full h-[90px] w-[90px]"            
             /> */}
           </h1>
           <p className="text-muted-foreground text-sm">
            {label}
           </p>
        </div>
    )
}