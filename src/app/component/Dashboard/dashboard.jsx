"use client";
import { useState, useEffect } from "react";
import { Calendar, ArrowBigUpDash } from "lucide-react";
import { useToastContext } from "@/context/toast";
import UserActivity from "./UserActivity";
import Events from "./Events";

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
  const handleExport = () => {
    console.log("Exporting report...");
    showMessage("Report Exported", " Your report as been exported as a pdf file", "success");

   
    // In a real app, this would trigger an API call to generate a report
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