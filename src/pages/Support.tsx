import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Support = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Link 
          to="/profile" 
          className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Profile
        </Link>

        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Support & Help</h1>
          <p className="text-xl text-muted-foreground">Everything you need to know about BLOOMGEN</p>
        </header>

        <section className="space-y-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              🛡️ Community Guidelines
            </h2>
            <p className="text-muted-foreground mb-4">Creating a safe and positive creative environment</p>
            
            <div className="space-y-4 text-sm">
              <p>BLOOMGEN is committed to fostering a creative, respectful, and safe community. To ensure everyone can enjoy the app, we require all users to adhere to the following guidelines:</p>
              
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold">No Illegal Content:</h3>
                  <p className="text-muted-foreground">Do not use BLOOMGEN to create, share, or promote any content that violates local, national, or international laws.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold">No Harmful or Hateful Content:</h3>
                  <p className="text-muted-foreground">Content that promotes violence, hatred, harassment, or discrimination based on race, ethnicity, religion, gender, sexual orientation, disability, or any other protected characteristic is strictly prohibited.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold">No Non-Consensual Content:</h3>
                  <p className="text-muted-foreground">Never create or share images of real individuals without their explicit consent, especially in sensitive or compromising contexts. Respect privacy and personal boundaries.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold">No Explicit or Inappropriate Content:</h3>
                  <p className="text-muted-foreground">BLOOMGEN is not to be used for creating sexually explicit, graphic, or otherwise inappropriate content involving minors or non-consenting adults.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold">Respect Intellectual Property:</h3>
                  <p className="text-muted-foreground">While you own the images you create, do not use BLOOMGEN to infringe on others' copyrights, trademarks, or intellectual property rights.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold">Be Positive and Constructive:</h3>
                  <p className="text-muted-foreground">Engage with the community in a supportive and encouraging manner. Spread creativity, not negativity.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              ❓ FAQ
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">How do I save prompts?</h3>
                <p className="text-muted-foreground text-sm">Tap the bookmark icon on any prompt in the Explore section to save it to your Library.</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">How do I copy a prompt?</h3>
                <p className="text-muted-foreground text-sm">Open any prompt from your Library and tap the copy button to copy the text to your clipboard.</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Can I use these prompts commercially?</h3>
                <p className="text-muted-foreground text-sm">Please review our Terms of Service for details on commercial usage rights.</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">How do I delete my account?</h3>
                <p className="text-muted-foreground text-sm">Contact us at support@bloomgen.app to request account deletion.</p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              📧 Contact Us
            </h2>
            <p className="text-muted-foreground mb-4">Need help? Have questions? We're here for you!</p>
            <a 
              href="mailto:support@bloomgen.app" 
              className="text-primary hover:underline font-semibold"
            >
              support@bloomgen.app
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Support;
