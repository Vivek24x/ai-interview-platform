import React, { useState } from 'react';
import {
  Users,
  FileCode2,
  HelpCircle,
  ShieldAlert,
  TrendingUp,
  Plus,
  CheckCircle2,
  X,
  Search,
  Activity,
  Server,
  Zap,
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'metrics' | 'problems' | 'users'>('metrics');
  const [showAddProblemModal, setShowAddProblemModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDifficulty, setNewDifficulty] = useState('Medium');
  const [newCategory, setNewCategory] = useState('Dynamic Programming');
  const [newCompanies, setNewCompanies] = useState('Google, Amazon');

  const [problems, setProblems] = useState([
    { id: '1', title: 'Two Sum', difficulty: 'Easy', category: 'Array', submissions: 1420 },
    { id: '2', title: 'Valid Parentheses', difficulty: 'Easy', category: 'Stack', submissions: 980 },
    { id: '3', title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', category: 'Sliding Window', submissions: 750 },
    { id: '4', title: 'Merge k Sorted Lists', difficulty: 'Hard', category: 'Heap / Priority Queue', submissions: 420 },
  ]);

  const [students, setStudents] = useState([
    { id: 's1', name: 'Alex Mercer', email: 'alex@university.edu', college: 'State Tech University', streak: 5, points: 1420, status: 'Active' },
    { id: 's2', name: 'Ananya Sharma', email: 'ananya@pilani.bits.edu', college: 'BITS Pilani', streak: 38, points: 3190, status: 'Active' },
    { id: 's3', name: 'Siddharth Rao', email: 'siddharth@iitb.ac.in', college: 'IIT Bombay', streak: 42, points: 3420, status: 'Active' },
  ]);

  const handleAddProblem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    setProblems([
      ...problems,
      {
        id: Date.now().toString(),
        title: newTitle,
        difficulty: newDifficulty,
        category: newCategory,
        submissions: 0,
      },
    ]);

    setNewTitle('');
    setShowAddProblemModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">System Administration</h1>
          <p className="text-xs text-slate-400 mt-1">Platform telemetry, question bank curation, and user audits</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> All Microservices Healthy
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 text-xs font-semibold text-slate-400">
        <button
          onClick={() => setActiveTab('metrics')}
          className={`px-4 py-2 rounded-xl transition-colors ${
            activeTab === 'metrics' ? 'bg-purple-600 text-white' : 'hover:text-white'
          }`}
        >
          Telemetry & Health
        </button>
        <button
          onClick={() => setActiveTab('problems')}
          className={`px-4 py-2 rounded-xl transition-colors ${
            activeTab === 'problems' ? 'bg-purple-600 text-white' : 'hover:text-white'
          }`}
        >
          Coding Problems ({problems.length})
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-xl transition-colors ${
            activeTab === 'users' ? 'bg-purple-600 text-white' : 'hover:text-white'
          }`}
        >
          Student Registry ({students.length})
        </button>
      </div>

      {activeTab === 'metrics' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Admin Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
              <div className="text-xs font-semibold text-slate-400 uppercase">Registered Students</div>
              <div className="text-2xl font-bold text-white mt-2">1,248</div>
              <div className="text-[11px] text-emerald-400 mt-1">+14% this week</div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
              <div className="text-xs font-semibold text-slate-400 uppercase">Coding Submissions</div>
              <div className="text-2xl font-bold text-white mt-2">18,490</div>
              <div className="text-[11px] text-purple-400 mt-1">Judge0 Queue: Normal</div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
              <div className="text-xs font-semibold text-slate-400 uppercase">AI Interviews Streamed</div>
              <div className="text-2xl font-bold text-white mt-2">3,120</div>
              <div className="text-[11px] text-indigo-400 mt-1">Gemini 1.5 Latency: 840ms</div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
              <div className="text-xs font-semibold text-slate-400 uppercase">Aptitude MCQs Active</div>
              <div className="text-2xl font-bold text-white mt-2">2,450</div>
              <div className="text-[11px] text-amber-400 mt-1">12 Categories</div>
            </div>
          </div>

          {/* Infrastructure Health */}
          <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-purple-400" /> Infrastructure Health & Service Status
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-200 block">Spring Boot Gateway</span>
                  <span className="text-slate-500 text-[11px]">Port 8080 · Virtual Threads Active</span>
                </div>
                <span className="text-emerald-400 font-bold">99.98%</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-200 block">FastAPI AI Engine</span>
                  <span className="text-slate-500 text-[11px]">Port 8000 · Gemini 1.5 Pro/Flash</span>
                </div>
                <span className="text-emerald-400 font-bold">99.95%</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-200 block">MongoDB Atlas & Redis</span>
                  <span className="text-slate-500 text-[11px]">Port 27017 / 6379 · Replicated</span>
                </div>
                <span className="text-emerald-400 font-bold">100%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'problems' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-sm">Coding Algorithm Problem Library</h3>
            <button
              onClick={() => setShowAddProblemModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs rounded-xl shadow-xs"
            >
              <Plus className="w-4 h-4" /> Add Problem
            </button>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 overflow-hidden">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 uppercase font-semibold">
                  <th className="py-3 px-6">Problem Title</th>
                  <th className="py-3 px-6">Difficulty</th>
                  <th className="py-3 px-6">Category</th>
                  <th className="py-3 px-6 text-right">Total Submissions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {problems.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-900/50">
                    <td className="py-3.5 px-6 font-semibold text-white">{p.title}</td>
                    <td className="py-3.5 px-6">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          p.difficulty === 'Easy'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : p.difficulty === 'Medium'
                            ? 'bg-amber-950 text-amber-400 border border-amber-800'
                            : 'bg-red-950 text-red-400 border border-red-800'
                        }`}
                      >
                        {p.difficulty}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-slate-400">{p.category}</td>
                    <td className="py-3.5 px-6 text-right text-slate-300 font-mono">{p.submissions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-sm">Student Directory</h3>
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-xs text-slate-300">
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <input type="text" placeholder="Filter by email or college..." className="bg-transparent focus:outline-none" />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 overflow-hidden">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 uppercase font-semibold">
                  <th className="py-3 px-6">Student Name</th>
                  <th className="py-3 px-6">Email</th>
                  <th className="py-3 px-6">University</th>
                  <th className="py-3 px-6">Streak</th>
                  <th className="py-3 px-6 text-right">Total XP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {students.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-900/50">
                    <td className="py-3.5 px-6 font-semibold text-white">{s.name}</td>
                    <td className="py-3.5 px-6 text-slate-400 font-mono">{s.email}</td>
                    <td className="py-3.5 px-6 text-slate-400">{s.college}</td>
                    <td className="py-3.5 px-6 text-amber-400 font-bold">{s.streak} Days</td>
                    <td className="py-3.5 px-6 text-right text-purple-400 font-bold">{s.points} XP</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Problem Modal */}
      {showAddProblemModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 max-w-lg w-full rounded-3xl p-6 shadow-2xl space-y-4 animate-scaleUp relative">
            <button
              onClick={() => setShowAddProblemModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white">Create New Algorithm Problem</h3>

            <form onSubmit={handleAddProblem} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Problem Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Trapping Rain Water"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Difficulty</label>
                  <select
                    value={newDifficulty}
                    onChange={(e) => setNewDifficulty(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="e.g. Dynamic Programming"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddProblemModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-sm"
                >
                  Save Problem
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
