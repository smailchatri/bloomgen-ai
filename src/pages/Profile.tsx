import { BottomNav } from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import personalBg from "@/assets/personal_bg.png";
import userProfile from "@/assets/user_profile.png";
import helpIcon from "@/assets/help_icon.png";
import guidelinesIcon from "@/assets/guidelines_icon.png";
import faqIcon from "@/assets/faq_icon.png";
import deleteAccountIcon from "@/assets/delete_account_icon.png";
import privacyIcon from "@/assets/privacy_icon.png";
import termsIcon from "@/assets/terms_icon.png";
import logoutIcon from "@/assets/logout_icon.png";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const getUserName = () => {
    return user?.email?.split('@')[0] || "User";
  };

  const getJoinDate = () => {
    if (!user?.created_at) return "Recently";
    const date = new Date(user.created_at);
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  const handleLogout = async () => {
    try {
      // Clear onboarding flag to show onboarding screens again
      localStorage.removeItem('hasSeenOnboarding');
      
      // Sign out from Supabase
      await supabase.auth.signOut();
      
      toast.success("Logged out successfully");
      navigate("/onboarding/1");
    } catch (error) {
      toast.error("Failed to logout");
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      {/* Fixed Background */}
      <div 
        className="fixed inset-0 overflow-hidden"
        style={{ 
          backgroundImage: `url(${personalBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Scrollable Content */}
      <div className="relative h-full overflow-y-auto pb-24">
        <div className="max-w-md mx-auto px-6 pt-16 space-y-4">
          {/* Profile Header */}
          <div 
            className="bg-black/60 backdrop-blur-md rounded-[32px] border border-white/20 p-6 flex items-center gap-4"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <img 
              src={userProfile} 
              alt="Profile" 
              className="w-16 h-16 rounded-full"
            />
            <div>
              <div className="text-white text-lg" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                {getUserName()}
              </div>
              <div className="text-white/70 text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontStyle: 'italic' }}>
                Joined in {getJoinDate()}
              </div>
            </div>
          </div>

          {/* Settings Rows */}
          <div className="space-y-3">
            <a
              href="https://bloomgen.app/support"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-black/60 backdrop-blur-md rounded-[28px] border border-white/20 p-5 flex items-center gap-4 transition-all hover:bg-black/70"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <img src={helpIcon} alt="" className="w-6 h-6" />
              <span className="text-white text-base" style={{ fontWeight: 600 }}>Get Help</span>
            </a>

            <a
              href="https://bloomgen.app/policies"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-black/60 backdrop-blur-md rounded-[28px] border border-white/20 p-5 flex items-center gap-4 transition-all hover:bg-black/70"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <img src={guidelinesIcon} alt="" className="w-6 h-6" />
              <span className="text-white text-base" style={{ fontWeight: 600 }}>Community Guidelines</span>
            </a>

            <a
              href="https://bloomgen.app/support"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-black/60 backdrop-blur-md rounded-[28px] border border-white/20 p-5 flex items-center gap-4 transition-all hover:bg-black/70"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <img src={faqIcon} alt="" className="w-6 h-6" />
              <span className="text-white text-base" style={{ fontWeight: 600 }}>FAQ</span>
            </a>

            <a
              href="mailto:support@bloomgen.app?subject=Delete Account Request&body=I want to delete my account."
              className="w-full bg-black/60 backdrop-blur-md rounded-[28px] border border-white/20 p-5 flex items-center gap-4 transition-all hover:bg-black/70"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <img src={deleteAccountIcon} alt="" className="w-6 h-6" />
              <span className="text-white text-base" style={{ fontWeight: 600 }}>Delete Account</span>
            </a>

            <a
              href="https://bloomgen.app/policies"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-black/60 backdrop-blur-md rounded-[28px] border border-white/20 p-5 flex items-center gap-4 transition-all hover:bg-black/70"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <img src={deleteAccountIcon} alt="" className="w-6 h-6" />
              <span className="text-white text-base" style={{ fontWeight: 600 }}>Manage Subscription</span>
            </a>

            <a
              href="https://bloomgen.app/policies"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-black/60 backdrop-blur-md rounded-[28px] border border-white/20 p-5 flex items-center gap-4 transition-all hover:bg-black/70"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <img src={privacyIcon} alt="" className="w-6 h-6" />
              <span className="text-white text-base" style={{ fontWeight: 600 }}>Privacy Policy</span>
            </a>
          </div>

          {/* Terms of Service */}
          <a
            href="https://bloomgen.app/policies"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-black/60 backdrop-blur-md rounded-[28px] border border-white/20 p-5 flex items-center gap-4 transition-all hover:bg-black/70 mt-6"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <img src={termsIcon} alt="" className="w-6 h-6" />
            <span className="text-white text-base" style={{ fontWeight: 600 }}>Terms of Service</span>
          </a>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full bg-black/60 backdrop-blur-md rounded-[28px] border border-white/20 p-5 flex items-center gap-4 transition-all hover:bg-black/70 mt-6"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <img src={logoutIcon} alt="" className="w-6 h-6" />
            <span className="text-white text-base" style={{ fontWeight: 600 }}>Logout</span>
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;
