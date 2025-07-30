"use client";
import { useState, useEffect } from "react";
import { CalendarClock, Clock, CalendarX, Users, ChevronDown, Check, Calendar } from "lucide-react";
import Image from "next/image";
import { useEventAnalyticsStore } from "@/stores/useAnalyticsStore";

const iconMap = {
  total_events: <CalendarClock className="h-5 w-5 text-white" />,
  active_events: <Clock className="h-5 w-5 text-white" />,
  cancelled_events: <CalendarX className="h-5 w-5 text-white" />,
  total_attendees: <Users className="h-5 w-5 text-white" />,
};

const colorMap = {
  total_events: "bg-green-500",
  active_events: "bg-yellow-500",
  cancelled_events: "bg-red-600",
  total_attendees: "bg-purple-500",
};

export default function Events({ dateRange }) {
  const { 
    eventStats, 
    topEvents, 
    bookingData, 
    hasData, 
    isLoading, 
    error, 
    fetchEventAnalytics 
  } = useEventAnalyticsStore();

  // State for chart time filter
  const [timeFilter, setTimeFilter] = useState("Monthly");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Monthly");

  // Fetch data on component mount
  useEffect(() => {
    fetchEventAnalytics(dateRange.startDate, dateRange.endDate);
  }, [fetchEventAnalytics, dateRange]);

  // Handle time filter change
  const handleTimeFilterChange = (filter) => {
    setTimeFilter(filter);
    setSelectedFilter(filter);
    setShowDropdown(false);
    
    // Calculate date ranges based on filter
    const now = new Date();
    let startDate
    let endDate
    
    switch (filter) {
      case '7 Last Days':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
        endDate = now.toISOString();
        break;
      case 'Monthly':
        startDate = new Date(now.getFullYear(), now.getMonth() - 2, 1).toISOString();
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString();
        break;
      case 'Yearly':
        startDate = new Date(now.getFullYear() - 1, 0, 1).toISOString();
        endDate = new Date(now.getFullYear() + 1, 0, 1).toISOString();
        break;
    }
    
    fetchEventAnalytics(startDate, endDate);
  };

  // For demo: toggle between data and empty state
  const toggleDataState = () => {
    // This would typically be handled by the store
    // For demo purposes, you might want to manually set hasData
    console.log("Toggle data state - implement based on your needs");
  };

  // Max booking value for chart scaling
  const maxBooking = Math.max(...bookingData.map(item => item.bookings), 1);

  if (isLoading) {
    return (
      <div className="font-inter">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading event analytics...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="font-inter">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="text-red-800">Error loading event analytics: {error}</div>
          <button 
            onClick={() => fetchEventAnalytics(dateRange.startDate, dateRange.endDate)}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md text-sm"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="font-inter">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {eventStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full ${colorMap[stat.type]} flex items-center justify-center mr-4`}>
                {iconMap[stat.type]}
              </div>
              <div className="flex flex-col">
                <p className="text-gray-600 font-medium text-sm">{stat.title}</p>
                <div className="flex flex-col items-baseline">
                  <h2 className="text-2xl font-bold text-[#1D1D1E]">{stat.count}</h2>
                  <span className={`text-xs ml-2 ${stat.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change} vs last month
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-8">
        {/* Top Performing Events Table */}
        <div className="w-[40%] bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg text-black font-semibold mb-4">Top Performing Events</h2>
          
          {hasData && topEvents.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="pb-3">Event</th>
                    <th className="pb-3">Vendor</th>
                    <th className="pb-3">Total Attendees</th>
                  </tr>
                </thead>
                <tbody>
                  {topEvents.map((event) => (
                    <tr key={event.id} className="border-b border-gray-100">
                      <td className="py-4">{event.event}</td>
                      <td className="py-4 text-gray-600">{event.vendor}</td>
                      <td className="py-4">{event.attendees}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center h-72 flex items-center justify-center flex-col py-6">
              <div className="w-50 rounded-full flex items-center justify-center mb-4">
                <Image 
                  src="/Empty.png"
                  alt="No events yet"
                  width={134}
                  height={89}
                  className="w-full h-full text-white" 
                />
              </div>
              <h3 className="text-lg font-medium mb-2 text-black">No Top-Performing Events Yet</h3>
            </div>
          )}
        </div>

        {/* Event Booking Rate Chart */}
        <div className="w-[60%] bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-black">Event Booking Rate</h2>
            <div className="relative">
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center text-[#303237] text-sm border border-[#E4E4E7] rounded-lg px-3 py-2"
              >
                <Calendar className="mr-2 h-4 w-4" />
                {timeFilter} <ChevronDown className="ml-2 h-4 w-4" />
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-1 text-[#1D1D1E] bg-white border border-[#E4E4E7] rounded-lg shadow-lg z-10 min-w-[150px]">
                  <div className="py-1 text-[16px">
                    <button 
                      onClick={() => handleTimeFilterChange('7 Last Days')}
                      className="flex items-center w-full text-left px-4 py-3 text-sm border-b border-[#E5E5E5] hover:bg-gray-100"
                    >
                      <div className={`w-4 h-4 border rounded-full mr-3 flex items-center justify-center ${selectedFilter === '7 Last Days' ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`}>
                        {selectedFilter === '7 Last Days' && <Check className="w-3 h-3 text-white" />}
                      </div>
                       Last 7 Days
                    </button>
                    <button 
                      onClick={() => handleTimeFilterChange('Monthly')}
                      className="flex items-center w-full text-left px-4 py-3 text-sm border-b border-[#E5E5E5] hover:bg-gray-100"
                    >
                      <div className={`w-4 h-4 border rounded-full mr-3 flex items-center justify-center ${selectedFilter === 'Monthly' ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`}>
                        {selectedFilter === 'Monthly' && <Check className="w-3 h-3 text-white" />}
                      </div>
                      Monthly
                    </button>
                    <button 
                      onClick={() => handleTimeFilterChange('Yearly')}
                      className="flex items-center w-full text-left px-4 py-3 text-sm  hover:bg-gray-100"
                    >
                      <div className={`w-4 h-4 border rounded-full mr-3 flex items-center justify-center ${selectedFilter === 'Yearly' ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`}>
                        {selectedFilter === 'Yearly' && <Check className="w-3 h-3 text-white" />}
                      </div>
                      Yearly
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {hasData && bookingData.length > 0 ? (
            <div className="h-64 flex items-end">
              {bookingData.map((item, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-6 bg-blue-500 rounded-t-sm" 
                    style={{ height: `${(item.bookings / maxBooking) * 200}px` }}
                  ></div>
                  <div className="text-xs mt-2 text-gray-500">{item.day}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center h-64 flex items-center justify-center flex-col py-6">
              <div className="w-50 rounded-full flex items-center justify-center mb-4">
                <Image 
                  src="/Empty.png"
                  alt="No bookings yet"
                  width={134}
                  height={89}
                  className="w-full h-full text-white" 
                />
              </div>
              <h3 className="text-lg text-[#272727] font-medium mb-2">No Event Bookings Yet</h3>
            </div>
          )}
        </div>
      </div>
      
      {/* Button to toggle empty state (for demo purposes only) */}
      {/* <button 
        onClick={toggleDataState} 
        className="mt-8 px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Toggle Empty State (Demo)
      </button> */}
    </div>
  );
}