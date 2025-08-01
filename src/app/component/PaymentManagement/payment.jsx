
"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useToastContext } from "@/context/toast";
import { Search, Plus, Trash2, Filter, ChevronDown, Menu, X } from "lucide-react";
import VendorsPaymentTable from "./VendorPayment";
import TransactionTable from "./Transaction";

import PaginationComponent from "../Element/PaginationComponent";
// import CreateAdminUserModal from "../ModalPages/Users/Admin/CreateAdminModal";

export default function Payment() {
    // State for active tab
    const [activeTab, setActiveTab] = useState("Transaction");
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(2);
    
    // Search and filter states
    const [searchTerm, setSearchTerm] = useState("");
    const [filterOpen, setFilterOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState([]);
    const [dateFilter, setDateFilter] = useState({ from: "", to: "" });
    const [isCreateAdminModalOpen, setIsCreateAdminModalOpen] = useState(false);
    const { showMessage } = useToastContext();
    
    // Mobile responsive states
    const [mobileView, setMobileView] = useState(false);

    // Define status options for each tab
    const statusOptions = {
        "Transaction": ["Successful", "Pending", "Cancelled", "Failed", "Refunded"],
        "vendorPayment": ["Completed", "Pending", "Overdue"],
        // "Admin Users": ["Active", "Inactive", "Pending"]
    };

    // Get current status options based on active tab
    const getCurrentStatusOptions = () => {
        return statusOptions[activeTab] || [];
    };

    // Handle tab change
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setCurrentPage(1);
        setStatusFilter([]); // Reset status filter when changing tabs
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
    const handleStatusChange = (status) => {
        if (statusFilter.includes(status)) {
            setStatusFilter(statusFilter.filter(item => item !== status));
        } else {
            setStatusFilter([...statusFilter, status]);
        }
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
    const handleAdminUserSuccess = (userData) => {
    console.log('Admin user created/updated successfully:', userData);
    showMessage("Success", "Admin user created/updated successfully", "success");
    setIsCreateAdminModalOpen(false);

    
};


    // Reset filters
    const resetFilters = () => {
        setStatusFilter([]);
        setDateFilter({ from: "", to: "" });
    };
// useEffect(() => {
//         // Call the API when the component mounts
//         axios.get("http://16.171.113.84/api/v1/users/all")
//             .then(response => {
//                 console.log("API response:", response.data); // See the response in your browser console
//                 // You can also set it to state if you want to display it
//                 // setUsers(response.data);
//             })
//             .catch(error => {
//                 console.error("API error:", error);
//             });
//     }, []);
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
        <><div>
            <div className="font-inter flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
                <div className="gap-4 grid grid-cols-1 items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Payment Management</h1>
                    <p className="text-gray-500">View and manage all payment details here</p>
                </div>
               
            </div>

            {/* Main content */}
            <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">All {activeTab}</h2>

                    {/* Tabs and Search/Filter */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-5 px-2 rounded-lg">
                        {/* Tabs - always visible, even on mobile */}
                        <div className="flex mb-4 lg:mb-0 border-1 rounded-lg border-gray-200 px-2 overflow-x-auto">
                            {["Transaction", "Vendor Payment"].map((tab) => (
                                <button
                                    key={tab}
                                    className={`mr-4 md:mr-8 py-2 text-xs md:text-sm whitespace-nowrap ${activeTab === tab
                                            ? "border-b-2 border-blue-500 text-blue-600 font-medium"
                                            : "text-gray-500"}`}
                                    onClick={() => handleTabChange(tab)}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Search and Filter */}
                        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
                            <div className="relative w-full md:w-64">
                                <input
                                    type="text"
                                    placeholder={`Search for ${activeTab.toLowerCase()}...`}
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                            </div>
                            <div className="relative w-full md:w-auto">
                                <button
                                    className="flex items-center justify-center border border-gray-300 rounded-lg px-4 py-2 w-full md:w-auto"
                                    onClick={() => setFilterOpen(!filterOpen)}
                                >
                                    <Filter className="w-4 h-4 mr-2 text-gray-600" />
                                    <span className="text-gray-600">Filter</span>
                                    <ChevronDown className="h-4 w-4 text-gray-600 ml-2" />
                                </button>

                                {/* Filter dropdown */}
                                {filterOpen && (
                                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-10 p-4">
                                        <h3 className="font-medium text-gray-700 mb-3">Filter by Status</h3>
                                        <div className="space-y-2 mb-4">
                                            {getCurrentStatusOptions().map((status) => (
                                                <label key={status} className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={statusFilter.includes(status)}
                                                        onChange={() => handleStatusChange(status)}
                                                        className="rounded text-blue-600 mr-2" />
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
                                                    className="w-full p-2 border border-gray-300 rounded" />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1">To</label>
                                                <input
                                                    type="date"
                                                    value={dateFilter.to}
                                                    onChange={(e) => handleDateChange("to", e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded" />
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

                    {/* Render the appropriate table based on active tab */}
                    <div className="overflow-x-auto">
                        {activeTab === "Transaction" && (
                            <TransactionTable
                                currentPage={currentPage}
                                searchTerm={searchTerm}
                                statusFilter={statusFilter}
                                dateFilter={dateFilter}
                                mobileView={mobileView} />
                        )}
                        {activeTab === "Vendor Payment" && (
                            <VendorsPaymentTable
                                currentPage={currentPage}
                                searchTerm={searchTerm}
                                statusFilter={statusFilter}
                                dateFilter={dateFilter}
                                mobileView={mobileView} />
                        )}
                        
                    </div>

                    {/* Pagination */}
                    <PaginationComponent
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange} />
                </div>
            </div>
        </div>

        </>
    );
}