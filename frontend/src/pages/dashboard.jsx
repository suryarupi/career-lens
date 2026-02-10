import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Card from "../components/Card";
import Button from "../components/Button";
import SkillRadar from "../components/SkillRadar";

import {
  TrendingUp,
  Award,
  Clock,
  CheckCircle2,
  FileSearch,
  ArrowRight,
  Sparkles,
  AlertCircle
} from "lucide-react";

const Dashboard = ({ analysisData }) => {
  const navigate = useNavigate();

  // --- STATE 1: EMPTY/LOCKED STATE ---
  if (!analysisData) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] text-slate-200">
        <Header />
        <main className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-center justify-center text-center">
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-primary-600/10 rounded-full flex items-center justify-center border border-primary-500/20 shadow-[0_0_50px_-12px_rgba(59,130,246,0.5)]">
              <FileSearch size={40} className="text-primary-400" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">No Analysis Found</h1>
          <p className="text-slate-400 max-w-md mb-10 leading-relaxed">
            Your dashboard is currently empty. Upload your resume to unlock AI-driven skill mapping and career readiness scores.
          </p>
          <Button 
            onClick={() => navigate("/resume-ai")}
            className="group flex items-center gap-3 px-8 py-4 bg-primary-600 text-white font-bold rounded-2xl shadow-xl shadow-primary-900/20 transition-all hover:bg-primary-500"
          >
            <Sparkles size={18} />
            Go to Resume AI
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Button>
        </main>
      </div>
    );
  }

  // --- STATE 2: ACTIVE DASHBOARD ---
  // Mapping the backend results to our Dashboard UI
  const stats = [
    {
      label: "Resume Score",
      value: `${analysisData.score} / 100`,
      icon: Award,
      trend: analysisData.score > 70 ? "Above Industry Average" : "Needs Optimization",
      color: analysisData.score > 70 ? "text-emerald-400" : "text-amber-400",
    },
    {
      label: "Skill Match",
      value: analysisData.matchPercentage ? `${analysisData.matchPercentage}%` : "72%",
      icon: TrendingUp,
      trend: "Based on SDE benchmarks",
      color: "text-primary-400",
    },
    {
      label: "Action Items",
      value: analysisData.suggestions ? analysisData.suggestions.length : "3",
      icon: Clock,
      trend: "Critical fixes required",
      color: "text-slate-400",
    },
    {
      label: "Readiness",
      value: analysisData.readiness || "High",
      icon: CheckCircle2,
      trend: "Market Alignment",
      color: "text-emerald-400",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-200">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Modern Header */}
        <div className="relative">
          <h1 className="text-4xl font-bold tracking-tight text-white uppercase italic">
            Student <span className="text-primary-400 not-italic">Analytics</span>
          </h1>
          <p className="mt-2 text-slate-400">Deep-scan results of your technical profile.</p>
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-primary-600/5 blur-[100px] -z-10" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-slate-900/40 border-slate-800/50 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-primary-400 shadow-inner">
                  <stat.icon size={20} />
                </div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Live AI</span>
              </div>
              <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">{stat.label}</p>
              <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
              <div className={`mt-3 text-[11px] font-bold ${stat.color} uppercase`}>{stat.trend}</div>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Skill Radar */}
          <div className="lg:col-span-2">
            <Card title="Skill Gap Resolution" className="bg-slate-900/40 border-slate-800/50 min-h-[500px]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
                <div className="h-[400px] flex items-center justify-center">
                  {/* Passing real data to SkillRadar */}
                  <SkillRadar data={analysisData.skills} />
                </div>
                <div className="space-y-8">
                  <div>
                    <h4 className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                       <CheckCircle2 size={14}/> Top Strengths
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {(analysisData.strengths || ["MERN Stack", "JavaScript", "Frontend Development"]).map(s => (
                        <span key={s} className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                       <AlertCircle size={14}/> Critical Gaps
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {analysisData.missingSkills.map(s => (
                        <span key={s} className="px-3 py-1 rounded-lg bg-red-500/10 text-red-400 text-xs font-semibold border border-red-500/20">+{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* AI Insights Card */}
          <Card 
            title="Strategic AI Insights" 
            className="flex flex-col justify-between bg-gradient-to-b from-slate-900/80 to-slate-950 border-slate-800"
          >
            <div>
              <div className="p-4 rounded-xl bg-primary-500/5 border-l-4 border-primary-500 mb-6">
                <p className="text-sm leading-relaxed text-slate-300 italic">
                  “{analysisData.feedback || "Your resume shows strong potential in full-stack development. Focus on infrastructure to level up."}”
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] font-bold text-primary-400 uppercase tracking-widest">Recommended Actions</h4>
                <ul className="space-y-3">
                  {(analysisData.suggestions || ["Add Docker to projects", "Optimize hero section"]).map((task, i) => (
                    <li key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 leading-snug">
                      <span className="text-primary-500 font-bold">0{i+1}</span>
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Button fullWidth className="mt-8 py-4 shadow-lg shadow-primary-900/20" onClick={() => navigate("/resume-ai")}>
              Analyze New Version
            </Button>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;