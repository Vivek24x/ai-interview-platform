import React from 'react';
import { useAuthStore } from '@/store/authStore';
import { User, Bell, Lock, Palette, Shield, Trash2, CheckCircle2 } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6 max-w-4xl animate-fadeIn">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Account & Preferences</h1>
        <p className="text-sm text-slate-500 mt-1">Manage profile information, study goals, and security credentials.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-subtle p-8 space-y-6">
        <h3 className="font-bold text-slate-900 text-base">Candidate Profile</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-600 font-semibold mb-1">Full Name</label>
            <input
              type="text"
              defaultValue={user?.fullName || 'Candidate'}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-600 font-semibold mb-1">Email Address</label>
            <input
              type="email"
              disabled
              defaultValue={user?.email || 'candidate@prepai.com'}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-400 text-sm cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-slate-600 font-semibold mb-1">University / Institute</label>
            <input
              type="text"
              defaultValue="State Institute of Engineering & Technology"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-600 font-semibold mb-1">Target Role</label>
            <input
              type="text"
              defaultValue="Software Development Engineer (SDE-1)"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shadow-xs">
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
};
