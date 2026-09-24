import React, { useState } from 'react';
import {
  Play,
  Send,
  CheckCircle2,
  XCircle,
  Clock,
  Terminal,
  ChevronDown,
  RotateCcw,
  Sparkles,
  HelpCircle,
  FileCode,
  Layers,
  History,
} from 'lucide-react';

interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  companies: string[];
  description: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  constraints: string[];
  hints: string[];
  starterCode: {
    java: string;
    python: string;
    cpp: string;
    javascript: string;
  };
}

const PROBLEMS: Problem[] = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays & Hash Tables',
    companies: ['Google', 'Amazon', 'Meta', 'Microsoft'],
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.`,
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
      },
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.',
    ],
    hints: [
      'A brute force approach checks all pairs in O(n^2).',
      'Can you use a HashMap to look up target - nums[i] in O(1) time?',
    ],
    starterCode: {
      java: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Your code here\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (map.containsKey(complement)) {\n                return new int[] { map.get(complement), i };\n            }\n            map.put(nums[i], i);\n        }\n        return new int[]{};\n    }\n}`,
      python: `class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        seen = {}\n        for i, num in enumerate(nums):\n            diff = target - num\n            if diff in seen:\n                return [seen[diff], i]\n            seen[num] = i\n        return []`,
      cpp: `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> seen;\n        for (int i = 0; i < nums.size(); ++i) {\n            int diff = target - nums[i];\n            if (seen.count(diff)) return {seen[diff], i};\n            seen[nums[i]] = i;\n        }\n        return {};\n    }\n};`,
      javascript: `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n    const seen = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const diff = target - nums[i];\n        if (seen.has(diff)) return [seen.get(diff), i];\n        seen.set(nums[i], i);\n    }\n    return [];\n};`,
    },
  },
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    category: 'Stacks & Strings',
    companies: ['Amazon', 'Bloomberg', 'Apple'],
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      {
        input: 's = "()"',
        output: 'true',
      },
      {
        input: 's = "()[]{}"',
        output: 'true',
      },
      {
        input: 's = "(]"',
        output: 'false',
      },
    ],
    constraints: ['1 <= s.length <= 10^4', 's consists of parentheses only \'()[]{}\'.'],
    hints: ['Use a stack. Push opening brackets and pop matching closing brackets.'],
    starterCode: {
      java: `class Solution {\n    public boolean isValid(String s) {\n        Stack<Character> stack = new Stack<>();\n        for (char c : s.toCharArray()) {\n            if (c == '(') stack.push(')');\n            else if (c == '{') stack.push('}');\n            else if (c == '[') stack.push(']');\n            else if (stack.isEmpty() || stack.pop() != c) return false;\n        }\n        return stack.isEmpty();\n    }\n}`,
      python: `class Solution:\n    def isValid(self, s: str) -> bool:\n        stack = []\n        mapping = {')': '(', '}': '{', ']': '['}\n        for char in s:\n            if char in mapping:\n                top = stack.pop() if stack else '#'\n                if mapping[char] != top:\n                    return False\n            else:\n                stack.append(char)\n        return not stack`,
      cpp: `class Solution {\npublic:\n    bool isValid(string s) {\n        stack<char> st;\n        for (char c : s) {\n            if (c == '(' || c == '{' || c == '[') st.push(c);\n            else {\n                if (st.empty()) return false;\n                if (c == ')' && st.top() != '(') return false;\n                if (c == '}' && st.top() != '{') return false;\n                if (c == ']' && st.top() != '[') return false;\n                st.pop();\n            }\n        }\n        return st.empty();\n    }\n};`,
      javascript: `var isValid = function(s) {\n    const stack = [];\n    const pairs = { ')': '(', '}': '{', ']': '[' };\n    for (let char of s) {\n        if (!pairs[char]) stack.push(char);\n        else if (stack.pop() !== pairs[char]) return false;\n    }\n    return stack.length === 0;\n};`,
    },
  },
  {
    id: 'longest-substring',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    category: 'Sliding Window',
    companies: ['Google', 'Meta', 'Netflix', 'Uber'],
    description: `Given a string \`s\`, find the length of the longest substring without repeating characters.`,
    examples: [
      {
        input: 's = "abcabcbb"',
        output: '3',
        explanation: 'The answer is "abc", with the length of 3.',
      },
    ],
    constraints: ['0 <= s.length <= 5 * 10^4', 's consists of English letters, digits, symbols and spaces.'],
    hints: ['Maintain a sliding window with left and right pointers and a character index map.'],
    starterCode: {
      java: `class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        int max = 0;\n        Map<Character, Integer> map = new HashMap<>();\n        for (int r = 0, l = 0; r < s.length(); r++) {\n            if (map.containsKey(s.charAt(r))) {\n                l = Math.max(map.get(s.charAt(r)) + 1, l);\n            }\n            map.put(s.charAt(r), r);\n            max = Math.max(max, r - l + 1);\n        }\n        return max;\n    }\n}`,
      python: `class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        seen = {}\n        l = 0\n        max_len = 0\n        for r, char in enumerate(s):\n            if char in seen and seen[char] >= l:\n                l = seen[char] + 1\n            seen[char] = r\n            max_len = max(max_len, r - l + 1)\n        return max_len`,
      cpp: `class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        vector<int> last(256, -1);\n        int maxLen = 0, l = 0;\n        for (int r = 0; r < s.size(); ++r) {\n            l = max(l, last[s[r]] + 1);\n            maxLen = max(maxLen, r - l + 1);\n            last[s[r]] = r;\n        }\n        return maxLen;\n    }\n};`,
      javascript: `var lengthOfLongestSubstring = function(s) {\n    let map = new Map(), max = 0, l = 0;\n    for (let r = 0; r < s.length; r++) {\n        if (map.has(s[r])) l = Math.max(map.get(s[r]) + 1, l);\n        map.set(s[r], r);\n        max = Math.max(max, r - l + 1);\n    }\n    return max;\n};`,
    },
  },
];

export const CodingArenaPage: React.FC = () => {
  const [selectedProblem, setSelectedProblem] = useState<Problem>(PROBLEMS[0]);
  const [language, setLanguage] = useState<'java' | 'python' | 'cpp' | 'javascript'>('java');
  const [code, setCode] = useState(selectedProblem.starterCode[language]);
  const [activeTab, setActiveTab] = useState<'description' | 'history'>('description');
  const [executing, setExecuting] = useState(false);
  const [verdict, setVerdict] = useState<any>(null);
  const [showHints, setShowHints] = useState(false);
  const [submissions, setSubmissions] = useState<any[]>([
    {
      id: 'sub-1',
      lang: 'Java',
      status: 'Accepted',
      runtime: '2 ms',
      memory: '43.2 MB',
      date: 'Today, 10:14 AM',
    },
  ]);

  const handleProblemChange = (p: Problem) => {
    setSelectedProblem(p);
    setCode(p.starterCode[language]);
    setVerdict(null);
  };

  const handleLanguageChange = (lang: 'java' | 'python' | 'cpp' | 'javascript') => {
    setLanguage(lang);
    setCode(selectedProblem.starterCode[lang]);
  };

  const handleExecuteCode = (isSubmit: boolean) => {
    setExecuting(true);
    setTimeout(() => {
      setExecuting(false);
      const res = {
        status: 'ACCEPTED',
        runtime: `${Math.floor(Math.random() * 5) + 1} ms (Beats 96.4%)`,
        memory: `${(Math.random() * 2 + 42).toFixed(1)} MB (Beats 89.2%)`,
        passedTests: isSubmit ? 45 : 2,
        totalTests: isSubmit ? 45 : 2,
        logs: 'Running in Judge0 Isolated Sandbox... Execution finished with exit code 0.',
      };
      setVerdict(res);

      if (isSubmit) {
        setSubmissions((prev) => [
          {
            id: `sub-${Date.now()}`,
            lang: language.toUpperCase(),
            status: 'Accepted',
            runtime: res.runtime,
            memory: res.memory,
            date: 'Just now',
          },
          ...prev,
        ]);
      }
    }, 1200);
  };

  return (
    <div className="h-[calc(100vh-110px)] flex flex-col gap-3 animate-fadeIn">
      {/* Top Header Bar */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-subtle flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              value={selectedProblem.id}
              onChange={(e) => {
                const found = PROBLEMS.find((p) => p.id === e.target.value);
                if (found) handleProblemChange(found);
              }}
              className="font-bold text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none cursor-pointer"
            >
              {PROBLEMS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>

          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
              selectedProblem.difficulty === 'Easy'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-amber-50 text-amber-700 border-amber-200'
            }`}
          >
            {selectedProblem.difficulty}
          </span>

          <span className="text-xs text-slate-500 hidden md:inline">
            Category: <strong className="text-slate-700">{selectedProblem.category}</strong>
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value as any)}
            className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none"
          >
            <option value="java">Java 21</option>
            <option value="python">Python 3.11</option>
            <option value="cpp">C++ 20</option>
            <option value="javascript">JavaScript (ES2024)</option>
          </select>

          <button
            onClick={() => handleExecuteCode(false)}
            disabled={executing}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <Play className="w-3.5 h-3.5 text-slate-600" /> Run
          </button>

          <button
            onClick={() => handleExecuteCode(true)}
            disabled={executing}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Send className="w-3.5 h-3.5" /> Submit
          </button>
        </div>
      </div>

      {/* Main Split Body */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-3 min-h-0">
        {/* Left Column: Problem Details & Tabs */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-subtle flex flex-col min-h-0 overflow-hidden">
          <div className="flex items-center gap-4 px-6 pt-3 border-b border-slate-100 text-xs font-semibold text-slate-500 shrink-0">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-3 flex items-center gap-1.5 border-b-2 transition-colors ${
                activeTab === 'description'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent hover:text-slate-800'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" /> Description
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`pb-3 flex items-center gap-1.5 border-b-2 transition-colors ${
                activeTab === 'history'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent hover:text-slate-800'
              }`}
            >
              <History className="w-3.5 h-3.5" /> Submissions ({submissions.length})
            </button>
          </div>

          <div className="flex-1 p-6 overflow-y-auto space-y-6 text-sm">
            {activeTab === 'description' ? (
              <>
                <div>
                  <h3 className="font-bold text-slate-900 text-base mb-2">{selectedProblem.title}</h3>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {selectedProblem.companies.map((c) => (
                      <span
                        key={c}
                        className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-600"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                  <p className="text-slate-600 leading-relaxed whitespace-pre-line text-xs">
                    {selectedProblem.description}
                  </p>
                </div>

                {/* Examples */}
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Examples</h4>
                  {selectedProblem.examples.map((ex, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 font-mono text-xs space-y-1">
                      <div>
                        <strong className="text-slate-800 font-sans">Input:</strong> {ex.input}
                      </div>
                      <div>
                        <strong className="text-slate-800 font-sans">Output:</strong> {ex.output}
                      </div>
                      {ex.explanation && (
                        <div className="text-slate-500 font-sans text-[11px] pt-1 border-t border-slate-200/60">
                          {ex.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Constraints */}
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Constraints</h4>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 font-mono">
                    {selectedProblem.constraints.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>

                {/* Hints */}
                <div className="pt-2 border-t border-slate-100">
                  <button
                    onClick={() => setShowHints(!showHints)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span>{showHints ? 'Hide Hints' : 'Need a hint?'}</span>
                  </button>
                  {showHints && (
                    <div className="mt-3 p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-100 text-xs text-indigo-900 space-y-1.5">
                      {selectedProblem.hints.map((h, i) => (
                        <p key={i}>💡 Hint {i + 1}: {h}</p>
                      ))}
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* Submissions History */
              <div className="space-y-3">
                {submissions.map((s) => (
                  <div
                    key={s.id}
                    className="p-3.5 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <div>
                        <span className="font-bold text-slate-800">{s.status}</span>
                        <span className="text-[10px] text-slate-400 block">{s.date} · {s.lang}</span>
                      </div>
                    </div>
                    <div className="text-right text-[11px] text-slate-600">
                      <div>Runtime: <strong className="text-slate-800">{s.runtime}</strong></div>
                      <div>Memory: <strong className="text-slate-800">{s.memory}</strong></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Code Editor & Execution Console */}
        <div className="flex flex-col gap-3 min-h-0">
          {/* Code Editor Box */}
          <div className="flex-1 bg-slate-900 rounded-2xl p-4 overflow-hidden border border-slate-800 flex flex-col min-h-0 shadow-subtle">
            <div className="text-xs text-slate-400 font-mono mb-2 flex items-center justify-between shrink-0">
              <span className="flex items-center gap-1.5">
                <FileCode className="w-3.5 h-3.5 text-indigo-400" />
                Solution.{language === 'java' ? 'java' : language === 'python' ? 'py' : language === 'cpp' ? 'cpp' : 'js'}
              </span>
              <button
                onClick={() => setCode(selectedProblem.starterCode[language])}
                className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1"
                title="Reset to starter code"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="flex-1 w-full bg-transparent text-slate-100 font-mono text-xs p-2 resize-none focus:outline-none selection:bg-indigo-600/80 leading-relaxed overflow-y-auto"
            />
          </div>

          {/* Execution Verdict Drawer */}
          <div className="h-44 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-subtle flex flex-col justify-between shrink-0">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-slate-500" /> Execution Console
              </span>
              {executing && (
                <span className="text-indigo-600 animate-pulse text-[11px] font-bold">
                  Compiling & running testcases...
                </span>
              )}
            </div>

            {verdict ? (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-emerald-900">{verdict.status}</div>
                    <div className="text-[10px] text-emerald-700">
                      {verdict.passedTests} / {verdict.totalTests} Test cases passed
                    </div>
                  </div>
                </div>
                <div className="text-right text-[11px] text-slate-600">
                  <div>Runtime: <span className="font-bold text-slate-900">{verdict.runtime}</span></div>
                  <div>Memory: <span className="font-bold text-slate-900">{verdict.memory}</span></div>
                </div>
              </div>
            ) : (
              <div className="text-center py-4 text-xs text-slate-400">
                Click "Run" for sample checks or "Submit" to execute against hidden evaluation cases.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
