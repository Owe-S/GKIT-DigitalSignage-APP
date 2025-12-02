import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DisplayPage } from './pages/DisplayPage';
import { LoginPage } from './pages/admin/LoginPage';
import { DashboardPage } from './pages/admin/DashboardPage';
import { ScreenEditorPage } from './pages/admin/ScreenEditorPage';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Display Routes - The root path now directly renders the display for instant feedback */}
        <Route path="/" element={<Navigate to="/screen/demo-screen-1" replace />} />
        <Route path="/screen/:screenId" element={<DisplayPage />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin/dashboard" element={<DashboardPage />} />
        <Route path="/admin/screen/:screenId" element={<ScreenEditorPage />} />
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
      </Routes>
    </HashRouter>
  );
}