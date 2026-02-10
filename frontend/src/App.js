import React, { useState } from "react"; // Added useState
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
  // 1. Define the global state for AI results
  const [analysisData, setAnalysisData] = useState(null);

  return (
    <Router>
      <div className="flex min-h-screen bg-background">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <Routes>
            {/* 2. Pass data to Dashboard */}
            <Route path="/" element={<Dashboard analysisData={analysisData} />} />
            <Route path="/dashboard" element={<Dashboard analysisData={analysisData} />} />
            
            {/* 3. Pass the setter function to ResumeAI */}
            <Route 
              path="/resume-ai" 
              element={<ResumeAI setAnalysisData={setAnalysisData} />} 
            />
            
           <Route path="/skill-map" element={<SkillMap analysisData={analysisData} />} />
            <Route 
  path="/opportunities" 
  element={<Opportunities analysisData={analysisData} />} 
/>
            <Route path="/analytics" element={<PlacementAnalytics />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;