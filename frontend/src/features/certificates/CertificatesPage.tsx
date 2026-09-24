import React, { useState } from 'react';
import { Award, Download, ExternalLink, ShieldCheck, CheckCircle2, Eye, X, Printer } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

export const CertificatesPage: React.FC = () => {
  const { user } = useAuthStore();
  const [selectedCert, setSelectedCert] = useState<any>(null);

  const certificates = [
    {
      id: 'cert-1',
      certNumber: 'PREP-AI-2026-8819',
      title: 'Full-Stack Backend Mastery Track',
      recipientName: user?.fullName || 'Alex Mercer',
      track: 'Java 21, Spring Boot 3, MongoDB, & System Design',
      issueDate: 'September 2026',
      hash: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
      criteria: 'Completed 50+ DSA problems, 10 Java & System Design quizzes with >80% accuracy.',
      unlocked: true,
    },
    {
      id: 'cert-2',
      certNumber: 'PREP-AI-2026-9042',
      title: 'AI Mock Interview Excellence',
      recipientName: user?.fullName || 'Alex Mercer',
      track: 'Technical Architecture & Behavioral STAR Method',
      issueDate: 'Pending',
      criteria: 'Requires completing 5 Technical Mock Interviews with an average AI rating >85%. (3/5 Completed)',
      unlocked: false,
    },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Certificates & Credentials</h1>
        <p className="text-sm text-slate-500 mt-1">
          Cryptographically signed, verifiable credentials issued upon passing assessment benchmarks and technical interview tracks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className={`rounded-3xl border p-6 flex flex-col justify-between transition-all ${
              cert.unlocked
                ? 'bg-white border-slate-200/80 shadow-subtle hover:shadow-card'
                : 'bg-slate-50/70 border-dashed border-slate-200 opacity-80'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span
                  className={`p-3 rounded-2xl ${
                    cert.unlocked ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  <Award className="w-6 h-6" />
                </span>
                <span
                  className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                    cert.unlocked
                      ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                      : 'text-slate-500 bg-slate-200 border-slate-300'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {cert.unlocked ? 'SHA-256 Verified' : 'In Progress (60%)'}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Credential ID: {cert.certNumber}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">{cert.title}</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{cert.criteria}</p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400">Issued: {cert.issueDate}</span>
              {cert.unlocked && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" /> View
                  </button>
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" /> Download
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Certificate Viewer Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full rounded-3xl p-8 shadow-2xl space-y-6 animate-scaleUp relative">
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Certificate Paper Canvas */}
            <div className="border-4 border-double border-indigo-200 p-8 rounded-2xl bg-gradient-to-b from-indigo-50/30 via-white to-purple-50/20 text-center space-y-4 shadow-sm relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold text-lg mx-auto shadow-md">
                P
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold tracking-widest text-indigo-600 uppercase">
                  Certificate of Technical Achievement
                </span>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  PrepAI Placement Academy
                </h2>
              </div>

              <p className="text-xs text-slate-500">This is to certify that</p>
              <h3 className="text-xl font-extrabold text-indigo-700 font-serif underline decoration-indigo-300 underline-offset-4">
                {selectedCert.recipientName}
              </h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                has successfully mastered the rigorous curriculum and technical assessments for
              </p>
              <h4 className="text-base font-bold text-slate-900">{selectedCert.title}</h4>
              <p className="text-[11px] text-slate-500">{selectedCert.track}</p>

              <div className="pt-6 mt-6 border-t border-slate-200/80 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <div>
                  <span>Credential ID:</span> <strong className="text-slate-700">{selectedCert.certNumber}</strong>
                </div>
                <div>
                  <span>Verification Hash:</span> <strong className="text-slate-700">{selectedCert.hash.slice(0, 12)}...</strong>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Cryptographically Validated
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" /> Print
                </button>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-xs"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
