// services/adminService.js
import { authService } from './authService'; // Assuming this is your auth service path

class AdminService {
    constructor() {
        this.HARDCODED_PASSWORD = "DefaultAdmin@123"; // Change this to your preferred default password
    }

    /**
     * Create/Invite a new admin user
     * @param {Object} adminData - The admin user data
     * @param {string} adminData.email - Admin email address
     * @param {string} adminData.firstName - Admin first name
     * @param {string} adminData.lastName - Admin last name
     * @returns {Promise<Object>} Response object with success status and data
     */
    async createAdminUser(adminData) {
         
        try {
            // Validate required fields
            if (!adminData.email || !adminData.first_name || !adminData.last_name) {
                return {
                    success: false,
                    error: 'Email, first name, and last name are required fields'
                };
            }

            let formattedPermissions = {};
        if (Array.isArray(adminData.permissions)) {
            // Transform permissions array to object format that backend expects
            formattedPermissions = adminData.permissions.reduce((acc, perm) => {
                if (perm.module) {
                    acc[perm.module] = {
                        create: !!perm.canCreate,
                        view: !!perm.canView,
                        manage: !!perm.canManage,
                        delete: !!perm.canDelete
                    };
                }
                return acc;
            }, {});
        }

 
            // Prepare the payload with hardcoded password
        const payload = {
            email: adminData.email,
            password: this.HARDCODED_PASSWORD,
            first_name: adminData.first_name,
            last_name: adminData.last_name,
            role_type: adminData.role,
            permissions: formattedPermissions
        };


            // Make the authenticated request using your existing auth service
            const response = await authService.makeAuthenticatedRequest('/api/v1/host/create', {
                method: 'POST',
                body: JSON.stringify(payload)
            });

            return {
                success: true,
                data: response,
                message: 'Admin user created successfully'
            };

        } catch (error) {
            console.error('Error creating admin user:', error);
            return {
                success: false,
                error: error.message || 'Failed to create admin user'
            };
        }
    }

    /**
     * Update an existing admin user
     * @param {string} adminId - The admin user ID
     * @param {Object} adminData - The updated admin data
     * @returns {Promise<Object>} Response object with success status and data
     */
    async updateAdminUser(adminId, adminData) {
        try {
            // Validate required fields
            if (!adminId) {
                return {
                    success: false,
                    error: 'Admin ID is required for updating'
                };
            }

                    let formattedPermissions = {};
        if (Array.isArray(adminData.permissions)) {
            // Transform permissions array to object format that backend expects
            formattedPermissions = adminData.permissions.reduce((acc, perm) => {
                if (perm.module) {
                    acc[perm.module] = {
                        create: !!perm.canCreate,
                        view: !!perm.canView,
                        manage: !!perm.canManage,
                        delete: !!perm.canDelete
                    };
                }
                return acc;
            }, {});
        }

        console.log('Update - Original permissions:', adminData.permissions);
        console.log('Update - Formatted permissions:', formattedPermissions);

            // Prepare the payload (exclude password for updates unless specifically needed)
           console.log('Admin Data:', adminData);
           console.log('Admin Data permissions:', adminData.permissions);
            const payload = {
            firstName: adminData.first_name,
            lastName: adminData.last_name,
            emailAddress: adminData.email,
            role: adminData.role?.toUpperCase(), // ensure uppercase
            permissions: formattedPermissions

        };

        console.log('Final payload being sent:', payload);
            // Object.keys(payload).forEach(key => 
        //     payload[key] === undefined && delete payload[key]
        // );
            const response = await authService.makeAuthenticatedRequest(`/api/v1/host/admins/${adminId}/edit`, {
                method: 'PATCH', // or PATCH depending on your API
                body: JSON.stringify(payload)
            });

            return {
                success: true,
                data: response,
                message: 'Admin user updated successfully'
            };

        } catch (error) {
            console.error('Error updating admin user:', error);
            return {
                success: false,
                error: error.message || 'Failed to update admin user'
            };
        }
    }

    /**
     * Get all admin users (if you have such endpoint)
     * @returns {Promise<Object>} Response object with success status and data
     */
    async getAllAdminUsers() {
        try {
            const response = await authService.makeAuthenticatedRequest('/api/v1/host/all');
            
            return {
                success: true,
                data: response
            };
        } catch (error) {
            console.error('Error fetching admin users:', error);
            return {
                success: false,
                error: error.message || 'Failed to fetch admin users'
            };
        }
    }

    /**
     * Delete an admin user
     * @param {string} adminId - The admin user ID
     * @returns {Promise<Object>} Response object with success status
     */
    async deleteAdminUser(adminId) {
        try {
            if (!adminId) {
                return {
                    success: false,
                    error: 'Admin ID is required for deletion'
                };
            }

            await authService.makeAuthenticatedRequest(`/api/v1/host/${adminId}`, {
                method: 'DELETE'
            });

            return {
                success: true,
                message: 'Admin user deleted successfully'
            };
        } catch (error) {
            console.error('Error deleting admin user:', error);
            return {
                success: false,
                error: error.message || 'Failed to delete admin user'
            };
        }
    }

    async deleteUser(userId) {
        try {
            await authService.makeAuthenticatedRequest(`/api/v1/users/${userId}`, { method: "DELETE" });
            return {
                success: true,
                message: "User deleted successfully"
            };
        } catch (error) {
            console.error("Error deleting user:", error);
            return {
                success: false,
                error: error.message || "Failed to delete user"
            };
        }
    }   

    async deleteAdmin(adminId){
        try {
            if (!adminId) {
                return {
                    success: false,
                    error: 'Admin ID is required for deletion'
                };
            }

            await authService.makeAuthenticatedRequest(`/api/v1/host/${adminId}`, {
                method: 'DELETE'
            });

            return {
                success: true,
                message: 'Admin deleted successfully'
            };
        } catch (error) {
            console.error('Error deleting admin:', error);
            return {
                success: false,
                error: error.message || 'Failed to delete admin'
            };
        }
    }

    async restoreUser(userId) {
        try {
            await authService.makeAuthenticatedRequest(`/api/v1/users/restore/${userId}`, { method: "PATCH" });
            return {
                success: true,
                message: "User restored successfully"
            };
        } catch (error) {
            console.error("Error restoring user:", error);
            return {
                success: false,
                error: error.message || "Failed to restore user"
            };
        }
    }
    async restoreAdmin(adminId){
        try {
            await authService.makeAuthenticatedRequest(`/api/v1/host/restore/${adminId}`, { method: "PATCH" });
            return {
                success: true,
                message: "Admin restored successfully"
            };
        } catch (error) {
            console.error("Error restoring admin:", error);
            return {
                success: false,
                error: error.message || "Failed to restore admin"
            };
        }
    }

    /**
     * Resend invitation to admin user (recreate with new password)
     * @param {Object} adminData - The admin user data
     * @returns {Promise<Object>} Response object with success status and data
     */
    async resendInvitation(adminData) {
        // This essentially creates a new invite with a fresh password
        return await this.createAdminUser(adminData);
    }
    async permanentlyDeleteEvent(eventId) {
        try {
            if (!eventId) {
                return {
                    success: false,
                    error: 'Event ID is required for permanent deletion'
                };
            }

            await authService.makeAuthenticatedRequest(`/api/v1/events/${eventId}`, {
                method: 'DELETE'
            });

            return {
                success: true,
                message: 'Event permanently deleted successfully'
            };
        } catch (error) {
            console.error('Error permanently deleting event:', error);
            return {
                success: false,
                error: error.message || 'Failed to permanently delete event'
            };
        }
    }
    async restoreDeletedEvent(eventId) {
        try {
            if (!eventId) {
                return {
                    success: false,
                    error: 'Event ID is required for restoration'
                };
            }

            await authService.makeAuthenticatedRequest(`/api/v1/events/soft-delete/${eventId}/restore`, {
                method: 'PATCH'
            });

            return {
                success: true,
                message: 'Event restored successfully'
            };
        } catch (error) {
            console.error('Error restoring event:', error);
            return {
                success: false,
                error: error.message || 'Failed to restore event'
            };
        }
    }
}

export const adminService = new AdminService();