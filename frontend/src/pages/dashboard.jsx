import React from "react";
import Header from "../components/header";
import Card from "../components/Card";
import Button from "../components/Button";
import SkillRadar from "../components/SkillRadar";

import {
  TrendingUp,
  Award,
  Clock,
  CheckCircle2,
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      label: "Resume Score",
      value: "85 / 100",
      icon: Award,
      trend: "+5% from last review",
    },
    {
      label: "Skill Match",
      value: "72%",
      icon: TrendingUp,
      trend: "Matching 12 roles",
    },
    {
      label: "Pending Tasks",
      value: "3",
      icon: Clock,
      trend: "Projects to complete",
    },
    {
      label: "Readiness",
      value: "High",
      icon: CheckCircle2,
      trend: "Industry aligned",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Page Header */}
        <div>
          <h1>Student Analytics Dashboard</h1>
          <p className="mt-2">
            Track your career readiness and technical skill progression.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary-600/10 text-primary-400">
                  <stat.icon size={20} />
                </div>
                <small>Live</small>
              </div>

              <p className="text-sm text-text-secondary">{stat.label}</p>
              <p className="text-2xl font-semibold text-text-primary mt-1">
                {stat.value}
              </p>
              <small className="mt-2 block">{stat.trend}</small>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Skill Radar */}
          <div className="lg:col-span-2">
            <Card title="Skill Gap Visualization">
              <div className="h-[400px] flex items-center justify-center">
                <SkillRadar />
              </div>
            </Card>
          </div>

          {/* AI Insights */}
          <Card
            title="AI Insights"
            variant="glass"
            className="flex flex-col justify-between"
          >
            <div>
              <p className="leading-relaxed">
                Based on your resume and skill analysis, you are approximately{" "}
                <span className="text-primary-400 font-medium">
                  15% away
                </span>{" "}
                from qualifying for entry-level SDE roles at top companies.
              </p>

              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-2 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
                  Learn Docker & Kubernetes
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
                  Improve System Design fundamentals
                </li>
              </ul>
            </div>

            <Button fullWidth className="mt-8">
              Start Learning Path
            </Button>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
