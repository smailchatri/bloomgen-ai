import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import loginHero from "@/assets/login_hero.png";

const Login = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

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
        toast.success("Logged in successfully!");
        navigate("/explore");
      }
    } catch (error) {
      toast.error("Failed to login");
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

        {/* Email Login Form */}
        <form onSubmit={handleEmailLogin} className="w-full space-y-3 px-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full h-14 bg-[#2A2A2A] rounded-[22px] px-6 text-white placeholder:text-[#A1A1A1] focus:outline-none focus:ring-2 focus:ring-[#CAFC80]"
            style={{ fontFamily: 'Inter, sans-serif' }}
          />
          
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full h-14 bg-[#2A2A2A] rounded-[22px] px-6 text-white placeholder:text-[#A1A1A1] focus:outline-none focus:ring-2 focus:ring-[#CAFC80]"
            style={{ fontFamily: 'Inter, sans-serif' }}
          />

          <button
            type="submit"
            disabled={isAuthenticating}
            className="w-full h-14 bg-[#CAFC80] hover:bg-[#B8E970] rounded-[22px] text-black font-bold text-[16px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {isAuthenticating ? "Logging in..." : "Login"}
          </button>
        </form>

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
