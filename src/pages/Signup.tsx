import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import signupHero from "@/assets/signup_hero.png";
import appleIcon from "@/assets/apple_icon.png";
import googleIcon from "@/assets/google_icon.webp";

const Signup = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    if (user && !loading) {
      navigate("/explore");
    }
  }, [user, loading, navigate]);

  const handleAppleSignup = async () => {
    try {
      setIsAuthenticating(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          redirectTo: `${window.location.origin}/explore`,
        },
      });
      
      if (error) {
        toast.error(error.message);
      }
    } catch (error) {
      toast.error("Failed to sign up with Apple");
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      setIsAuthenticating(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/explore`,
        },
      });
      
      if (error) {
        toast.error(error.message);
      }
    } catch (error) {
      toast.error("Failed to sign up with Google");
    } finally {
      setIsAuthenticating(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse text-white text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 py-8">
      <div className="w-full max-w-md flex flex-col items-center">
        {/* Hero Image */}
        <div className="mb-6 mt-6">
          <img 
            src={signupHero} 
            alt="Creative examples" 
            className="w-[340px] h-auto"
          />
        </div>

        {/* Title */}
        <h1 className="text-white text-[32px] font-bold text-center mb-4 leading-tight max-w-[300px]">
          Unlock Your Creative Flow!
        </h1>

        {/* Subtitle */}
        <p className="text-[#A1A1A1] text-center text-[15px] font-medium leading-relaxed mb-8 px-4 max-w-[340px]">
          Sign up to instantly access powerful prompts, save your favorite custom styles, Your inspiration starts here.
        </p>

        {/* Buttons */}
        <div className="w-full space-y-3 px-6">
          <button
            onClick={handleAppleSignup}
            disabled={isAuthenticating}
            className="w-full h-14 bg-[#2A2A2A] hover:bg-[#3A3A3A] rounded-[22px] flex items-center justify-center text-white font-bold text-[16px] transition-all disabled:opacity-50 disabled:cursor-not-allowed px-12 whitespace-nowrap"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
          >
            <img src={appleIcon} alt="Apple" className="w-[14px] h-auto mr-3 flex-shrink-0" />
            <span className="whitespace-nowrap">{isAuthenticating ? "Signing up..." : "Sign up with Apple"}</span>
          </button>

          <button
            onClick={handleGoogleSignup}
            disabled={isAuthenticating}
            className="w-full h-14 bg-[#2A2A2A] hover:bg-[#3A3A3A] rounded-[22px] flex items-center justify-center text-white font-bold text-[16px] transition-all disabled:opacity-50 disabled:cursor-not-allowed px-12 whitespace-nowrap"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
          >
            <img src={googleIcon} alt="Google" className="w-[14px] h-[14px] mr-3 flex-shrink-0" />
            <span className="whitespace-nowrap">{isAuthenticating ? "Signing up..." : "Sign up with Google"}</span>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate("/auth/login")}
            className="text-[#A1A1A1] text-[15px]"
          >
            Have an account? <span className="text-[#CAFC80] font-bold">Login</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
