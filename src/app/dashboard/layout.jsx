"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { authService } from "@/utils/authService";
import { useAuth } from "@/context/AuthContext";
import { notificationService } from "@/utils/notificationService";
import { usePermissions } from "@/hooks/usePermissions";
import { 
  User,
  Settings, 
  LogOut,
  Bell,
  Menu,
  BadgePoundSterlingIcon,
  CalendarRange,
  BookText,
  MapPin,
  Gavel,
  X,
  BarChart
} from "lucide-react";
import { FaBell } from "react-icons/fa6";
import EmptyNotification from "../component/Notification/EmptyNotification";
import NotificationModal from "../component/Notification/NotificationModal";
import { ToastContext } from "@/context/toast";
import { ToastContainer } from "react-toastify";


 

function Layout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const notificationRef = useRef(null);
  const { canView } = usePermissions();
useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      showNotification &&
      notificationRef.current &&
      !notificationRef.current.contains(event.target)
    ) {
      setShowNotification(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [showNotification]);

  
  // Use AuthContext for user data
  const { user, loading } = useAuth();
  console.log("User from AuthContext:", user);
  
  // Fetch unread notification count
  useEffect(() => {
    const fetchUnreadCount = async () => {
      if (user?.admin?.id) {
        try {
          const { success, data } = await notificationService.getUnreadCount(user.admin.id);
          console.log(data, "This is the data")
          if (success && data) {
            //setUnreadCount(5)
            setUnreadCount(data.unreadCount || 0);
          }
        } catch (error) {
          console.error("Error fetching unread count:", error);
        }
      }
    };

    fetchUnreadCount();
    
    // Poll for updates every 30 seconds
    const interval = setInterval(fetchUnreadCount, 30000);
    
    return () => clearInterval(interval);
  }, [user?.admin?.id]);
  
  // Generate user profile data from AuthContext
  const userProfile = user ? {
    name: user.admin?.first_name && user.admin?.last_name 
      ? `${user.admin.first_name} ${user.admin.last_name}`
      : user.admin?.first_name || user.name || "User",
    role: user.admin?.role || user.role || "Admin",
    initials: user.admin?.first_name && user.admin?.last_name
      ? (user.admin.first_name.charAt(0) + user.admin.last_name.charAt(0)).toUpperCase()
      : user.admin?.first_name?.charAt(0)?.toUpperCase() || "U",
      image: user.admin?.avatarUrl
  } : {
    name: "Loading...",
    role: "Loading...",
    initials: "L"
  };
  
  // Check if mobile on mount and on resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Close sidebar when clicking outside on mobile
  const sidebarRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && sidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobile, sidebarOpen]);

  // Navigation items (conditionally include based on permissions per module)
  const allNavItems = [
    { path: "/dashboard/analytics", icon: <BarChart className="w-5 h-5" />, label: "Analytics", module: "analytics" },
    { path: "/dashboard/users", icon: <User className="w-5 h-5" />, label: "User Management", module: "userManagement" },
    { path: "/dashboard/events", icon: <CalendarRange className="w-5 h-5" />, label: "Event Management", module: "eventManagement" },
    { path: "/dashboard/bookings", icon: <BookText className="w-5 h-5" />, label: "Bookings Management", module: "bookingManagement" },
    { path: "/dashboard/payments", icon: <BadgePoundSterlingIcon className="w-5 h-5" />, label: "Payment Management", module: "payment" },
    { path: "/dashboard/recommendations", icon: <MapPin className="w-5 h-5" />, label: "Recommendations", module: "recommendations" },
    { path: "/dashboard/dispute", icon: <Gavel className="w-5 h-5" />, label: "Dispute", module: "dispute" },
    // Settings should always be visible regardless of permissions
    { path: "/dashboard/settings", icon: <Settings className="w-5 h-5" />, label: "Settings" }
  ];

  const navItems = allNavItems.filter(item => (item.module ? canView(item.module) : true));

  return (
        
          

    <div className="flex flex-nowrap justify-center h-screen bg-gray-50">
      {/* Sidebar with hidden scrollbar */}
      <ToastContainer/>
      <nav 
        ref={sidebarRef}
        className={`
          ${isMobile 
            ? `fixed inset-y-0 left-0 z-50 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`
            : 'fixed inset-y-0 left-0'
          } 
          w-70 bg-white border-r border-gray-100 overflow-y-auto flex flex-col
          scrollbar-hide
        `}
        style={{ 
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        <style jsx>{`
          nav::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        
        {/* Mobile close button */}
        {isMobile && (
          <div className="p-4 flex justify-end">
            <button onClick={() => setSidebarOpen(false)}>
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        )}
        
        {/* Logo area */}
        <div className="border-b border-gray-200 flex px-6 py-2 items-center">
          <Image
            src="/waddleLogo.png"
            width={145}
            height={64}
            alt="Waddle Logo"
            className="mx-auto"
          />
        </div>
        
        {/* Navigation items */}
        <div className="flex-grow flex flex-col py-6 px-6">
          {navItems.map((item, index) => {
            const isActive = pathname && pathname.startsWith(item.path);
            return (
              <Link
                key={index}
                href={item.path}
                className={`
                  flex items-center px-2 py-3 my-1 rounded-md transition-colors text-base font-medium
                  ${isActive 
                    ? 'text-[#2853A6] border-l-4 border-[#2853A6]' 
                    : 'text-gray-600 hover:bg-gray-50'}
                `}
              >
                <span className={`mr-3 ${isActive ? 'text-[#2853A6]' : 'text-gray-500'}`}>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
        
        {/* Logout button at bottom of sidebar */}
        <div className="mt-auto px-4 pb-8">
          <button
            onClick={() => authService.logout()}
            className="flex items-center px-5 py-3 rounded-md text-red-600 hover:bg-gray-50 transition-colors text-sm font-medium w-full text-left"
          >
            <LogOut className="w-5 h-5 mr-3 text-red-500" />
            <span>Log Out</span>
          </button>
        </div>
      </nav>
      
      {/* Main content */}
      <div className={`flex-1 relative flex flex-col ${isMobile ? 'ml-0' : 'ml-70'} transition-all duration-300`}>
        {/* Top navigation */}
        <header className="bg-white border-b border-gray-200 h-20 md:h-22 flex items-center px-10 sticky top-0 z-10">
          {/* Mobile menu button */}
          {isMobile && (
            <button 
              onClick={() => setSidebarOpen(true)}
              className="mr-4 focus:outline-none"
            >
              <Menu className="w-6 h-6 text-gray-500" />
            </button>
          )}
          
          {/* Right side elements */}
          <div className="ml-auto flex items-center space-x-6">
            {/* Notification bell */}
            <button onClick={() => setShowNotification((prev) => !prev)} className="w-9 h-9 flex items-center cursor-pointer justify-center relative p-1 rounded-full bg-[#E5E5E5] hover:bg-gray-100 focus:outline-none">
              <FaBell className="h-5 w-5 text-[#2853A6]" />
              {unreadCount > 0 && (
                <span className="z-50 absolute -top-1 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
            
            {/* User profile */}
            <div className="flex items-center">
              {/* <div className="w-10 h-10 bg-[#F8F2EC] rounded-full flex text-sm items-center justify-center text-black font-medium">
                {userProfile.initials}
              </div> */}
              <Image
                src={userProfile.image ? userProfile.image : "/Avatar.jpg"}
                alt={userProfile.name || "User Avatar"}
                width={45}
                height={45}
                className="w-[45px] h-[45px] rounded-full object-cover"
              />
              <div className="hidden md:block ml-2 text-black">
                <div className="flex items-center">
                  <span className="font-inter text-sm font-semibold">
                    {loading ? "Loading..." : userProfile.name}
                  </span>
                </div>
                <span className="text-xs text-gray-500 block">
                  {loading ? "Loading..." : userProfile.role}
                </span>
              </div>
            </div>
          </div>
        </header>


        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
      {showNotification && (
  <>
    {/* Dark background overlay */}
    <div className="fixed inset-0 bg-[#00000080] bg-opacity-30 z-40" />

    {/* Notification modal */}
    <div
      ref={notificationRef}
      className="absolute top-[5.2rem] right-10 z-50 w-[480px] bg-white rounded-lg shadow-lg py-4"
    >
      <NotificationModal 
        onNotificationRead={(notificationId) => {
          // Update unread count when a notification is marked as read
          setUnreadCount(prev => Math.max(0, prev - 1));
        }}
        onUnreadCountChange={setUnreadCount}
      />
    </div>
  </>
)}

    </div>

  );
}

export default Layout;