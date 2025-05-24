"use client";

import { useState, useEffect } from "react";
import { Lock, Shield, Trash2, Clock, Check, X } from "lucide-react";

export default function ProfileSecurityPage({ 
    profileSettings, 
    setProfileSettings, 
    mobileView 
}) {
    const [hasProfileChanges, setHasProfileChanges] = useState(false);
    const [hasPasswordChanges, setHasPasswordChanges] = useState(false);
    const [initialSettings, setInitialSettings] = useState({...profileSettings});
    const [passwordErrors, setPasswordErrors] = useState({
        current: "",
        new: "",
        confirm: ""
    });

    // Check for profile changes
    useEffect(() => {
        const profileFields = ['firstName', 'lastName', 'email'];
        const profileChangesDetected = profileFields.some(
            key => profileSettings[key] !== initialSettings[key]
        );
        setHasProfileChanges(profileChangesDetected);
    }, [profileSettings, initialSettings]);

    // Check for password changes
    useEffect(() => {
        const passwordFields = ['currentPassword', 'newPassword', 'confirmPassword'];
        const passwordChangesDetected = passwordFields.some(
            key => profileSettings[key] && profileSettings[key] !== initialSettings[key]
        );
        setHasPasswordChanges(passwordChangesDetected);
    }, [profileSettings, initialSettings]);

    // Handle profile input change
    const handleProfileChange = (field, value) => {
        setProfileSettings(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Handle save profile changes
    const handleSaveProfile = () => {
        // Save profile logic here (API call, etc.)
        console.log("Saving profile changes:", {
            firstName: profileSettings.firstName,
            lastName: profileSettings.lastName,
            email: profileSettings.email
        });
        
        // Update initial settings for profile fields
        setInitialSettings(prev => ({
            ...prev,
            firstName: profileSettings.firstName,
            lastName: profileSettings.lastName,
            email: profileSettings.email
        }));
        setHasProfileChanges(false);
    };

    // Handle save password changes
    const handleSavePassword = () => {
        // Validate passwords
        if (profileSettings.newPassword || profileSettings.confirmPassword) {
            if (profileSettings.newPassword !== profileSettings.confirmPassword) {
                setPasswordErrors(prev => ({
                    ...prev,
                    confirm: "Passwords do not match"
                }));
                return;
            }

            if (!validatePassword(profileSettings.newPassword)) {
                setPasswordErrors(prev => ({
                    ...prev,
                    new: "Password doesn't meet requirements"
                }));
                return;
            }
        }

        // Save password logic here (API call, etc.)
        console.log("Saving password changes");
        
        // Update initial settings for password fields and clear password fields
        setInitialSettings(prev => ({
            ...prev,
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        }));
        
        // Clear password fields after successful save
        setProfileSettings(prev => ({
            ...prev,
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        }));
        
        setHasPasswordChanges(false);
        setPasswordErrors({
            current: "",
            new: "",
            confirm: ""
        });
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

    const passwordChecks = passwordRequirementCheck(profileSettings.newPassword);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Profile & Security</h2>
            </div>

            {/* Profile Information */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Profile Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                        <input
                            type="text"
                            value={profileSettings.firstName}
                            onChange={(e) => handleProfileChange("firstName", e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                        <input
                            type="text"
                            value={profileSettings.lastName}
                            onChange={(e) => handleProfileChange("lastName", e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <input
                            type="email"
                            value={profileSettings.email}
                            onChange={(e) => handleProfileChange("email", e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                        <input
                            type="text"
                            value={profileSettings.role}
                            readOnly
                            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                        />
                    </div>
                </div>
                
                {/* Profile Save Button */}
                <button
                    onClick={handleSaveProfile}
                    disabled={!hasProfileChanges}
                    className={`w-full py-3 rounded-lg font-medium transition-colors ${
                        hasProfileChanges 
                            ? 'bg-blue-600 text-white hover:bg-blue-700' 
                            : 'bg-blue-50 text-gray-500 cursor-not-allowed'
                    }`}
                >
                    Save Profile Changes
                </button>
            </div>

            {/* Password Change */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Change Password</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                value={profileSettings.currentPassword}
                                onChange={(e) => handleProfileChange("currentPassword", e.target.value)}
                                className={`w-full p-3 border ${passwordErrors.current ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                placeholder="Enter current password"
                            />
                            <Lock className="absolute right-3 top-3.5 text-gray-400 w-5 h-5" />
                        </div>
                        {passwordErrors.current && (
                            <p className="mt-1 text-sm text-red-600">{passwordErrors.current}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                value={profileSettings.newPassword}
                                onChange={(e) => handleProfileChange("newPassword", e.target.value)}
                                className={`w-full p-3 border ${passwordErrors.new ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                placeholder="Enter new password"
                            />
                            <Lock className="absolute right-3 top-3.5 text-gray-400 w-5 h-5" />
                        </div>
                        {passwordErrors.new && (
                            <p className="mt-1 text-sm text-red-600">{passwordErrors.new}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                value={profileSettings.confirmPassword}
                                onChange={(e) => handleProfileChange("confirmPassword", e.target.value)}
                                className={`w-full p-3 border ${passwordErrors.confirm ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                placeholder="Confirm new password"
                            />
                            <Lock className="absolute right-3 top-3.5 text-gray-400 w-5 h-5" />
                        </div>
                        {passwordErrors.confirm && (
                            <p className="mt-1 text-sm text-red-600">{passwordErrors.confirm}</p>
                        )}
                    </div>
                </div>

                {/* Password Requirements Display (optional) */}
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
                    disabled={!hasPasswordChanges}
                    className={`w-full py-3 rounded-lg font-medium transition-colors ${
                        hasPasswordChanges 
                            ? 'bg-blue-600 text-white hover:bg-blue-700' 
                            : 'bg-blue-50 text-gray-500 cursor-not-allowed'
                    }`}
                >
                    Save Password Changes
                </button>
            </div>
        </div>
    );
}