import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import bloomgenLogo from "@/assets/bloomgen_logo.png";
import onboardingImage from "@/assets/onboarding_1.png";

const Onboarding1 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen gradient-bg flex flex-col items-center justify-between px-6 py-8 pt-safe pb-safe">
      {/* Logo */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <img src={bloomgenLogo} alt="Bloomgen" className="w-8 h-8" />
        <h1 className="text-white text-2xl font-black tracking-tight">
          BLOOMGEN
        </h1>
      </div>

      {/* Center Content */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md">
        {/* Hero Image */}
        <div className="w-full mb-6">
          <img 
            src={onboardingImage} 
            alt="Transform selfies" 
            className="w-full h-auto drop-shadow-2xl"
          />
        </div>

        {/* Text Content */}
        <div className="text-center space-y-3 px-2">
          <h2 className="text-white text-[26px] leading-tight font-black tracking-tight">
            TURN YOUR NORMAL SELFIES INTO NEXT-LEVEL SHOTS
          </h2>
          <p className="text-white/80 text-[15px] leading-relaxed font-normal">
            Get unlimited prompts that help you turn simple selfies into stunning images.
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-full max-w-md space-y-5 flex-shrink-0">
        {/* Progress Indicators */}
        <div className="flex justify-center gap-2">
          <div className="w-8 h-2 rounded-full bg-primary glow-primary" />
          <div className="w-8 h-2 rounded-full bg-white/20" />
          <div className="w-8 h-2 rounded-full bg-white/20" />
        </div>

        {/* Button */}
        <Button
          onClick={() => navigate("/onboarding/2")}
          className="w-full h-14 rounded-[20px] text-base font-bold shadow-lg bg-white text-black hover:bg-white/90"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default Onboarding1;
