import React from 'react';
import { BookOpen, Target, ChevronRight, Zap } from 'lucide-react';

const SkillMap = () => {
  const skillCategories = [
    {
      category: "Technical Core",
      skills: [
        { name: "Data Structures", level: 85, gap: 5, status: "Ready" },
        { name: "System Design", level: 40, gap: 40, status: "Critical" },
      ]
    },
    {
      category: "Backend Development",
      skills: [
        { name: "Node.js & Express", level: 60, gap: 20, status: "Improving" },
        { name: "MongoDB / SQL", level: 75, gap: 10, status: "Good" },
      ]
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header>
        <h2 className="text-3xl font-bold text-slate-800">Skill Inventory & Pathways</h2>
        <p className="text-slate-500">A detailed breakdown of your technical proficiency vs. industry benchmarks.</p>
      </header>

      <div className="grid grid-cols-1 gap-8">
        {skillCategories.map((group, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
              <Target className="mr-2 text-blue-600" size={24} /> {group.category}
            </h3>
            
            <div className="space-y-6">
              {group.skills.map((skill, sIdx) => (
                <div key={sIdx} className="group">
                  <div className="flex justify-between items-end mb-2">
                    <div>
                      <span className="text-sm font-bold text-slate-700">{skill.name}</span>
                      <span className={`ml-3 text-[10px] uppercase px-2 py-0.5 rounded-md font-bold ${
                        skill.status === 'Critical' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                      }`}>
                        {skill.status}
                      </span>
                    </div>
                    <span className="text-sm text-slate-400 font-medium">Gap: {skill.gap}%</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${
                        skill.level < 50 ? 'bg-red-500' : 'bg-blue-600'
                      }`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>

                  {/* Smart Recommendation for the gap */}
                  {skill.gap > 15 && (
                    <div className="mt-3 flex items-center p-3 bg-blue-50 rounded-xl border border-blue-100 text-sm text-blue-700">
                      <Zap size={14} className="mr-2 fill-blue-600" />
                      <span>Suggested: Complete <strong>{skill.name} Advanced Course</strong> to bridge the {skill.gap}% gap.</span>
                      <ChevronRight size={16} className="ml-auto" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillMap;