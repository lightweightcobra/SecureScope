import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { 
  LayoutDashboard, 
  Users, 
  Shield, 
  BarChart3, 
  Settings,
  LogOut,
  Lock
} from 'lucide-react';

export default function Layout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-gradient-to-b from-indigo-700 to-indigo-900 px-4 py-6">
          <div className="flex items-center mb-8 px-2">
            <div className="p-2 bg-white/10 rounded-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div className="ml-3">
              <h1 className="text-xl font-bold text-white">SecureScope</h1>
              <p className="text-xs text-indigo-200">Access Management</p>
            </div>
          </div>
          
          <nav className="space-y-1">
            <Link
              to="/"
              className="flex items-center px-4 py-2 text-indigo-100 hover:bg-indigo-600/50 rounded-lg transition-colors duration-150"
            >
              <LayoutDashboard className="h-5 w-5 mr-3" />
              Dashboard
            </Link>
            <Link
              to="/users"
              className="flex items-center px-4 py-2 text-indigo-100 hover:bg-indigo-600/50 rounded-lg transition-colors duration-150"
            >
              <Users className="h-5 w-5 mr-3" />
              Users
            </Link>
            <Link
              to="/roles"
              className="flex items-center px-4 py-2 text-indigo-100 hover:bg-indigo-600/50 rounded-lg transition-colors duration-150"
            >
              <Lock className="h-5 w-5 mr-3" />
              Roles
            </Link>
            <Link
              to="/analytics"
              className="flex items-center px-4 py-2 text-indigo-100 hover:bg-indigo-600/50 rounded-lg transition-colors duration-150"
            >
              <BarChart3 className="h-5 w-5 mr-3" />
              Analytics
            </Link>
            <Link
              to="/settings"
              className="flex items-center px-4 py-2 text-indigo-100 hover:bg-indigo-600/50 rounded-lg transition-colors duration-150"
            >
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </Link>
          </nav>

          <div className="mt-auto pt-6 border-t border-indigo-600/50">
            <div className="flex items-center px-4 py-2 text-indigo-100">
              <div className="flex-shrink-0">
                <img
                  className="h-8 w-8 rounded-full ring-2 ring-indigo-500"
                  src={user?.avatar}
                  alt={user?.name}
                />
              </div>
              <div className="ml-3 min-w-0 flex-1">
                <p className="text-sm font-medium truncate">{user?.name}</p>
                <p className="text-xs text-indigo-300 capitalize">{user?.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="ml-2 p-1 text-indigo-300 hover:text-white rounded-full hover:bg-indigo-600/50 transition-colors duration-150"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-white border-b border-gray-200">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">
                    Welcome back, {user?.name}
                  </h1>
                  <p className="text-sm text-gray-500">
                    Manage your organization's access control and permissions
                  </p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium">
                    {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main content area */}
          <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}