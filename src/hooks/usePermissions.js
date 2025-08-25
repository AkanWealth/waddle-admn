import { useAuth } from '@/context/AuthContext';
import {
  hasPermission,
  canView,
  canCreate,
  canManage,
  canDelete,
  isRootUser,
  getModulePermissions
} from '@/utils/permissions';

/**
 * Custom hook for permission management
 * @returns {Object} Permission checking functions and user info
 */
export const usePermissions = () => {
  const { user } = useAuth();

  return {
    // User info
    user,
    isRootUser: isRootUser(user),
    
    // Permission checking functions
    hasPermission: (module, action) => hasPermission(user, module, action),
    canView: (module) => canView(user, module),
    canCreate: (module) => canCreate(user, module),
    canManage: (module) => canManage(user, module),
    canDelete: (module) => canDelete(user, module),
    
    // Get all permissions for a module
    getModulePermissions: (module) => getModulePermissions(user, module),
    
    // Check if user has any permission for a module
    hasAnyPermission: (module) => {
      const perms = getModulePermissions(user, module);
      return perms.canCreate || perms.canView || perms.canManage || perms.canDelete;
    },
    
    // Check if user has full access to a module
    hasFullAccess: (module) => {
      const perms = getModulePermissions(user, module);
      return perms.canCreate && perms.canView && perms.canManage && perms.canDelete;
    }
  };
};

