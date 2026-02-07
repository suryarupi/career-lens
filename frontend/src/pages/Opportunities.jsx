import React from 'react';
import { ExternalLink, MapPin, Calendar, Rocket } from 'lucide-react';

const Opportunities = () => {
  const listings = [
    {
      id: 1,
      title: "Backend Engineering Intern",
      company: "TechCorp Solutions",
      type: "Internship",
      location: "Remote",
      date: "Starts July 2026",
      match: 92,
      tags: ["Node.js", "MongoDB"]
    },
    {
      id: 2,
      title: "National AI Hackathon",
      company: "FutureLabs",
      type: "Hackathon",
      location: "Hyderabad / Online",
      date: "Feb 25, 2026",
      match: 85,
      tags: ["Python", "Machine Learning"]
    },
    {
      id: 3,
      title: "Cloud Security Workshop",
      company: "SecureNet",
      type: "Certification",
      location: "Online",
      date: "Self-paced",
      match: 70,
      tags: ["Cybersecurity", "AWS"]
    }
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Opportunity Hub</h2>
          <p className="text-slate-500 text-lg">Curated matches based on your current skill set.</p>
        </div>
        <div className="hidden md:block">
          <span className="text-sm font-medium text-slate-400 bg-slate-100 px-4 py-2 rounded-full">
            3 New Matches Found
          </span>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {listings.map((item) => (
          <div key={item.id} className="group bg-white border border-slate-100 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50/50 transition-all">
            <div className="flex items-start space-x-5">
              <div className="bg-blue-50 p-4 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Rocket size={24} />
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-600">{item.type}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs font-bold text-green-600">{item.match}% Skill Match</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800">{item.title}</h3>
                <p className="text-slate-500 font-medium mb-3">{item.company}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map(tag => (
                    <span key={tag} className="bg-slate-50 text-slate-600 px-3 py-1 rounded-lg text-xs font-semibold">{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 md:mt-0 flex flex-col items-end space-y-4 w-full md:w-auto">
              <div className="flex items-center space-x-4 text-slate-400 text-sm">
                <div className="flex items-center"><MapPin size={14} className="mr-1"/> {item.location}</div>
                <div className="flex items-center"><Calendar size={14} className="mr-1"/> {item.date}</div>
              </div>
              <button className="flex items-center justify-center space-x-2 bg-slate-900 text-white w-full md:w-auto px-6 py-3 rounded-xl font-bold hover:bg-blue-600 transition-all">
                <span>Apply Now</span>
                <ExternalLink size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Opportunities;