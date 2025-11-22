import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { mockPrompts } from "@/data/mockPrompts";
import { Prompt } from "@/types/prompt";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PaywallModal } from "@/components/PaywallModal";

const Library = () => {
  const [savedPrompts] = useState<string[]>(["1", "3", "5"]); // Mock saved IDs
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [paywallOpen, setPaywallOpen] = useState(false);
  const { toast } = useToast();
  const isPro = false;

  const savedItems = mockPrompts.filter(p => savedPrompts.includes(p.id));
  const placeholderCount = 6 - savedItems.length;

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

  return (
    <div className="min-h-screen gradient-bg pb-24">
      <header className="glass border-b border-border sticky top-0 z-40">
        <div className="max-w-md mx-auto px-6 py-6">
          <h1 className="text-2xl font-bold mb-2">BLOOMGEN</h1>
          <p className="text-sm text-muted-foreground">
            ALL YOUR SAVED PROMPTS — READY TO COPY
          </p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 py-6">
        <div className="grid grid-cols-2 gap-4">
          {savedItems.map((prompt) => (
            <button
              key={prompt.id}
              onClick={() => setSelectedPrompt(prompt)}
              className="glass rounded-2xl overflow-hidden aspect-[3/4] transition-smooth hover:scale-[1.02]"
            >
              <img
                src={prompt.image_url}
                alt={prompt.title}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
          
          {Array.from({ length: placeholderCount }).map((_, i) => (
            <div
              key={`placeholder-${i}`}
              className={`glass rounded-2xl aspect-[3/4] ${
                i % 2 === 0 ? "bg-primary/10" : "bg-card"
              }`}
            />
          ))}
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
