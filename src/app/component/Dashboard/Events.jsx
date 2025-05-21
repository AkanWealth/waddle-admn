
"use client";
import { useState, useEffect } from "react";
import { CalendarClock, Clock, CalendarX, Users, ChevronDown, Calendar, Import } from "lucide-react";
import Image from "next/image";

export default function Events() {
  // Dummy data for stat cards
  const eventStats = [
    { 
      title: "Total Events", 
      count: 12, 
      change: "+4.3%", 
      isPositive: true,
      bgColor: "bg-green-500",
      icon: <CalendarClock className="h-5 w-5 text-white"/>
    },
    { 
      title: "Active Events", 
      count: 10, 
      change: "+4.3%", 
      isPositive: true,
      bgColor: "bg-yellow-500",
      icon: <Clock className="h-5 w-5 text-white"/>
    },
    { 
      title: "Cancelled Events", 
      count: 2, 
      change: "+4.3%", 
      isPositive: true,
      bgColor: "bg-red-600",
      icon: <CalendarX className="h-5 w-5 text-white"/>
    },
    { 
      title: "Total Attendees", 
      count: 250, 
      change: "+4.3%", 
      isPositive: true,
      bgColor: "bg-purple-500",
      icon: <Users className="h-5 w-5 text-white"/>
    }
  ];

  // Dummy data for top performing events table
  const topEvents = [
    { id: 1, event: "Boy and Girls Play", vendor: "ABC Events", attendees: 89 },
    { id: 2, event: "Dance School", vendor: "Softtalk Limited", attendees: 64 },
    { id: 3, event: "Kids Adventure", vendor: "ABC Events", attendees: 61 },
    { id: 4, event: "Dance School", vendor: "Softtalk Limited", attendees: 58 },
    { id: 5, event: "Boy and Girls Play", vendor: "Palm View", attendees: 47 }
  ];

  // Dummy data for booking rate chart
  const [bookingData, setBookingData] = useState([
    { day: "Mon", bookings: 350 },
    { day: "Tue", bookings: 280 },
    { day: "Wed", bookings: 180 },
    { day: "Thu", bookings: 450 },
    { day: "Fri", bookings: 320 },
    { day: "Sat", bookings: 420 },
    { day: "Sun", bookings: 300 }
  ]);

  // State for chart time filter
  const [timeFilter, setTimeFilter] = useState("Monthly");
  
  // Empty state flag (toggle this based on API response)
  const [hasData, setHasData] = useState(true);

  // Function to simulate API data fetch
  useEffect(() => {
    // This is where you'd fetch real data from your API
    // For now, we're just using the dummy data
  }, []);

  // For demo: toggle between data and empty state
  const toggleDataState = () => {
    setHasData(!hasData);
  };

  // Max booking value for chart scaling
  const maxBooking = Math.max(...bookingData.map(item => item.bookings));

  return (
    <div className="font-inter">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {eventStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full ${stat.bgColor} flex items-center justify-center mr-4`}>
                {stat.icon}
              </div>
              <div className="flex flex-col">
                <p className="text-gray-600 font-medium text-sm">{stat.title}</p>
                <div className="flex flex-col items-baseline">
                  <h2 className="text-2xl font-bold">{stat.count}</h2>
                  <span className={`text-xs ml-2 ${stat.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change} vs last month
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top Performing Events Table */}
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Top Performing Events</h2>
          
          {hasData ? (
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
            <div className="text-center py-6">
              <div className="w-50 rounded-full flex items-center justify-center mb-4">
                  <Image 
                    src="/Empty.png"
                    alt="No signups yet"
                    width={134}
                    height={89}
                    className="w-full h-full text-white" />

                </div>
              <h3 className="text-lg font-medium mb-2">No Top-Performing Events Yet</h3>
              {/* <p className="text-gray-500 text-sm max-w-md mx-auto">
                Event performance data will appear here once events are created and attended.
              </p> */}
            </div>
          )}
        </div>

        {/* Event Booking Rate Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Event Booking Rate</h2>
            <div className="relative">
              <button className="flex items-center text-sm border rounded-lg px-3 py-1">
                {timeFilter} <ChevronDown className="ml-2 h-4 w-4" />
              </button>
              <div className="absolute right-0 mt-1 bg-white border rounded-lg shadow-lg hidden">
                <div className="py-1">
                  <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">7 Last Days</button>
                  <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Monthly</button>
                  <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Yearly</button>
                </div>
              </div>
            </div>
          </div>
          
          {hasData ? (
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
            <div className="text-center py-6">
              <div className="w-50 rounded-full flex items-center justify-center mb-4">
                  <Image 
                    src="/Empty.png"
                    alt="No signups yet"
                    width={134}
                    height={89}
                    className="w-full h-full text-white" />

                </div>
              <h3 className="text-lg font-medium mb-2">No Event Bookings Yet</h3>
              {/* <p className="text-gray-500 text-sm max-w-md mx-auto">
                Event performance data will appear here once events are created and attended.
              </p> */}
            </div>
          
        
          )}
        </div>
      </div>
      
      {/* Button to toggle empty state (for demo purposes only) */}
      <button 
        onClick={toggleDataState} 
        className="mt-8 px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Toggle Empty State (Demo)
      </button>
    </div>
  );
}