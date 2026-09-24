import React from 'react';
import { Search, ExternalLink } from 'lucide-react';

const RESOURCES = [
  {
    title: 'Top 50 Spring Boot & Microservices Interview Questions (2026 Edition)',
    category: 'Backend Engineering',
    readTime: '12 min read',
    tags: ['Spring Boot', 'Kafka', 'JWT', 'Distributed Tracing'],
  },
  {
    title: 'Operating Systems & Concurrency: Virtual Memory & Mutex Deep-Dive',
    category: 'Core CS',
    readTime: '8 min read',
    tags: ['Paging', 'Deadlocks', 'Semaphores'],
  },
  {
    title: 'System Design Blueprint: Designing High-Throughput Notification Engine',
    category: 'System Design',
    readTime: '15 min read',
    tags: ['WebSockets', 'Redis Pub/Sub', 'Rate Limiting'],
  },
];

export const ResourcesPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Articles & Study Resources</h1>
        <p className="text-sm text-slate-500 mt-1">
          Curated company interview experiences, cheat sheets, and architectural primers.
        </p>
      </div>

      <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-subtle max-w-md">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search cheat sheets, system design, companies..."
          className="w-full text-xs focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {RESOURCES.map((r, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-subtle flex flex-col justify-between hover:shadow-card transition-all">
            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                {r.category}
              </span>
              <h3 className="font-bold text-slate-900 text-sm leading-snug">{r.title}</h3>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {r.tags.map((t) => (
                  <span key={t} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>{r.readTime}</span>
              <button className="text-indigo-600 font-semibold hover:underline flex items-center gap-1">
                Read Article <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
