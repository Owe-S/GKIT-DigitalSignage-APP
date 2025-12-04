import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DisplayPage } from './pages/DisplayPage';
import { LoginPage } from './pages/admin/LoginPage';
import { DashboardPage } from './pages/admin/DashboardPage';
import { ScreenEditorPage } from './pages/admin/ScreenEditorPage';
import { ClubSettingsPage } from './pages/admin/ClubSettingsPage';
import { HelpPage } from './pages/admin/HelpPage';
import { AnalyticsPage } from './pages/admin/AnalyticsPage';
import { AuthGuard } from './components/AuthGuard';
import { ToastProvider } from './hooks/useToast';

export default function App() {
  return (
    <ToastProvider>
      <HashRouter>
        <Routes>
          {/* Display Routes - The root path now directly renders the display for instant feedback */}
          <Route path="/" element={<Navigate to="/screen/demo-screen-1" replace />} />
          <Route path="/screen/:screenId" element={<DisplayPage />} />

          {/* Admin Routes */}
          {/* Admin Routes */}
          <Route path="/admin/login" element={<LoginPage />} />

          <Route element={<AuthGuard />}>
            <Route path="/admin/dashboard" element={<DashboardPage />} />
            <Route path="/admin/screen/:screenId" element={<ScreenEditorPage />} />
            <Route path="/admin/settings" element={<ClubSettingsPage />} />
            <Route path="/admin/analytics" element={<AnalyticsPage />} />
            <Route path="/admin/help" element={<HelpPage />} />
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          </Route>
        </Routes>
      </HashRouter>
    </ToastProvider>
  );
}