"use client";

import { useState, useEffect } from "react";
import { Lock, Shield, Trash2, Clock, Check, X, Loader2, Eye, EyeOff } from "lucide-react";
import { authService } from "@/utils/authService";
import { useAuth } from "@/context/AuthContext";
import UserImageUpload from "./UserImageUpload";
import { uploadService } from "@/utils/uploadService";
import { useToastContext } from "@/context/toast";

export default function ProfileSecurityPage({
    profileSettings,
    setProfileSettings,
    mobileView
}) {
    const [hasProfileChanges, setHasProfileChanges] = useState(false);
    const [hasPasswordChanges, setHasPasswordChanges] = useState(false);
    const [initialSettings, setInitialSettings] = useState({ ...profileSettings });
    
    // Get refreshUserData from AuthContext
    const { refreshUserData } = useAuth();
    
    // Profile-related states
    const [isProfileSaving, setIsProfileSaving] = useState(false);
    const [profileSaveSuccess, setProfileSaveSuccess] = useState(false);
    const [profileErrors, setProfileErrors] = useState({
        firstName: "",
        lastName: "",
        email: ""
    });
    
    // Password-related states
    const [passwordErrors, setPasswordErrors] = useState({
        current: "",
        new: "",
        confirm: ""
    });
    const [isPasswordSaving, setIsPasswordSaving] = useState(false);
    const [passwordSaveSuccess, setPasswordSaveSuccess] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Loading state for initial data fetch
    const [isLoadingUserData, setIsLoadingUserData] = useState(true);
    const [userDataError, setUserDataError] = useState(null);
    const {showMessage}=useToastContext()

    // Fetch user data on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setIsLoadingUserData(true);
                setUserDataError(null);
                
                const userData = await authService.getUserProfile();
                
                // Update profile settings with fetched data
                const updatedSettings = {
                    ...profileSettings,
                    
                    firstName: userData.admin.first_name  || '',
                    lastName: userData.admin.last_name || '',
                    email: userData.admin.email || '',
                    role: userData.role || profileSettings.role || 'Admin' // fallback to existing or default
                };

                setProfileSettings(updatedSettings);
                setInitialSettings(updatedSettings);
                
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                setUserDataError(error.message || 'Failed to load user data');
            } finally {
                setIsLoadingUserData(false);
            }
        };

        fetchUserData();
    }, []); // Empty dependency array - only run on mount

    // Check for profile changes
useEffect(() => {
    if (isLoadingUserData) return; // Don't check for changes while loading
    
    const profileFields = ['firstName', 'lastName', 'email', 'imageUrl'];
    const profileChangesDetected = profileFields.some(key => {
        const currentValue = profileSettings[key] || '';
        const initialValue = initialSettings[key] || '';
        return currentValue !== initialValue;
    });
    
    console.log('Profile change check:', {
        currentImageUrl: profileSettings.imageUrl,
        initialImageUrl: initialSettings.imageUrl,
        hasChanges: profileChangesDetected
    });
    
    setHasProfileChanges(profileChangesDetected);
}, [profileSettings, initialSettings, isLoadingUserData]);


    // Check for password changes
    useEffect(() => {
        const passwordFields = ['currentPassword', 'newPassword', 'confirmPassword'];
        const passwordChangesDetected = passwordFields.some(
            key => profileSettings[key] && profileSettings[key] !== initialSettings[key]
        );
        setHasPasswordChanges(passwordChangesDetected);
    }, [profileSettings, initialSettings]);

    // Clear profile success message after 3 seconds
    useEffect(() => {
        if (profileSaveSuccess) {
            const timer = setTimeout(() => {
                setProfileSaveSuccess(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [profileSaveSuccess]);

    // Clear password success message after 3 seconds
    useEffect(() => {
        if (passwordSaveSuccess) {
            const timer = setTimeout(() => {
                setPasswordSaveSuccess(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [passwordSaveSuccess]);

    // Handle profile input change
    const handleProfileChange = (field, value) => {
        setProfileSettings(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Handle save profile changes with API integration
    const handleSaveProfile = async () => {
        // Clear previous errors
        setProfileErrors({
            firstName: "",
            lastName: "",
            email: ""
        });

        // Basic validation
        if (!profileSettings.firstName.trim()) {
            setProfileErrors(prev => ({
                ...prev,
                firstName: "First name is required"
            }));
            return;
        }

        if (!profileSettings.lastName.trim()) {
            setProfileErrors(prev => ({
                ...prev,
                lastName: "Last name is required"
            }));
            return;
        }

        if (!profileSettings.email.trim()) {
            setProfileErrors(prev => ({
                ...prev,
                email: "Email is required"
            }));
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(profileSettings.email)) {
            setProfileErrors(prev => ({
                ...prev,
                email: "Please enter a valid email address"
            }));
            return;
        }

        setIsProfileSaving(true);

        try {
            // Call the profile update API
            const response = await authService.makeAuthenticatedRequest('/api/v1/host/me', {
                method: 'PATCH',
                body: JSON.stringify({
                    email: profileSettings.email,
                    first_name: profileSettings.firstName,
                    last_name: profileSettings.lastName,
                    avatarUrl: profileSettings.imageUrl
                })
            });

            // If successful, update initial settings and show success
            setInitialSettings(prev => ({
                ...prev,
                firstName: profileSettings.firstName,
                lastName: profileSettings.lastName,
                email: profileSettings.email,
                avatarUrl: profileSettings.imageUrl
            }));
            
            setHasProfileChanges(false);
            setProfileSaveSuccess(true);
            showMessage("Profile Update Successfully", "Your changes have been saved", "success");
            // Refresh user data in AuthContext to update the header
            await refreshUserData();

            console.log("Profile updated successfully:", response);

        } catch (error) {
            console.error("Profile update failed:", error);
            showMessage("Error", "Profile update failed", "error");

            // Handle specific error cases
            if (error.message.includes('email') || error.message.includes('Email')) {
                setProfileErrors(prev => ({
                    ...prev,
                    email: "Email address is already in use or invalid"
                }));
            } else if (error.message.includes('first_name') || error.message.includes('First name')) {
                setProfileErrors(prev => ({
                    ...prev,
                    firstName: "Invalid first name"
                }));
            } else if (error.message.includes('last_name') || error.message.includes('Last name')) {
                setProfileErrors(prev => ({
                    ...prev,
                    lastName: "Invalid last name"
                }));
            } else {
                // Generic error - show it for the first field
                setProfileErrors(prev => ({
                    ...prev,
                    firstName: error.message || "Failed to update profile. Please try again."
                }));
            }
        } finally {
            setIsProfileSaving(false);
        }
    };

    const handleLogout = () => {
        authService.logout();
    };

    // Handle save password changes with API integration
    const handleSavePassword = async () => {
        // Clear previous errors
        setPasswordErrors({
            current: "",
            new: "",
            confirm: ""
        });

        // Validate required fields
        if (!profileSettings.currentPassword) {
            setPasswordErrors(prev => ({
                ...prev,
                current: "Current password is required"
            }));
            return;
        }

        if (!profileSettings.newPassword) {
            setPasswordErrors(prev => ({
                ...prev,
                new: "New password is required"
            }));
            return;
        }

        if (!profileSettings.confirmPassword) {
            setPasswordErrors(prev => ({
                ...prev,
                confirm: "Please confirm your new password"
            }));
            return;
        }

        // Validate passwords match
        if (profileSettings.newPassword !== profileSettings.confirmPassword) {
            setPasswordErrors(prev => ({
                ...prev,
                confirm: "Passwords do not match"
            }));
            return;
        }

        // Validate password requirements
        if (!validatePassword(profileSettings.newPassword)) {
            setPasswordErrors(prev => ({
                ...prev,
                new: "Password doesn't meet requirements"
            }));
            return;
        }

        // Check if new password is different from current password
        if (profileSettings.currentPassword === profileSettings.newPassword) {
            setPasswordErrors(prev => ({
                ...prev,
                new: "New password must be different from current password"
            }));
            return;
        }

        setIsPasswordSaving(true);

        try {
            // Call the password change API
            const response = await authService.makeAuthenticatedRequest('/api/v1/host/me/password', {
                method: 'PATCH',
                body: JSON.stringify({
                    old_password: profileSettings.currentPassword,
                    new_password: profileSettings.newPassword
                })
            });
            showMessage("Password Changed", "Your account password has been successfully changed", "success");
            // If successful, clear password fields and show success
            setInitialSettings(prev => ({
                ...prev,
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            }));

            setProfileSettings(prev => ({
                ...prev,
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            }));

            setHasPasswordChanges(false);
            setPasswordSaveSuccess(true);
            handleLogout(); // Logout after password change

            console.log("Password changed successfully");

        } catch (error) {
            showMessage("Error", "Password change failed", "error");
            console.error("Password change failed:", error);

            // Handle specific error cases
            if (error.message.includes('current password') ||
                error.message.includes('old password') ||
                error.message.includes('incorrect')) {
                setPasswordErrors(prev => ({
                    ...prev,
                    current: "Current password is incorrect"
                }));
            } else if (error.message.includes('weak') ||
                error.message.includes('requirement')) {
                setPasswordErrors(prev => ({
                    ...prev,
                    new: "New password doesn't meet security requirements"
                }));
            } else {
                // Generic error
                setPasswordErrors(prev => ({
                    ...prev,
                    current: error.message || "Failed to change password. Please try again."
                }));
            }
        } finally {
            setIsPasswordSaving(false);
        }
    };

    // Password validation
    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    };

    // Password requirement check
    const passwordRequirementCheck = (password) => {
        return {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password),
            special: /[@$!%*?&]/.test(password)
        };
    };

    const passwordChecks = passwordRequirementCheck(profileSettings.newPassword || "");

    // Show loading state while fetching user data
    if (isLoadingUserData) {
        return (
            <div className="space-y-8">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">Profile & Security</h2>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6">
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-600 mr-3" />
                        <p className="text-gray-600">Loading profile data...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Show error state if user data fetch failed
    if (userDataError) {
        return (
            <div className="space-y-8">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">Profile & Security</h2>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6">
                    <div className="text-center py-12">
                        <X className="w-12 h-12 text-red-500 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load profile data</h3>
                        <p className="text-gray-600 mb-4">{userDataError}</p>
                        <button 
                            onClick={() => window.location.reload()} 
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Profile & Security</h2>
            </div>

            {/* Profile Information */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Admin Profile</h3>
                <div className="flex items-center justify-center">

                
               <UserImageUpload
  imageUrl={profileSettings.imageUrl}
  onUpload={async (file) => {
    try {
      const uploadResponse = await uploadService.uploadImages("users", [file]);

      if (!uploadResponse.success || !uploadResponse.data?.[0]) {
        throw new Error(uploadResponse.message || "Upload failed");
      }
      
      const imageUrl = uploadResponse.data[0];

      // Update the imageUrl in the parent state
      setProfileSettings((prev) => {
        const updated = {
          ...prev,
          imageUrl,
        };
        return updated;
      });
      
    } catch (err) {
      console.error("Image upload error:", err);
    }
  }}
/>


</div>
                {/* Profile Success Message */}
                {profileSaveSuccess && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center">
                            <Check className="w-5 h-5 text-green-600 mr-2" />
                            <p className="text-green-800 font-medium">Profile updated successfully!</p>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-base font-semibold text-[#303237] mb-2">First Name</label>
                        <input
                            type="text"
                            value={profileSettings.firstName || ''}
                            onChange={(e) => handleProfileChange("firstName", e.target.value)}
                            className={`w-full text-black p-3 border ${profileErrors.firstName ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            disabled={isProfileSaving}
                        />
                        {profileErrors.firstName && (
                            <p className="mt-1 text-sm text-red-600">{profileErrors.firstName}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-base font-semibold text-[#303237] mb-2">Last Name</label>
                        <input
                            type="text"
                            value={profileSettings.lastName || ''}
                            onChange={(e) => handleProfileChange("lastName", e.target.value)}
                            className={`w-full text-black p-3 border ${profileErrors.lastName ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            disabled={isProfileSaving}
                        />
                        {profileErrors.lastName && (
                            <p className="mt-1 text-sm text-red-600">{profileErrors.lastName}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-base font-semibold text-[#303237] mb-2">Email Address</label>
                        <input
                            type="email"
                            value={profileSettings.email || ''}
                            onChange={(e) => handleProfileChange("email", e.target.value)}
                            readOnly
                            className={`w-full text-black bg-gray-50 p-3 border ${profileErrors.email ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            disabled={isProfileSaving}
                        />
                        {profileErrors.email && (
                            <p className="mt-1 text-sm text-red-600">{profileErrors.email}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-base font-semibold text-[#303237] mb-2">Role</label>
                        <input
                            type="text"
                            value={profileSettings.role || ''}
                            readOnly
                            className="w-full text-black p-3 border border-gray-300 rounded-lg bg-gray-50"
                        />
                    </div>
                </div>

                {/* Profile Save Button */}
                <button
                    onClick={handleSaveProfile}
                    disabled={!hasProfileChanges || isProfileSaving}
                    className={`w-full py-3 rounded-lg font-semibold transition-colors flex items-center justify-center ${(hasProfileChanges && !isProfileSaving)
                            ? 'bg-[#2853A6] text-white '
                            : 'bg-[#2853A6] opacity-30 text-[#FFFFFF] cursor-not-allowed'
                        }`}
                >
                    {isProfileSaving ? (
                        <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Updating Profile...
                        </>
                    ) : (
                        'Save Profile Changes'
                    )}
                </button>
            </div>

            {/* Password Change */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Change Password</h3>

                {/* Success Message */}
                {passwordSaveSuccess && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center">
                            <Check className="w-5 h-5 text-green-600 mr-2" />
                            <p className="text-green-800 font-medium">Password changed successfully!</p>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="md:col-span-2">
                        <label className="block text-base font-semibold text-[#303237] mb-2">Current Password</label>
                         <div className="relative">
                            <input
                                type={showCurrentPassword ? "text" : "password"}
                                value={profileSettings.currentPassword || ""}
                                onChange={(e) => handleProfileChange("currentPassword", e.target.value)}
                                className={`w-full text-black p-3 border ${passwordErrors.current ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                placeholder="Enter current password"
                                disabled={isPasswordSaving}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-3.5 text-gray-400"
                                onClick={() => setShowCurrentPassword((prev) => !prev)}
                                tabIndex={-1}
                            >
                                {showCurrentPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5"/>
                                )}
                            </button>
                        </div>
                        {passwordErrors.current && (
                            <p className="mt-1 text-sm text-red-600">{passwordErrors.current}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-base font-semibold text-[#303237] mb-2">New Password</label>
                        <div className="relative">
                            <input
                                type={showNewPassword ? "text" : "password"}
                                value={profileSettings.newPassword || ""}
                                onChange={(e) => handleProfileChange("newPassword", e.target.value)}
                                className={`w-full text-black p-3 border ${passwordErrors.new ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                placeholder="Enter new password"
                                disabled={isPasswordSaving}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-3.5 text-gray-400"
                                onClick={() => setShowNewPassword((prev) => !prev)}
                                tabIndex={-1}
                            >
                                {showNewPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5"/>
                                )}
                            </button>
                        </div>
                        {passwordErrors.new && (
                            <p className="mt-1 text-sm text-red-600">{passwordErrors.new}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-base font-semibold text-[#303237] mb-2">Confirm New Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={profileSettings.confirmPassword || ""}
                                onChange={(e) => handleProfileChange("confirmPassword", e.target.value)}
                                className={`w-full text-black p-3 border ${passwordErrors.confirm ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                placeholder="Confirm new password"
                                disabled={isPasswordSaving}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-3.5 text-gray-400"
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                tabIndex={-1}
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5"/>
                                )}
                            </button>
                        </div>
                       
                        {passwordErrors.confirm && (
                            <p className="mt-1 text-sm text-red-600">{passwordErrors.confirm}</p>
                        )}
                    </div>
                </div>

                {/* Password Requirements Display */}
                {profileSettings.newPassword && (
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                            <div className={`flex items-center ${passwordChecks.length ? 'text-green-600' : 'text-gray-500'}`}>
                                {passwordChecks.length ? <Check className="w-4 h-4 mr-1" /> : <X className="w-4 h-4 mr-1" />}
                                At least 8 characters
                            </div>
                            <div className={`flex items-center ${passwordChecks.uppercase ? 'text-green-600' : 'text-gray-500'}`}>
                                {passwordChecks.uppercase ? <Check className="w-4 h-4 mr-1" /> : <X className="w-4 h-4 mr-1" />}
                                One uppercase letter
                            </div>
                            <div className={`flex items-center ${passwordChecks.lowercase ? 'text-green-600' : 'text-gray-500'}`}>
                                {passwordChecks.lowercase ? <Check className="w-4 h-4 mr-1" /> : <X className="w-4 h-4 mr-1" />}
                                One lowercase letter
                            </div>
                            <div className={`flex items-center ${passwordChecks.number ? 'text-green-600' : 'text-gray-500'}`}>
                                {passwordChecks.number ? <Check className="w-4 h-4 mr-1" /> : <X className="w-4 h-4 mr-1" />}
                                One number
                            </div>
                            <div className={`flex items-center ${passwordChecks.special ? 'text-green-600' : 'text-gray-500'}`}>
                                {passwordChecks.special ? <Check className="w-4 h-4 mr-1" /> : <X className="w-4 h-4 mr-1" />}
                                One special character
                            </div>
                        </div>
                    </div>
                )}

                {/* Password Save Button */}
                <button
                    onClick={handleSavePassword}
                    disabled={!hasPasswordChanges || isPasswordSaving}
                    className={`w-full py-3 rounded-lg font-semibold transition-colors flex items-center justify-center ${hasPasswordChanges && !isPasswordSaving
                        ? 'bg-[#2853A6] text-white '
                            : 'bg-[#2853A6] opacity-30 text-[#FFFFFF] cursor-not-allowed'
                        }`}
                >
                    {isPasswordSaving ? (
                        <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Changing Password...
                        </>
                    ) : (
                        'Save Password Changes'
                    )}
                </button>
            </div>
        </div>
    );
}