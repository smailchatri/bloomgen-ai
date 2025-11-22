import { useState } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import paywallBg from "@/assets/paywall_bg.png";
import starShield from "@/assets/star_shield.png";
import closeIcon from "@/assets/close_icon.png";
import sparkleBenefit from "@/assets/sparkle_benefit.png";
import libraryBenefit from "@/assets/library_benefit.png";
import flameBenefit from "@/assets/flame_benefit.png";
import shieldBenefit from "@/assets/shield_benefit.png";
import starIcon from "@/assets/star_icon.png";

interface PaywallModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type PricingPlan = "monthly" | "yearly";

export const PaywallModal = ({ open, onOpenChange }: PaywallModalProps) => {
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan>("monthly");

  const handleRestore = () => {
    // Placeholder for restore purchases logic
    console.log("Restore purchases");
  };

  const handleSubscribe = () => {
    // Placeholder for subscription logic
    console.log("Subscribe to", selectedPlan);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-full w-full h-full p-0 border-0 rounded-none overflow-hidden fixed inset-0 translate-x-0 translate-y-0 data-[state=open]:slide-in-from-bottom-0 data-[state=closed]:slide-out-to-bottom-0 [&>button]:hidden"
        style={{
          background: '#000',
          height: '100dvh',
          maxHeight: '100dvh',
        }}
      >
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <div 
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url(${paywallBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
          <div 
            className="absolute inset-0 w-full h-full"
            style={{
              background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)',
            }}
          />
        </div>

        {/* Close Button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute z-50 w-10 h-10 flex items-center justify-center"
          style={{
            top: 'max(1.5rem, env(safe-area-inset-top) + 1rem)',
            right: '1.5rem',
          }}
        >
          <img src={closeIcon} alt="Close" className="w-8 h-8" />
        </button>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center h-full overflow-hidden" style={{ 
          paddingTop: 'max(3.5rem, env(safe-area-inset-top) + 2rem)',
          paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom) + 1rem)',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
        }}>
          {/* Star Shield Badge */}
          <div className="mb-4">
            <img 
              src={starShield} 
              alt="Premium" 
              className="w-20 h-20"
              style={{
                filter: 'drop-shadow(0 8px 20px rgba(0, 0, 0, 0.5))',
              }}
            />
          </div>

          {/* Main Heading */}
          <div className="text-center mb-5">
            <h1 className="text-white leading-tight mb-0" style={{ fontFamily: 'Inter, sans-serif', fontSize: '24px' }}>
              <span style={{ fontWeight: 900 }}>A subscription</span>{' '}
              <span style={{ fontWeight: 300 }}>is required to </span>
              <span 
                style={{ 
                  fontWeight: 900,
                  fontStyle: 'italic',
                  background: 'linear-gradient(135deg, #fff 0%, #CAFC80 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                copy unlimited viral prompts.
              </span>
            </h1>
          </div>

          {/* Benefits List */}
          <div className="w-full max-w-md space-y-3 mb-5 flex-shrink-0">
            {/* Benefit 1 */}
            <div className="flex items-start gap-3">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ 
                  backgroundColor: '#2B2A2A',
                }}
              >
                <img src={sparkleBenefit} alt="" className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 
                  className="mb-0.5" 
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 700,
                    color: '#CAFC80',
                    fontSize: '16px',
                  }}
                >
                  Unlimited Prompts Copies
                </h3>
                <p 
                  className="text-white/80" 
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 300,
                    fontSize: '13px',
                  }}
                >
                  Copy and paste over 1000+ viral prompt instantly.
                </p>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="flex items-start gap-3">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ 
                  backgroundColor: '#2B2A2A',
                }}
              >
                <img src={libraryBenefit} alt="" className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 
                  className="mb-0.5" 
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 700,
                    color: '#CAFC80',
                    fontSize: '16px',
                  }}
                >
                  Full Library Access
                </h3>
                <p 
                  className="text-white/80" 
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 300,
                    fontSize: '13px',
                  }}
                >
                  Save every inspiring style and prompt to your Library.
                </p>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="flex items-start gap-3">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ 
                  backgroundColor: '#2B2A2A',
                }}
              >
                <img src={flameBenefit} alt="" className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 
                  className="mb-0.5" 
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 700,
                    color: '#CAFC80',
                    fontSize: '16px',
                  }}
                >
                  Exclusive Viral Prompts
                </h3>
                <p 
                  className="text-white/80" 
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 300,
                    fontSize: '13px',
                  }}
                >
                  Be the first to access new viral prompts added daily by our curators.
                </p>
              </div>
            </div>

            {/* Benefit 4 */}
            <div className="flex items-start gap-3">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ 
                  backgroundColor: '#2B2A2A',
                }}
              >
                <img src={shieldBenefit} alt="" className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 
                  className="mb-0.5" 
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 700,
                    color: '#CAFC80',
                    fontSize: '16px',
                  }}
                >
                  Secure Progress Sync
                </h3>
                <p 
                  className="text-white/80" 
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 300,
                    fontSize: '13px',
                  }}
                >
                  Never lose your saved styles. Your account syncs automatically across all your devices.
                </p>
              </div>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="w-full max-w-md flex gap-3 mb-4 flex-shrink-0">
            {/* Monthly Plan */}
            <button
              onClick={() => setSelectedPlan("monthly")}
              className="flex-1 rounded-3xl p-3 transition-all"
              style={{
                backgroundColor: '#2B2A2A',
                border: selectedPlan === "monthly" ? '2px solid #CAFC80' : '2px solid transparent',
                transform: selectedPlan === "monthly" ? 'scale(1.02)' : 'scale(1)',
              }}
            >
              <div className="flex items-center gap-1.5 mb-1.5">
                <img src={starIcon} alt="" className="w-3.5 h-3.5" />
                <span 
                  className="text-[#CAFC80]" 
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 700,
                    fontSize: '12px',
                  }}
                >
                  Pro monthly
                </span>
              </div>
              <div className="mb-0.5 text-left">
                <span 
                  className="text-white"
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 900,
                    fontSize: '24px',
                  }}
                >
                  $7.99
                </span>
                <span 
                  className="text-white/70"
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 900,
                    fontSize: '12px',
                  }}
                >
                  /month
                </span>
              </div>
              <p 
                className="text-white/70 text-left"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  fontStyle: 'italic',
                  fontSize: '10px',
                }}
              >
                Perfect individual needs
              </p>
            </button>

            {/* Yearly Plan */}
            <button
              onClick={() => setSelectedPlan("yearly")}
              className="flex-1 rounded-3xl p-3 transition-all"
              style={{
                backgroundColor: '#2B2A2A',
                border: selectedPlan === "yearly" ? '2px solid #CAFC80' : '2px solid transparent',
                transform: selectedPlan === "yearly" ? 'scale(1.02)' : 'scale(1)',
              }}
            >
              <div className="flex items-center gap-1.5 mb-1.5">
                <img src={starIcon} alt="" className="w-3.5 h-3.5" />
                <span 
                  className="text-[#CAFC80]" 
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 700,
                    fontSize: '12px',
                  }}
                >
                  Pro yearly
                </span>
              </div>
              <div className="mb-0.5 text-left">
                <span 
                  className="text-white"
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 900,
                    fontSize: '24px',
                  }}
                >
                  $49
                </span>
                <span 
                  className="text-white/70"
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 900,
                    fontSize: '12px',
                  }}
                >
                  /year
                </span>
              </div>
              <p 
                className="text-white/70 text-left"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  fontStyle: 'italic',
                  fontSize: '10px',
                }}
              >
                Most users choose this
              </p>
            </button>
          </div>

          {/* Subscribe Button */}
          <Button
            onClick={handleSubscribe}
            className="w-full max-w-md h-12 rounded-[24px] mb-3 hover:opacity-90 transition-opacity flex-shrink-0"
            style={{
              backgroundColor: '#CAFC80',
              color: '#000',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '15px',
            }}
          >
            Subscribe to Pro
          </Button>

          {/* Footer Text */}
          <div className="w-full max-w-md px-4 mb-2 flex-shrink-0">
            <p 
              className="text-white/60 text-center leading-snug"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                fontWeight: 300,
                fontSize: '9px',
              }}
            >
              Payment will be charged to your iTunes Account at confirmation of purchase. Subscription auto-renews unless canceled at least 24 hours before the end of the current period.
            </p>
          </div>

          {/* Footer Links */}
          <div className="flex items-center justify-center gap-2 flex-wrap flex-shrink-0">
            <a 
              href="https://bloomgen.app/policies" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontSize: '11px',
              }}
            >
              Terms of Service
            </a>
            <span className="text-white/40" style={{ fontSize: '11px' }}>•</span>
            <a 
              href="https://bloomgen.app/policies" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontSize: '11px',
              }}
            >
              Privacy Policy
            </a>
            <span className="text-white/40" style={{ fontSize: '11px' }}>•</span>
            <button 
              onClick={handleRestore}
              className="text-white"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontSize: '11px',
              }}
            >
              Restore Purchases
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
