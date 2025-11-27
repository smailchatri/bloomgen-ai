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

  // If user is authenticated, redirect to main app
  if (user) {
    return <Navigate to="/explore" replace />;
  }

  // If user is not authenticated, always show onboarding screens
  return <>{children}</>;
}
