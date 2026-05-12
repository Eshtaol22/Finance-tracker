import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router';
import { Button } from './ui/button';
import { DollarSign, LogOut, User } from 'lucide-react';

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and title */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-indigo-600 rounded-lg">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Finance Tracker</h1>
              <p className="text-xs text-gray-500">Personal Dashboard</p>
            </div>
          </div>

          {/* User info and logout */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
              <User className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-900">{user?.name}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
