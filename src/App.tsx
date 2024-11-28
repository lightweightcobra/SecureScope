import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Layout from './components/Layout';
import LoginPage from './components/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import UserManagement from './components/users/UserManagement';
import GroupManagement from './components/groups/GroupManagement';
import AdminDashboard from './components/dashboard/AdminDashboard';
import ModeratorDashboard from './components/dashboard/ModeratorDashboard';
import UserDashboard from './components/dashboard/UserDashboard';

function Dashboard() {
  const { user } = useAuthStore();

  switch (user?.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'moderator':
      return <ModeratorDashboard />;
    default:
      return <UserDashboard />;
  }
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route
            path="users"
            element={
              <ProtectedRoute requiredPermission="manage_users">
                <UserManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="groups"
            element={
              <ProtectedRoute requiredPermission="manage_roles">
                <GroupManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="analytics"
            element={
              <ProtectedRoute requiredPermission="view_analytics">
                <div>Analytics Dashboard</div>
              </ProtectedRoute>
            }
          />
          <Route path="settings" element={<div>Settings</div>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;