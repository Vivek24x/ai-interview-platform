import React from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Users, FileCode2, HelpCircle, FileCheck, BarChart3, Settings, ArrowLeft } from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <header className="border-b border-slate-800 bg-slate-950/80 px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="text-slate-400 hover:text-white flex items-center gap-1.5 text-xs">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Student Mode
          </Link>
          <span className="text-slate-600">|</span>
          <span className="font-bold text-sm tracking-wide text-purple-400">ADMINISTRATION CONSOLE</span>
        </div>
        <div className="text-xs text-slate-400">
          Logged in as <strong className="text-slate-200">{user?.email}</strong>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="w-64 border-r border-slate-800 bg-slate-950/40 p-4 space-y-1">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                isActive ? 'bg-purple-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <BarChart3 className="w-4 h-4" /> Overview & Metrics
          </NavLink>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                isActive ? 'bg-purple-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <Users className="w-4 h-4" /> Students & Users
          </NavLink>
          <NavLink
            to="/admin/problems"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                isActive ? 'bg-purple-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <FileCode2 className="w-4 h-4" /> Coding Problems
          </NavLink>
          <NavLink
            to="/admin/quizzes"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                isActive ? 'bg-purple-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <HelpCircle className="w-4 h-4" /> Tests & Quizzes
          </NavLink>
          <NavLink
            to="/admin/reports"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                isActive ? 'bg-purple-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <FileCheck className="w-4 h-4" /> Audit & Reports
          </NavLink>
        </aside>

        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
