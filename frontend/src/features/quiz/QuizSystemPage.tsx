import React, { useState, useEffect } from 'react';
import {
  Clock,
  Flag,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Award,
} from 'lucide-react';

interface QuizQuestion {
  id: string;
  topic: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const ASSESSMENT_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    topic: 'Java & Concurrency',
    question: 'In Java, which garbage collection algorithm organizes heap memory into equal-sized regions and collects regions with the least live data first?',
    options: [
      'Serial Garbage Collector',
      'Parallel Garbage Collector',
      'Garbage-First (G1) Garbage Collector',
      'Concurrent Mark Sweep (CMS)',
    ],
    correct: 2,
    explanation: 'The G1 Garbage Collector divides the heap into equal-sized regions and prioritizes collecting regions containing the most garbage data first.',
  },
  {
    id: 'q2',
    topic: 'Database Systems',
    question: 'Which SQL transaction isolation level prevents Dirty Reads and Non-Repeatable Reads, but may still allow Phantom Reads under ANSI standards?',
    options: [
      'Read Uncommitted',
      'Read Committed',
      'Repeatable Read',
      'Serializable',
    ],
    correct: 2,
    explanation: 'Repeatable Read guarantees that data once read cannot change within the transaction, preventing dirty and non-repeatable reads.',
  },
  {
    id: 'q3',
    topic: 'Computer Networks',
    question: 'In the TCP three-way handshake, what is the exact sequence of packet flags exchanged between client and server?',
    options: [
      'SYN -> ACK -> SYN-ACK',
      'SYN -> SYN-ACK -> ACK',
      'ACK -> SYN -> ACK',
      'SYN -> FIN -> ACK',
    ],
    correct: 1,
    explanation: 'The standard TCP connection sequence is: 1) Client sends SYN, 2) Server responds with SYN-ACK, 3) Client sends ACK.',
  },
  {
    id: 'q4',
    topic: 'Data Structures & Algorithms',
    question: 'What is the worst-case time complexity of searching an element in a Red-Black Tree with N nodes?',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
    correct: 1,
    explanation: 'A Red-Black Tree is a self-balancing binary search tree whose height is bounded by 2 * log(N + 1), guaranteeing O(log N) worst-case search.',
  },
  {
    id: 'q5',
    topic: 'System Design',
    question: 'When designing a distributed key-value store, which caching strategy updates both the cache and underlying database simultaneously within the same transaction?',
    options: [
      'Cache-Aside (Lazy Loading)',
      'Write-Through',
      'Write-Behind (Write-Back)',
      'Refresh-Ahead',
    ],
    correct: 1,
    explanation: 'In Write-Through caching, the cache layer intercepts writes and simultaneously writes data to both cache and database before returning success.',
  },
];

export const QuizSystemPage: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(900); // 15 mins in seconds
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    let timer: any;
    if (!isSubmitted && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0 && !isSubmitted) {
      setIsSubmitted(true);
    }
    return () => clearInterval(timer);
  }, [timeLeft, isSubmitted]);

  const currentQ = ASSESSMENT_QUESTIONS[currentIdx];

  const handleSelectOption = (optIdx: number) => {
    if (isSubmitted) return;
    setAnswers({ ...answers, [currentIdx]: optIdx });
  };

  const toggleFlag = (idx: number) => {
    setFlagged({ ...flagged, [idx]: !flagged[idx] });
  };

  const calculateScore = () => {
    let correct = 0;
    ASSESSMENT_QUESTIONS.forEach((q, idx) => {
      if (answers[idx] === q.correct) correct++;
    });
    return {
      score: correct * 20,
      correctCount: correct,
      totalCount: ASSESSMENT_QUESTIONS.length,
      accuracy: Math.round((correct / ASSESSMENT_QUESTIONS.length) * 100),
    };
  };

  const formatTimer = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const stats = calculateScore();

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Assessment Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md">
            National Technical Benchmark #3
          </span>
          <h1 className="text-xl font-bold text-slate-900 mt-1">Full-Stack Core Assessment Test</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700">
            <Clock className="w-4 h-4 text-indigo-600" />
            <span>{isSubmitted ? 'Time Expired' : formatTimer(timeLeft)}</span>
          </div>

          {!isSubmitted ? (
            <button
              onClick={() => setIsSubmitted(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl transition-colors shadow-sm"
            >
              Finish Assessment
            </button>
          ) : (
            <button
              onClick={() => {
                setIsSubmitted(false);
                setAnswers({});
                setFlagged({});
                setTimeLeft(900);
                setCurrentIdx(0);
              }}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Retake
            </button>
          )}
        </div>
      </div>

      {isSubmitted ? (
        /* Results View */
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-subtle p-8 space-y-8 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center font-bold text-2xl shadow-sm">
              <Award className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Assessment Evaluation Complete</h2>
            <p className="text-xs text-slate-500">Your score has been logged to your streak & leaderboard profile.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <span className="text-xs font-semibold text-slate-500 uppercase">Total Score</span>
              <div className="text-3xl font-black text-indigo-600 mt-2">{stats.score} / 100</div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <span className="text-xs font-semibold text-slate-500 uppercase">Accuracy</span>
              <div className="text-3xl font-black text-emerald-600 mt-2">{stats.accuracy}%</div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <span className="text-xs font-semibold text-slate-500 uppercase">Correct Answers</span>
              <div className="text-3xl font-black text-slate-800 mt-2">{stats.correctCount} / {stats.totalCount}</div>
            </div>
          </div>

          {/* Question Breakdown */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm">Detailed Question Solutions</h3>
            {ASSESSMENT_QUESTIONS.map((q, idx) => {
              const isCorrect = answers[idx] === q.correct;
              return (
                <div key={idx} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">Q{idx + 1}: {q.question}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {isCorrect ? 'Correct (+20 XP)' : 'Incorrect'}
                    </span>
                  </div>
                  <div className="text-slate-600">
                    <strong className="text-slate-800">Correct Answer:</strong> {q.options[q.correct]}
                  </div>
                  <p className="text-[11px] text-slate-500 italic">💡 {q.explanation}</p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Active Question & Palette View */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Question Panel (3 Cols) */}
          <div className="lg:col-span-3 bg-white p-8 rounded-3xl border border-slate-200/80 shadow-subtle space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Question {currentIdx + 1} of {ASSESSMENT_QUESTIONS.length}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md">
                  {currentQ.topic}
                </span>
                <button
                  onClick={() => toggleFlag(currentIdx)}
                  className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors ${
                    flagged[currentIdx]
                      ? 'bg-amber-100 text-amber-800'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>{flagged[currentIdx] ? 'Flagged' : 'Flag'}</span>
                </button>
              </div>
            </div>

            <h3 className="text-base font-semibold text-slate-900 leading-relaxed">
              {currentQ.question}
            </h3>

            {/* Options */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((opt, idx) => {
                const isSelected = answers[currentIdx] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-2xl border text-xs font-medium transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-indigo-50 border-indigo-600 text-indigo-900 font-semibold'
                        : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span>{opt}</span>
                    {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />}
                  </button>
                );
              })}
            </div>

            {/* Nav controls */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100">
              <button
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx((i) => i - 1)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl disabled:opacity-40 flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Previous
              </button>
              <button
                disabled={currentIdx === ASSESSMENT_QUESTIONS.length - 1}
                onClick={() => setCurrentIdx((i) => i + 1)}
                className="px-4 py-2 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 rounded-xl disabled:opacity-40 flex items-center gap-1"
              >
                Next <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Question Navigation Palette (1 Col) */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-subtle space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Question Palette
            </h4>
            <div className="grid grid-cols-5 gap-2">
              {ASSESSMENT_QUESTIONS.map((_, idx) => {
                const isAnswered = answers[idx] !== undefined;
                const isFlagged = flagged[idx];
                const isCurrent = currentIdx === idx;

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentIdx(idx)}
                    className={`h-9 rounded-xl font-bold text-xs flex items-center justify-center transition-all ${
                      isCurrent
                        ? 'ring-2 ring-indigo-600 font-extrabold'
                        : ''
                    } ${
                      isFlagged
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : isAnswered
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2 text-[11px] text-slate-500 font-medium">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-md bg-indigo-600" /> Answered
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-md bg-slate-100 border border-slate-200" /> Unanswered
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-md bg-amber-100 border border-amber-300" /> Flagged for Review
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
