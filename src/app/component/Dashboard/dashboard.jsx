"use client";
import { useState, useEffect } from "react";
import { Calendar, ArrowBigUpDash, CalendarDays } from "lucide-react";
import { useToastContext } from "@/context/toast";
import UserActivity from "./UserActivity";
import Events from "./Events";
import analyticsService from "@/utils/analyticsService";
import { toast as reactToast, ToastContainer } from "react-toastify";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Utility to convert User Activity dashboard data to CSV
function convertToCSV({ userStats, monthlyData, headings }) {
  // User Stats
  const userStatsHeader = headings.userStats.join(",");
  const userStatsRows = userStats
    .map(stat => headings.userStats.map(h => stat[h]).join(","))
    .join("\n");

  // Monthly Data
  const monthlyDataHeader = headings.monthlyData.join(",");
  const monthlyDataRows = monthlyData
    .map(row => headings.monthlyData.map(h => row[h]).join(","))
    .join("\n");

  // Combine as two tables in one CSV (with a blank line between)
  return (
    userStatsHeader + "\n" +
    userStatsRows + "\n\n" +
    monthlyDataHeader + "\n" +
    monthlyDataRows
  );
}

// Utility to convert Events dashboard data to CSV
function convertEventToCSV({ eventStats, topEvents, bookingData, headings }) {
  // Event Stats
  const eventStatsHeader = headings.eventStats.join(",");
  const eventStatsRows = eventStats
    .map(stat => headings.eventStats.map(h => stat[h]).join(","))
    .join("\n");

  // Top Events
  const topEventsHeader = headings.topEvents.join(",");
  const topEventsRows = topEvents
    .map(row => headings.topEvents.map(h => row[h]).join(","))
    .join("\n");

  // Booking Data
  const bookingDataHeader = headings.bookingData.join(",");
  const bookingDataRows = bookingData
    .map(row => headings.bookingData.map(h => row[h]).join(","))
    .join("\n");

  // Combine as three tables in one CSV (with blank lines between)
  return (
    eventStatsHeader + "\n" +
    eventStatsRows + "\n\n" +
    topEventsHeader + "\n" +
    topEventsRows + "\n\n" +
    bookingDataHeader + "\n" +
    bookingDataRows
  );
}

// Function to trigger CSV download
function downloadCSV(data, filename = "dashboard-data.csv", converter = convertToCSV) {
  try {
    const csv = converter(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    return true;
  } catch (error) {
    console.error("Download failed:", error);
    return false;
  }
}

export default function Dashboard() {
  // Tab state
  const [activeTab, setActiveTab] = useState("User Activity");
  const {showMessage} = useToastContext();
  
  // Calculate max date (tomorrow)
  const maxDate = dayjs().add(1, 'day').toDate();
  
  // Date range state - defaults to January 1st of current year to tomorrow
  const [dateRange, setDateRange] = useState(() => {
    const currentYear = dayjs().year();
    const startDate = dayjs().year(currentYear).month(0).date(1); // January 1st of current year
    const endDate = maxDate; // Tomorrow (respecting the future date restriction)

    return {
      startDate: startDate.toDate(),
      endDate: endDate,
    };
  });

  // Handle start date change - allow any date selection up to tomorrow
  const handleStartDateChange = (newStartDate) => {
    setDateRange(prevRange => ({
      ...prevRange,
      startDate: newStartDate
    }));
  };

  // Handle end date change - allow any date selection up to tomorrow
  const handleEndDateChange = (newEndDate) => {
    setDateRange(prevRange => ({
      ...prevRange,
      endDate: newEndDate
    }));
  };

  // Function to handle export report
  const handleExport = async () => {
    try {
      console.log("Starting export...");
      // Convert back to the format your API expects
      const formattedStartDate = dayjs(dateRange.startDate).format("MMMM D, YYYY");
      const formattedEndDate = dayjs(dateRange.endDate).format("MMMM D, YYYY");
      if(activeTab=="User Activity"){
        const response = await analyticsService.exportReport(formattedStartDate, formattedEndDate);
        console.log("Export response:", response);
      
        if (response.success) {
          const downloadSuccess = downloadCSV(response.data, "user-dashboard-data.csv", convertToCSV);
          
          if (downloadSuccess) {
            showMessage("Report Exported", "Your report has been exported as a CSV file", "success");
          } else {
            showMessage("Download Failed", "The file download failed. Please try again.", "error");
          }
        

      } else {
        console.log("Showing error message...");
        showMessage("Error", response.error, "error");
      }
   
      } else{
        const response = await analyticsService.exportEventReport(formattedStartDate, formattedEndDate);
      console.log("Export response:", response);
      
      if (response.success) {
          const downloadSuccess = downloadCSV(response.data, "events-dashboard-data.csv", convertEventToCSV);
          
          if (downloadSuccess) {
            showMessage("Report Exported", "Your report has been exported as a CSV file", "success");
          } else {
            showMessage("Download Failed", "The file download failed. Please try again.", "error");
          }
        

      } else {
        console.log("Showing error message...");
        showMessage("Error", response.error, "error");
      }
   
      }
      
      
    } catch(error) {
      console.log("Caught error:", error);
      showMessage("Error", error.message, "error");
    }
  };

  return (
    <div className="font-inter flex flex-col">
      <ToastContainer />
      {/* Dashboard header */}
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="font-inter text-xl md:text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
          <p className="text-gray-500 text-sm">View and manage platform activities here</p>
        </div>

        {/* Date range and export */}
        <div className="flex flex-col sm:flex-row lg:justify-end gap-4">
          {/* From Date */}
          <div className="flex items-center border border-gray-300 rounded-lg bg-white px-3 py-2">
            <CalendarDays className="w-4 h-4 text-blue-700 mr-2" />
            <span className="text-xs text-gray-600 mr-2">From:</span>
            <DatePicker
              selected={dateRange.startDate}
              onChange={handleStartDateChange}
              maxDate={maxDate}
              dateFormat="MMM dd, yyyy"
              className="text-sm text-gray-800 border-none bg-transparent focus:outline-none cursor-pointer min-w-[100px]"
              placeholderText="Select start date"
              showPopperArrow={false}
              popperClassName="dashboard-datepicker"
            />
          </div>

          {/* To Date */}
          <div className="flex items-center border border-gray-300 rounded-lg bg-white px-3 py-2">
            <Calendar className="w-4 h-4 text-green-700 mr-2" />
            <span className="text-xs text-gray-600 mr-2">To:</span>
            <DatePicker
              selected={dateRange.endDate}
              onChange={handleEndDateChange}
              maxDate={maxDate}
              minDate={dateRange.startDate}
              dateFormat="MMM dd, yyyy"
              className="text-sm text-gray-800 border-none bg-transparent focus:outline-none cursor-pointer min-w-[100px]"
              placeholderText="Select end date"
              showPopperArrow={false}
              popperClassName="dashboard-datepicker"
            />
          </div>

          {/* Export Button */}
          <button 
            onClick={handleExport}
            className="flex items-center justify-center bg-blue-800 text-white rounded-lg p-2 px-4 hover:bg-blue-700 transition-colors"
          >
            <ArrowBigUpDash className="h-5 w-5 mr-2" />
            <span className="text-nowrap">Export Report</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white w-xs text-sm rounded-lg mb-6 border border-gray-300">
        <div className="font-inter flex">
          {["User Activity", "Events"].map((tab) => (
            <button
              key={tab}
              className={`font-inter py-3 px-8 text-center relative ${
                activeTab === tab
                  ? "text-blue-600 font-medium after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="shadow-sm">
        {activeTab === "User Activity" && <UserActivity dateRange={dateRange} />}
        {activeTab === "Events" && <Events dateRange={dateRange} />}
      </div>
    </div>
  );
}