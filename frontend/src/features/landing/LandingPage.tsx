import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  BrainCircuit,
  Code2,
  Video,
  FileCheck2,
  Trophy,
  CheckCircle2,
  Star,
  Users,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-6 text-center max-w-5xl mx-auto space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-semibold shadow-xs">
          <Sparkles className="w-4 h-4 text-indigo-500 animate-spin" />
          <span>Next-Generation AI Placement Preparation Engine</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
          Master Coding, Aptitude &{' '}
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            AI Mock Interviews
          </span>
        </h1>

        <p className="text-slate-600 text-lg sm:text-xl max-w-2xl mx-auto font-normal leading-relaxed">
          The all-in-one placement acceleration platform with intelligent ATS resume auditing, live AI voice & text interviews, and sandboxed DSA coding challenges.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            to="/register"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-base shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            Start Free Preparation
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/login"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-slate-700 border border-slate-200/80 font-semibold text-base hover:bg-slate-50 transition-all shadow-subtle"
          >
            Explore Dashboard
          </Link>
        </div>

        {/* Social Proof */}
        <div className="pt-8 flex items-center justify-center gap-6 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 10,000+ Aptitude & DSA Questions
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Powered by Google Gemini 1.5
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Free ATS Resume Score
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600">Complete Preparation Arsenal</h2>
          <p className="text-3xl font-extrabold text-slate-900">Everything you need to crack dream job offers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-subtle hover:shadow-card hover:-translate-y-1 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Video className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">AI Mock Interviews</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Experience realistic Technical, HR, and System Design interviews tailored to target companies with instant AI scoring and rubrics.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-subtle hover:shadow-card hover:-translate-y-1 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Sandboxed Coding Arena</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Solve LeetCode-style algorithms with Monaco Editor in Java, Python, C++, and JavaScript with isolated testcase execution.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-subtle hover:shadow-card hover:-translate-y-1 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">ATS Resume Scanner</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Upload your PDF resume to extract skills, detect missing keywords, evaluate bullet points, and maximize recruiter callback rates.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
