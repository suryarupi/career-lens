import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';

const ResumeAI = () => {
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    setIsAnalyzing(true);
    // This is where we will call our Backend API later
    setTimeout(() => {
      setResult({
        score: 78,
        feedback: "Your technical skills are strong, but consider adding more 'Impact' verbs in your project descriptions.",
        missingKeywords: ["Docker", "CI/CD", "Unit Testing"]
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-3xl font-bold text-slate-800">Resume AI Analyzer</h2>
        <p className="text-slate-500">Upload your resume to see how well it matches industry expectations.</p>
      </header>

      {/* Upload Box */}
      <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center hover:border-blue-400 transition-colors">
        <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Upload className="text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-slate-800">Click to upload or drag and drop</h3>
        <p className="text-sm text-slate-400 mb-6">PDF (Max 5MB)</p>
        <input 
          type="file" 
          className="hidden" 
          id="resume-upload" 
          onChange={handleFileChange}
          accept=".pdf"
        />
        <label 
          htmlFor="resume-upload" 
          className="bg-slate-900 text-white px-8 py-3 rounded-xl font-medium cursor-pointer hover:bg-slate-800 transition-all"
        >
          Select File
        </label>
        {file && <p className="mt-4 text-blue-600 font-medium">Selected: {file.name}</p>}
      </div>

      <button 
        onClick={handleUpload}
        disabled={!file || isAnalyzing}
        className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${
          !file ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200'
        }`}
      >
        {isAnalyzing ? "AI is Analyzing..." : "Analyze Resume"}
      </button>

      {/* Results Section */}
      {result && (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Readiness Score</h4>
            <div className="text-5xl font-black text-blue-600">{result.score}%</div>
            <p className="mt-4 text-slate-600 leading-relaxed">{result.feedback}</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Improvement Areas</h4>
            <div className="flex flex-wrap gap-2">
              {result.missingKeywords.map((skill) => (
                <span key={skill} className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-bold flex items-center">
                  <AlertCircle size={12} className="mr-1" /> {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeAI;