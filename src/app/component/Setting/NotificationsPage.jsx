"use client";

import { useState } from "react";
import { Search, Bell, AlertTriangle, MessageSquare, Calendar, Mail, Phone, Filter, ChevronDown } from "lucide-react";
import NotificationTable from "./EventCancellationTable";
import PaginationComponent from "../Element/PaginationComponent";

export default function NotificationsPage({ 
    notificationSettings, 
    setNotificationSettings, 
    mobileView 
}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [statusFilter, setStatusFilter] = useState([]);
    const [dateFilter, setDateFilter] = useState({ from: "", to: "" });
    const [filterOpen, setFilterOpen] = useState(false);

    // Status options for notifications
    const statusOptions = ["All", "Cancelled", "Notified", "Pending"];

    // Handle notification toggle
    const handleNotificationToggle = (setting) => {
        setNotificationSettings(prev => ({
            ...prev,
            [setting]: !prev[setting]
        }));
    };

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page when searching
    };

    // Handle status filter change
    const handleStatusFilterChange = (status) => {
        if (status === "All") {
            setStatusFilter([]);
        } else {
            if (statusFilter.includes(status)) {
                setStatusFilter(statusFilter.filter(s => s !== status));
            } else {
                setStatusFilter([
                    ...statusFilter.filter(s => s !== "All"),
                    status,
                ]);
            }
        }
        setCurrentPage(1);
    };

    // Handle date filter change
    const handleDateFilterChange = (field, value) => {
        setDateFilter(prev => ({
            ...prev,
            [field]: value
        }));
        setCurrentPage(1);
    };

    // Apply filters
    const applyFilters = () => {
        setFilterOpen(false);
        // The filters will be automatically applied through props to NotificationTable
    };

    // Reset filters
    const resetFilters = () => {
        setStatusFilter([]);
        setDateFilter({ from: "", to: "" });
        setCurrentPage(1);
    };

    // Clear all filters including search
    const clearAllFilters = () => {
        setSearchTerm("");
        setStatusFilter([]);
        setDateFilter({ from: "", to: "" });
        setCurrentPage(1);
    };

    // Callback to update total pages from NotificationTable
    const handleTotalPagesUpdate = (totalPages) => {
        setTotalPages(totalPages);
    };

    return (
        <div className="space-y-8">
            {/* Notification Settings */}
            <div className="max-w-xl bg-white shadow-md rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Notification Settings</h3>
                <div className="space-y-6">
                    <div className="flex items-center justify-between py-4 border-b border-gray-100">
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-200 mr-2">
    <Bell className="w-5 h-5 text-blue-600" />
  </div>
                            <div>
                                <h4 className="text-base font-medium text-gray-800">Automatically Notify Parents</h4>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={notificationSettings.autoNotifyParents}
                                onChange={() => handleNotificationToggle("autoNotifyParents")}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between py-4 border-b border-gray-100">
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-200 mr-2">
    <Bell className="w-5 h-5 text-blue-600" />
  </div>
                            <div>
                                <h4 className="text-base font-medium text-gray-800">Include Refund Policy in Notifications</h4>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={notificationSettings.includeRefundPolicy}
                                onChange={() => handleNotificationToggle("includeRefundPolicy")}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between py-4">
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-200 mr-2">
    <Bell className="w-5 h-5 text-blue-600" />
  </div>
                            <div>
                                <h4 className="text-base font-medium text-gray-800">Allow Admin to Customize Messages Before Sending</h4>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={notificationSettings.allowAdminCustomize}
                                onChange={() => handleNotificationToggle("allowAdminCustomize")}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                </div>
            </div>

            {/* Event Cancellation Notifications */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Event Cancellation Notifications</h3>
                
                {/* Search and Filter Section */}
                <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                    {/* Search Input */}
                    <div className="relative flex-grow max-w-md">
                        <input
                            type="text"
                            placeholder="By Event Name, Organiser, Date"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                    </div>

                    {/* Filter Section */}
                    <div className="flex items-center space-x-2">
                        {/* Filter Button */}
                        <div className="relative">
                            <button
                                className="flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg text-gray-700 min-w-[120px]"
                                onClick={() => setFilterOpen(!filterOpen)}
                            >
                                <Filter className="w-4 h-4 mr-2 text-gray-600" />
                                <span>Filter</span>
                                <ChevronDown className="ml-2 w-4 h-4" />
                            </button>

                            {filterOpen && (
                                <div className="absolute right-0 mt-1 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-10 p-4">
                                    <form
                                        onSubmit={e => {
                                            e.preventDefault();
                                            applyFilters();
                                        }}
                                    >
                                        {/* Status Filter */}
                                        <div className="mb-4">
                                            <h4 className="font-medium text-gray-700 mb-3">Status</h4>
                                            <div className="space-y-2">
                                                {statusOptions.map((status) => (
                                                    <label
                                                        key={status}
                                                        className="flex items-center px-2 py-2 rounded hover:bg-gray-50 cursor-pointer"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={
                                                                status === "All"
                                                                    ? statusFilter.length === 0
                                                                    : statusFilter.includes(status)
                                                            }
                                                            onChange={() => handleStatusFilterChange(status)}
                                                            className="form-checkbox rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3"
                                                        />
                                                        <span className="text-gray-700">{status}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Date Range Filter */}
                                        <div className="mb-4">
                                            <h4 className="font-medium text-gray-700 mb-3">Filter by Date</h4>
                                            <div className="space-y-2">
                                                <div>
                                                    <label className="block text-sm text-gray-600 mb-1">From</label>
                                                    <input
                                                        type="date"
                                                        value={dateFilter.from}
                                                        onChange={(e) => handleDateFilterChange("from", e.target.value)}
                                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm text-gray-600 mb-1">To</label>
                                                    <input
                                                        type="date"
                                                        value={dateFilter.to}
                                                        onChange={(e) => handleDateFilterChange("to", e.target.value)}
                                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-between gap-2">
                                            <button
                                                type="button"
                                                onClick={resetFilters}
                                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                            >
                                                Reset
                                            </button>
                                            <div className="flex gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setFilterOpen(false)}
                                                    className="border border-[#2853A6] text-blue-700 px-5 py-1.5 rounded-md font-medium bg-white"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="bg-[#2853A6] text-white px-5 py-1.5 rounded-md font-medium"
                                                >
                                                    Apply
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>

                        {/* Clear All Button */}
                        {(statusFilter.length > 0 || dateFilter.from || dateFilter.to || searchTerm) && (
                            <button
                                onClick={clearAllFilters}
                                className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg"
                            >
                                Clear All
                            </button>
                        )}
                    </div>
                </div>

                {/* Notification Table */}
                <NotificationTable
                    currentPage={currentPage}
                    searchTerm={searchTerm}
                    statusFilter={statusFilter}
                    dateFilter={dateFilter}
                    mobileView={mobileView}
                    onTotalPagesUpdate={handleTotalPagesUpdate}
                />

                {/* Pagination */}
                <div className="mt-6">
                    <PaginationComponent
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
}