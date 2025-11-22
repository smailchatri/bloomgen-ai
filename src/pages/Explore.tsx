import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { mockPrompts } from "@/data/mockPrompts";
import { Prompt } from "@/types/prompt";
import { useToast } from "@/hooks/use-toast";
import bookmarkUnsaved from "@/assets/bookmark_unsaved.png";
import bookmarkSaved from "@/assets/library_green.png";
import sparkleIcon from "@/assets/sparkle_icon.png";

const Explore = () => {
  const [savedPrompts, setSavedPrompts] = useState<string[]>([]);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const isPro = true; // Treat all users as subscribed during development

  const currentPrompt = mockPrompts[currentPromptIndex];

  const handleSave = (id: string) => {
    const isCurrentlySaved = savedPrompts.includes(id);
    setSavedPrompts(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
    toast({
      title: isCurrentlySaved ? "Prompt removed!" : "Prompt saved!",
      description: isCurrentlySaved ? "Removed from library" : "Added to library",
      duration: 2000,
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentPrompt.prompt_text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
    toast({
      title: "Prompt copied!",
      description: "Ready to create magic",
      duration: 2000,
    });
  };

  const isSaved = savedPrompts.includes(currentPrompt.id);

  return (
    <div 
      className="h-screen w-screen overflow-y-auto overflow-x-hidden bg-black relative"
      style={{
        scrollSnapType: 'y mandatory',
        scrollBehavior: 'smooth'
      }}
    >
      {/* Scrollable Content with Snap Points */}
      {mockPrompts.map((prompt, index) => (
        <div 
          key={prompt.id} 
          className="h-screen w-full relative"
          style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
        >
          <img
            src={prompt.image_url}
            alt={prompt.title}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

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

        {/* Save Button */}
        <button
          onClick={() => handleSave(currentPrompt.id)}
          className="w-[52px] h-[52px] bg-black/60 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center transition-all hover:bg-black/70"
        >
          <img 
            src={isSaved ? bookmarkSaved : bookmarkUnsaved} 
            alt="Save" 
            className="w-5 h-5"
          />
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Explore;
