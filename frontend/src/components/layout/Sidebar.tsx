import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BrainCircuit,
  Code2,
  Video,
  FileCheck2,
  FileText,
  Trophy,
  Award,
  BookOpen,
  Settings,
  ShieldCheck,
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

const navigationItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Practice (Aptitude & Tech)', href: '/practice', icon: BrainCircuit },
  { name: 'Coding Arena', href: '/coding', icon: Code2 },
  { name: 'AI Mock Interviews', href: '/interviews', icon: Video, badge: 'AI Live' },
  { name: 'Quizzes & Tests', href: '/quizzes', icon: FileCheck2 },
  { name: 'AI Resume Review', href: '/resume', icon: FileText, badge: 'ATS Pro' },
  { name: 'Leaderboard', href: '/leaderboard', icon: Trophy },
  { name: 'Certificates', href: '/certificates', icon: Award },
  { name: 'Resources & Articles', href: '/resources', icon: BookOpen },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'ROLE_ADMIN';

  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 min-h-[calc(100vh-61px)] flex flex-col justify-between p-4 shrink-0">
      <div className="space-y-1">
        <div className="px-3 py-2 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
          Student Cockpit
        </div>
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 shadow-xs border border-indigo-100 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 text-indigo-500/80" />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xs">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}

        {isAdmin && (
          <div className="pt-4 mt-4 border-t border-slate-100 space-y-1">
            <div className="px-3 py-2 text-[11px] font-bold text-purple-400 uppercase tracking-wider">
              Administration
            </div>
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-purple-50 text-purple-700 font-semibold border border-purple-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              <ShieldCheck className="w-4 h-4 text-purple-600" />
              <span>Admin Console</span>
            </NavLink>
          </div>
        )}
      </div>

      {/* Pro Badge Card */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-transparent border border-indigo-100 text-center">
        <p className="text-xs font-semibold text-slate-800">Placement Guarantee</p>
        <p className="text-[11px] text-slate-500 mt-1">Get interview-ready with 50+ mock tests & live AI feedback.</p>
      </div>
    </aside>
  );
};
