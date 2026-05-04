import { Navbar } from "./_components/navbar";

interface ProtectedLayoutProps {
    children: React.ReactNode;
};
const ProtectedLayout = ({children}:ProtectedLayoutProps)=>{
    return(
        <div className="h-full w-full  pt-3 gap-y-3  bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
        from-sky-400 ">
            <Navbar/> 
            {children}
        </div>
    );
}

export default ProtectedLayout;