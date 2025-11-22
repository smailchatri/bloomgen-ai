import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import bloomgenLogo from "@/assets/bloomgen_logo.png";
import onboardingImage from "@/assets/onboarding_1.png";

const Onboarding1 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen gradient-bg flex flex-col items-center justify-between p-6 pt-safe pb-safe">
      {/* Logo */}
      <div className="flex items-center gap-3 mt-4">
        <img src={bloomgenLogo} alt="Bloomgen" className="w-8 h-8" />
        <h1 className="text-white text-2xl font-black tracking-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
          BLOOMGEN
        </h1>
      </div>

      {/* Center Content */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md px-4">
        {/* Hero Image */}
        <div className="w-full max-w-sm mb-8">
          <img 
            src={onboardingImage} 
            alt="Transform selfies" 
            className="w-full h-auto drop-shadow-2xl"
          />
        </div>

        {/* Text Content */}
        <div className="text-center space-y-4">
          <h2 
            className="text-white text-3xl font-black leading-tight tracking-tight px-2"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            TURN YOUR NORMAL SELFIES<br />INTO NEXT-LEVEL SHOTS
          </h2>
          <p 
            className="text-white/80 text-base leading-relaxed px-4"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
          >
            Get unlimited prompts that help you turn simple selfies into stunning images.
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-full max-w-md space-y-6">
        {/* Progress Indicators */}
        <div className="flex justify-center gap-2">
          <div className="w-8 h-2 rounded-full bg-primary glow-primary" />
          <div className="w-8 h-2 rounded-full bg-white/20" />
          <div className="w-8 h-2 rounded-full bg-white/20" />
        </div>

        {/* Button */}
        <Button
          onClick={() => navigate("/onboarding/2")}
          className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg"
          style={{ 
            fontFamily: 'Inter, sans-serif',
            backgroundColor: '#E8E8E8',
            color: '#000000'
          }}
        >
          Continue
        </Button>

        {/* iOS Home Indicator Space */}
        <div className="h-5" />
      </div>
    </div>
  );
};

export default Onboarding1;
