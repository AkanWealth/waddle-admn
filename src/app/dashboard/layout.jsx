"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
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

function Layout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // For responsive design - use server-side rendering compatible approach
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if mobile on mount and on resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
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

  // Navigation items
  const navItems = [
    { path: "/dashboard/analytics", icon: <BarChart className="w-5 h-5" />, label: "Analytics" },
    { path: "/dashboard/users", icon: <User className="w-5 h-5" />, label: "User Management" },
    { path: "/dashboard/events", icon: <CalendarRange className="w-5 h-5" />, label: "Event Management" },
    { path: "/dashboard/bookings", icon: <BookText className="w-5 h-5" />, label: "Bookings Management" },
    { path: "/dashboard/payments", icon: <BadgePoundSterlingIcon className="w-5 h-5" />, label: "Payment Management" },
    { path: "/dashboard/recommendations", icon: <MapPin className="w-5 h-5" />, label: "Recommendations" },
    { path: "/dashboard/dispute", icon: <Gavel className="w-5 h-5" />, label: "Dispute" },
    { path: "/dashboard/settings", icon: <Settings className="w-5 h-5" />, label: "Settings" }
  ];

  return (
    <div className="flex flex-nowrap justify-center h-screen bg-gray-50">
      {/* Sidebar with hidden scrollbar */}
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
          msOverflowStyle: 'none',  /* IE and Edge */
          scrollbarWidth: 'none',   /* Firefox */
        }}
      >
        {/* CSS to hide scrollbar for Webkit browsers (Chrome, Safari) */}
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
        
        {/* Navigation items - flex-grow to push logout to bottom */}
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
          <Link
            href="/logout"
            className="flex items-center px-5 py-3 rounded-md text-red-600 hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            <LogOut className="w-5 h-5 mr-3 text-red-500" />
            <span>LogOut</span>
          </Link>
        </div>
      </nav>
      
      {/* Main content */}
      <div className={`flex-1 flex flex-col ${isMobile ? 'ml-0' : 'ml-70'} transition-all duration-300`}>
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
            <button className="w-7 h-7 relative p-1 rounded-full bg-blue-100 hover:bg-gray-100 focus:outline-none">
              <Bell className="h-5 w-5 text-blue-800" />
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-2 h-2 flex items-center justify-center text-xs">
                
              </span>
            </button>
            
            {/* User profile */}
            <div className="flex items-center">
              <div className="w-10 h-10 bg-[#F8F2EC] rounded-full flex text-sm items-center justify-center text-black font-medium">
                TD
              </div>
              <div className="hidden md:block ml-2">
                <div className="flex items-center">
                  <span className="font-inter text-sm font-semibold">Tomi Dosunmu</span>
                </div>
                <span className="text-xs text-gray-500 block">Admin</span>
              </div>
            </div>
          </div>
        </header>
        
        {/* Main content area */}
        <main className="flex-1 p-10 overflow-auto rounded-xl bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;