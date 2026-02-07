import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importing Pages (We will create these next)
import Dashboard from './pages/dashboardashboard';
import ResumeAI from './pages/resumeAi';
import SkillMap from './pages/SkillMap';
import Opportunities from './pages/Opportunities';

// Importing Components
import Sidebar from './components/sidebar';

function App() {
  return (
    <Router>
      <div className="flex bg-slate-50 min-h-screen">
        {/* Sidebar stays fixed on the left */}
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 ml-64 p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/resume-ai" element={<ResumeAI />} />
            <Route path="/skill-map" element={<SkillMap />} />
            <Route path="/opportunities" element={<Opportunities />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;