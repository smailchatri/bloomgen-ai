import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const usePremium = () => {
  return useQuery({
    queryKey: ['premium-status'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return { isPremium: false, loading: false };

      const { data, error } = await supabase
        .from('profiles')
        .select('subscription_status, subscription_expires_at')
        .eq('id', user.id)
        .maybeSingle();

      if (error) throw error;
      if (!data) return { isPremium: false, loading: false };

      // Check if subscription is active
      const isPremium = data.subscription_status === 'premium' || data.subscription_status === 'active';
      
      // Check if subscription hasn't expired
      const isNotExpired = !data.subscription_expires_at || 
        new Date(data.subscription_expires_at) > new Date();

      return { 
        isPremium: isPremium && isNotExpired, 
        loading: false 
      };
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};