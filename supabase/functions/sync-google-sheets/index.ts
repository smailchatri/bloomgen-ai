import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.84.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PromptRow {
  prompt_text: string;
  image_url: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sheetUrl } = await req.json();
    
    if (!sheetUrl) {
      throw new Error('Sheet URL is required');
    }

    // Fetch CSV from Google Sheets
    const response = await fetch(sheetUrl);
    const csvText = await response.text();
    
    // Parse CSV
    const lines = csvText.trim().split('\n');
    const prompts: PromptRow[] = [];
    
    // Skip header row, start from index 1
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      // Simple CSV parsing (handles basic cases)
      const [prompt_text, image_url] = line.split(',').map(s => s.trim().replace(/^"|"$/g, ''));
      
      if (prompt_text && image_url) {
        prompts.push({ prompt_text, image_url });
      }
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Clear existing prompts and insert new ones
    const { error: deleteError } = await supabase
      .from('prompts')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

    if (deleteError) throw deleteError;

    // Insert new prompts
    const { error: insertError } = await supabase
      .from('prompts')
      .insert(
        prompts.map(p => ({
          prompt_text: p.prompt_text,
          image_url: p.image_url,
          title: p.prompt_text.substring(0, 50), // Use first 50 chars as title
          category: 'General'
        }))
      );

    if (insertError) throw insertError;

    return new Response(
      JSON.stringify({ 
        success: true, 
        count: prompts.length,
        message: `Successfully synced ${prompts.length} prompts`
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});