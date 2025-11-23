-- Make title and category nullable and add defaults for Google Sheets sync
ALTER TABLE public.prompts 
  ALTER COLUMN title DROP NOT NULL,
  ALTER COLUMN category DROP NOT NULL;

-- Add default values
ALTER TABLE public.prompts 
  ALTER COLUMN title SET DEFAULT 'Untitled',
  ALTER COLUMN category SET DEFAULT 'General';

-- Add index for better performance on user queries
CREATE INDEX IF NOT EXISTS idx_saved_prompts_user_id ON public.saved_prompts(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_prompts_prompt_id ON public.saved_prompts(prompt_id);