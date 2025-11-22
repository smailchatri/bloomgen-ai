import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { PromptCard } from "@/components/PromptCard";
import { PaywallModal } from "@/components/PaywallModal";
import { mockPrompts } from "@/data/mockPrompts";
import { Prompt } from "@/types/prompt";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Explore = () => {
  const [savedPrompts, setSavedPrompts] = useState<string[]>([]);
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const { toast } = useToast();
  const isPro = false; // Placeholder for subscription status

  const handleSave = (id: string) => {
    setSavedPrompts(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

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
        <div className="max-w-md mx-auto px-6 h-16 flex items-center justify-center">
          <h1 className="text-xl font-bold">BLOOMGEN</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 py-6">
        <div className="space-y-6">
          {mockPrompts.map((prompt) => (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
              isSaved={savedPrompts.includes(prompt.id)}
              onSave={handleSave}
              onCopy={handleCopy}
              onClick={setSelectedPrompt}
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
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Explore;
