import React, { useState } from 'react';
import { Trophy, Medal, Flame, Award, ArrowUp, Search, School, Globe, Calendar } from 'lucide-react';

interface LeaderboardUser {
  rank: number;
  name: string;
  college: string;
  points: number;
  streak: number;
  solved: number;
  avatarBg: string;
}

const ALL_TIME_DATA: LeaderboardUser[] = [
  { rank: 1, name: 'Siddharth Rao', college: 'IIT Bombay', points: 3420, streak: 42, solved: 185, avatarBg: 'bg-indigo-600' },
  { rank: 2, name: 'Ananya Sharma', college: 'BITS Pilani', points: 3190, streak: 38, solved: 172, avatarBg: 'bg-purple-600' },
  { rank: 3, name: 'Vivek Pal', college: 'State Tech University', points: 2890, streak: 26, solved: 154, avatarBg: 'bg-emerald-600' },
  { rank: 4, name: 'Rohan Verma', college: 'NIT Trichy', points: 2750, streak: 21, solved: 148, avatarBg: 'bg-amber-600' },
  { rank: 5, name: 'Priya Iyer', college: 'DTU Delhi', points: 2610, streak: 19, solved: 139, avatarBg: 'bg-rose-600' },
  { rank: 6, name: 'Arjun Mehta', college: 'IIIT Hyderabad', points: 2480, streak: 15, solved: 128, avatarBg: 'bg-cyan-600' },
  { rank: 7, name: 'Kavya Nair', college: 'VIT Vellore', points: 2310, streak: 14, solved: 119, avatarBg: 'bg-pink-600' },
];

const WEEKLY_DATA: LeaderboardUser[] = [
  { rank: 1, name: 'Ananya Sharma', college: 'BITS Pilani', points: 720, streak: 7, solved: 32, avatarBg: 'bg-purple-600' },
  { rank: 2, name: 'Vivek Pal', college: 'State Tech University', points: 680, streak: 6, solved: 29, avatarBg: 'bg-emerald-600' },
  { rank: 3, name: 'Siddharth Rao', college: 'IIT Bombay', points: 650, streak: 7, solved: 27, avatarBg: 'bg-indigo-600' },
  { rank: 4, name: 'Kavya Nair', college: 'VIT Vellore', points: 590, streak: 5, solved: 24, avatarBg: 'bg-pink-600' },
];

export const LeaderboardPage: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'all' | 'weekly'>('all');
  const [search, setSearch] = useState('');

  const dataset = timeframe === 'all' ? ALL_TIME_DATA : WEEKLY_DATA;
  const filtered = dataset.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.college.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">National Leaderboard</h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time rankings calculated via Redis Sorted Sets based on coding accuracy, streak, and mock interviews.
          </p>
        </div>

        {/* Timeframe Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200 text-xs font-semibold">
          <button
            onClick={() => setTimeframe('all')}
            className={`px-4 py-2 rounded-xl transition-all ${
              timeframe === 'all'
                ? 'bg-white text-indigo-700 shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All-Time Global
          </button>
          <button
            onClick={() => setTimeframe('weekly')}
            className={`px-4 py-2 rounded-xl transition-all ${
              timeframe === 'weekly'
                ? 'bg-white text-indigo-700 shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            This Week
          </button>
        </div>
      </div>

      {/* Podium Cards (Top 3) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {/* Rank 2 */}
        {dataset[1] && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-subtle flex flex-col items-center text-center relative order-2 md:order-1">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-700 text-lg mb-3">
              🥈
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase">Rank #2</span>
            <h3 className="font-bold text-slate-900 mt-1">{dataset[1].name}</h3>
            <p className="text-xs text-slate-500">{dataset[1].college}</p>
            <div className="mt-4 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold">
              {dataset[1].points} XP
            </div>
          </div>
        )}

        {/* Rank 1 */}
        {dataset[0] && (
          <div className="bg-gradient-to-b from-amber-500/10 via-white to-white p-6 rounded-3xl border-2 border-amber-300 shadow-card flex flex-col items-center text-center relative order-1 md:order-2 scale-105">
            <div className="w-14 h-14 rounded-full bg-amber-400 text-white flex items-center justify-center font-bold text-2xl shadow-md mb-3">
              👑
            </div>
            <span className="text-xs font-bold text-amber-600 uppercase">Rank #1 Champion</span>
            <h3 className="font-extrabold text-slate-900 text-lg mt-1">{dataset[0].name}</h3>
            <p className="text-xs text-slate-500">{dataset[0].college}</p>
            <div className="mt-4 px-4 py-1.5 bg-amber-500 text-white rounded-full text-xs font-bold shadow-sm">
              {dataset[0].points} XP
            </div>
          </div>
        )}

        {/* Rank 3 */}
        {dataset[2] && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-subtle flex flex-col items-center text-center relative order-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-700 text-lg mb-3">
              🥉
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase">Rank #3</span>
            <h3 className="font-bold text-slate-900 mt-1">{dataset[2].name}</h3>
            <p className="text-xs text-slate-500">{dataset[2].college}</p>
            <div className="mt-4 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold">
              {dataset[2].points} XP
            </div>
          </div>
        )}
      </div>

      {/* Filter and Table List */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-subtle overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search candidate name or college..."
            className="w-full text-xs text-slate-800 focus:outline-none"
          />
        </div>

        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold">
              <th className="py-3.5 px-6">Rank</th>
              <th className="py-3.5 px-6">Student</th>
              <th className="py-3.5 px-6">Institute</th>
              <th className="py-3.5 px-6">Problems Solved</th>
              <th className="py-3.5 px-6">Streak</th>
              <th className="py-3.5 px-6 text-right">Total XP</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((entry) => (
              <tr key={entry.rank} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-4 px-6 font-bold text-slate-900">#{entry.rank}</td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-7 h-7 rounded-full ${entry.avatarBg} text-white flex items-center justify-center font-bold text-[11px]`}>
                      {entry.name.charAt(0)}
                    </div>
                    <span className="font-semibold text-slate-800">{entry.name}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-slate-500">{entry.college}</td>
                <td className="py-4 px-6 text-slate-600 font-medium">{entry.solved}</td>
                <td className="py-4 px-6 text-amber-600 font-semibold">
                  <span className="flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-amber-500" /> {entry.streak} Days
                  </span>
                </td>
                <td className="py-4 px-6 text-right font-bold text-indigo-600">{entry.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
