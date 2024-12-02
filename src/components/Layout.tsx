import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/auth.store';
import { LogOut, User, Settings, Home } from 'lucide-react';

export function Layout() {
  const { logout, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link
                to="/"
                className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900"
              >
                <Home className="h-5 w-5 mr-2" />
                Home
              </Link>
            </div>
            <div className="flex items-center">
              <Link
                to="/profile"
                className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900"
              >
                <User className="h-5 w-5 mr-2" />
                Profile
              </Link>
              <Link
                to="/settings"
                className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900"
              >
                <Settings className="h-5 w-5 mr-2" />
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}