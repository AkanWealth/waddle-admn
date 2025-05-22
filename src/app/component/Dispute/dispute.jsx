"use client";

import React, { useState, useEffect } from "react";
import { Search, Filter, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import DisputeTable from "./DisputeRender";

export default function DisputeManagement() {
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(4);

    // Search and filter states
    const [searchTerm, setSearchTerm] = useState("");
    const [statusOpen, setStatusOpen] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState([]);
    const [dateFilter, setDateFilter] = useState({ from: "", to: "" });
    
    // Mobile responsive states
    const [mobileView, setMobileView] = useState(false);

    // Status options
    const statusOptions = ["All", "In Review", "Resolved", "Closed", "Active", "Pending", "Inactive"];

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
    const handleStatusChange = (status) => {
        setStatusFilter(status);
        setStatusOpen(false);
        setCurrentPage(1); // Reset to first page when filtering
    };

    // Handle date filter change
    const handleDateChange = (type, value) => {
        setDateFilter({ ...dateFilter, [type]: value });
        setCurrentPage(1); // Reset to first page when filtering
    };

    // Apply filters
    const applyFilters = () => {
        setFilterOpen(false);
        // Logic for applying filters would update the data in the respective tables
    };

    // Reset filters
    const resetFilters = () => {
        setStatusFilter([]);
        setDateFilter({ from: "", to: "" });
    };

    // Check window size for responsive design
    useEffect(() => {
        const handleResize = () => {
            setMobileView(window.innerWidth < 768);
        };

        // Initial check
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div >
            <div className="font-inter mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Dispute Management</h1>
                <p className="text-gray-500">Review, respond, and take action on vendor-escalated disputes.</p>
            </div>

            {/* Main content */}
            <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Dispute History Log</h2>

                    {/* Search and Filter Section */}
                    <div className="flex flex-wrap justify-end gap-4 mb-6">
                        {/* Search Input */}
                        <div className="relative flex-grow max-w-md">
                            <input
                                type="text"
                                placeholder="Search by Dispute ID, Event Name, Customer Name, Vendor Name"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                        </div>
                        <div className="flex items-center space-x-2">
                            {/* Filter Button */}
                            <div className="relative">
                                <button
                                    className="flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg text-gray-700"
                                    onClick={() => setFilterOpen(!filterOpen)}
                                >
                                    <Filter className="w-4 h-4 mr-2" />
                                    <span>Filter</span>
                                    <ChevronDown className="ml-2 w-4 h-4" />
                                </button>

                                {filterOpen && (
                                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-10 p-4">
                                        <h3 className="font-medium text-gray-700 mb-3">Filter by Status</h3>
                                        <div className="space-y-2 mb-4">
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
                                                        onChange={() => {
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
                                                        }}
                                                        className="form-checkbox rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3"
                                                    />
                                                    <span className="text-gray-700">{status}</span>
                                                </label>
                                            ))}
                                        </div>
                                        
                                        <h3 className="font-medium text-gray-700 mb-3">Filter by Date</h3>
                                        <div className="space-y-2 mb-4">
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1">From</label>
                                                <input
                                                    type="date"
                                                    value={dateFilter.from}
                                                    onChange={(e) => handleDateChange("from", e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1">To</label>
                                                <input
                                                    type="date"
                                                    value={dateFilter.to}
                                                    onChange={(e) => handleDateChange("to", e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex justify-between">
                                            <button
                                                onClick={resetFilters}
                                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                            >
                                                Reset
                                            </button>
                                            <button
                                                onClick={applyFilters}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                            >
                                                Apply
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Table Content */}
                    <div className="overflow-x-auto">
                        <DisputeTable
                            currentPage={currentPage}
                            searchTerm={searchTerm}
                            statusFilter={statusFilter}
                            dateFilter={dateFilter}
                            mobileView={mobileView}
                        />
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-center space-x-2 mt-6">
                        <button 
                            className="flex items-center justify-center w-8 h-8 rounded-full border"
                            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => handlePageChange(i + 1)}
                                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                                    currentPage === i + 1
                                        ? "bg-blue-600 text-white"
                                        : "text-gray-700 hover:bg-gray-100"
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        
                        <button 
                            className="flex items-center justify-center w-8 h-8 rounded-full border"
                            onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}