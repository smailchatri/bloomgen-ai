import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import bloomgenLogo from "@/assets/bloomgen_logo.png";
import onboardingImage from "@/assets/onboarding_3.png";
import starIcon from "@/assets/star_icon.png";

const Onboarding3 = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen gradient-bg flex flex-col items-center justify-between px-5 pt-safe pb-safe overflow-hidden">
      {/* Logo */}
      <div className="flex items-center gap-2.5 flex-shrink-0 pt-6">
        <img src={bloomgenLogo} alt="Bloomgen" className="w-9 h-9" />
        <h1 className="text-white text-[22px] font-black tracking-tight">
          BLOOMGEN
        </h1>
      </div>

      {/* Center Content */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md -mt-8">
        {/* Hero Image */}
        <div className="w-full px-1 mb-6">
          <img 
            src={onboardingImage} 
            alt="Viral AI prompts" 
            className="w-full h-auto drop-shadow-2xl"
          />
        </div>

        {/* Text Content */}
        <div className="text-center space-y-2.5 px-4">
          <h2 className="text-white text-[22px] leading-[1.2] font-black tracking-tight">
            EXPERIENCE HUNDREDS OF <span className="italic">VIRAL AI PROMPTS</span>
          </h2>
          <p className="text-white/75 text-[14px] leading-relaxed font-normal">
            Be the first to try the latest trends and styles taking over the internet.
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-full max-w-md space-y-4 flex-shrink-0 pb-2">
        {/* Progress Indicators */}
        <div className="flex justify-center gap-2">
          <div className="w-8 h-2 rounded-full bg-white/20" />
          <div className="w-8 h-2 rounded-full bg-white/20" />
          <div className="w-8 h-2 rounded-full bg-primary glow-primary" />
        </div>

        {/* Button */}
        <Button
          onClick={() => navigate("/auth/signup")}
          className="w-full h-14 rounded-[20px] text-[17px] font-bold shadow-lg flex items-center justify-center gap-2 bg-primary text-black hover:bg-primary/90"
        >
          Start the Magic
          <img src={starIcon} alt="✨" className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default Onboarding3;
