import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileSearch, 
  BarChart3, 
  Briefcase, 
  LogOut 
} from 'lucide-react'; // Clean, modern icons

const Sidebar = () => {
  // Helper to style the active link
  const navItemStyles = ({ isActive }) => 
    `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
      isActive 
        ? 'bg-blue-600 text-white shadow-lg' 
        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
    }`;

  return (
    <div className="h-screen w-64 bg-slate-900 text-white flex flex-col p-4 fixed left-0 top-0">
      <div className="mb-10 px-2">
        <h1 className="text-2xl font-bold text-blue-400 tracking-tight">
          SkillBridge <span className="text-white">AI</span>
        </h1>
        <p className="text-xs text-slate-500 font-medium">ENGINEERING CAREER HUB</p>
      </div>

      <nav className="flex-1 space-y-2">
        <NavLink to="/dashboard" className={navItemStyles}>
          <LayoutDashboard size={20} />
          <span className="font-medium">Dashboard</span>
        </NavLink>

        <NavLink to="/resume-ai" className={navItemStyles}>
          <FileSearch size={20} />
          <span className="font-medium">Resume AI</span>
        </NavLink>

        <NavLink to="/skill-map" className={navItemStyles}>
          <BarChart3 size={20} />
          <span className="font-medium">Skill Mapping</span>
        </NavLink>

        <NavLink to="/opportunities" className={navItemStyles}>
          <Briefcase size={20} />
          <span className="font-medium">Opportunities</span>
        </NavLink>
      </nav>

      {/* Bottom Profile Section */}
      <div className="border-t border-slate-800 pt-4 mt-auto">
        <button className="flex items-center space-x-3 p-3 w-full text-slate-400 hover:text-red-400 transition-colors">
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;