import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  hasSeenOnboarding: boolean;
  isPremium: boolean;
  markOnboardingComplete: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ONBOARDING_KEY = 'hasSeenOnboarding';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(() => {
    return localStorage.getItem(ONBOARDING_KEY) === 'true';
  });

  // Fetch user's subscription status from database
  const fetchSubscriptionStatus = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('subscription_status, subscription_expires_at')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching subscription status:', error);
      return;
    }

    if (data) {
      // Check if subscription is premium and not expired
      const isActive = data.subscription_status === 'premium' && 
        (!data.subscription_expires_at || new Date(data.subscription_expires_at) > new Date());
      setIsPremium(isActive);
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // When user logs in/signs up, mark onboarding as complete and fetch subscription
        if (event === 'SIGNED_IN' && session?.user) {
          markOnboardingComplete();
          // Defer subscription fetch to avoid blocking auth state change
          setTimeout(() => {
            fetchSubscriptionStatus(session.user.id);
          }, 0);
        }
        
        // Clear premium status and onboarding flag on logout
        if (event === 'SIGNED_OUT') {
          setIsPremium(false);
          localStorage.removeItem(ONBOARDING_KEY);
          setHasSeenOnboarding(false);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      // Fetch subscription status if user exists
      if (session?.user) {
        fetchSubscriptionStatus(session.user.id);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const markOnboardingComplete = () => {
    localStorage.setItem(ONBOARDING_KEY, 'true');
    setHasSeenOnboarding(true);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      loading, 
      hasSeenOnboarding,
      isPremium,
      markOnboardingComplete 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
