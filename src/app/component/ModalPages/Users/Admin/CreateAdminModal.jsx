import React, { useState, useEffect } from 'react';
import BaseModal from '@/app/component/Element/BaseModal';
import { UserPen, Cable, CircleAlert, Loader2 } from 'lucide-react';
import { adminService } from "@/utils/Adminservice"; // Adjust the import path as necessary

const CreateAdminUserModal = ({ isOpen, onClose, editData = null, mode = 'create', onSuccess }) => {
    const [activeTab, setActiveTab] = useState('profile');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [isRoleOpen, setIsRoleOpen] = useState(false);

  const roles = ["Admin", "Editor"];

  const handleSelect = (role) => {
    handleInputChange("roleType", role);
    setIsRoleOpen(false);
  };
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        roleType: '',
        permissions: {
            analytics: { create: false, view: false, manage: false, delete: false },
            userManagement: { create: false, view: false, manage: false, delete: false },
            eventManagement: { create: false, view: false, manage: false, delete: false },
            payment: { create: false, view: false, manage: false, delete: false },
            bookingManagement: { create: false, view: false, manage: false, delete: false },
            compliance: { create: false, view: false, manage: false, delete: false }
        }
    });

    // Reset form when modal opens/closes or mode changes
    useEffect(() => {
        if (isOpen) {
            setError('');
            setSuccess('');
            
            if (mode === 'edit' && editData) {
                // Populate form with edit data
                setFormData({
                    firstName: editData.firstName || editData.fullName?.split(' ')[0] || '',
                    lastName: editData.lastName || editData.fullName?.split(' ').slice(1).join(' ') || '',
                    email: editData.email || '',
                    roleType: editData.roleType || editData.adminRole || '',
                    permissions: editData.permissions || {
                        analytics: { create: false, view: false, manage: false, delete: false },
                        userManagement: { create: false, view: false, manage: false, delete: false },
                        eventManagement: { create: false, view: false, manage: false, delete: false },
                        payment: { create: false, view: false, manage: false, delete: false },
                        bookingManagement: { create: false, view: false, manage: false, delete: false },
                        compliance: { create: false, view: false, manage: false, delete: false }
                    }
                });
            } else {
                // Reset to empty form for create mode
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    roleType: '',
                    permissions: {
                        analytics: { create: false, view: false, manage: false, delete: false },
                        userManagement: { create: false, view: false, manage: false, delete: false },
                        eventManagement: { create: false, view: false, manage: false, delete: false },
                        payment: { create: false, view: false, manage: false, delete: false },
                        bookingManagement: { create: false, view: false, manage: false, delete: false },
                        compliance: { create: false, view: false, manage: false, delete: false }
                    }
                });
            }
            setActiveTab('profile');
        }
    }, [isOpen, mode, editData]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        // Clear errors when user starts typing
        if (error) setError('');
    };

    const handlePermissionChange = (module, action, checked) => {
        setFormData(prev => ({
            ...prev,
            permissions: {
                ...prev.permissions,
                [module]: {
                    ...prev.permissions[module],
                    [action]: checked
                }
            }
        }));
    };

    const isAllEnabled = Object.values(formData.permissions).every(module =>
        Object.values(module).every(Boolean)
    );

    const handleEnableAll = () => {
        const enable = !isAllEnabled;
        const newPermissions = { ...formData.permissions };
        Object.keys(newPermissions).forEach(module => {
            Object.keys(newPermissions[module]).forEach(action => {
                newPermissions[module][action] = enable;
            });
        });
        setFormData(prev => ({ ...prev, permissions: newPermissions }));
    };

    const handleResetAll = () => {
        const newPermissions = { ...formData.permissions };
        Object.keys(newPermissions).forEach(module => {
            Object.keys(newPermissions[module]).forEach(action => {
                newPermissions[module][action] = false;
            });
        });
        setFormData(prev => ({ ...prev, permissions: newPermissions }));
    };

    const validateForm = () => {
        if (!formData.email) {
            setError('Email address is required');
            return false;
        }
        
        if (!formData.firstName) {
            setError('First name is required');
            return false;
        }
        
        if (!formData.lastName) {
            setError('Last name is required');
            return false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address');
            return false;
        }

        return true;
    };

    const handleSubmit = async () => {
    if (activeTab === 'profile') {
        // Validate profile information
        if (!validateForm()) {
            return;
        }
        
        // Always go to permissions tab first, regardless of mode
        setActiveTab('permissions');
    } else {
        // Handle permissions tab submission
        if (mode === 'edit') {
            await updateAdminUser();
        } else {
            // Create mode - create the admin user
            await createAdminUser();
        }
    }
};


    const createAdminUser = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
        const result = await adminService.createAdminUser({
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            roleType: formData.roleType,
            permissions: formData.permissions
        });

        if (result.success) {
            setSuccess('Admin user invited successfully! They will receive login credentials via email.');
            
            if (onSuccess) {
                onSuccess(result.data);
            }

            setTimeout(() => {
                onClose();
            }, 1500);
        } else {
            setError(result.error || 'Failed to create admin user');
        }
    } catch (error) {
        setError('An unexpected error occurred. Please try again.');
        console.error('Error creating admin user:', error);
    } finally {
        setLoading(false);
    }
};


    const updateAdminUser = async () => {
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const result = await adminService.updateAdminUser(editData?.id, {
                email: formData.email,
                firstName: formData.firstName,
                lastName: formData.lastName,
                permissions: formData.permissions
            });

            if (result.success) {
                setSuccess('Admin user updated successfully!');
                
                // Call onSuccess callback if provided
                if (onSuccess) {
                    onSuccess(result.data);
                }
                
                setTimeout(() => {
                    onClose();
                }, 1500);
            } else {
                setError(result.error || 'Failed to update admin user');
            }
        } catch (error) {
            setError('An unexpected error occurred. Please try again.');
            console.error('Error updating admin user:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        if (activeTab === 'permissions') {
            setActiveTab('profile');
        } else {
            onClose();
        }
    };

    // Dynamic content based on mode
    const getModalTitle = () => mode === 'edit' ? 'Edit Admin User' : 'Invite Admin User';
    const getModalDescription = () => mode === 'edit' 
        ? 'Update the admin user details and permissions' 
        : 'Fill in the required details to invite a new admin user';
    
    const getSubmitButtonLabel = () => {
    if (loading) return '';
    if (activeTab === 'profile') {
        return 'Next'; // Always show "Next" on profile tab
    }
    return mode === 'edit' ? 'Update Admin' : 'Send Invite';
};


    const actions = {
        cancel: {
            label: activeTab === 'permissions' ? 'Back' : 'Cancel',
            onClick: handleCancel,
            className: 'w-full px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium',
            disabled: loading
        },
        submit: {
            label: getSubmitButtonLabel(),
            onClick: handleSubmit,
            className: `w-full px-6 py-2 bg-[#2853A6] text-white rounded-lg hover:bg-blue-700 font-medium flex items-center justify-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`,
            disabled: loading,
            icon: loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null
        }
    };

    const renderTabs = () => (
        <div className="flex border-b border-gray-200 mb-6">
            <button
                className={`flex-1 py-1 px-4 text-center font-medium ${activeTab === 'profile'
                        ? 'text-[#2853A6] border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                onClick={() => setActiveTab('profile')}
            >
                <span className="flex items-center justify-center gap-2">
                    <UserPen className='text-gray-500 w-5 h-5' />
                    Profile Information
                </span>
            </button>
            
                <button
                    className={`flex-1 py-1 px-4 text-center font-medium ${activeTab === 'permissions'
                            ? 'text-[#2853A6] border-b-2 border-blue-600'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                    onClick={() => setActiveTab('permissions')}
                >
                    <span className="flex items-center justify-center gap-2">
                        <Cable className='text-gray-500 w-5 h-5' />
                        Permission Management
                    </span>
                </button>
            
        </div>
    );

    const renderProfileTab = () => (
        <div className="space-y-6">
            {/* Error and Success Messages */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex">
                        <CircleAlert className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                </div>
            )}
            
            {success && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex">
                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <p className="text-sm text-green-700">{success}</p>
                    </div>
                </div>
            )}

            <div className="flex flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-4">
                <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        User's First Name <span className="text-red-700">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter admin's first name"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled={loading}
                        required
                    />
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        User's Last Name <span className="text-red-700">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter admin's last name"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled={loading}
                        required
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address <span className="text-red-700">*</span>
                </label>
                <input
                    type="email"
                    placeholder="Enter user's email address"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={loading}
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Role <span className="text-red-700">*</span>
                </label>
                <div className="relative inline-block w-full">
      <button
        type="button"
        onClick={() => setIsRoleOpen((prev) => !prev)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-left focus:ring-2 focus:ring-blue-500"
      >
        {formData.roleType || "Select role type"}
      </button>

      {isRoleOpen && (
        <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-md">
          {roles.map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => handleSelect(role)}
              className="w-full px-4 py-2 text-left hover:bg-blue-100"
            >
              {role}
            </button>
          ))}
        </div>
      )}
    </div>

            </div>

            <div className="p-4 rounded-lg">
                <div className="flex items-start">
                    <div className="text-orange-500 mr-2">
                        <CircleAlert className='w-5 h-5 text-orange-500' />
                    </div>
                    <p className="text-sm text-gray-700">
                        {mode === 'edit' 
                            ? 'Update admin user details and permissions. Changes will be applied immediately.'
                            : 'Admin users will receive a temporary password via email and will be prompted to change it on first login. They will have access to system functionalities with configurable permissions.'
                        }
                    </p>
                </div>
            </div>
        </div>
    );

    const renderPermissionsTab = () => (
        <div className="space-y-6">
            <div className="bg-gray-200 p-4 rounded-lg">
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                    <div className="flex items-center space-x-3">
                        <label className="text-sm font-semibold text-gray-700">Roles</label>
                        <select 
                            className="px-3 py-2 border border-gray-300 rounded-lg bg-white"
                            value={formData.roleType}
                            onChange={(e) => handleInputChange('roleType', e.target.value)}
                            disabled={loading}
                        >
                            <option value="">Select Role</option>
                            <option value="Admin">Admin</option>
                            <option value="Event Manager">Event Manager</option>
                            <option value="Manager">Manager</option>
                            <option value="User">User</option>
                        </select>
                    </div>
                    <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-y-0 md:space-x-4">
                        <div className="flex items-center space-x-2">
                            <label
                                htmlFor="enable-all-checkbox"
                                className="text-sm text-blue-600 hover:text-blue-800 font-semibold cursor-pointer select-none"
                            >
                                Enable All
                            </label>
                            <input
                                type="checkbox"
                                checked={isAllEnabled}
                                onChange={handleEnableAll}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                                id="enable-all-checkbox"
                                disabled={loading}
                            />
                        </div>
                        <button
                            onClick={handleResetAll}
                            className="text-sm text-gray-600 hover:text-gray-800 font-semibold"
                            disabled={loading}
                        >
                            Reset all
                        </button>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-2 font-medium text-gray-700">Action</th>
                            <th className="text-center py-3 px-2 font-medium text-gray-700">Create</th>
                            <th className="text-center py-3 px-2 font-medium text-gray-700">View</th>
                            <th className="text-center py-3 px-2 font-medium text-gray-700">Manage</th>
                            <th className="text-center py-3 px-2 font-medium text-gray-700">Delete</th>
                        </tr>
                    </thead>
                    <tbody className="space-y-2">
                        {Object.entries(formData.permissions).map(([module, permissions]) => (
                            <tr key={module} className="border-b border-gray-100">
                                <td className="py-4 px-2 text-base text-gray-500 capitalize">
                                    {module.replace(/([A-Z])/g, ' $1').trim()}
                                </td>
                                {Object.entries(permissions).map(([action, checked]) => (
                                    <td key={action} className="py-4 px-2 text-center">
                                        <input
                                            type="checkbox"
                                            checked={checked}
                                            onChange={(e) => handlePermissionChange(module, action, e.target.checked)}
                                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                            disabled={loading}
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <BaseModal
            isOpen={isOpen}
            onClose={onClose}
            title={getModalTitle()}
            description={getModalDescription()}
            actions={actions}
            size={{ width: "99%", maxWidth: "700px" }}
            className="max-h-screen overflow-y-auto"
            showDividers={false}
        >
            {renderTabs()}
            {activeTab === 'profile' ? renderProfileTab() : renderPermissionsTab()}
        </BaseModal>
    );
};

export default CreateAdminUserModal;