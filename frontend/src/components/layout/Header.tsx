import React from 'react';
import { useAuthStore } from '@/store/authStore';
import { Bell, Flame, Award, LogOut, User as UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  const { user, logout } = useAuthStore();

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-6 py-3.5 flex items-center justify-between transition-all">
      <div className="flex items-center gap-4">
        <Link to="/dashboard" className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-500/20">
            P
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              PrepAI
            </span>
            <span className="text-[10px] text-slate-600 font-medium tracking-wide uppercase -mt-1">
              Interview Intelligence
            </span>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-5">
        {/* Streak Counter */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200/60 text-amber-700 text-xs font-semibold shadow-xs">
          <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
          <span>{user?.streakDays || 0} Day Streak</span>
        </div>

        {/* Total Points */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-xs font-semibold shadow-xs">
          <Award className="w-4 h-4 text-indigo-500" />
          <span>{user?.totalPoints || 0} XP</span>
        </div>

        {/* Notifications */}
        <button 
          aria-label="View notifications"
          className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full ring-2 ring-white"></span>
        </button>

        {/* Profile Card & Logout */}
        <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
          <Link to="/profile" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold ring-2 ring-indigo-100">
              {user?.fullName?.charAt(0) || 'U'}
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">
                {user?.fullName || 'Candidate'}
              </span>
              <span className="text-[10px] text-slate-600">
                {user?.role === 'ROLE_ADMIN' ? 'Administrator' : 'Student'}
              </span>
            </div>
          </Link>

          <button
            onClick={logout}
            aria-label="Logout"
            className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
