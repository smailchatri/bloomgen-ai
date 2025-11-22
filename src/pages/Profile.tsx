import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  HelpCircle, 
  FileText, 
  MessageSquare, 
  Trash2, 
  CreditCard, 
  Shield, 
  FileCheck,
  LogOut 
} from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: HelpCircle, label: "Get Help", href: "#" },
    { icon: MessageSquare, label: "Community Guidelines", href: "#" },
    { icon: FileText, label: "FAQ", href: "#" },
    { icon: Trash2, label: "Delete Account", href: "#", danger: true },
    { icon: CreditCard, label: "Manage Subscription", href: "#" },
    { icon: Shield, label: "Privacy Policy", href: "#" },
    { icon: FileCheck, label: "Terms of Service", href: "#" },
  ];

  return (
    <div className="min-h-screen gradient-bg pb-24">
      <div className="relative min-h-[40vh] glass">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 opacity-50" />
        <div className="relative max-w-md mx-auto px-6 pt-16 pb-8 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full glass border-2 border-primary/50 flex items-center justify-center mb-4 glow-primary">
            <span className="text-4xl">👤</span>
          </div>
          <h2 className="text-2xl font-bold mb-1">User Name</h2>
          <p className="text-sm text-muted-foreground">Joined January 2025</p>
        </div>
      </div>

      <main className="max-w-md mx-auto px-6 py-6">
        <div className="glass rounded-2xl overflow-hidden divide-y divide-border">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`flex items-center gap-4 p-4 transition-smooth hover:bg-card ${
                item.danger ? "text-destructive" : ""
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </a>
          ))}
        </div>

        <Button
          onClick={() => navigate("/onboarding/1")}
          className="w-full mt-6 glass hover:bg-card border border-border h-14 rounded-xl font-semibold transition-smooth"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </Button>
      </main>

      <BottomNav />
    </div>
  );
};

export default Profile;
