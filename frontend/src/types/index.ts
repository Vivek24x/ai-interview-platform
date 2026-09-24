// ============================================================================
// Core Domain Types — AI Interview Preparation Platform
// ============================================================================

export type UserRole = 'ROLE_STUDENT' | 'ROLE_ADMIN';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  avatarUrl?: string;
  college?: string;
  branch?: string;
  graduationYear?: number;
  streakDays: number;
  totalPoints: number;
  createdAt: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken?: string;
  tokenType: string;
  expiresIn: number;
  user: User;
}

// ----------------------------------------------------------------------------
// Practice & Coding Types
// ----------------------------------------------------------------------------

export type DifficultyLevel = 'EASY' | 'MEDIUM' | 'HARD';

export interface CodingProblem {
  id: string;
  title: string;
  slug: string;
  difficulty: DifficultyLevel;
  tags: string[];
  companies: string[];
  description: string;
  constraints: string[];
  hints: string[];
  starterCode: Record<string, string>; // e.g. { "java": "class Solution...", "python": "def..." }
  testCases: Array<{
    input: string;
    expectedOutput: string;
    isPublic: boolean;
  }>;
  acceptanceRate: number;
  totalSubmissions: number;
}

export interface CodeSubmissionResult {
  id: string;
  problemId: string;
  language: string;
  status: 'ACCEPTED' | 'WRONG_ANSWER' | 'TIME_LIMIT_EXCEEDED' | 'RUNTIME_ERROR' | 'COMPILATION_ERROR';
  executionTimeMs: number;
  memoryKb: number;
  testCasesPassed: number;
  totalTestCases: number;
  errorMessage?: string;
  submittedAt: string;
}

// ----------------------------------------------------------------------------
// Mock Interview Types
// ----------------------------------------------------------------------------

export type InterviewType = 'TECHNICAL' | 'HR' | 'BEHAVIORAL' | 'SYSTEM_DESIGN' | 'MIXED';

export interface InterviewMessage {
  id: string;
  sender: 'AI_INTERVIEWER' | 'CANDIDATE';
  content: string;
  timestamp: string;
  audioUrl?: string;
  instantFeedback?: {
    clarityScore: number;
    relevanceScore: number;
    quickTip?: string;
  };
}

export interface MockInterviewSession {
  id: string;
  userId: string;
  type: InterviewType;
  targetRole: string;
  targetCompany?: string;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  messages: InterviewMessage[];
  overallScore?: number;
  technicalAccuracyScore?: number;
  communicationScore?: number;
  strengths?: string[];
  weaknesses?: string[];
  detailedFeedback?: string;
  recommendedTopics?: string[];
  durationMinutes: number;
  createdAt: string;
}

// ----------------------------------------------------------------------------
// Quiz & Aptitude Types
// ----------------------------------------------------------------------------

export interface QuizQuestion {
  id: string;
  topic: string;
  subtopic: string;
  questionText: string;
  codeSnippet?: string;
  options: string[];
  correctOptionIndex?: number; // hidden during active test
  explanation?: string;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  title: string;
  score: number;
  totalQuestions: number;
  accuracy: number;
  timeSpentSeconds: number;
  submittedAt: string;
  topicBreakdown: Record<string, { correct: number; total: number }>;
}

// ----------------------------------------------------------------------------
// Resume Review Types
// ----------------------------------------------------------------------------

export interface ResumeReviewResult {
  id: string;
  userId: string;
  resumeFileName: string;
  atsScore: number; // 0 - 100
  parsedSkills: {
    technical: string[];
    soft: string[];
    missingRecommended: string[];
  };
  sectionScores: {
    contactInfo: number;
    summary: number;
    experience: number;
    projects: number;
    education: number;
    formatting: number;
  };
  strengths: string[];
  criticalIssues: string[];
  actionableImprovements: string[];
  suggestedBulletPoints: Array<{
    original: string;
    optimized: string;
    rationale: string;
  }>;
  createdAt: string;
}

// ----------------------------------------------------------------------------
// Leaderboard & Certificate Types
// ----------------------------------------------------------------------------

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  fullName: string;
  avatarUrl?: string;
  score: number;
  accuracy: number;
  streakDays: number;
  problemsSolved: number;
}

export interface Certificate {
  id: string;
  certificateNumber: string;
  title: string;
  recipientName: string;
  trackName: string;
  issueDate: string;
  verificationUrl: string;
  qrCodeUrl: string;
}
