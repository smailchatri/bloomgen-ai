import { useLocation, Link } from "react-router-dom";
import libraryGray from "@/assets/library_gray.png";
import libraryGreen from "@/assets/library_green.png";
import bloomgenLogoGray from "@/assets/bloomgen_logo_gray.png";
import bloomgenLogoGreen from "@/assets/bloomgen_logo_green.png";
import personalGray from "@/assets/personal_gray.png";
import personalGreen from "@/assets/personal_green.png";

export const BottomNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-lg border-t border-white/10 z-50 pb-safe">
      <div className="flex items-center justify-around h-[88px] max-w-md mx-auto px-6">
        <Link
          to="/library"
          className="flex flex-col items-center gap-1 transition-all"
        >
          <img 
            src={currentPath === "/library" ? libraryGreen : libraryGray} 
            alt="Library" 
            className="w-6 h-6"
          />
          <span 
            className={`text-[11px] ${
              currentPath === "/library" 
                ? "font-bold text-[#CAFC80]" 
                : "font-normal text-[#9C9C9C]"
            }`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Library
          </span>
        </Link>

        <Link
          to="/explore"
          className="flex flex-col items-center gap-1 transition-all"
        >
          <img 
            src={currentPath === "/explore" ? bloomgenLogoGreen : bloomgenLogoGray} 
            alt="Explore" 
            className="w-9 h-9"
          />
          <span 
            className={`text-[11px] ${
              currentPath === "/explore" 
                ? "font-bold text-[#CAFC80]" 
                : "font-normal text-[#9C9C9C]"
            }`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Explore
          </span>
        </Link>

        <Link
          to="/profile"
          className="flex flex-col items-center gap-1 transition-all"
        >
          <img 
            src={currentPath === "/profile" ? personalGreen : personalGray} 
            alt="Personal" 
            className="w-6 h-6"
          />
          <span 
            className={`text-[11px] ${
              currentPath === "/profile" 
                ? "font-bold text-[#CAFC80]" 
                : "font-normal text-[#9C9C9C]"
            }`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Personal
          </span>
        </Link>
      </div>
    </nav>
  );
};
