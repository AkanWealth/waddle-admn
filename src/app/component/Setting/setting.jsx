"use client";

import { useState, useEffect } from "react";
import { Save, User, Bell } from "lucide-react";
import ProfileSecurityPage from "./ProfileSecurityPage";
import NotificationsPage from "./NotificationsPage";

export default function SettingsPage() {
    // State for active tab
    const [activeTab, setActiveTab] = useState("Profile & Security");
    
    // Settings states - lifted up to main component for sharing between tabs
    const [notificationSettings, setNotificationSettings] = useState({
        autoNotifyParents: false,
        includeRefundPolicy: false,
        allowAdminCustomize: false
    });

    const [profileSettings, setProfileSettings] = useState({
        firstName: "Tomi",
        lastName: "Dosunmu", 
        email: "tomi@waddle.com",
        role: "Admin",
        imageUrl:"",
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [mobileView, setMobileView] = useState(false);

    // Handle tab change
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    // Save settings
    const saveSettings = () => {
        // Logic to save settings
        console.log("Settings saved:", { notificationSettings, profileSettings });
        // You can add API call here to save to backend
    };

    // Check window size for responsive design
    useEffect(() => {
        const handleResize = () => {
            setMobileView(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const tabs = [
        { name: "Profile & Security", icon: User },
        { name: "Notifications", icon: Bell }
    ];

    return (
        <div>
            {/* Header */}
            <div className="font-inter flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
                <div className="gap-4 grid grid-cols-1 items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
                    <p className="text-gray-500">Manage your notification and password settings here</p>
                </div>
                {/* <div className="flex space-x-2 md:space-x-4 mt-4 md:mt-0">
                    <button
                        onClick={saveSettings}
                        className="flex items-center bg-blue-800 text-white px-2 py-1 md:px-4 md:py-2 rounded-md text-sm md:text-base"
                    >
                        <Save className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
                        Save Changes
                    </button>
                </div> */}
            </div>

            {/* Main content */}
            <div className=" rounded-lg">
                <div className="">
                    {/* Tabs */}
                    <div className=" flex flex-col lg:flex-row lg:items-start lg:justify-between mb-5 px-2 rounded-lg">
                        <div className="bg-white flex mb-4 lg:mb-0 border-1 rounded-lg border-gray-200 px-2 overflow-x-auto">
                            {tabs.map((tab) => {
                                const IconComponent = tab.icon;
                                return (
                                    <button
                                        key={tab.name}
                                        className={`flex items-center mr-4 md:mr-8 py-2 text-xs md:text-sm whitespace-nowrap ${
                                            activeTab === tab.name
                                                ? "border-b-2 border-blue-500 text-blue-600 font-medium"
                                                : "text-gray-500"
                                        }`}
                                        onClick={() => handleTabChange(tab.name)}
                                    >
                                        <IconComponent className="w-4 h-4 mr-2" />
                                        {tab.name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Content based on active tab */}
                    <div className="mt-6">
                        {activeTab === "Profile & Security" && (
                            <ProfileSecurityPage 
                                profileSettings={profileSettings}
                                setProfileSettings={setProfileSettings}
                                mobileView={mobileView}
                            />
                        )}
                        {activeTab === "Notifications" && (
                            <NotificationsPage 
                                notificationSettings={notificationSettings}
                                setNotificationSettings={setNotificationSettings}
                                mobileView={mobileView}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}