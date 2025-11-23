import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { mockPrompts } from "@/data/mockPrompts";
import { Prompt } from "@/types/prompt";
import { useToast } from "@/hooks/use-toast";
import bloomgenLogo from "@/assets/bloomgen_logo.png";
import bookmarkSaved from "@/assets/library_green.png";
import sparkleIcon from "@/assets/sparkle_icon.png";

const Library = () => {
  const [savedPrompts, setSavedPrompts] = useState<string[]>([]); // Start with empty library
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const savedItems = mockPrompts.filter(p => savedPrompts.includes(p.id));
  
  // Create grid pattern: 3 columns, alternating colors
  // Pattern: Gray, Green, Gray / Green, Gray, Green / Gray, Green, Gray
  const gridPattern = [
    false, true, false,  // Row 1: Gray, Green, Gray
    true, false, true,   // Row 2: Green, Gray, Green
    false, true, false   // Row 3: Gray, Green, Gray
  ];

  const handleCopy = () => {
    if (selectedPrompt) {
      navigator.clipboard.writeText(selectedPrompt.prompt_text);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1500);
      toast({
        title: "Prompt copied!",
        description: "Ready to create magic",
        duration: 2000,
      });
    }
  };

  const handleUnsave = () => {
    if (selectedPrompt) {
      setSavedPrompts(prev => prev.filter(id => id !== selectedPrompt.id));
      toast({
        title: "Prompt removed!",
        description: "Removed from library",
        duration: 2000,
      });
      setSelectedPrompt(null);
    }
  };

  const handleItemClick = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d1f0d] to-[#050f05] pb-24">
      <header className="pt-12 pb-8">
        <div className="flex items-center justify-center gap-3 mb-6">
          <img src={bloomgenLogo} alt="Bloomgen" className="h-12" />
          <span className="text-white text-3xl tracking-wide" style={{ fontFamily: 'Inter', fontWeight: 900 }}>
            BLOOMGEN
          </span>
        </div>
        <div className="flex flex-col items-center px-4">
          <h1 className="text-white tracking-wide mb-1 text-center" style={{ fontFamily: 'Inter', fontWeight: 900, fontSize: 'clamp(1.25rem, 5vw, 1.5rem)' }}>
            ALL YOUR SAVED PROMPTS
          </h1>
          <h2 className="text-white text-center" style={{ fontFamily: 'Inter', fontWeight: 500, fontStyle: 'italic', fontSize: 'clamp(1.25rem, 5vw, 1.5rem)' }}>
            READY TO COPY!
          </h2>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 pb-6">
        <div className="grid grid-cols-3 gap-3">
          {savedItems.map((prompt, index) => (
            <button
              key={prompt.id}
              onClick={() => handleItemClick(prompt)}
              className="rounded-3xl overflow-hidden aspect-[3/4] transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <img
                src={prompt.image_url}
                alt={prompt.title}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
          
          {Array.from({ length: Math.max(0, 9 - savedItems.length) }).map((_, i) => {
            const index = savedItems.length + i;
            const isGreen = gridPattern[index % 9];
            return (
              <div
                key={`placeholder-${i}`}
                className="rounded-3xl aspect-[3/4]"
                style={{ 
                  backgroundColor: isGreen ? '#CAFC80' : '#D9D9D9'
                }}
              />
            );
          })}
        </div>
      </main>

      <BottomNav />

      {/* Full Screen Detail View */}
      {selectedPrompt && (
        <div className="fixed inset-0 bg-black z-50">
          <button
            onClick={() => setSelectedPrompt(null)}
            className="absolute top-4 right-4 z-50 w-10 h-10 bg-black/60 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center text-white text-xl"
          >
            ×
          </button>
          
          <img
            src={selectedPrompt.image_url}
            alt={selectedPrompt.title}
            className="w-full h-full object-cover"
          />

          {/* Fixed Bottom Buttons Container */}
          <div 
            className="fixed left-0 right-0 flex items-center justify-center gap-3 px-6 z-40"
            style={{ bottom: 'calc(68px + env(safe-area-inset-bottom, 0px) + 48px)' }}
          >
            {/* Copy Prompt Button */}
            <button
              onClick={handleCopy}
              className="flex-1 max-w-[280px] h-[52px] bg-black/60 backdrop-blur-md rounded-[26px] border border-white/20 flex items-center justify-center gap-2 text-white font-bold text-[15px] transition-all hover:bg-black/70"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {copied ? (
                "Prompt Copied!"
              ) : (
                <>
                  Copy Prompt
                  <img src={sparkleIcon} alt="" className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Save Button (Always checked for saved items) */}
            <button
              onClick={handleUnsave}
              className="w-[52px] h-[52px] bg-black/60 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center transition-all hover:bg-black/70"
            >
              <img 
                src={bookmarkSaved} 
                alt="Saved" 
                className="w-5 h-5"
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Library;
