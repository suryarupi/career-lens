import React from "react";
import Header from "../components/header";
import Card from "../components/Card";
import { Badge } from "../components/Badge";
import { TrendingUp, Briefcase } from "lucide-react";

const SkillMap = () => {
  const careerPaths = [
    {
      title: "Full Stack Developer",
      match: 85,
      skills: ["React", "Node.js", "Express", "MongoDB"],
      demand: "High",
    },
    {
      title: "Backend Engineer",
      match: 60,
      skills: ["API Design", "Node.js", "Database Security"],
      demand: "Very High",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Page Header */}
        <div>
          <h1>Skill-to-Career Mapping</h1>
          <p className="mt-2">
            Personalized career recommendations based on your technical profile.
          </p>
        </div>

        {/* Career Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {careerPaths.map((path, idx) => (
            <Card key={idx} title={path.title} icon={Briefcase}>
              {/* Demand + Match */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <TrendingUp size={16} className="text-primary-400" />
                  <span>{path.demand} market demand</span>
                </div>

                <span className="text-lg font-semibold text-text-primary">
                  {path.match}% match
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-surfaceSoft mb-6 overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary-600 transition-all duration-700"
                  style={{ width: `${path.match}%` }}
                />
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {path.skills.map((skill) => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SkillMap;
