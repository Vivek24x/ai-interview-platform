import React, { useState } from 'react';
import {
  Calculator,
  Cpu,
  Binary,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  HelpCircle,
  Clock,
  Sparkles,
  BookOpen,
} from 'lucide-react';

interface QuestionItem {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const TOPIC_DRILLS: Record<string, QuestionItem[]> = {
  'Quantitative Aptitude': [
    {
      id: 'q1',
      question: 'A train 240 m in length crosses a telegraph post in 16 seconds. What is the speed of the train in km/hr?',
      options: ['54 km/hr', '60 km/hr', '45 km/hr', '72 km/hr'],
      correct: 0,
      explanation: 'Speed = Distance / Time = 240 m / 16 sec = 15 m/s. To convert to km/hr, multiply by 18/5: 15 * (18 / 5) = 54 km/hr.',
    },
    {
      id: 'q2',
      question: 'Two pipes A and B can fill a tank in 20 and 30 minutes respectively. If both pipes are opened together, the time taken to fill the tank is:',
      options: ['10 minutes', '12 minutes', '15 minutes', '25 minutes'],
      correct: 1,
      explanation: 'Work done by (A + B) in 1 min = 1/20 + 1/30 = (3 + 2)/60 = 5/60 = 1/12. Hence the tank fills in 12 minutes.',
    },
  ],
  'Database Management Systems (DBMS)': [
    {
      id: 'db1',
      question: 'In B+ Tree indexes, why are data pointers stored exclusively in the leaf nodes rather than internal nodes?',
      options: [
        'To reduce disk space consumption',
        'To allow internal nodes to hold more index keys, maximizing the fan-out and minimizing tree height',
        'Because internal nodes cannot be cached in RAM',
        'To eliminate the need for page splitting',
      ],
      correct: 1,
      explanation: 'By storing only search keys in internal nodes, a database page can fit more keys (higher branching factor/fan-out), reducing the number of disk I/O seeks required to reach any record.',
    },
    {
      id: 'db2',
      question: 'Which normal form ensures that there are no partial functional dependencies on candidate keys?',
      options: ['First Normal Form (1NF)', 'Second Normal Form (2NF)', 'Third Normal Form (3NF)', 'BCNF'],
      correct: 1,
      explanation: '2NF requires a relation to be in 1NF and guarantees that no non-prime attribute is functionally dependent on any proper subset of any candidate key.',
    },
  ],
  'Operating Systems & Concurrency': [
    {
      id: 'os1',
      question: 'What is the primary distinction between a Mutex and a Binary Semaphore?',
      options: [
        'A binary semaphore has ownership, whereas a mutex does not',
        'A mutex has an ownership principle: only the thread that acquired the mutex can release it, whereas any thread can signal a semaphore',
        'Semaphores are only implemented in hardware',
        'Mutexes cannot prevent race conditions',
      ],
      correct: 1,
      explanation: 'Mutexes have strict thread ownership semantics (the locking thread must unlock it). Semaphores are signaling mechanisms where one thread can wait and another can signal.',
    },
  ],
};

const CATEGORIES = [
  {
    id: 'aptitude',
    title: 'Aptitude & Reasoning',
    icon: Calculator,
    description: 'Quantitative aptitude, logical deductions, data interpretation and verbal reasoning.',
    topics: [
      { name: 'Quantitative Aptitude', count: '450+ Questions', accuracy: '78%' },
      { name: 'Logical Reasoning', count: '380+ Questions', accuracy: '82%' },
      { name: 'Verbal Ability & Grammar', count: '300+ Questions', accuracy: '85%' },
      { name: 'Data Interpretation (DI)', count: '150+ Questions', accuracy: '64%' },
    ],
  },
  {
    id: 'core-cs',
    title: 'Core Computer Science',
    icon: Cpu,
    description: 'Fundamental theoretical CS topics frequently tested in technical screening rounds.',
    topics: [
      { name: 'Database Management Systems (DBMS)', count: '220+ Questions', accuracy: '75%' },
      { name: 'Operating Systems & Concurrency', count: '190+ Questions', accuracy: '70%' },
      { name: 'Object-Oriented Programming (OOP)', count: '180+ Questions', accuracy: '88%' },
      { name: 'Computer Networks (OSI, TCP/IP)', count: '160+ Questions', accuracy: '68%' },
    ],
  },
  {
    id: 'dsa-theory',
    title: 'Data Structures & Algorithms Theory',
    icon: Binary,
    description: 'Time complexities, master theorem, recursion trees, and algorithmic patterns.',
    topics: [
      { name: 'Arrays & Two Pointers', count: '120+ MCQs', accuracy: '90%' },
      { name: 'Linked Lists & Stacks/Queues', count: '110+ MCQs', accuracy: '84%' },
      { name: 'Trees, BST & Heaps', count: '140+ MCQs', accuracy: '62%' },
      { name: 'Graphs & Dynamic Programming', count: '160+ MCQs', accuracy: '55%' },
    ],
  },
];

export const PracticePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('aptitude');
  const [activeDrillTopic, setActiveDrillTopic] = useState<string | null>(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const activeQuestions = activeDrillTopic ? TOPIC_DRILLS[activeDrillTopic] || [] : [];
  const currentQuestion = activeQuestions[currentQIndex];

  const handleSelectOption = (idx: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQIndex < activeQuestions.length - 1) {
      setCurrentQIndex((i) => i + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* If inside active drill */}
      {activeDrillTopic && currentQuestion ? (
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                setActiveDrillTopic(null);
                setCurrentQIndex(0);
                setSelectedAnswer(null);
                setShowExplanation(false);
              }}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Practice Categories
            </button>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              Question {currentQIndex + 1} of {activeQuestions.length}
            </span>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-subtle p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {activeDrillTopic}
              </span>
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Placement Screening Tag
              </span>
            </div>

            <h3 className="text-base font-semibold text-slate-900 leading-relaxed">
              {currentQuestion.question}
            </h3>

            {/* Options */}
            <div className="space-y-3 pt-2">
              {currentQuestion.options.map((opt, idx) => {
                const isSelected = selectedAnswer === idx;
                const isCorrect = idx === currentQuestion.correct;
                const isWrong = isSelected && !isCorrect;

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-2xl border text-xs font-medium transition-all flex items-center justify-between ${
                      showExplanation && isCorrect
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold'
                        : showExplanation && isWrong
                        ? 'bg-red-50 border-red-500 text-red-900'
                        : isSelected
                        ? 'bg-indigo-50 border-indigo-600 text-indigo-900'
                        : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span>{opt}</span>
                    {showExplanation && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  </button>
                );
              })}
            </div>

            {/* Step-by-Step Explanation */}
            {showExplanation && (
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-950 space-y-1.5 animate-fadeIn">
                <span className="font-bold flex items-center gap-1.5 text-indigo-700">
                  <BookOpen className="w-3.5 h-3.5" /> Detailed Explanation:
                </span>
                <p className="leading-relaxed text-slate-700">{currentQuestion.explanation}</p>
              </div>
            )}

            <div className="flex items-center justify-end pt-4 border-t border-slate-100">
              {currentQIndex < activeQuestions.length - 1 ? (
                <button
                  onClick={handleNextQuestion}
                  disabled={selectedAnswer === null}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  Next Question <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    setActiveDrillTopic(null);
                    setCurrentQIndex(0);
                    setSelectedAnswer(null);
                    setShowExplanation(false);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-sm"
                >
                  Finish Topic Drill
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Categories Explorer Mode */
        <>
          <div>
            <h1 className="text-2xl font-black text-slate-900">Practice Modules</h1>
            <p className="text-sm text-slate-500 mt-1">
              Topic-wise aptitude drills, logical deductions, and core CS fundamentals with instant step-by-step explanations.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-semibold transition-all shrink-0 ${
                    active
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20'
                      : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{cat.title}</span>
                </button>
              );
            })}
          </div>

          {/* Topics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CATEGORIES.find((c) => c.id === selectedCategory)?.topics.map((topic, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-subtle hover:shadow-card transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg">
                      {topic.count}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Accuracy: {topic.accuracy}
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">{topic.name}</h3>
                  <p className="text-xs text-slate-500">
                    Comprehensive topic drills covering previous year campus placement interview questions.
                  </p>
                </div>

                <div className="pt-6 flex items-center justify-between border-t border-slate-100 mt-4">
                  <div className="w-2/3 bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full rounded-full" style={{ width: topic.accuracy }} />
                  </div>
                  <button
                    onClick={() => {
                      setActiveDrillTopic(topic.name);
                      setCurrentQIndex(0);
                      setSelectedAnswer(null);
                      setShowExplanation(false);
                    }}
                    className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-xl flex items-center gap-1 transition-colors"
                  >
                    Start Drill <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
