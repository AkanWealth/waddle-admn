"use client";
import { useState, useEffect } from "react";
import { Calendar, ArrowBigUpDash } from "lucide-react";
import { useToastContext } from "@/context/toast";
import UserActivity from "./UserActivity";
import Events from "./Events";
import analyticsService from "@/utils/analyticsService";

// Mock dashboard data for CSV export (replace with real data source)
const mockDashboardData = {
  userStats: [
    {
      type: "total_users",
      title: "Total Users",
      count: 0,
      change: "0%",
      isPositive: true
    },
    {
      type: "parents",
      title: "Parents",
      count: 0,
      change: "0%",
      isPositive: true
    },
    {
      type: "organisers",
      title: "Event Organisers",
      count: 0,
      change: "0%",
      isPositive: true
    },
    {
      type: "inactive",
      title: "Inactive Users",
      count: 0,
      change: "0%",
      isPositive: true
    }
  ],
  monthlyData: [
    { name: "Jan", parents: 0, organizers: 0 },
    { name: "Feb", parents: 0, organizers: 0 },
    { name: "Mar", parents: 0, organizers: 0 },
    { name: "Apr", parents: 0, organizers: 0 },
    { name: "May", parents: 0, organizers: 0 },
    { name: "Jun", parents: 0, organizers: 0 },
    { name: "Jul", parents: 0, organizers: 0 },
    { name: "Aug", parents: 0, organizers: 0 },
    { name: "Sep", parents: 0, organizers: 0 },
    { name: "Oct", parents: 0, organizers: 0 },
    { name: "Nov", parents: 0, organizers: 0 },
    { name: "Dec", parents: 0, organizers: 0 }
  ],
  hasData: false,
  headings: {
    userStats: ["type", "title", "count", "change", "isPositive"],
    monthlyData: ["name", "parents", "organizers"]
  }
};

// Utility to convert dashboard data to CSV
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

// Function to trigger CSV download
function downloadCSV(data) {
  const csv = convertToCSV(data);
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "dashboard-data.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function Dashboard() {
  // Tab state
  const [activeTab, setActiveTab] = useState("User Activity");
  const {showMessage} = useToastContext();
  // const { toast } = useToastContext();

  
  // Date range state (would be connected to a date picker in a real app)
  const [dateRange, setDateRange] = useState({
    startDate: "May 1, 2025",
    endDate: "May 7, 2025"
  });

  // Function to handle export report
  const handleExport = async () => {
    console.log("Exporting report...");
    showMessage("Report Exported", " Your report as been exported as a pdf file", "success");
    try {
      const response = await analyticsService.exportReport(dateRange.startDate, dateRange.endDate);
      console.log(response);
      if (response.success) {
        showMessage("Report Exported", " Your report as been exported as a pdf file", "success");
        downloadCSV(response.data)

      } else {
        showMessage("Error", response.error, "error");
      }
   
    // In a real app, this would trigger an API call to generate a report
  } catch(error) {
    console.log(error);
    showMessage("Error", error.message, "error");
  }
  };

  return (
    <div className="font-inter flex flex-col">
      {/* Dashboard header */}
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="font-inter text-xl md:text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
          <p className="text-gray-500 text-sm">View and manage platform activities here</p>
        </div>

        {/* Date range and export */}
        <div className="flex flex-col sm:flex-row lg:justify-end gap-4">
          <div className="flex items-center border border-gray-300 rounded-lg bg-white px-2 max-w-md">
            {/* <Calendar className="w-4 h-4 text-blue-700 mr-2" /> */}
            <span className="text-xs text-gray-600 mr-1">From:</span>
            <input
              type="date"
              className="text-sm text-gray-800 mr-3 border rounded px-1"
              value={dateRange.startDate ? new Date(dateRange.startDate).toISOString().split('T')[0] : ''}
              onChange={e => setDateRange(dr => ({ ...dr, startDate: e.target.value }))}
            />
            <span className="text-xs text-gray-600 mr-1">To:</span>
            <input
              type="date"
              className="text-sm text-gray-800 border rounded px-1"
              value={dateRange.endDate ? new Date(dateRange.endDate).toISOString().split('T')[0] : ''}
              onChange={e => setDateRange(dr => ({ ...dr, endDate: e.target.value }))}
            />
          </div>
          <button 
            onClick={handleExport}
            className="flex items-center justify-center bg-blue-800 text-white rounded-lg p-2 px-4 hover:bg-blue-700 transition-colors"
          >
            <ArrowBigUpDash className="h-5 w-5 mr-2" />
            <span>Export Report</span>
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