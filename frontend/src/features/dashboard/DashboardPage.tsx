import React from 'react';
import { useAuthStore } from '@/store/authStore';
import {
  Flame,
  Brain,
  Code2,
  Video,
  FileCheck2,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  Clock,
  ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-800 text-white p-8 shadow-xl shadow-indigo-500/10">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium text-indigo-100 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            AI Placement Preparation Copilot Active
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Welcome back, {user?.fullName || 'Engineer'}! 👋
          </h1>
          <p className="text-indigo-100 text-sm leading-relaxed">
            Your next target role is <span className="font-semibold text-white">Full-Stack SDE</span>. Complete today's recommended mock interview and 2 DSA tree problems to preserve your 5-day streak!
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <Link
              to="/interviews"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-indigo-700 font-semibold text-sm shadow-md hover:bg-indigo-50 transition-all hover:scale-[1.02]"
            >
              Start AI Mock Interview
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              to="/coding"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-500/30 hover:bg-indigo-500/40 text-white border border-white/20 font-medium text-sm transition-all"
            >
              Solve Daily Challenge
            </Link>
          </div>
        </div>

        {/* Decorative background circle */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1 */}
        <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-subtle hover:shadow-card transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Aptitude & DSA</span>
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
              <Brain className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-slate-900">142 / 200</div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-emerald-600 font-medium">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>71% Accuracy rate</span>
            </div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-subtle hover:shadow-card transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Coding Problems</span>
            <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
              <Code2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-slate-900">48 Solved</div>
            <div className="text-xs text-slate-500 mt-1">12 Easy · 28 Medium · 8 Hard</div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-subtle hover:shadow-card transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Mock Interviews</span>
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
              <Video className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-slate-900">8 Completed</div>
            <div className="text-xs text-emerald-600 mt-1 font-medium">Avg Score: 84 / 100</div>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-subtle hover:shadow-card transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Current Streak</span>
            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
              <Flame className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-slate-900">{user?.streakDays || 5} Days</div>
            <div className="text-xs text-amber-600 mt-1 font-medium">Top 5% consistency</div>
          </div>
        </div>
      </div>

      {/* Main Content Split: Recommended Roadmap & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: AI Recommended Practice */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-subtle">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">AI Recommended Daily Targets</h3>
                <p className="text-xs text-slate-500">Based on your recent interview gaps & aptitude weaknesses</p>
              </div>
              <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
                High Priority
              </span>
            </div>

            <div className="space-y-3.5">
              <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
                    DSA
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800">Binary Tree Level Order Traversal</h4>
                    <span className="text-xs text-slate-500">LeetCode Medium · Google, Amazon Tagged</span>
                  </div>
                </div>
                <Link
                  to="/coding"
                  className="px-3.5 py-1.5 text-xs font-semibold text-indigo-600 bg-white border border-slate-200 rounded-lg hover:bg-indigo-50"
                >
                  Solve
                </Link>
              </div>

              <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-xs">
                    APT
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800">Permutations & Combinations Drill</h4>
                    <span className="text-xs text-slate-500">15 MCQs · 20 mins timer</span>
                  </div>
                </div>
                <Link
                  to="/practice"
                  className="px-3.5 py-1.5 text-xs font-semibold text-purple-600 bg-white border border-slate-200 rounded-lg hover:bg-purple-50"
                >
                  Start
                </Link>
              </div>

              <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xs">
                    AI
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800">System Design: URL Shortener (Bitly)</h4>
                    <span className="text-xs text-slate-500">Interactive Turn-by-Turn AI Mock</span>
                  </div>
                </div>
                <Link
                  to="/interviews"
                  className="px-3.5 py-1.5 text-xs font-semibold text-emerald-600 bg-white border border-slate-200 rounded-lg hover:bg-emerald-50"
                >
                  Simulate
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: ATS Resume Score & Leaderboard Preview */}
        <div className="space-y-6">
          {/* ATS Score Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-subtle">
            <h3 className="font-bold text-slate-900 text-sm">Resume ATS Compatibility</h3>
            <p className="text-xs text-slate-500 mb-4">Latest scan: software_engineer_cv.pdf</p>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl mb-4">
              <div>
                <div className="text-3xl font-extrabold text-indigo-600">86%</div>
                <span className="text-xs font-semibold text-emerald-600">Strong ATS Match</span>
              </div>
              <Link
                to="/resume"
                className="text-xs font-semibold text-indigo-600 flex items-center gap-1 hover:underline"
              >
                View Audit <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Recommendation: Add quantified impact metrics to your recent React projects and include Docker/Kubernetes tags.
            </p>
          </div>

          {/* Quick Practice Modules */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-subtle space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">Practice Tracks</h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <Link to="/practice" className="p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 font-medium text-slate-700 transition-colors text-center border border-slate-100">
                Quantitative
              </Link>
              <Link to="/practice" className="p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 font-medium text-slate-700 transition-colors text-center border border-slate-100">
                Logical Reasoning
              </Link>
              <Link to="/practice" className="p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 font-medium text-slate-700 transition-colors text-center border border-slate-100">
                Core Java & OOP
              </Link>
              <Link to="/practice" className="p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 font-medium text-slate-700 transition-colors text-center border border-slate-100">
                DBMS & SQL
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
