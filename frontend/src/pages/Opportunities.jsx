import React, { useState, useEffect } from 'react';
import { ExternalLink, MapPin, Calendar, Rocket, Loader2, Lock, Zap } from 'lucide-react';
import axios from 'axios';
import Header from "../components/header";
import Card from "../components/Card";

const Opportunities = ({ analysisData }) => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        // You can send the user's current score to the backend to get better matches
        const response = await axios.get("http://localhost:5000/api/opportunities");
        setListings(response.data);
      } catch (error) {
        console.error("Error fetching opportunities:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  // 1. LOCKED STATE (If no resume is uploaded)
  if (!analysisData) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] text-slate-200">
        <Header />
        <main className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-primary-600/10 rounded-3xl flex items-center justify-center border border-primary-500/20 mb-6 shadow-2xl">
            <Lock className="text-primary-400" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight italic uppercase">Market Insights Locked</h2>
          <p className="text-slate-400 mt-2 max-w-sm">
            We need your resume analysis to filter jobs that match your <span className="text-primary-400 font-bold font-mono text-lg italic">DNA</span>.
          </p>
        </main>
      </div>
    );
  }

  // 2. LOADING STATE
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="animate-spin text-primary-500" size={40} />
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Scanning Market Openings...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-200">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="relative">
             <div className="flex items-center gap-2 text-primary-400 text-xs font-bold uppercase tracking-widest mb-3">
              <Zap size={14} className="fill-primary-400" /> AI-Targeted Feed
            </div>
            <h1 className="text-4xl font-bold text-white tracking-tight uppercase italic">
              Opportunity <span className="text-primary-400 not-italic">Hub</span>
            </h1>
            <p className="mt-2 text-slate-400 max-w-lg">
              Vetted roles matching your <span className="text-white font-bold">{analysisData?.score}%</span> ATS benchmark.
            </p>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 px-6 py-3 rounded-2xl backdrop-blur-md">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              {listings.length} Validated Matches
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6">
          {listings.length > 0 ? (
            listings.map((item) => (
              <Card key={item._id || item.id} className="group bg-slate-900/30 border-slate-800/50 hover:border-primary-500/50 transition-all duration-500">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  
                  <div className="flex items-start space-x-6">
                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-primary-400 group-hover:scale-110 transition-transform">
                      <Rocket size={28} />
                    </div>
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary-400 bg-primary-400/10 px-2 py-0.5 rounded">
                            {item.type}
                        </span>
                        <span className="text-slate-700">•</span>
                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                            {analysisData?.score > 70 ? 'High Match' : 'Potential Match'}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-primary-400 transition-colors">{item.title}</h3>
                      <p className="text-slate-400 font-medium mb-4">{item.company}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {(item.requiredSkills || item.tags || []).map(tag => (
                          <span key={tag} className="bg-slate-950 border border-slate-800 text-slate-500 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tighter group-hover:border-slate-700">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-6 w-full md:w-auto border-t md:border-t-0 border-slate-800 pt-6 md:pt-0">
                    <div className="flex items-center space-x-6 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                      <div className="flex items-center"><MapPin size={14} className="mr-2 text-primary-500"/> {item.location || "Remote"}</div>
                      <div className="flex items-center"><Calendar size={14} className="mr-2 text-primary-500"/> {item.date || "Ongoing"}</div>
                    </div>
                    <a 
                      href={item.link || "#"} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full md:w-auto px-8 py-4 bg-primary-600 text-white font-black uppercase tracking-widest rounded-xl hover:bg-primary-500 shadow-lg shadow-primary-900/20 transition-all flex items-center justify-center gap-2 text-xs"
                    >
                      Apply Analysis <ExternalLink size={16} />
                    </a>
                  </div>

                </div>
              </Card>
            ))
          ) : (
            <div className="py-20 rounded-3xl text-center border-2 border-dashed border-slate-800 bg-slate-900/20">
              <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">No matching pipelines found for your score.</p>
              <p className="text-xs text-slate-700 mt-2 italic">Try refining your resume and re-scanning.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Opportunities;