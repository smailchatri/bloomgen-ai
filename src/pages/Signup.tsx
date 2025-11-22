import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Apple } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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
      <div className="h-screen gradient-bg flex items-center justify-center">
        <div className="animate-pulse text-white text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">BLOOMGEN</h1>
          <p className="text-muted-foreground text-lg">Create your account</p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={handleAppleSignup}
            disabled={isAuthenticating}
            className="w-full glass hover:bg-card border border-border h-14 rounded-xl font-semibold text-lg transition-smooth hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Apple className="w-6 h-6 mr-3" />
            {isAuthenticating ? "Signing up..." : "Sign up with Apple"}
          </Button>

          <Button
            onClick={handleGoogleSignup}
            disabled={isAuthenticating}
            className="w-full glass hover:bg-card border border-border h-14 rounded-xl font-semibold text-lg transition-smooth hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {isAuthenticating ? "Signing up..." : "Sign up with Google"}
          </Button>
        </div>

        <div className="text-center pt-8">
          <button
            onClick={() => navigate("/auth/login")}
            className="text-muted-foreground hover:text-foreground transition-smooth"
          >
            Already have an account? <span className="text-primary font-semibold">Login</span>
          </button>
        </div>

        <div className="text-center text-xs text-muted-foreground pt-4 space-x-2">
          <a href="#" className="hover:text-foreground transition-smooth">Terms of Service</a>
          <span>•</span>
          <a href="#" className="hover:text-foreground transition-smooth">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
