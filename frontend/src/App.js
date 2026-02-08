import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Dashboard from "./pages/dashboard";
import ResumeAI from "./pages/resumeAi";
import SkillMap from "./pages/SkillMap";
import Opportunities from "./pages/Opportunities";
import PlacementAnalytics from "./pages/PlacementAnalytics";

// Components
import Sidebar from "./components/sidebar";

const App = () => {
  return (
    <Router>
      <div className="flex min-h-screen bg-background">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/resume-ai" element={<ResumeAI />} />
            <Route path="/skill-map" element={<SkillMap />} />
            <Route path="/opportunities" element={<Opportunities />} />
            <Route path="/analytics" element={<PlacementAnalytics />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
