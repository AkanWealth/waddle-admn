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
    bookingPeriod,
    isBookingLoading,
    bookingError,
    fetchEventAnalytics,
    fetchBookingData
  } = useEventAnalyticsStore();

  // State for chart time filter
  const [timeFilter, setTimeFilter] = useState("7 Last Days");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("7 Last Days");

  // Fetch data on component mount
  useEffect(() => {
    fetchEventAnalytics(dateRange.startDate, dateRange.endDate);
    fetchBookingData('7days'); // Default to 7days
  }, [fetchEventAnalytics, fetchBookingData, dateRange]);

  // Handle time filter change
  const handleTimeFilterChange = (filter) => {
    setTimeFilter(filter);
    setSelectedFilter(filter);
    setShowDropdown(false);
    
    // Map filter to period parameter
    let period;
    switch (filter) {
      case '7 Last Days':
        period = '7days';
        break;
      case 'Monthly':
        period = 'monthly';
        break;
      case 'Yearly':
        period = 'yearly';
        break;
      default:
        period = '7days';
    }
    
    fetchBookingData(period);
  };

  // For demo: toggle between data and empty state
  const toggleDataState = () => {
    // This would typically be handled by the store
    // For demo purposes, you might want to manually set hasData
    console.log("Toggle data state - implement based on your needs");
  };

  // Max booking value for chart scaling
  const maxBooking = Math.max(...bookingData.map(item => item.bookings), 1);
  const chartHeight = 200; // px used for bar scaling and axis
  const yTickCount = 4; // number of segments (will render yTickCount + 1 labels incl. 0)
  const yTicks = Array.from({ length: yTickCount + 1 }, (_, i) => Math.round((maxBooking * (yTickCount - i)) / yTickCount));

  // Tooltip state
  const [hoveredBar, setHoveredBar] = useState({ index: null, heightPx: 0 });

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
                      <td className="py-4 text-gray-600">{event.event}</td>
                      <td className="py-4 text-gray-600">{event.vendor}</td>
                      <td className="py-4 text-gray-600">{event.attendees}</td>
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
          
          {isBookingLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-lg">Loading booking data...</div>
            </div>
          ) : bookingError ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="text-red-800">Error loading booking data: {bookingError}</div>
              <button 
                onClick={() => fetchBookingData(bookingPeriod)}
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md text-sm"
              >
                Retry
              </button>
            </div>
          ) : hasData && bookingData.length > 0 ? (
            <div className="h-64">
              <div className="flex">
                {/* Y-Axis aligned with bars height */}
                <div className="flex flex-col justify-between h-[200px] mr-4 text-xs text-gray-500">
                  {yTicks.map((tick, i) => (
                    <div key={i} className="flex items-center">
                      <span className="w-8 text-right">{tick}</span>
                    </div>
                  ))}
                </div>
                {/* Bars Area (fixed height) */}
                <div className="flex-1">
                  <div className="relative h-[200px] flex items-end">
                    {/* Optional horizontal grid lines aligned with ticks */}
                    <div className="absolute inset-0 flex flex-col justify-between">
                      {yTicks.map((_, i) => (
                        <div key={i} className="w-full border-t border-dashed border-gray-200"></div>
                      ))}
                    </div>
                    <div className="relative flex items-end w-full">
                      {bookingData.map((item, index) => {
                        const barHeightPx = (item.bookings / maxBooking) * chartHeight;
                        const isHovered = hoveredBar.index === index;
                        return (
                          <div key={index} className="relative flex-1 flex flex-col items-center">
                            {/* Tooltip */}
                            {isHovered && (
                              <div
                                className="absolute flex flex-col items-center z-10 px-3 text-[10px] rounded bg-[#FFFFFF] text-white shadow-[0px_0.5px_1px_0px_#00000040]"
                                style={{ bottom: `${barHeightPx + 8}px` }}  
                              >
                                <h3 className="text-sm font-medium text-[#303237]">{item.bookings}</h3>
                                <div className="font-normal text-[10px] text-[#7E8494]">{item.period}</div>
                              </div>
                            )}
                            {/* Bar */}
                            <div
                              className="w-8 bg-[#5375B8] rounded-t-[32px] cursor-pointer"
                              style={{ height: `${barHeightPx}px` }}
                              onMouseEnter={() => setHoveredBar({ index, heightPx: barHeightPx })}
                              onMouseLeave={() => setHoveredBar({ index: null, heightPx: 0 })}
                            ></div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {/* X-axis labels below fixed-height bars */}
                  <div className="mt-2 flex w-full">
                    {bookingData.map((item, index) => (
                      <div key={index} className="flex-1 text-center text-xs text-gray-500">
                        {item.period}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
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