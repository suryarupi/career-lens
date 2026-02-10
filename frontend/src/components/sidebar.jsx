import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileSearch,
  BarChart3,
  Briefcase,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const navItemStyles = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium
     ${
       isActive
         ? "bg-primary-600 text-white shadow-soft"
         : "text-text-secondary hover:bg-surfaceSoft hover:text-text-primary"
     }`;

  return (
    <aside className="w-64 shrink-0 min-h-screen bg-surface border-r border-border flex flex-col p-4">
      {/* Brand */}
      <div className="mb-10 px-2">
        <h1 className="text-xl font-semibold tracking-tight text-text-primary">
          CareerLens <span className="text-primary-400">AI</span>
        </h1>
        <p className="text-xs text-text-muted mt-1">
          Engineering Career Hub
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        <NavLink to="/dashboard" className={navItemStyles}>
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/resume-ai" className={navItemStyles}>
          <FileSearch size={18} />
          <span>Resume AI</span>
        </NavLink>

        <NavLink to="/skill-map" className={navItemStyles}>
          <BarChart3 size={18} />
          <span>Skill Mapping</span>
        </NavLink>

        <NavLink to="/opportunities" className={navItemStyles}>
          <Briefcase size={18} />
          <span>Opportunities</span>
        </NavLink>
      </nav>

      {/* Footer / Logout */}
      <div className="border-t border-border pt-4 mt-6">
        <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-text-secondary hover:text-red-400 hover:bg-surfaceSoft transition">
          <LogOut size={18} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
