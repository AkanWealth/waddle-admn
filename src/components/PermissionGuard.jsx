import React from 'react';
import { usePermissions } from '@/hooks/usePermissions';

/**
 * PermissionGuard component for conditionally rendering content based on permissions
 * 
 * @param {Object} props - Component props
 * @param {string} props.module - Module name to check permissions for
 * @param {string} props.action - Action to check ('canCreate', 'canView', 'canManage', 'canDelete')
 * @param {React.ReactNode} props.children - Content to render if permission is granted
 * @param {React.ReactNode} props.fallback - Optional fallback content to show if permission is denied
 * @param {boolean} props.showFallback - Whether to show fallback content (default: false)
 * @param {string} props.permissionType - Type of permission check (defaults to 'canView' if not specified)
 * @returns {React.ReactNode} - Rendered content or null
 */
const PermissionGuard = ({
  module,
  action,
  children,
  fallback = null,
  showFallback = false,
  permissionType = 'canView',
  ...props
}) => {
  const { hasPermission, isRootUser } = usePermissions();
  
  // Determine which permission to check
  const permissionToCheck = action || permissionType;
  
  // Check if user has the required permission
  const hasRequiredPermission = hasPermission(module, permissionToCheck);
  
  // If user has permission, render children
  if (hasRequiredPermission) {
    return <>{children}</>;
  }
  
  // If no permission and fallback is requested, show fallback
  if (showFallback && fallback !== null) {
    return <>{fallback}</>;
  }
  
  // Otherwise, render nothing
  return null;
};

export default PermissionGuard;

/**
 * Specialized permission guard components for common use cases
 */

/**
 * ViewGuard - Only renders if user can view the module
 */
export const ViewGuard = ({ module, children, fallback, showFallback, ...props }) => (
  <PermissionGuard
    module={module}
    action="canView"
    children={children}
    fallback={fallback}
    showFallback={showFallback}
    {...props}
  />
);

/**
 * CreateGuard - Only renders if user can create in the module
 */
export const CreateGuard = ({ module, children, fallback, showFallback, ...props }) => (
  <PermissionGuard
    module={module}
    action="canCreate"
    children={children}
    fallback={fallback}
    showFallback={showFallback}
    {...props}
  />
);

/**
 * ManageGuard - Only renders if user can manage (edit) in the module
 */
export const ManageGuard = ({ module, children, fallback, showFallback, ...props }) => (
  <PermissionGuard
    module={module}
    action="canManage"
    children={children}
    fallback={fallback}
    showFallback={showFallback}
    {...props}
  />
);

/**
 * DeleteGuard - Only renders if user can delete in the module
 */
export const DeleteGuard = ({ module, children, fallback, showFallback, ...props }) => (
  <PermissionGuard
    module={module}
    action="canDelete"
    children={children}
    fallback={fallback}
    showFallback={showFallback}
    {...props}
  />
);

/**
 * RootUserGuard - Only renders if user is a root user (no permissions array)
 */
export const RootUserGuard = ({ children, fallback, showFallback, ...props }) => {
  const { isRootUser } = usePermissions();
  
  if (isRootUser) {
    return <>{children}</>;
  }
  
  if (showFallback && fallback !== null) {
    return <>{fallback}</>;
  }
  
  return null;
};

