import { Home, Bookmark, User } from "lucide-react";
import { NavLink } from "./NavLink";

export const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 glass border-t border-border z-50 pb-safe">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto px-6">
        <NavLink
          to="/explore"
          className="flex flex-col items-center gap-1 transition-smooth"
          activeClassName="text-primary"
        >
          {({ isActive }) => (
            <>
              <Home className={`w-6 h-6 ${isActive ? "glow-primary" : ""}`} />
              <span className="text-xs font-medium">Explore</span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/library"
          className="flex flex-col items-center gap-1 transition-smooth"
          activeClassName="text-primary"
        >
          {({ isActive }) => (
            <>
              <Bookmark className={`w-6 h-6 ${isActive ? "glow-primary" : ""}`} />
              <span className="text-xs font-medium">Library</span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/profile"
          className="flex flex-col items-center gap-1 transition-smooth"
          activeClassName="text-primary"
        >
          {({ isActive }) => (
            <>
              <User className={`w-6 h-6 ${isActive ? "glow-primary" : ""}`} />
              <span className="text-xs font-medium">Personal</span>
            </>
          )}
        </NavLink>
      </div>
    </nav>
  );
};
