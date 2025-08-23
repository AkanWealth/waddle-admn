"use client";

import React, { useState, useEffect } from "react";
import { Search, Bell, AlertTriangle, MessageSquare, Calendar, Mail, Phone, Filter, ChevronDown } from "lucide-react";
import NotificationTable from "./EventCancellationTable";
import PaginationComponent from "../Element/PaginationComponent";
import { eventService } from "@/utils/eventService";

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
    const [loading, setLoading] = useState(false);
    const [events, setEvents] = useState([]);
    const [totalEvents, setTotalEvents] = useState(0);

    // Status options for notifications - only two states based on isCancelled
    const statusOptions = [ "Notified", "Not Notified"];

    // Fetch cancelled events
    const fetchCancelledEvents = async () => {
        setLoading(true);
        try {
            // Determine isCancelled parameter based on status filter
            let isCancelledParam;
            if (statusFilter.length > 0) {
                if (statusFilter.includes("Notified")) {
                    isCancelledParam = true; // Users are notified
                } else if (statusFilter.includes("Not Notified")) {
                    isCancelledParam = false; // Users are NOT notified
                }
                // If neither is selected, don't send isCancelled parameter
            }

            const response = await eventService.viewAllCancelledEventAsAdmin(
                currentPage,
                10, // limit
                searchTerm || undefined,
                isCancelledParam, // true for notified, false for not notified, undefined for both
                dateFilter.from || undefined,
                dateFilter.to || undefined
            );

            if (response.success && response.data) {
                setEvents(response.data.events || []);
                setTotalEvents(response.data.total || 0);
                setTotalPages(response.data.totalPages || 1);
            } else {
                console.error("Failed to fetch cancelled events:", response.error);
                setEvents([]);
                setTotalEvents(0);
                setTotalPages(1);
            }
        } catch (error) {
            console.error("Error fetching cancelled events:", error);
            setEvents([]);
            setTotalEvents(0);
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    };

    // Fetch events when dependencies change
    useEffect(() => {
        fetchCancelledEvents();
    }, [currentPage, searchTerm, statusFilter, dateFilter]);

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
        if (statusFilter.includes(status)) {
            // If clicking the same status, clear the filter
            setStatusFilter([]);
        } else {
            // Replace with new status (only one at a time)
            setStatusFilter([status]);
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

    // Transform events data to match the table format
    const transformedEvents = events.map(event => ({
        id: event.id,
        eventName: event.name,
        organizer: event.organiser?.name || "Unknown",
        date: new Date(event.date).toLocaleDateString('en-GB'),
        bookedUsers: `${event.bookings?.length || 0} Parents`,
        status: event.isCancelled ? "Notified" : "Not Notified",
        actions: event.isCancelled ? "View Details" : "View & Notify",
        originalEvent: event // Keep original event data for modal
    }));

    // Since we're now doing server-side filtering, we can use the transformed events directly
    const filteredEvents = transformedEvents;

    return (
        <div className="space-y-8">
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
                            className="w-full pl-10 text-black pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                                            checked={statusFilter.includes(status)}
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

                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <span className="ml-2 text-gray-600">Loading events...</span>
                    </div>
                )}

                {/* Filter Summary */}
                {/* {!loading && (statusFilter.length > 0 || dateFilter.from || dateFilter.to) && (
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="text-sm text-blue-800">
                            <span className="font-medium">Active Filters:</span>
                            {statusFilter.length > 0 && (
                                <span className="ml-2">
                                    Status: <span className="font-semibold">{statusFilter[0]}</span>
                                </span>
                            )}
                            {dateFilter.from && (
                                <span className="ml-2">
                                    From: <span className="font-semibold">{dateFilter.from}</span>
                                </span>
                            )}
                            {dateFilter.to && (
                                <span className="ml-2">
                                    To: <span className="font-semibold">{dateFilter.to}</span>
                                </span>
                            )}
                        </div>
                    </div>
                )} */}

                {/* Notification Table */}
                {!loading && (
                    <NotificationTable
                        currentPage={currentPage}
                        searchTerm={searchTerm}
                        statusFilter={statusFilter}
                        dateFilter={dateFilter}
                        mobileView={mobileView}
                        onTotalPagesUpdate={handleTotalPagesUpdate}
                        events={filteredEvents}
                        totalEvents={totalEvents}
                    />
                )}

                {/* Pagination */}
                {!loading && totalPages > 1 && (
                    <div className="mt-6">
                        <PaginationComponent
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}