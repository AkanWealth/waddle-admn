# Permission System Documentation

This document explains how to use the permission system implemented in the Waddle Admin application.

## Overview

The permission system is designed to control access to different modules and actions based on user permissions. It supports:

- **Module-based permissions**: Different modules like `userManagement`, `analytics`, `payment`, etc.
- **Action-based permissions**: `canCreate`, `canView`, `canManage`, `canDelete`
- **Root user support**: Users without permissions array have full access
- **UI-level controls**: Hide/show buttons, forms, and content based on permissions

## How It Works

### 1. Permission Structure

Each user has a permissions array in their profile:

```json
{
  "admin": {
    "permissions": [
      {
        "module": "userManagement",
        "canCreate": true,
        "canView": true,
        "canManage": true,
        "canDelete": false
      }
    ]
  }
}
```

### 2. Root Users

Users without a permissions array are considered "root users" and have full access to all modules and actions.

## Usage

### 1. Using the usePermissions Hook

```jsx
import { usePermissions } from '@/hooks/usePermissions';

function MyComponent() {
  const { 
    canView, 
    canCreate, 
    canManage, 
    canDelete,
    isRootUser,
    getModulePermissions 
  } = usePermissions();

  // Check specific permissions
  if (canView('userManagement')) {
    // User can view user management
  }

  // Get all permissions for a module
  const perms = getModulePermissions('userManagement');
  console.log(perms.canCreate); // true/false
}
```

### 2. Using Permission Guards

Permission guards are React components that conditionally render content based on permissions:

```jsx
import { 
  ViewGuard, 
  CreateGuard, 
  ManageGuard, 
  DeleteGuard,
  RootUserGuard 
} from '@/components/PermissionGuard';

function MyComponent() {
  return (
    <div>
      {/* Only show if user can view userManagement */}
      <ViewGuard module="userManagement">
        <h1>User Management</h1>
      </ViewGuard>

      {/* Only show if user can create in userManagement */}
      <CreateGuard module="userManagement">
        <button>Add New User</button>
      </CreateGuard>

      {/* Only show if user can manage in userManagement */}
      <ManageGuard module="userManagement">
        <button>Edit User</button>
      </ManageGuard>

      {/* Only show if user can delete in userManagement */}
      <DeleteGuard module="userManagement">
        <button>Delete User</button>
      </DeleteGuard>

      {/* Only show for root users */}
      <RootUserGuard>
        <div>Root user exclusive content</div>
      </RootUserGuard>
    </div>
  );
}
```

### 3. Permission Guard Props

All permission guards support these props:

- `module`: The module name to check permissions for
- `fallback`: Optional content to show when permission is denied
- `showFallback`: Whether to show fallback content (default: false)

```jsx
<ViewGuard 
  module="userManagement" 
  fallback={<p>Access denied</p>}
  showFallback={true}
>
  <div>Protected content</div>
</ViewGuard>
```

## Available Modules

The system supports these modules (based on your current setup):

- `analytics` - Analytics dashboard
- `compliance` - Compliance management
- `payment` - Payment management
- `eventManagement` - Event management
- `bookingManagement` - Booking management
- `userManagement` - User management
- `recommendations` - Recommendations management
- `dispute` - Dispute management

## Examples

### Example 1: Conditional Button Rendering

```jsx
function UserActions({ user }) {
  return (
    <div className="flex gap-2">
      <ViewGuard module="userManagement">
        <button className="btn btn-info">View Details</button>
      </ViewGuard>
      
      <ManageGuard module="userManagement">
        <button className="btn btn-warning">Edit</button>
      </ManageGuard>
      
      <DeleteGuard module="userManagement">
        <button className="btn btn-danger">Delete</button>
      </DeleteGuard>
    </div>
  );
}
```

### Example 2: Conditional Form Fields

```jsx
function UserForm() {
  return (
    <form>
      <input type="text" placeholder="Name" />
      
      <CreateGuard module="userManagement">
        <input type="email" placeholder="Email" />
      </CreateGuard>
      
      <ManageGuard module="userManagement">
        <select>
          <option>Admin</option>
          <option>Editor</option>
        </select>
      </ManageGuard>
    </form>
  );
}
```

### Example 3: Conditional Table Columns

```jsx
function UserTable() {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <ManageGuard module="userManagement">
            <th>Actions</th>
          </ManageGuard>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <ManageGuard module="userManagement">
              <td>
                <button>Edit</button>
              </td>
            </ManageGuard>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

## Best Practices

1. **Always check permissions before rendering sensitive content**
2. **Use appropriate permission guards for different actions**
3. **Provide fallback content when needed using `fallback` prop**
4. **Test with different permission combinations**
5. **Remember that root users bypass all permission checks**

## Testing

To test the permission system:

1. **Create users with different permission sets**
2. **Test root users (no permissions array)**
3. **Test users with partial permissions**
4. **Verify UI elements show/hide correctly**
5. **Check that actions are properly restricted**

## Troubleshooting

### Common Issues

1. **Permission guards not working**: Check that the module name matches exactly
2. **Root user not getting access**: Verify the user has no permissions array
3. **Permissions not updating**: Ensure the user context is properly refreshed

### Debug Mode

You can add console logs to debug permission issues:

```jsx
const { canView, getModulePermissions } = usePermissions();
const perms = getModulePermissions('userManagement');

console.log('User permissions:', perms);
console.log('Can view userManagement:', canView('userManagement'));
```

## Security Notes

- **This is UI-level permission control only**
- **Always implement server-side permission validation**
- **Never rely solely on client-side permission checks**
- **Permissions should be validated on every API call**

## Future Enhancements

- Role-based permissions
- Dynamic permission loading
- Permission caching
- Audit logging for permission changes
- Bulk permission updates

