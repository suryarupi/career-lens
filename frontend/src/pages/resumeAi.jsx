import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Added for redirection

import Header from "../components/header";
import Card from "../components/Card";
import Button from "../components/Button";
import { Badge } from "../components/Badge";

import {
  Upload,
  FileText,
  Sparkles,
  BarChart3,
  CheckCircle,
  ArrowRight
} from "lucide-react";

// Accept setAnalysisData prop from App.js
const ResumeAI = ({ setAnalysisData }) => {
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  
  const navigate = useNavigate(); // Hook for navigation

  const handleUpload = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/resume/analyze",
        formData
      );
      
      // 1. Save results locally for this page
      setResult(response.data);
      
      // 2. IMPORTANT: Save results to the global state in App.js
      // This ensures the Dashboard gets the data
      setAnalysisData(response.data);

    } catch (err) {
      console.error("Resume analysis failed", err);
      alert("Failed to connect to the server. Ensure your backend is running.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Page Header */}
        <div className="flex justify-between items-end">
          <div>
            <div className="flex items-center gap-2 text-primary-400 text-sm font-semibold mb-2">
              <Sparkles size={16} />
              AI Resume Optimizer
            </div>
            <h1 className="text-3xl font-bold">Resume Intelligence</h1>
            <p className="mt-2 text-text-muted text-lg">
              Analyze your resume against industry-ready skill expectations.
            </p>
          </div>

          {/* New: Redirect Button if result exists */}
          {result && (
            <Button 
              variant="outline" 
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 border-primary-500 text-primary-400 hover:bg-primary-500/10"
            >
              View Full Dashboard <ArrowRight size={16} />
            </Button>
          )}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Upload Section */}
          <div className="lg:col-span-4">
            <Card title="Upload Resume" icon={Upload}>
              <div className="space-y-6">
                <label className="flex flex-col items-center justify-center gap-4 p-8 rounded-2xl border-2 border-dashed border-border cursor-pointer hover:bg-surfaceSoft transition text-center group">
                  <Upload size={36} className="text-text-muted group-hover:text-primary-400 transition-colors" />
                  <div>
                    <p className="font-medium text-text-primary">
                      {file ? file.name : "Upload your resume"}
                    </p>
                    <small className="text-text-muted italic">PDF format only</small>
                  </div>
                  <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </label>

                <Button
                  fullWidth
                  onClick={handleUpload}
                  loading={isAnalyzing}
                  disabled={!file}
                  className="py-4 shadow-lg"
                >
                  {isAnalyzing ? "Processing..." : "Analyze Resume"}
                </Button>
              </div>
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-8 space-y-6">
            {!result ? (
              <Card className="flex flex-col items-center justify-center py-20 text-center border-dashed border-slate-800">
                <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mb-6">
                   <FileText size={40} className="text-slate-700" />
                </div>
                <p className="text-lg font-medium text-text-primary">
                  Waiting for analysis
                </p>
                <p className="text-sm text-text-muted mt-2">Upload a resume to generate your AI technical profile.</p>
              </Card>
            ) : (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">
                {/* Score + Feedback */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="flex flex-col items-center justify-center py-10 bg-primary-500/5 border-primary-500/20">
                    <BarChart3 size={28} className="text-primary-400 mb-2" />
                    <small className="font-bold uppercase tracking-widest text-slate-500 text-[10px]">Match Score</small>
                    <span className="text-5xl font-bold text-text-primary mt-2">
                      {result.score}%
                    </span>
                  </Card>

                  <Card
                    title="Expert Feedback"
                    icon={Sparkles}
                    className="md:col-span-2 bg-slate-900/50"
                  >
                    <p className="italic text-slate-300 leading-relaxed mt-2 border-l-4 border-primary-500/50 pl-4 py-2">
                      “{result.feedback}”
                    </p>
                  </Card>
                </div>

                {/* Skill Gaps */}
                <Card title="Identified Skill Gaps" icon={CheckCircle} className="bg-slate-900/50">
                  <p className="text-sm text-slate-500 mb-4 font-medium uppercase tracking-wider">Missing Keywords from Profile:</p>
                  <div className="flex flex-wrap gap-3">
                    {result.missingSkills && result.missingSkills.length > 0 ? (
                      result.missingSkills.map((skill, i) => (
                        <Badge key={i} className="bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1 text-sm">
                          {skill}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-emerald-400 text-sm italic">No significant gaps found. Well done!</span>
                    )}
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResumeAI;