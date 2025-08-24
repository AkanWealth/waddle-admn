"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { usePermissions } from '@/hooks/usePermissions';
import { useAuth } from '@/context/AuthContext';

/**
 * ProtectedRoute component that checks permissions before rendering content
 * Redirects to dashboard if user doesn't have permission to view the module
 * 
 * @param {Object} props - Component props
 * @param {string} props.module - Module name to check permissions for
 * @param {React.ReactNode} props.children - Content to render if permission is granted
 * @param {string} props.redirectTo - Where to redirect if no permission (default: '/dashboard')
 * @param {React.ReactNode} props.fallback - Optional fallback content while checking permissions
 * @returns {React.ReactNode} - Rendered content or redirect
 */
const ProtectedRoute = ({ 
  module, 
  children, 
  redirectTo = '/dashboard',
  fallback = null 
}) => {
  const { canView, isRootUser } = usePermissions();
  const { loading } = useAuth();
  const router = useRouter();

  // Show fallback while loading
  if (loading) {
    return fallback || (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading...</span>
      </div>
    );
  }

  // Check if user has permission to view this module
  const hasPermission = canView(module) || isRootUser;

  // If no permission, redirect to dashboard
  if (!hasPermission) {
    // Use useEffect to avoid hydration issues
    React.useEffect(() => {
      router.push(redirectTo);
    }, [router, redirectTo]);
    
    // Show fallback while redirecting
    return fallback || (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-2">Access Denied</div>
          <div className="text-gray-600">You don't have permission to view this page.</div>
          <div className="text-gray-500 text-sm mt-2">Redirecting to dashboard...</div>
        </div>
      </div>
    );
  }

  // If user has permission, render the content
  return <>{children}</>;
};

export default ProtectedRoute;
