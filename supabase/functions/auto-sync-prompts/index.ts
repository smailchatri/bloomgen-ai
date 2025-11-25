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
    console.log('First 500 chars of CSV:', csvText.substring(0, 500));
    console.log('CSV line count:', csvText.split('\n').length);
    
    // Parse CSV - properly handle quoted fields with newlines
    const lines = csvText.trim().split('\n');
    const prompts: PromptRow[] = [];
    
    // Function to parse CSV with proper quote and newline handling
    function parseCSV(csv: string): string[][] {
      const rows: string[][] = [];
      let currentRow: string[] = [];
      let currentField = '';
      let inQuotes = false;
      
      for (let i = 0; i < csv.length; i++) {
        const char = csv[i];
        const nextChar = csv[i + 1];
        
        if (char === '"' && nextChar === '"' && inQuotes) {
          // Escaped quote
          currentField += '"';
          i++; // Skip next quote
        } else if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          currentRow.push(currentField.trim());
          currentField = '';
        } else if (char === '\n' && !inQuotes) {
          currentRow.push(currentField.trim());
          if (currentRow.length > 0) rows.push(currentRow);
          currentRow = [];
          currentField = '';
        } else {
          currentField += char;
        }
      }
      
      // Push last field and row
      if (currentField || currentRow.length > 0) {
        currentRow.push(currentField.trim());
        rows.push(currentRow);
      }
      
      return rows;
    }
    
    const rows = parseCSV(csvText);
    console.log(`Total rows parsed: ${rows.length}`);
    
    // Skip header row (index 0), process data rows
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (row.length < 2) continue; // Need at least image_url and prompt_text
      
      const [image_url, prompt_text, gender] = row;
      
      if (prompt_text && image_url) {
        prompts.push({ 
          prompt_text, 
          image_url,
          gender: gender?.toLowerCase() // Normalize to lowercase (handles "Gander" typo)
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
