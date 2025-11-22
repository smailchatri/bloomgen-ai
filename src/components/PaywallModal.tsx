import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import { Check, Star } from "lucide-react";

interface PaywallModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PaywallModal = ({ open, onOpenChange }: PaywallModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass border-border max-w-sm rounded-3xl p-8">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center glow-primary">
            <Star className="w-10 h-10 text-primary fill-primary" />
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2">Unlock Unlimited</h2>
            <p className="text-muted-foreground">
              A subscription is required to copy unlimited viral prompts
            </p>
          </div>

          <div className="w-full space-y-3 text-left">
            {[
              "Unlimited Prompt Copies",
              "Full Library Access",
              "Exclusive Viral Prompts",
              "Secure Progress Sync"
            ].map((benefit) => (
              <div key={benefit} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="w-full space-y-3">
            <div className="glass rounded-2xl p-4 border-2 border-primary">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold">Pro Yearly</span>
                <span className="text-sm text-primary">Save 50%</span>
              </div>
              <p className="text-2xl font-bold">$49<span className="text-sm text-muted-foreground">/year</span></p>
            </div>

            <div className="glass rounded-2xl p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold">Pro Monthly</span>
              </div>
              <p className="text-2xl font-bold">$7.99<span className="text-sm text-muted-foreground">/month</span></p>
            </div>
          </div>

          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-14 rounded-xl glow-primary text-lg"
            onClick={() => {
              // Placeholder for subscription logic
              console.log("Subscribe clicked");
            }}
          >
            Subscribe to Pro
          </Button>

          <div className="text-xs text-muted-foreground space-x-2">
            <a href="#" className="hover:text-foreground transition-smooth">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-foreground transition-smooth">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-foreground transition-smooth">Restore</a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
