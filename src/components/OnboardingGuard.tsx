import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface OnboardingGuardProps {
  children: React.ReactNode;
}

export function OnboardingGuard({ children }: OnboardingGuardProps) {
  const { user, hasSeenOnboarding, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen gradient-bg flex items-center justify-center">
        <div className="animate-pulse text-white text-lg">Loading...</div>
      </div>
    );
  }

  // If user is authenticated and has seen onboarding, redirect to main app
  if (user && hasSeenOnboarding) {
    return <Navigate to="/explore" replace />;
  }

  // If user has seen onboarding but not authenticated, go to login
  if (hasSeenOnboarding && !user) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
}
