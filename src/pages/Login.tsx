import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import loginHero from "@/assets/login_hero.png";
import googleIcon from "@/assets/google_icon.webp";

const Login = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user && !loading) {
      navigate("/explore");
    }
  }, [user, loading, navigate]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      setIsAuthenticating(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        toast.error(error.message);
      } else {
        navigate("/explore");
      }
    } catch (error) {
      toast.error("Failed to login");
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
        <h1 className="text-white text-[32px] font-bold text-center mb-4 leading-tight max-w-[340px]">
          Welcome to BLOOMGEN Login now!
        </h1>

        {/* Subtitle */}
        <p className="text-[#A1A1A1] text-center text-[15px] font-medium leading-relaxed mb-8 px-4 max-w-[340px]">
          Log in to access your saved prompts, custom styles, and next-level shots. Your inspiration is waiting.
        </p>

        {/* Login Form */}
        <form onSubmit={handleEmailLogin} className="w-full space-y-3 px-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isAuthenticating}
            className="w-full h-14 bg-[#2A2A2A] rounded-[22px] text-white font-normal text-[16px] px-6 outline-none focus:ring-2 focus:ring-[#CAFC80] disabled:opacity-50"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
          />
          
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isAuthenticating}
            className="w-full h-14 bg-[#2A2A2A] rounded-[22px] text-white font-normal text-[16px] px-6 outline-none focus:ring-2 focus:ring-[#CAFC80] disabled:opacity-50"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
          />

          <button
            type="submit"
            disabled={isAuthenticating}
            className="w-full h-14 bg-[#CAFC80] hover:bg-[#B8E670] rounded-[22px] flex items-center justify-center text-black font-normal text-[16px] transition-all disabled:opacity-50 disabled:cursor-not-allowed px-12 whitespace-nowrap"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
          >
            <span className="whitespace-nowrap">{isAuthenticating ? "Logging in..." : "Login"}</span>
          </button>
        </form>

        {/* Divider */}
        <div className="w-full px-6 flex items-center gap-4 my-4">
          <div className="flex-1 h-px bg-[#2A2A2A]"></div>
          <span className="text-[#A1A1A1] text-[14px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>or</span>
          <div className="flex-1 h-px bg-[#2A2A2A]"></div>
        </div>

        {/* Google Button */}
        <div className="w-full px-6">
          <button
            onClick={handleGoogleLogin}
            disabled={isAuthenticating}
            className="w-full h-14 bg-[#2A2A2A] hover:bg-[#3A3A3A] rounded-[22px] flex items-center justify-center text-white font-normal text-[16px] transition-all disabled:opacity-50 disabled:cursor-not-allowed px-12 whitespace-nowrap"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
          >
            <img src={googleIcon} alt="Google" className="w-[14px] h-[14px] mr-3 flex-shrink-0" />
            <span className="whitespace-nowrap">{isAuthenticating ? "Logging in..." : "Continue with Google"}</span>
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
