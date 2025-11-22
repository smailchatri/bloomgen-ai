import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import loginHero from "@/assets/login_hero.png";
import appleIcon from "@/assets/apple_icon.png";
import googleIcon from "@/assets/google_icon.webp";

const Login = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    if (user && !loading) {
      navigate("/explore");
    }
  }, [user, loading, navigate]);

  const handleAppleLogin = async () => {
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
      toast.error("Failed to login with Apple");
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleGoogleLogin = async () => {
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
      toast.error("Failed to login with Google");
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
            src={loginHero} 
            alt="Creative examples" 
            className="w-[340px] h-auto"
          />
        </div>

        {/* Title */}
        <h1 className="text-white text-[32px] font-bold text-center mb-4 leading-tight">
          Welcome to BLOOMGEN<br />Login now!
        </h1>

        {/* Subtitle */}
        <p className="text-[#A1A1A1] text-center text-[15px] font-medium leading-relaxed mb-8 px-4 max-w-[340px]">
          Log in to access your saved prompts, custom styles, and next-level shots. Your inspiration is waiting.
        </p>

        {/* Buttons */}
        <div className="w-full space-y-3 px-6">
          <button
            onClick={handleAppleLogin}
            disabled={isAuthenticating}
            className="w-full h-14 bg-[#1A1A1A] hover:bg-[#2A2A2A] rounded-[28px] flex items-center justify-center text-white font-semibold text-[17px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img src={appleIcon} alt="Apple" className="w-5 h-auto mr-3" />
            {isAuthenticating ? "Logging in..." : "Continue with Apple"}
          </button>

          <button
            onClick={handleGoogleLogin}
            disabled={isAuthenticating}
            className="w-full h-14 bg-[#1A1A1A] hover:bg-[#2A2A2A] rounded-[28px] flex items-center justify-center text-white font-semibold text-[17px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img src={googleIcon} alt="Google" className="w-5 h-5 mr-3" />
            {isAuthenticating ? "Logging in..." : "Continue with Google"}
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate("/auth/signup")}
            className="text-[#A1A1A1] text-[15px]"
          >
            Don't have an account? <span className="text-[#CAFC80] font-bold">Create an account</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
