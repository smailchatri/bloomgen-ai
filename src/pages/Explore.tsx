import { useState, useEffect, useRef } from "react";
import { BottomNav } from "@/components/BottomNav";
import { PaywallModal } from "@/components/PaywallModal";
import { useToast } from "@/hooks/use-toast";
import { usePrompts, useSavePrompt, useUnsavePrompt, useSavedPrompts } from "@/hooks/usePrompts";
import { usePremium } from "@/hooks/usePremium";
import bookmarkUnsaved from "@/assets/bookmark_unsaved.png";
import bookmarkSaved from "@/assets/library_green.png";
import sparkleIcon from "@/assets/sparkle_icon.png";
import { Loader2 } from "lucide-react";

const Explore = () => {
  const [copied, setCopied] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [seenPrompts, setSeenPrompts] = useState<Set<string>>(new Set());
  const [brokenImages, setBrokenImages] = useState<Set<string>>(new Set());
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Fetch data
  const { data: allPrompts = [], isLoading: promptsLoading } = usePrompts();
  const { data: savedPromptsList = [] } = useSavedPrompts();
  const { data: premiumStatus } = usePremium();
  const savePromptMutation = useSavePrompt();
  const unsavePromptMutation = useUnsavePrompt();

  const isPremium = premiumStatus?.isPremium || false;

  // Create smart prompt list: always exclude saved prompts and broken images
  const savedPromptIds = new Set(savedPromptsList.map(p => p.id));
  const availablePrompts = allPrompts
    .filter(p => !savedPromptIds.has(p.id) && !brokenImages.has(p.id));

  const currentPrompt = availablePrompts[currentIndex];

  // Track seen prompts on scroll
  useEffect(() => {
    if (currentPrompt && !seenPrompts.has(currentPrompt.id)) {
      setSeenPrompts(prev => new Set([...prev, currentPrompt.id]));
    }
  }, [currentPrompt, seenPrompts]);

  // Handle scroll to update current index with seamless infinite loop
  useEffect(() => {
    const container = containerRef.current;
    if (!container || availablePrompts.length === 0) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const windowHeight = window.innerHeight;
      const totalPrompts = availablePrompts.length;
      
      // Calculate actual index in the original array
      const scrollIndex = Math.round(scrollTop / windowHeight);
      const actualIndex = scrollIndex % totalPrompts;
      
      if (actualIndex !== currentIndex) {
        setCurrentIndex(actualIndex);
      }

      // Reset scroll position when reaching the end of second repetition
      // This creates seamless infinite scroll
      if (scrollIndex >= totalPrompts * 2) {
        container.scrollTop = totalPrompts * windowHeight;
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [currentIndex, availablePrompts.length]);

  const handleSave = async (id: string) => {
    const isSaved = savedPromptIds.has(id);
    
    if (isSaved) {
      await unsavePromptMutation.mutateAsync(id);
    } else {
      await savePromptMutation.mutateAsync(id);
    }
  };

  const handleCopy = () => {
    // TEMPORARY: Paywall disabled for testing
    // if (!isPremium) {
    //   setShowPaywall(true);
    //   return;
    // }
    
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

  if (promptsLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-black">
        <p className="text-white">Loading prompts...</p>
      </div>
    );
  }

  if (!availablePrompts.length) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-black">
        <p className="text-white">No prompts available. Add some via Google Sheets sync!</p>
      </div>
    );
  }

  const isSaved = currentPrompt && savedPromptIds.has(currentPrompt.id);

  return (
    <div 
      ref={containerRef}
      className="h-screen w-screen overflow-y-auto overflow-x-hidden bg-black relative"
      style={{
        scrollSnapType: 'y mandatory',
        scrollBehavior: 'smooth'
      }}
    >
      {/* Scrollable Content with Snap Points - Render prompts 3 times for seamless infinite scroll */}
      {[...availablePrompts, ...availablePrompts, ...availablePrompts].map((prompt, index) => {
        const isLoaded = loadedImages.has(prompt.id);
        const isBroken = brokenImages.has(prompt.id);
        
        return (
          <div 
            key={`${prompt.id}-${index}`}
            className="h-screen w-full relative"
            style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
          >
            {!isLoaded && !isBroken && (
              <div className="absolute inset-0 flex items-center justify-center bg-black">
                <Loader2 className="w-8 h-8 animate-spin text-white/50" />
              </div>
            )}
            {!isBroken && (
              <img
                src={prompt.image_url}
                alt={prompt.title || ""}
                className="w-full h-full object-cover"
                style={{ display: isLoaded ? 'block' : 'none' }}
                onLoad={() => {
                  setLoadedImages(prev => new Set([...prev, prompt.id]));
                }}
                onError={() => {
                  setBrokenImages(prev => new Set([...prev, prompt.id]));
                }}
              />
            )}
            {isBroken && (
              <div className="absolute inset-0 flex items-center justify-center bg-black">
                <p className="text-white/50 text-sm">Image unavailable</p>
              </div>
            )}
          </div>
        );
      })}

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
      
      {/* Paywall Modal */}
      <PaywallModal open={showPaywall} onOpenChange={setShowPaywall} />
    </div>
  );
};

export default Explore;
