/**
 * Permission utility functions for admin system
 */

/**
 * Check if user has permission for a specific module and action
 * @param {Object} user - User object from AuthContext
 * @param {string} module - Module name (e.g., 'userManagement', 'analytics')
 * @param {string} action - Action to check ('canCreate', 'canView', 'canManage', 'canDelete')
 * @returns {boolean} - Whether user has permission
 */
export const hasPermission = (user, module, action) => {
  // If no user, no permissions
  if (!user) return false;
  
  // If user has no permissions array, they are root user with full access
  if (!user.admin?.permissions || !Array.isArray(user.admin.permissions)) {
    return true;
  }
  
  // Find the specific module permission
  const modulePermission = user.admin.permissions.find(
    perm => perm.module === module
  );
  
  // If no specific permission found for this module, deny access
  if (!modulePermission) return false;
  
  // Check the specific action
  return !!modulePermission[action];
};

/**
 * Check if user can view a specific module
 * @param {Object} user - User object from AuthContext
 * @param {string} module - Module name
 * @returns {boolean} - Whether user can view the module
 */
export const canView = (user, module) => {
  return hasPermission(user, module, 'canView');
};

/**
 * Check if user can create in a specific module
 * @param {Object} user - User object from AuthContext
 * @param {string} module - Module name
 * @returns {boolean} - Whether user can create
 */
export const canCreate = (user, module) => {
  return hasPermission(user, module, 'canCreate');
};

/**
 * Check if user can manage (edit) in a specific module
 * @param {Object} user - User object from AuthContext
 * @param {string} module - Module name
 * @returns {boolean} - Whether user can manage
 */
export const canManage = (user, module) => {
  return hasPermission(user, module, 'canManage');
};

/**
 * Check if user can delete in a specific module
 * @param {Object} user - User object from AuthContext
 * @param {string} module - Module name
 * @returns {boolean} - Whether user can delete
 */
export const canDelete = (user, module) => {
  return hasPermission(user, module, 'canDelete');
};

/**
 * Check if user is root user (has no permissions array)
 * @param {Object} user - User object from AuthContext
 * @returns {boolean} - Whether user is root user
 */
export const isRootUser = (user) => {
  return !user?.admin?.permissions || !Array.isArray(user.admin.permissions);
};

/**
 * Get all permissions for a specific module
 * @param {Object} user - User object from AuthContext
 * @param {string} module - Module name
 * @returns {Object} - Object with all permission flags
 */
export const getModulePermissions = (user, module) => {
  if (!user) return { canCreate: false, canView: false, canManage: false, canDelete: false };
  
  // Root user has all permissions
  if (isRootUser(user)) {
    return { canCreate: true, canView: true, canManage: true, canDelete: true };
  }
  
  // Find the specific module permission
  const modulePermission = user.admin.permissions.find(
    perm => perm.module === module
  );
  
  if (!modulePermission) {
    return { canCreate: false, canView: false, canManage: false, canDelete: false };
  }
  
  return {
    canCreate: !!modulePermission.canCreate,
    canView: !!modulePermission.canView,
    canManage: !!modulePermission.canManage,
    canDelete: !!modulePermission.canDelete
  };
};

