import Header from "../components/header";
import Card from "../components/Card";
import Button from "../components/Button";

import {
  BarChart,
  Users,
  GraduationCap,
  TrendingDown,
} from "lucide-react";

const PlacementAnalytics = () => {
  const batchStats = [
    {
      label: "Total Students",
      value: "120",
      icon: Users,
    },
    {
      label: "Placement Ready",
      value: "45%",
      icon: GraduationCap,
    },
    {
      label: "Avg. Resume Score",
      value: "68",
      icon: BarChart,
    },
    {
      label: "Major Skill Gap",
      value: "Cloud & DevOps",
      icon: TrendingDown,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Page Header */}
        <div>
          <h1>Placement Office Analytics</h1>
          <p className="mt-2">
            Data-driven insights into batch-level career readiness.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {batchStats.map((stat, i) => (
            <Card key={i}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary-600/10 text-primary-400">
                  <stat.icon size={20} />
                </div>
                <small>Batch</small>
              </div>

              <p className="text-sm text-text-secondary">{stat.label}</p>
              <p className="text-2xl font-semibold text-text-primary mt-1">
                {stat.value}
              </p>
            </Card>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Skill Gaps */}
          <Card title="Top Batch Skill Gaps" icon={TrendingDown}>
            <div className="space-y-6">
              {/* Skill 1 */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">
                    Docker / DevOps
                  </span>
                  <span className="text-sm text-primary-400">
                    78% lacking
                  </span>
                </div>

                <div className="w-full h-2 rounded-full bg-surfaceSoft overflow-hidden">
                  <div
                    className="h-full bg-primary-600 rounded-full"
                    style={{ width: "78%" }}
                  />
                </div>
              </div>

              {/* Skill 2 */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">
                    System Design
                  </span>
                  <span className="text-sm text-primary-400">
                    65% lacking
                  </span>
                </div>

                <div className="w-full h-2 rounded-full bg-surfaceSoft overflow-hidden">
                  <div
                    className="h-full bg-primary-600 rounded-full"
                    style={{ width: "65%" }}
                  />
                </div>
              </div>

              <Button variant="outline" fullWidth>
                Schedule Batch Workshop
              </Button>
            </div>
          </Card>

          {/* Actionable Insights */}
          <Card
            title="Actionable Analytics"
            variant="glass"
            className="space-y-6"
          >
            <p className="text-sm text-text-secondary">
              High-impact recommendations derived from recent student data.
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-surfaceSoft border border-border">
                <p className="font-medium text-text-primary">
                  Resume Quality Alert
                </p>
                <small>
                  30 students have resume scores below 50. Mandatory
                  resume review suggested.
                </small>
              </div>

              <div className="p-4 rounded-2xl bg-surfaceSoft border border-border">
                <p className="font-medium text-text-primary">
                  High Match Potential
                </p>
                <small>
                  12 students exceed 90% match for top-tier intern roles.
                  Recommend early outreach.
                </small>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default PlacementAnalytics;
