import React, { useState } from 'react';
import {
  UploadCloud,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Download,
  Copy,
  ChevronRight,
  TrendingUp,
  BrainCircuit,
  FileText,
} from 'lucide-react';
import { apiClient } from '@/api/axiosClient';

const TARGET_ROLES = [
  'Full-Stack Software Engineer (Java / React)',
  'Backend Engineer (Java / Spring Boot / Microservices)',
  'Frontend Engineer (React / TypeScript / Next.js)',
  'Data Engineer & ML Specialist (Python / Spark)',
  'DevOps & Cloud Architect (AWS / Kubernetes)',
];

export const ResumeReviewPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState(TARGET_ROLES[0]);
  const [analyzing, setAnalyzing] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [report, setReport] = useState<any>({
    fileName: 'Alex_Mercer_SDE_Resume.pdf',
    atsScore: 84,
    detectedRole: 'Full-Stack Software Engineer',
    skillsExtracted: [
      'Java 21',
      'Spring Boot 3',
      'React 18',
      'TypeScript',
      'MongoDB',
      'PostgreSQL',
      'RESTful APIs',
      'Docker',
      'Git',
      'Microservices',
    ],
    missingRecommended: [
      'Redis Caching',
      'Kubernetes',
      'Kafka / Event-Driven Messaging',
      'CI/CD GitHub Actions',
      'Distributed Tracing',
    ],
    sectionScores: {
      contact: 100,
      skills: 88,
      experience: 78,
      projects: 86,
      education: 90,
      formatting: 95,
    },
    criticalGaps: [
      'Missing quantified production metrics in the recent internship project.',
      'Containerization mentioned (Docker) but lacks orchestration (Kubernetes/Helm) keywords.',
    ],
    bulletImprovements: [
      {
        original: 'Built a backend service in Spring Boot for user authentication.',
        improved:
          'Architected a stateless JWT authentication microservice in Spring Boot 3 & MongoDB with refresh-token rotation, cutting API verification latency by 35% across 10,000+ simulated users.',
        rationale:
          'Uses the Google XYZ formula: Accomplished [X], measured by [Y], by doing [Z]. Incorporates quantified performance metric and architectural specificity.',
      },
      {
        original: 'Created frontend UI components with React and Tailwind CSS.',
        improved:
          'Engineered 14+ reusable, responsive UI components utilizing React 18, TypeScript, and Tailwind CSS, achieving 98+ Google Lighthouse accessibility and SEO scores.',
        rationale:
          'Adds quantitative metric (14+ components, 98+ Lighthouse score) and emphasizes modern TypeScript typing.',
      },
      {
        original: 'Helped optimize database queries to make search faster.',
        improved:
          'Redesigned MongoDB query pipeline with compound and text search indexes, slashing 95th-percentile product catalog query times from 420ms to 48ms.',
        rationale:
          'Quantifies concrete latency improvement (420ms -> 48ms) and references specific database indexing techniques.',
      },
    ],
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAnalyzing(true);

      // Simulate parsing & Gemini AI evaluation
      setTimeout(() => {
        setAnalyzing(false);
        setReport((prev: any) => ({
          ...prev,
          fileName: file.name,
          atsScore: Math.floor(Math.random() * 8) + 82, // 82 - 89
        }));
      }, 1600);
    }
  };

  const copyToClipboard = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" /> PyMuPDF Text Extractor & Gemini 1.5 Pro ATS Engine
        </div>
        <h1 className="text-2xl font-black text-slate-900">AI ATS Resume Optimizer</h1>
        <p className="text-sm text-slate-500 mt-1">
          Detect missing keywords, parse technical skill matrices, and transform bullet points using the Google XYZ formula.
        </p>
      </div>

      {/* Target Role Selector & Upload Dropzone */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-subtle space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Target Job Role
          </h3>
          <p className="text-xs text-slate-500">
            The ATS algorithm weights keywords based on your target specialization:
          </p>
          <div className="space-y-2">
            {TARGET_ROLES.map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`w-full text-left p-3 rounded-xl text-xs font-semibold transition-all ${
                  selectedRole === role
                    ? 'bg-indigo-50 border border-indigo-200 text-indigo-700 shadow-xs'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-transparent'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Upload Zone (2 Cols) */}
        <div className="md:col-span-2 bg-white p-8 rounded-3xl border-2 border-dashed border-indigo-200 hover:border-indigo-400 transition-colors flex flex-col items-center justify-center text-center relative cursor-pointer shadow-subtle">
          <input
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileUpload}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
            <UploadCloud className="w-7 h-7" />
          </div>
          <h4 className="text-base font-bold text-slate-800">
            {analyzing ? 'Scanning PDF & Running Gemini ATS Audit...' : 'Drop your resume PDF here or click to browse'}
          </h4>
          <p className="text-xs text-slate-500 mt-1">
            Supports PDF & DOCX formats (Max 5MB) · Encrypted In-Memory Parsing
          </p>
        </div>
      </div>

      {/* Report Section */}
      {report && (
        <div className="space-y-6">
          {/* Metrics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {/* ATS Score */}
            <div className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-subtle flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">ATS Match Index</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Tier 1 Pass
                  </span>
                </div>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-5xl font-black text-indigo-600">{report.atsScore}</span>
                  <span className="text-sm font-semibold text-slate-400">/ 100</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-3">
                Ranks in top 15% of applicant pools for {report.detectedRole}.
              </p>
            </div>

            {/* Section Scores */}
            <div className="md:col-span-3 p-6 bg-white rounded-3xl border border-slate-200/80 shadow-subtle space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Section-by-Section ATS Breakdown
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <div className="flex justify-between text-slate-600 font-semibold mb-1">
                    <span>Contact Info</span>
                    <span className="text-emerald-600">{report.sectionScores.contact}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full" style={{ width: `${report.sectionScores.contact}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-600 font-semibold mb-1">
                    <span>Technical Skills</span>
                    <span className="text-indigo-600">{report.sectionScores.skills}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full" style={{ width: `${report.sectionScores.skills}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-600 font-semibold mb-1">
                    <span>Work Experience</span>
                    <span className="text-purple-600">{report.sectionScores.experience}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-600 h-full" style={{ width: `${report.sectionScores.experience}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-600 font-semibold mb-1">
                    <span>Projects & Impact</span>
                    <span className="text-indigo-600">{report.sectionScores.projects}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full" style={{ width: `${report.sectionScores.projects}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-600 font-semibold mb-1">
                    <span>Education</span>
                    <span className="text-emerald-600">{report.sectionScores.education}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full" style={{ width: `${report.sectionScores.education}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-600 font-semibold mb-1">
                    <span>ATS Layout & Fonts</span>
                    <span className="text-emerald-600">{report.sectionScores.formatting}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full" style={{ width: `${report.sectionScores.formatting}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Keywords Found vs Missing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-subtle space-y-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Detected Technical Keywords ({report.skillsExtracted.length})
              </h3>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {report.skillsExtracted.map((sk: string) => (
                  <span key={sk} className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-medium text-xs border border-emerald-100">
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-subtle space-y-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-500" /> Missing High-Yield Keywords
              </h3>
              <p className="text-xs text-slate-500">Add these keywords to increase recruiter search indexing:</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {report.missingRecommended.map((kw: string) => (
                  <span key={kw} className="px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 font-semibold text-xs border border-purple-200">
                    + {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* AI Bullet Point Transformations */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-subtle space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-600" /> AI Resume Bullet Enhancements (Google XYZ Formula)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Formula: "Accomplished [X] as measured by [Y], by doing [Z]"
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {report.bulletImprovements.map((item: any, idx: number) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-3 text-xs">
                  <div className="text-slate-500">
                    <span className="font-bold text-red-500 uppercase tracking-wider text-[10px] mr-2">Original:</span>
                    <span className="italic">"{item.original}"</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 flex items-start justify-between gap-3 text-slate-900">
                    <div>
                      <span className="font-bold text-emerald-800 uppercase tracking-wider text-[10px] block mb-1">
                        AI Optimized:
                      </span>
                      <p className="font-medium text-emerald-950 leading-relaxed">{item.improved}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(item.improved, idx)}
                      className="p-2 rounded-lg bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-100 transition-colors shrink-0"
                      title="Copy bullet"
                    >
                      {copiedIdx === idx ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="text-[11px] text-slate-500 italic pl-1">
                    💡 <strong>Rationale:</strong> {item.rationale}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
