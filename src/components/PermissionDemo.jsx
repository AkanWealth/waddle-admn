import React from 'react';
import { usePermissions } from '@/hooks/usePermissions';
import { 
  ViewGuard, 
  CreateGuard, 
  ManageGuard, 
  DeleteGuard, 
  RootUserGuard 
} from './PermissionGuard';

/**
 * Demo component to showcase the permission system
 * This component demonstrates how different permission guards work
 */
const PermissionDemo = () => {
  const { 
    user, 
    isRootUser, 
    getModulePermissions,
    hasAnyPermission,
    hasFullAccess 
  } = usePermissions();

  // Get permissions for userManagement module
  const userManagementPerms = getModulePermissions('userManagement');
  const analyticsPerms = getModulePermissions('analytics');

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Permission System Demo</h2>
      
      {/* User Info */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Current User Info</h3>
        <div className="space-y-2 text-sm">
          <p><strong>Name:</strong> {user?.admin?.first_name} {user?.admin?.last_name}</p>
          <p><strong>Email:</strong> {user?.admin?.email}</p>
          <p><strong>Role:</strong> {user?.admin?.role}</p>
          <p><strong>Root User:</strong> {isRootUser ? 'Yes (Full Access)' : 'No (Limited Access)'}</p>
        </div>
      </div>

      {/* Permission Status */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-700 mb-3">Permission Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-blue-600 mb-2">User Management Module</h4>
            <div className="space-y-1 text-sm">
              <p>View: {userManagementPerms.canView ? '✅' : '❌'}</p>
              <p>Create: {userManagementPerms.canCreate ? '✅' : '❌'}</p>
              <p>Manage: {userManagementPerms.canManage ? '✅' : '❌'}</p>
              <p>Delete: {userManagementPerms.canDelete ? '✅' : '❌'}</p>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-blue-600 mb-2">Analytics Module</h4>
            <div className="space-y-1 text-sm">
              <p>View: {analyticsPerms.canView ? '✅' : '❌'}</p>
              <p>Create: {analyticsPerms.canCreate ? '✅' : '❌'}</p>
              <p>Manage: {analyticsPerms.canManage ? '✅' : '❌'}</p>
              <p>Delete: {analyticsPerms.canDelete ? '✅' : '❌'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Permission Guards Demo */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Permission Guards in Action</h3>
        
        {/* View Guard */}
        <ViewGuard module="userManagement">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-medium text-green-700 mb-2">✅ ViewGuard - User Management</h4>
            <p className="text-sm text-green-600">
              This content is visible because you have 'canView' permission for userManagement module.
            </p>
          </div>
        </ViewGuard>

        {/* Create Guard */}
        <CreateGuard module="userManagement">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-700 mb-2">✅ CreateGuard - User Management</h4>
            <p className="text-sm text-blue-600">
              This content is visible because you have 'canCreate' permission for userManagement module.
            </p>
          </div>
        </CreateGuard>

        {/* Manage Guard */}
        <ManageGuard module="userManagement">
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-medium text-yellow-700 mb-2">✅ ManageGuard - User Management</h4>
            <p className="text-sm text-yellow-600">
              This content is visible because you have 'canManage' permission for userManagement module.
            </p>
          </div>
        </ManageGuard>

        {/* Delete Guard */}
        <DeleteGuard module="userManagement">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="font-medium text-red-700 mb-2">✅ DeleteGuard - User Management</h4>
            <p className="text-sm text-red-600">
              This content is visible because you have 'canDelete' permission for userManagement module.
            </p>
          </div>
        </DeleteGuard>

        {/* Root User Guard */}
        <RootUserGuard>
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <h4 className="font-medium text-purple-700 mb-2">👑 RootUserGuard</h4>
            <p className="text-sm text-purple-600">
              This content is visible because you are a root user with full access to all modules.
            </p>
          </div>
        </RootUserGuard>

        {/* Example of content that won't show without permissions */}
        <ViewGuard module="nonexistentModule">
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-700 mb-2">Hidden Content</h4>
            <p className="text-sm text-gray-600">
              This content won't be visible because the module doesn't exist.
            </p>
          </div>
        </ViewGuard>
      </div>

      {/* Usage Examples */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">How to Use</h3>
        <div className="text-sm text-gray-600 space-y-2">
          <p><strong>Basic Usage:</strong> Wrap any content with permission guards</p>
          <p><strong>ViewGuard:</strong> Shows content only if user can view the module</p>
          <p><strong>CreateGuard:</strong> Shows content only if user can create in the module</p>
          <p><strong>ManageGuard:</strong> Shows content only if user can manage/edit in the module</p>
          <p><strong>DeleteGuard:</strong> Shows content only if user can delete in the module</p>
          <p><strong>RootUserGuard:</strong> Shows content only for root users (no permissions array)</p>
        </div>
      </div>
    </div>
  );
};

export default PermissionDemo;

