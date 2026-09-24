import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between">
      {/* Public Navbar */}
      <nav className="w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50 px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-500/20">
              P
            </div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              PrepAI
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
            <a href="#mock-interviews" className="hover:text-indigo-600 transition-colors">AI Interviews</a>
            <a href="#curriculum" className="hover:text-indigo-600 transition-colors">Curriculum</a>
            <a href="#testimonials" className="hover:text-indigo-600 transition-colors">Success Stories</a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm font-semibold text-slate-700 hover:text-indigo-600 px-4 py-2 rounded-xl transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-5 py-2.5 rounded-xl shadow-md shadow-indigo-500/20 flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Public Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Public Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <Sparkles className="w-5 h-5 text-indigo-400" /> PrepAI
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering the next generation of engineers with AI-driven interview intelligence, DSA simulation, and instant ATS resume optimization.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Product</h4>
            <ul className="text-xs space-y-2">
              <li><Link to="/practice" className="hover:text-white">Aptitude & DSA</Link></li>
              <li><Link to="/interviews" className="hover:text-white">AI Mock Interview</Link></li>
              <li><Link to="/resume" className="hover:text-white">ATS Resume Grader</Link></li>
              <li><Link to="/leaderboard" className="hover:text-white">National Leaderboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Resources</h4>
            <ul className="text-xs space-y-2">
              <li><Link to="/resources" className="hover:text-white">Company Cheat Sheets</Link></li>
              <li><Link to="/resources" className="hover:text-white">Interview Experiences</Link></li>
              <li><a href="#" className="hover:text-white">System Design Primer</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Platform</h4>
            <p className="text-xs text-slate-400 mb-2">Designed for students, career changers, and university placement cells.</p>
            <span className="text-[11px] text-slate-500">© 2026 PrepAI Inc. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
