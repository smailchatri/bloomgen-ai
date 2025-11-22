import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { mockPrompts } from "@/data/mockPrompts";
import { Prompt } from "@/types/prompt";
import { useToast } from "@/hooks/use-toast";
import bookmarkUnsaved from "@/assets/bookmark_unsaved.png";
import bookmarkSaved from "@/assets/library_green.png";

const Explore = () => {
  const [savedPrompts, setSavedPrompts] = useState<string[]>([]);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [buttonText, setButtonText] = useState("Copy Prompt ✨");
  const { toast } = useToast();
  const isPro = true; // Treat all users as subscribed during development

  const currentPrompt = mockPrompts[currentPromptIndex];

  const handleSave = (id: string) => {
    setSavedPrompts(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentPrompt.prompt_text);
    setButtonText("Prompt Copied!");
    setTimeout(() => {
      setButtonText("Copy Prompt ✨");
    }, 1500);
    toast({
      title: "Prompt copied!",
      description: "Ready to create magic ✨",
      duration: 2000,
    });
  };

  const isSaved = savedPrompts.includes(currentPrompt.id);

  return (
    <div className="h-screen w-screen overflow-hidden bg-black relative">
      {/* Fullscreen Image */}
      <img
        src={currentPrompt.image_url}
        alt={currentPrompt.title}
        className="w-full h-full object-cover absolute inset-0"
      />

      {/* Bottom Buttons Container with blur background */}
      <div className="absolute bottom-20 left-0 right-0 flex items-center justify-center gap-4 px-6 pb-6">
        {/* Copy Prompt Button */}
        <button
          onClick={handleCopy}
          className="flex-1 h-14 bg-black/60 backdrop-blur-md rounded-[28px] flex items-center justify-center text-white font-bold text-base transition-all hover:bg-black/70"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {buttonText}
        </button>

        {/* Save Button */}
        <button
          onClick={() => handleSave(currentPrompt.id)}
          className="w-14 h-14 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center transition-all hover:bg-black/70"
        >
          <img 
            src={isSaved ? bookmarkSaved : bookmarkUnsaved} 
            alt="Save" 
            className="w-6 h-6"
          />
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Explore;
