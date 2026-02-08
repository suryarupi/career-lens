import React, { useState } from "react";
import axios from "axios";

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
} from "lucide-react";

const ResumeAI = () => {
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

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
      setResult(response.data);
    } catch (err) {
      console.error("Resume analysis failed");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Page Header */}
        <div>
          <div className="flex items-center gap-2 text-primary-400 text-sm font-semibold mb-2">
            <Sparkles size={16} />
            AI Resume Optimizer
          </div>

          <h1>Resume Intelligence</h1>
          <p className="mt-2">
            Analyze your resume against industry-ready skill expectations.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-4">
            <Card title="Upload Resume" icon={Upload}>
              <div className="space-y-6">
                {/* Drop Zone */}
                <label className="flex flex-col items-center justify-center gap-4 p-8 rounded-2xl border-2 border-dashed border-border cursor-pointer hover:bg-surfaceSoft transition text-center">
                  <Upload size={36} className="text-text-muted" />
                  <div>
                    <p className="font-medium text-text-primary">
                      {file ? file.name : "Upload your resume"}
                    </p>
                    <small>PDF format only</small>
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
                >
                  Analyze Resume
                </Button>
              </div>
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-8 space-y-6">
            {!result ? (
              <Card className="flex flex-col items-center justify-center py-20 text-center">
                <FileText size={56} className="text-text-muted mb-4" />
                <p className="text-lg font-medium text-text-primary">
                  Waiting for analysis
                </p>
                <small>Upload a resume to view insights</small>
              </Card>
            ) : (
              <>
                {/* Score + Feedback */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="flex flex-col items-center justify-center py-10">
                    <BarChart3 size={28} className="text-primary-400 mb-2" />
                    <small>Match Score</small>
                    <span className="text-5xl font-semibold text-text-primary mt-2">
                      {result.score}%
                    </span>
                  </Card>

                  <Card
                    title="Expert Feedback"
                    icon={Sparkles}
                    className="md:col-span-2"
                  >
                    <p className="italic">“{result.feedback}”</p>
                  </Card>
                </div>

                {/* Skill Gaps */}
                <Card title="Skill Gap Analysis" icon={CheckCircle}>
                  <div className="flex flex-wrap gap-2">
                    {result.missingSkills.map((skill, i) => (
                      <Badge key={i}>{skill}</Badge>
                    ))}
                  </div>
                </Card>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResumeAI;
