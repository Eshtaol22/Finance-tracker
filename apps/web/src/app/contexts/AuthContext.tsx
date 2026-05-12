import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Interface for user data
interface User {
  id: string;
  name: string;
  email: string;
}

// Interface for auth context
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('finance_tracker_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Simulated login function
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Simple validation (accept any email/password for demo)
    if (email && password) {
      const newUser: User = {
        id: '1',
        name: email.split('@')[0],
        email: email,
      };
      setUser(newUser);
      localStorage.setItem('finance_tracker_user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('finance_tracker_user');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
