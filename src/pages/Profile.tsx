import { BottomNav } from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
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

  const handleLogout = () => {
    localStorage.removeItem('mockAuthUser');
    localStorage.removeItem('hasSeenOnboarding');
    toast.success("Logged out successfully");
    navigate("/auth/login");
  };

  const handleDeleteAccount = () => {
    window.location.href = "mailto:support@bloomgen.app?subject=Delete My Bloomgen Account";
  };

  const handleManageSubscription = () => {
    window.open("https://bloomgen.app/support", '_blank');
  };

  const openLink = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      {/* Fixed Background */}
      <div 
        className="fixed inset-0 bg-center bg-no-repeat overflow-hidden"
        style={{ 
          backgroundImage: `url(${personalBg})`,
          backgroundSize: 'cover',
          transform: 'scale(1.1)',
          transformOrigin: 'center center'
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
              <div className="text-white font-bold text-lg">The user name</div>
              <div className="text-white/70 font-light italic text-sm">Joined in (x)</div>
            </div>
          </div>

          {/* Settings Rows */}
          <div className="space-y-3">
            <button
              onClick={() => openLink('https://bloomgen.app/support')}
              className="w-full bg-black/60 backdrop-blur-md rounded-[28px] border border-white/20 p-5 flex items-center gap-4 transition-all hover:bg-black/70"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <img src={helpIcon} alt="" className="w-6 h-6" />
              <span className="text-white font-semibold text-base">Get Help</span>
            </button>

            <button
              onClick={() => openLink('https://bloomgen.app/policies')}
              className="w-full bg-black/60 backdrop-blur-md rounded-[28px] border border-white/20 p-5 flex items-center gap-4 transition-all hover:bg-black/70"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <img src={guidelinesIcon} alt="" className="w-6 h-6" />
              <span className="text-white font-semibold text-base">Community Guidelines</span>
            </button>

            <button
              onClick={() => openLink('https://bloomgen.app/support')}
              className="w-full bg-black/60 backdrop-blur-md rounded-[28px] border border-white/20 p-5 flex items-center gap-4 transition-all hover:bg-black/70"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <img src={faqIcon} alt="" className="w-6 h-6" />
              <span className="text-white font-semibold text-base">FAQ</span>
            </button>

            <button
              onClick={handleDeleteAccount}
              className="w-full bg-black/60 backdrop-blur-md rounded-[28px] border border-white/20 p-5 flex items-center gap-4 transition-all hover:bg-black/70"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <img src={deleteAccountIcon} alt="" className="w-6 h-6" />
              <span className="text-white font-semibold text-base">Delete Account</span>
            </button>

            <button
              onClick={handleManageSubscription}
              className="w-full bg-black/60 backdrop-blur-md rounded-[28px] border border-white/20 p-5 flex items-center gap-4 transition-all hover:bg-black/70"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <img src={deleteAccountIcon} alt="" className="w-6 h-6" />
              <span className="text-white font-semibold text-base">Manage Subscription</span>
            </button>

            <button
              onClick={() => openLink('https://bloomgen.app/policies')}
              className="w-full bg-black/60 backdrop-blur-md rounded-[28px] border border-white/20 p-5 flex items-center gap-4 transition-all hover:bg-black/70"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <img src={privacyIcon} alt="" className="w-6 h-6" />
              <span className="text-white font-semibold text-base">Privacy Policy</span>
            </button>
          </div>

          {/* Terms of Service */}
          <button
            onClick={() => openLink('https://bloomgen.app/policies')}
            className="w-full bg-black/60 backdrop-blur-md rounded-[28px] border border-white/20 p-5 flex items-center gap-4 transition-all hover:bg-black/70 mt-6"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <img src={termsIcon} alt="" className="w-6 h-6" />
            <span className="text-white font-semibold text-base">Terms of Service</span>
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full bg-black/60 backdrop-blur-md rounded-[28px] border border-white/20 p-5 flex items-center gap-4 transition-all hover:bg-black/70 mt-6"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <img src={logoutIcon} alt="" className="w-6 h-6" />
            <span className="text-white font-semibold text-base">Logout</span>
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;
