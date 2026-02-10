import React from "react";
import Header from "../components/header";
import Card from "../components/Card";
import { Badge } from "../components/Badge";
import { TrendingUp, Briefcase, ChevronRight, Target, AlertCircle } from "lucide-react";

const SkillMap = ({ analysisData }) => {
  // 1. Fallback / Empty State - Prevents the page from loading if no upload has occurred
  if (!analysisData) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] text-slate-200">
        <Header />
        <main className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-slate-900 rounded-2xl flex items-center justify-center border border-slate-800 mb-6 shadow-2xl">
            <Target className="text-slate-600" size={40} />
          </div>
          <h2 className="text-2xl font-bold text-white">Career Mapping Locked</h2>
          <p className="text-slate-400 mt-2 max-w-sm">Please upload your resume in the Resume AI section to unlock personalized career paths.</p>
        </main>
      </div>
    );
  }

  /**
   * 2. Logic: Map AI strengths to Career Paths
   * Safe Access Pattern: (analysisData?.property || [])
   * This ensures .filter() or .slice() never run on 'undefined'
   */
  const careerPaths = [
    {
      title: "Full Stack Developer",
      match: analysisData?.score || 0,
      skills: (analysisData?.strengths || []).slice(0, 4),
      gaps: (analysisData?.missingSkills || []).slice(0, 2),
      demand: "High",
      color: "from-blue-500/20 to-transparent",
      accent: "border-blue-500/50"
    },
    {
      title: "Backend Systems Engineer",
      match: Math.max(0, (analysisData?.score || 0) - 15),
      // Fixes the 'filter of undefined' error
      skills: (analysisData?.strengths || [])
        .filter(s => !s.toLowerCase().includes('frontend'))
        .slice(0, 3),
      gaps: (analysisData?.missingSkills || []).length > 0 
              ? analysisData.missingSkills.slice(0, 2) 
              : ["System Design", "Cloud Architecture"],
      demand: "Very High",
      color: "from-emerald-500/20 to-transparent",
      accent: "border-emerald-500/50"
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-200">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Modern Header */}
        <div className="relative">
          <div className="flex items-center gap-2 text-primary-400 text-xs font-bold uppercase tracking-widest mb-3">
             <Target size={14} /> AI Talent Matching
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight uppercase italic">
            Skill-to-<span className="text-primary-400 not-italic">Career</span> Mapping
          </h1>
          <p className="mt-2 text-slate-400 text-lg max-w-2xl">
            We've mapped your <span className="text-white font-medium">{(analysisData?.strengths || []).length} core competencies</span> against current market requirements.
          </p>
        </div>

        {/* Career Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {careerPaths.map((path, idx) => (
            <Card key={idx} className={`relative overflow-hidden border-t-4 ${path.accent} bg-gradient-to-b ${path.color} bg-slate-900/40 backdrop-blur-md`}>
              
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 shadow-inner">
                   <Briefcase className="text-primary-400" size={24} />
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Compatibility</p>
                   <p className="text-3xl font-black text-white">{path.match}%</p>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">{path.title}</h3>
              
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-6 font-medium">
                <TrendingUp size={14} className="text-emerald-400" />
                <span>{path.demand} Market Demand</span>
              </div>

              {/* Progress Bar Container */}
              <div className="space-y-2 mb-8">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter text-slate-500">
                  <span>Current Fit</span>
                  <span>Benchmark</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary-500 shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all duration-1000 ease-out"
                    style={{ width: `${path.match}%` }}
                  />
                </div>
              </div>

              {/* Qualified vs Gaps Split View */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Qualified In</p>
                  <div className="flex flex-wrap gap-1.5">
                    {path.skills.length > 0 ? path.skills.map((skill) => (
                      <Badge key={skill} className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px] py-0.5 px-2">
                        {skill}
                      </Badge>
                    )) : <span className="text-[10px] text-slate-600 italic">No matches found</span>}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest">Missing Gaps</p>
                  <div className="flex flex-wrap gap-2">
                    {path.gaps.length > 0 ? path.gaps.map((skill) => (
                      <div key={skill} className="flex items-center gap-1.5 text-[10px] text-slate-400 italic">
                        <AlertCircle size={10} className="text-red-500 shrink-0" /> 
                        <span className="truncate">{skill}</span>
                      </div>
                    )) : <span className="text-[10px] text-emerald-500 italic">Fully optimized</span>}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button className="w-full mt-8 pt-4 border-t border-slate-800/50 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary-400 hover:text-white transition-all group">
                View Learning Roadmap 
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SkillMap;