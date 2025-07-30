
"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/utils/authService';
import { useRouter } from 'next/navigation';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      if (authService.isAuthenticated()) {
        // Try to get user profile to verify token validity
        try {
          const userData = await authService.getUserProfile();
          setUser(userData);
          setIsAuthenticated(true);
        } catch (profileError) {
          console.error('Failed to get user profile during auth check:', profileError);
          // User is authenticated but profile fetch failed
          // Set a basic user object to prevent loading state
          setUser({
            admin: {
              first_name: 'User',
              last_name: '',
              role: 'Admin'
            },
            role: 'Admin'
          });
          setIsAuthenticated(true);
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
      setUser(null);
      authService.clearTokens();
    } finally {
      setLoading(false);
    }
  };

  // Function to refresh user data
  const refreshUserData = async () => {
    try {
      if (authService.isAuthenticated()) {
        const userData = await authService.getUserProfile();
        setUser(userData);
        return userData;
      }
    } catch (error) {
      console.error('Failed to refresh user data:', error);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true); // Set loading to true during login
      const result = await authService.login(email, password);
      
      if (result.success) {
        // Get user profile after successful login
        try {
          const userData = await authService.getUserProfile();
          setUser(userData);
          setIsAuthenticated(true);
          setLoading(false); // Set loading to false after successful login
          return { success: true };
        } catch (profileError) {
          console.error('Failed to get user profile:', profileError);
          // Even if profile fetch fails, we're still authenticated
          setIsAuthenticated(true);
          // Set a basic user object with available data
          setUser({
            admin: {
              first_name: email.split('@')[0], // Fallback to email prefix
              last_name: '',
              role: 'Admin'
            },
            role: 'Admin'
          });
          setLoading(false); // Set loading to false even if profile fetch fails
          return { success: true };
        }
      } else {
        setLoading(false); // Set loading to false on login failure
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoading(false); // Set loading to false on error
      return { success: false, error: 'Login failed. Please try again.' || error.message };
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    router.push('/login');
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    checkAuthStatus,
    refreshUserData,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};