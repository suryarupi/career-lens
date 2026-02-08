import React, { useState, useEffect } from 'react';
import { ExternalLink, MapPin, Calendar, Rocket, Loader2 } from 'lucide-react';
import axios from 'axios';

const Opportunities = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        // Replace with your actual backend URL
        // In a real app, you'd pass the logged-in user's ID to get matched results
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

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <Loader2 className="animate-spin text-blue-600" size={40} />
        <p className="text-slate-500 font-medium">Matching best opportunities for you...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Opportunity Hub</h2>
          <p className="text-slate-500 text-lg">Curated matches based on your current skill set.</p>
        </div>
        <div className="hidden md:block">
          <span className="text-sm font-medium text-slate-400 bg-slate-100 px-4 py-2 rounded-full">
            {listings.length} Matches Found
          </span>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {listings.length > 0 ? (
          listings.map((item) => (
            <div key={item._id || item.id} className="group bg-white border border-slate-100 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50/50 transition-all">
              <div className="flex items-start space-x-5">
                <div className="bg-blue-50 p-4 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Rocket size={24} />
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-widest text-blue-600">{item.type}</span>
                    <span className="text-slate-300">•</span>
                    {/* matchScore comes from the backend logic we discussed earlier */}
                    <span className="text-xs font-bold text-green-600">{item.matchScore || item.match}% Skill Match</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">{item.title}</h3>
                  <p className="text-slate-500 font-medium mb-3">{item.company}</p>
                  <div className="flex flex-wrap gap-2">
                    {(item.requiredSkills || item.tags).map(tag => (
                      <span key={tag} className="bg-slate-50 text-slate-600 px-3 py-1 rounded-lg text-xs font-semibold">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 md:mt-0 flex flex-col items-end space-y-4 w-full md:w-auto">
                <div className="flex items-center space-x-4 text-slate-400 text-sm">
                  <div className="flex items-center"><MapPin size={14} className="mr-1"/> {item.location || "Remote"}</div>
                  <div className="flex items-center"><Calendar size={14} className="mr-1"/> {item.date || "Ongoing"}</div>
                </div>
                <a 
                  href={item.link || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 bg-slate-900 text-white w-full md:w-auto px-6 py-3 rounded-xl font-bold hover:bg-blue-600 transition-all"
                >
                  <span>Apply Now</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-12 rounded-3xl text-center border border-dashed border-slate-200">
            <p className="text-slate-500">No matching opportunities found yet. Try updating your skills!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Opportunities;