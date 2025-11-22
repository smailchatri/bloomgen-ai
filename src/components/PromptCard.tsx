import { useState } from "react";
import { Copy, Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "./ui/button";
import { Prompt } from "@/types/prompt";
import { useToast } from "@/hooks/use-toast";

interface PromptCardProps {
  prompt: Prompt;
  isSaved: boolean;
  onSave: (id: string) => void;
  onCopy: (prompt: Prompt) => void;
  onClick: (prompt: Prompt) => void;
}

export const PromptCard = ({ prompt, isSaved, onSave, onCopy, onClick }: PromptCardProps) => {
  const { toast } = useToast();

  return (
    <div className="glass rounded-2xl overflow-hidden transition-smooth hover:scale-[1.02]">
      <div
        className="relative aspect-[3/4] cursor-pointer"
        onClick={() => onClick(prompt)}
      >
        <img
          src={prompt.image_url}
          alt={prompt.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSave(prompt.id);
            toast({
              title: isSaved ? "Removed from library" : "Saved to library",
              duration: 2000,
            });
          }}
          className="absolute top-4 right-4 w-10 h-10 glass rounded-full flex items-center justify-center transition-smooth hover:scale-110"
        >
          {isSaved ? (
            <BookmarkCheck className="w-5 h-5 text-primary" />
          ) : (
            <Bookmark className="w-5 h-5" />
          )}
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-lg font-semibold mb-1">{prompt.title}</h3>
          <p className="text-sm text-muted-foreground mb-3">{prompt.category}</p>
          
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onCopy(prompt);
            }}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl h-12 glow-primary"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Prompt ✨
          </Button>
        </div>
      </div>
    </div>
  );
};
