import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Onboarding2 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen gradient-bg flex flex-col items-center justify-between p-6 pb-safe">
      <div className="flex-1 flex flex-col items-center justify-center max-w-md w-full">
        <div className="glass rounded-3xl p-8 mb-8 aspect-square w-full max-w-sm flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🎨</div>
            <h2 className="text-2xl font-bold">Save & Organize</h2>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-center mb-4">
          Build Your Library
        </h1>
        <p className="text-center text-muted-foreground text-lg">
          Save your favorite prompts and access them anytime, anywhere
        </p>
      </div>

      <div className="w-full max-w-md space-y-4">
        <div className="flex justify-center gap-2 mb-6">
          <div className="w-8 h-2 rounded-full bg-muted" />
          <div className="w-8 h-2 rounded-full bg-primary glow-primary" />
          <div className="w-8 h-2 rounded-full bg-muted" />
        </div>

        <Button
          onClick={() => navigate("/onboarding/3")}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-14 rounded-xl glow-primary text-lg"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default Onboarding2;
