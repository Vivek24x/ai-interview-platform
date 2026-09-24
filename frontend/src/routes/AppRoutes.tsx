import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';

// Layouts
import { PublicLayout } from '@/layouts/PublicLayout';
import { StudentLayout } from '@/layouts/StudentLayout';
import { AdminLayout } from '@/layouts/AdminLayout';

// Public & Auth Pages
import { LandingPage } from '@/features/landing/LandingPage';
import { LoginPage } from '@/features/auth/LoginPage';
import { RegisterPage } from '@/features/auth/RegisterPage';

// Student Pages
import { DashboardPage } from '@/features/dashboard/DashboardPage';
import { PracticePage } from '@/features/practice/PracticePage';
import { CodingArenaPage } from '@/features/coding/CodingArenaPage';
import { MockInterviewPage } from '@/features/interviews/MockInterviewPage';
import { QuizSystemPage } from '@/features/quiz/QuizSystemPage';
import { ResumeReviewPage } from '@/features/resume/ResumeReviewPage';
import { LeaderboardPage } from '@/features/leaderboard/LeaderboardPage';
import { CertificatesPage } from '@/features/certificates/CertificatesPage';
import { ResourcesPage } from '@/features/resources/ResourcesPage';
import { SettingsPage } from '@/features/settings/SettingsPage';

// Admin Pages
import { AdminDashboardPage } from '@/features/admin/AdminDashboardPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* 1. Public Marketing Route Group */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>

      {/* 2. Authentication Route Group */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* 3. Protected Student Route Group */}
      <Route
        element={
          <ProtectedRoute>
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/practice" element={<PracticePage />} />
        <Route path="/coding" element={<CodingArenaPage />} />
        <Route path="/interviews" element={<MockInterviewPage />} />
        <Route path="/quizzes" element={<QuizSystemPage />} />
        <Route path="/resume" element={<ResumeReviewPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/certificates" element={<CertificatesPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/profile" element={<SettingsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      {/* 4. Protected Admin Route Group */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="ROLE_ADMIN">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboardPage />} />
        <Route path="users" element={<AdminDashboardPage />} />
        <Route path="problems" element={<AdminDashboardPage />} />
        <Route path="quizzes" element={<AdminDashboardPage />} />
        <Route path="reports" element={<AdminDashboardPage />} />
      </Route>

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
