import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Prompt } from '@/types/prompt';
import { useToast } from '@/hooks/use-toast';

// Fetch all prompts from database
export const usePrompts = () => {
  return useQuery({
    queryKey: ['prompts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('prompts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Prompt[];
    },
  });
};

// Fetch user's saved prompts
export const useSavedPrompts = () => {
  return useQuery({
    queryKey: ['saved-prompts'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('saved_prompts')
        .select(`
          id,
          prompt_id,
          saved_at,
          prompts (*)
        `)
        .eq('user_id', user.id)
        .order('saved_at', { ascending: false });
      
      if (error) throw error;
      
      // Transform to return just the prompts
      return data.map(item => item.prompts).filter(Boolean) as Prompt[];
    },
  });
};

// Save a prompt
export const useSavePrompt = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (promptId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('saved_prompts')
        .insert({ user_id: user.id, prompt_id: promptId });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saved-prompts'] });
      toast({
        title: 'Prompt saved!',
        description: 'Added to library',
        duration: 2000,
      });
    },
    onError: (error) => {
      toast({
        title: 'Error saving prompt',
        description: error.message,
        variant: 'destructive',
        duration: 2000,
      });
    },
  });
};

// Unsave a prompt
export const useUnsavePrompt = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (promptId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('saved_prompts')
        .delete()
        .eq('user_id', user.id)
        .eq('prompt_id', promptId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saved-prompts'] });
      toast({
        title: 'Prompt removed!',
        description: 'Removed from library',
        duration: 2000,
      });
    },
    onError: (error) => {
      toast({
        title: 'Error removing prompt',
        description: error.message,
        variant: 'destructive',
        duration: 2000,
      });
    },
  });
};

// Check if a prompt is saved
export const useIsPromptSaved = (promptId: string) => {
  return useQuery({
    queryKey: ['is-saved', promptId],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;

      const { data, error } = await supabase
        .from('saved_prompts')
        .select('id')
        .eq('user_id', user.id)
        .eq('prompt_id', promptId)
        .maybeSingle();

      if (error) throw error;
      return !!data;
    },
  });
};

// Sync Google Sheets
export const useSyncGoogleSheets = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (sheetUrl: string) => {
      const { data, error } = await supabase.functions.invoke('sync-google-sheets', {
        body: { sheetUrl },
      });

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['prompts'] });
      toast({
        title: 'Sync complete!',
        description: `${data.count} prompts synced from Google Sheets`,
        duration: 3000,
      });
    },
    onError: (error) => {
      toast({
        title: 'Sync failed',
        description: error.message,
        variant: 'destructive',
        duration: 3000,
      });
    },
  });
};