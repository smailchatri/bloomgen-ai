import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { mockPrompts } from "@/data/mockPrompts";
import { Prompt } from "@/types/prompt";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PaywallModal } from "@/components/PaywallModal";
import bloomgenLogo from "@/assets/bloomgen_logo.png";

const Library = () => {
  const [savedPrompts] = useState<string[]>(["1", "3", "5"]); // Mock saved IDs
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [paywallOpen, setPaywallOpen] = useState(false);
  const { toast } = useToast();
  const isPro = false;

  const savedItems = mockPrompts.filter(p => savedPrompts.includes(p.id));
  
  // Create grid pattern: 3 columns, alternating colors
  // Pattern: Gray, Green, Gray / Green, Gray, Green / Gray, Green, Gray
  const gridPattern = [
    false, true, false,  // Row 1: Gray, Green, Gray
    true, false, true,   // Row 2: Green, Gray, Green
    false, true, false   // Row 3: Gray, Green, Gray
  ];

  const handleCopy = (prompt: Prompt) => {
    if (isPro) {
      navigator.clipboard.writeText(prompt.prompt_text);
      toast({
        title: "Prompt copied!",
        description: "Ready to create magic ✨",
        duration: 2000,
      });
    } else {
      setPaywallOpen(true);
    }
  };

  const handleItemClick = (prompt: Prompt) => {
    // Copy to clipboard when tapping a saved item
    navigator.clipboard.writeText(prompt.prompt_text);
    toast({
      title: "Prompt Copied!",
      description: "Ready to create magic ✨",
      duration: 2000,
      className: "glass border-border",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a2f1a] to-[#0a1f0a] pb-24">
      <header className="px-6 pt-12 pb-8 text-center">
        <div className="flex justify-center mb-6">
          <img src={bloomgenLogo} alt="Bloomgen" className="h-12" />
        </div>
        <h1 className="text-white text-2xl tracking-wide mb-1" style={{ fontFamily: 'Inter', fontWeight: 900 }}>
          ALL YOUR SAVED PROMPTS
        </h1>
        <h2 className="text-white text-2xl" style={{ fontFamily: 'Inter', fontWeight: 500, fontStyle: 'italic' }}>
          READY TO COPY!
        </h2>
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
      <PaywallModal open={paywallOpen} onOpenChange={setPaywallOpen} />

      <Dialog open={!!selectedPrompt} onOpenChange={() => setSelectedPrompt(null)}>
        <DialogContent className="glass border-border max-w-sm rounded-3xl p-0 overflow-hidden">
          {selectedPrompt && (
            <div className="relative">
              <img
                src={selectedPrompt.image_url}
                alt={selectedPrompt.title}
                className="w-full aspect-[3/4] object-cover"
              />
              <div className="p-6 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedPrompt.title}</h2>
                  <p className="text-sm text-muted-foreground">{selectedPrompt.category}</p>
                </div>
                <p className="text-sm leading-relaxed">{selectedPrompt.prompt_text}</p>
                <Button
                  onClick={() => handleCopy(selectedPrompt)}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl h-12 glow-primary"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Prompt ✨
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Library;
