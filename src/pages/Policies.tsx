import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Policies = () => {
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
          <h1 className="text-4xl font-bold mb-4">Legal & Policies</h1>
          <p className="text-xl text-muted-foreground">Our terms, privacy policy, and legal information</p>
        </header>

        <section className="space-y-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">Last Updated: November 2024</p>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">Information We Collect</h3>
                <p>We collect information you provide directly to us, including your email address when you create an account, and usage data to improve our services.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">How We Use Your Information</h3>
                <p>We use your information to provide, maintain, and improve our services, to communicate with you, and to protect the security of our platform.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">Data Security</h3>
                <p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">Your Rights</h3>
                <p>You have the right to access, update, or delete your personal information at any time. Contact us at support@bloomgen.app for assistance.</p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Terms of Service</h2>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">Last Updated: November 2024</p>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">Acceptance of Terms</h3>
                <p>By accessing or using BLOOMGEN, you agree to be bound by these Terms of Service and our Privacy Policy.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">User Responsibilities</h3>
                <p>You are responsible for maintaining the security of your account and for all activities that occur under your account. You must comply with all applicable laws and our Community Guidelines.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">Intellectual Property</h3>
                <p>The content you create using BLOOMGEN belongs to you. However, you grant us a license to use, modify, and display this content as necessary to provide our services.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">Prohibited Activities</h3>
                <p>You may not use BLOOMGEN to create, share, or promote illegal, harmful, hateful, or non-consensual content. Violations may result in account suspension or termination.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">Limitation of Liability</h3>
                <p>BLOOMGEN is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of our services.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">Changes to Terms</h3>
                <p>We may update these terms from time to time. Continued use of BLOOMGEN after changes constitutes acceptance of the updated terms.</p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Subscription Management</h2>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Premium Features</h3>
                <p>Premium subscriptions unlock additional features and benefits within BLOOMGEN.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">Billing</h3>
                <p>Subscriptions are billed monthly or annually based on your chosen plan. You can cancel at any time.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">Refunds</h3>
                <p>Refund policies are handled on a case-by-case basis. Contact support@bloomgen.app for refund requests.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">Manage Your Subscription</h3>
                <p>Contact us at support@bloomgen.app to manage or cancel your subscription.</p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Contact</h2>
            <p className="text-sm text-muted-foreground mb-2">For questions about these policies:</p>
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

export default Policies;
