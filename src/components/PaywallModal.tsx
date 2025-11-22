import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import paywallBg from "@/assets/paywall_bg.png";
import starShield from "@/assets/star_shield.png";
import closeIcon from "@/assets/close_icon.png";
import sparkleBenefit from "@/assets/sparkle_benefit.png";
import libraryBenefit from "@/assets/library_benefit.png";
import flameBenefit from "@/assets/flame_benefit.png";
import shieldBenefit from "@/assets/shield_benefit.png";

interface PaywallModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PaywallModal = ({ open, onOpenChange }: PaywallModalProps) => {
  const handleRestore = () => {
    // Placeholder for restore purchases logic
    console.log("Restore purchases");
  };

  const handleSubscribe = () => {
    // Placeholder for subscription logic
    console.log("Subscribe clicked");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-full w-full h-screen p-0 border-0 rounded-none overflow-y-auto"
        style={{
          background: '#000',
        }}
      >
        {/* Background Image with Blur */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${paywallBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(40px)',
            opacity: 0.6,
          }}
        />

        {/* Close Button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-6 right-6 z-50 w-10 h-10 flex items-center justify-center"
        >
          <img src={closeIcon} alt="Close" className="w-8 h-8" />
        </button>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center px-6 py-12 min-h-screen">
          {/* Star Shield Badge */}
          <div className="mb-8 mt-8">
            <img 
              src={starShield} 
              alt="Premium" 
              className="w-28 h-28"
              style={{
                filter: 'drop-shadow(0 8px 20px rgba(0, 0, 0, 0.5))',
              }}
            />
          </div>

          {/* Main Heading */}
          <div className="text-center mb-10 px-4">
            <h1 className="text-white text-3xl leading-tight mb-0" style={{ fontFamily: 'Inter, sans-serif' }}>
              <span style={{ fontWeight: 900 }}>A subscription</span>{' '}
              <span style={{ fontWeight: 300 }}>is required to</span>{' '}
              <span 
                style={{ 
                  fontWeight: 900,
                  fontStyle: 'italic',
                  background: 'linear-gradient(90deg, #fff 0%, #CAFC80 100%)',
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
          <div className="w-full max-w-md space-y-4 mb-8">
            {/* Benefit 1 */}
            <div className="flex items-start gap-4 bg-black/40 backdrop-blur-md rounded-3xl p-4 border border-white/10">
              <div className="w-14 h-14 rounded-full bg-black/60 flex items-center justify-center flex-shrink-0">
                <img src={sparkleBenefit} alt="" className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h3 
                  className="text-lg mb-1" 
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 700,
                    color: '#CAFC80',
                  }}
                >
                  Unlimited Prompts Copies
                </h3>
                <p 
                  className="text-sm text-white/80" 
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 300,
                  }}
                >
                  Copy and paste over 1000+ viral prompt instantly.
                </p>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="flex items-start gap-4 bg-black/40 backdrop-blur-md rounded-3xl p-4 border border-white/10">
              <div className="w-14 h-14 rounded-full bg-black/60 flex items-center justify-center flex-shrink-0">
                <img src={libraryBenefit} alt="" className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h3 
                  className="text-lg mb-1" 
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 700,
                    color: '#CAFC80',
                  }}
                >
                  Full Library Access
                </h3>
                <p 
                  className="text-sm text-white/80" 
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 300,
                  }}
                >
                  Save every inspiring style and prompt to your Library.
                </p>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="flex items-start gap-4 bg-black/40 backdrop-blur-md rounded-3xl p-4 border border-white/10">
              <div className="w-14 h-14 rounded-full bg-black/60 flex items-center justify-center flex-shrink-0">
                <img src={flameBenefit} alt="" className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h3 
                  className="text-lg mb-1" 
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 700,
                    color: '#CAFC80',
                  }}
                >
                  Exclusive Viral Prompts
                </h3>
                <p 
                  className="text-sm text-white/80" 
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 300,
                  }}
                >
                  Be the first to access new viral prompts added daily by our curators.
                </p>
              </div>
            </div>

            {/* Benefit 4 */}
            <div className="flex items-start gap-4 bg-black/40 backdrop-blur-md rounded-3xl p-4 border border-white/10">
              <div className="w-14 h-14 rounded-full bg-black/60 flex items-center justify-center flex-shrink-0">
                <img src={shieldBenefit} alt="" className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h3 
                  className="text-lg mb-1" 
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 700,
                    color: '#CAFC80',
                  }}
                >
                  Secure Progress Sync
                </h3>
                <p 
                  className="text-sm text-white/80" 
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 300,
                  }}
                >
                  Never lose your saved styles. Your account syncs automatically across all your devices.
                </p>
              </div>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="w-full max-w-md flex gap-4 mb-6">
            {/* Monthly Plan */}
            <div className="flex-1 bg-black/40 backdrop-blur-md rounded-3xl p-5 border-2 border-[#CAFC80]">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#CAFC80] text-lg">⭐</span>
                <span 
                  className="text-[#CAFC80]" 
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 700,
                    fontSize: '15px',
                  }}
                >
                  Pro monthly
                </span>
              </div>
              <div className="mb-2">
                <span 
                  className="text-white text-4xl"
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 900,
                  }}
                >
                  $7.99
                </span>
                <span 
                  className="text-white/70 text-lg"
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 900,
                  }}
                >
                  /month
                </span>
              </div>
              <p 
                className="text-white/70 text-sm"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  fontStyle: 'italic',
                }}
              >
                Perfect individual needs
              </p>
            </div>

            {/* Yearly Plan */}
            <div className="flex-1 bg-black/40 backdrop-blur-md rounded-3xl p-5 border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#CAFC80] text-lg">⭐</span>
                <span 
                  className="text-[#CAFC80]" 
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 700,
                    fontSize: '15px',
                  }}
                >
                  Pro yearly
                </span>
              </div>
              <div className="mb-2">
                <span 
                  className="text-white text-4xl"
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 900,
                  }}
                >
                  $49
                </span>
                <span 
                  className="text-white/70 text-lg"
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 900,
                  }}
                >
                  /year
                </span>
              </div>
              <p 
                className="text-white/70 text-sm"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  fontStyle: 'italic',
                }}
              >
                Most users choose this
              </p>
            </div>
          </div>

          {/* Subscribe Button */}
          <Button
            onClick={handleSubscribe}
            className="w-full max-w-md h-16 rounded-3xl mb-6"
            style={{
              backgroundColor: '#CAFC80',
              color: '#000',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '18px',
            }}
          >
            Subscribe to Pro
          </Button>

          {/* Footer Text */}
          <div className="w-full max-w-md px-4 mb-4">
            <p 
              className="text-white/60 text-center text-xs leading-relaxed"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                fontWeight: 300,
              }}
            >
              Payment will be charged to your iTunes Account at confirmation of purchase.
              Subscription auto-renews unless canceled at least 24 hours before the end of the
              current period.
            </p>
          </div>

          {/* Footer Links */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <a 
              href="https://bloomgen.app/policies" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white text-sm"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
              }}
            >
              Terms of Service
            </a>
            <span className="text-white/40">•</span>
            <a 
              href="https://bloomgen.app/policies" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white text-sm"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
              }}
            >
              Privacy Policy
            </a>
            <span className="text-white/40">•</span>
            <button 
              onClick={handleRestore}
              className="text-white text-sm"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
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
