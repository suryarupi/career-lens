import {
  Sparkles,
  LayoutDashboard,
  FileSearch,
  MessageSquare,
  UserCircle,
} from "lucide-react";

import { NavLink as RouterNavLink } from "react-router-dom";

/* ================= Header ================= */

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="flex items-center justify-center bg-primary-600 rounded-xl p-2 shadow-glow">
              <Sparkles size={18} className="text-white" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-text-primary">
              CareerLens <span className="text-primary-400">AI</span>
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <HeaderNavItem
              to="/dashboard"
              icon={LayoutDashboard}
              label="Dashboard"
            />
            <HeaderNavItem
              to="/resume-ai"
              icon={FileSearch}
              label="Resume AI"
            />
            <HeaderNavItem
              to="/interview"
              icon={MessageSquare}
              label="Mock Interview"
            />
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-surfaceSoft transition">
              <UserCircle size={22} />
            </button>

            <button className="btn-primary hidden sm:inline-flex text-sm">
              Upgrade Pro
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

/* ================= Nav Item ================= */

const HeaderNavItem = ({ to, icon: Icon, label }) => {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all
         ${
           isActive
             ? "bg-surfaceSoft text-text-primary shadow-soft"
             : "text-text-secondary hover:text-text-primary hover:bg-surface"
         }`
      }
    >
      <Icon size={16} />
      {label}
    </RouterNavLink>
  );
};
