import React from 'react';
import { 
  TrendingUp, 
  Award, 
  Clock, 
  CheckCircle2 
} from 'lucide-react';
import SkillRadar from '../components/SkillRadar'; // We will create this next

const Dashboard = () => {
  // Mock data for the cards
  const stats = [
    { label: "Resume Score", value: "85/100", icon: <Award className="text-blue-500" />, trend: "+5% from last month" },
    { label: "Skill Match", value: "72%", icon: <TrendingUp className="text-green-500" />, trend: "Matching 12 jobs" },
    { label: "Pending Tasks", value: "3", icon: <Clock className="text-orange-500" />, trend: "Projects to complete" },
    { label: "Readiness", value: "High", icon: <CheckCircle2 className="text-purple-500" />, trend: "Industry standards met" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <header>
        <h2 className="text-3xl font-bold text-slate-800">Student Analytics Dashboard</h2>
        <p className="text-slate-500">Track your engineering career readiness and skill growth.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-slate-50 rounded-lg">{stat.icon}</div>
              <span className="text-xs font-medium text-slate-400">Live Status</span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium">{stat.label}</h3>
            <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
            <p className="text-xs text-slate-400 mt-2">{stat.trend}</p>
          </div>
        ))}
      </div>

      {/* Main Content: Skill Gap & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Radar Chart Section */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-xl font-semibold text-slate-800 mb-6">Skill Gap Visualization</h3>
          <div className="h-[400px] flex items-center justify-center">
            <SkillRadar />
          </div>
        </div>

        {/* Quick Action / Recommendations */}
        <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-4">AI Insight</h3>
            <p className="text-slate-400 leading-relaxed">
              Based on your resume and skill map, you are 15% away from being eligible for "SDE-1" roles at top-tier companies. 
            </p>
            <ul className="mt-6 space-y-3">
              <li className="flex items-center text-sm text-slate-300">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                Learn Docker & Kubernetes
              </li>
              <li className="flex items-center text-sm text-slate-300">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                Improve "System Design" score
              </li>
            </ul>
          </div>
          <button className="mt-8 w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold transition-all">
            Start Learning Path
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;