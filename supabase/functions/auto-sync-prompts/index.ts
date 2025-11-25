import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.84.0';

interface PromptRow {
  prompt_text: string;
  image_url: string;
  gender?: string;
}

Deno.serve(async (req) => {
  try {
    console.log('Starting auto-sync from Google Sheets');
    
    const sheetUrl = Deno.env.get('GOOGLE_SHEET_CSV_URL');
    
    if (!sheetUrl) {
      throw new Error('GOOGLE_SHEET_CSV_URL not configured');
    }

    // Fetch CSV from Google Sheets
    const response = await fetch(sheetUrl);
    const csvText = await response.text();
    
    console.log('Fetched CSV data');
    
    // Parse CSV
    const lines = csvText.trim().split('\n');
    const prompts: PromptRow[] = [];
    
    // Skip header row, start from index 1
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      // Parse CSV: Links, Prompts, Gender
      const [image_url, prompt_text, gender] = line.split(',').map(s => s.trim().replace(/^"|"$/g, ''));
      
      if (prompt_text && image_url) {
        prompts.push({ 
          prompt_text, 
          image_url,
          gender: gender?.toLowerCase() // Normalize to lowercase
        });
      }
    }

    console.log(`Parsed ${prompts.length} prompts from CSV`);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Clear existing prompts and insert new ones
    const { error: deleteError } = await supabase
      .from('prompts')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

    if (deleteError) {
      console.error('Delete error:', deleteError);
      throw deleteError;
    }

    console.log('Cleared existing prompts');

    // Insert new prompts
    const { error: insertError } = await supabase
      .from('prompts')
      .insert(
        prompts.map(p => ({
          prompt_text: p.prompt_text,
          image_url: p.image_url,
          title: p.prompt_text.substring(0, 50),
          category: 'General',
          gender: p.gender
        }))
      );

    if (insertError) {
      console.error('Insert error:', insertError);
      throw insertError;
    }

    console.log(`Successfully synced ${prompts.length} prompts`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        count: prompts.length,
        message: `Successfully synced ${prompts.length} prompts`
      }),
      { headers: { 'Content-Type': 'application/json' }, status: 200 }
    );

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Auto-sync error:', errorMessage);
    
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
});
