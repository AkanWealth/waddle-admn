



"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useToastContext } from "@/context/toast";
import { Search, Plus, Trash2, Filter, ChevronDown, Menu, X } from "lucide-react";
import VendorsTable from "./vendors";
import GuardiansTable from "./guardian";
import AdminUsersTable from "./adminUser";
import PaginationComponent from "../Element/PaginationComponent";
import CreateAdminUserModal from "../ModalPages/Users/Admin/CreateAdminModal";
import { useRouter, useSearchParams } from 'next/navigation';
import DeletedUsers from "./DeletedUsers";
import { useRef } from "react";

export default function UserManagement() {
    // State for active tab
    const router = useRouter();
    const searchParams = useSearchParams();
    const tabFromUrl = searchParams.get('tab');
    const pageFromUrl = parseInt(searchParams.get('page'), 10);
    const [activeTab, setActiveTab] = useState(tabFromUrl || "Vendors");
    const [showDeletedUsers, setShowDeletedUsers] = useState(false);
    const [currentPage, setCurrentPage] = useState(pageFromUrl > 0 ? pageFromUrl : 1);
    
    // Search and filter states
    const [searchTerm, setSearchTerm] = useState("");
    const [filterOpen, setFilterOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState([]);
    const [dateFilter, setDateFilter] = useState({ from: "", to: "" });
    const [isCreateAdminModalOpen, setIsCreateAdminModalOpen] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const { showMessage } = useToastContext();
    
    // Mobile responsive states
    const [mobileView, setMobileView] = useState(false);

    // Add ref for filter dropdown
    const filterDropdownRef = useRef(null);

    // Define status options for each tab
    const statusOptions = {
        "Vendors": ["Approved", "Pending", "Rejected", "Suspended", "Inactive"],
        "Guardians": ["Active", "Inactive"],
        "Admin Users": ["Active", "Inactive", "Pending"]
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
        // Update URL
        const params = new URLSearchParams(window.location.search);
        params.set('tab', tab);
        params.set('page', '1');
        router.replace(`?${params.toString()}`);
    };

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Update URL
        const params = new URLSearchParams(window.location.search);
        params.set('tab', activeTab);
        params.set('page', String(pageNumber));
        router.replace(`?${params.toString()}`);
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
    setRefreshKey(prev => prev + 1);

    
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

    // Sync state with URL on mount
    useEffect(() => {
        if (tabFromUrl && tabFromUrl !== activeTab) setActiveTab(tabFromUrl);
        if (pageFromUrl && pageFromUrl !== currentPage) setCurrentPage(pageFromUrl);
    }, [tabFromUrl, pageFromUrl]);

    // Close filter dropdown on outside click
    useEffect(() => {
        if (!filterOpen) return;
        function handleClickOutside(event) {
            if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target)) {
                setFilterOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [filterOpen]);

    return (
        <><div>
            <div className="font-inter flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
                <div className="gap-4 grid grid-cols-1 items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
                    <p className="text-gray-500">View and manage your registered users here</p>
                </div>
                <div className="flex space-x-2 md:space-x-4 mt-4 md:mt-0">
                    <button
                        className="flex items-center bg-[#2853A6] text-white px-2 py-1 md:px-4 md:py-2 rounded-md text-sm md:text-base"
                        onClick={() => setIsCreateAdminModalOpen(true)}
                    >
                        <Plus className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
                        Add New User
                    </button>
                    <button onClick={() => setShowDeletedUsers(true)} className="flex items-center border border-red-500 text-red-500 px-2 py-1 md:px-4 md:py-2 rounded-md text-sm md:text-base">
                        <Trash2 className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
                        Deleted Users
                    </button>
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
                            {["Vendors", "Guardians", "Admin Users"].map((tab) => (
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
                                {filterOpen && activeTab !== "Vendors" && (
                                    <div ref={filterDropdownRef} className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-10 p-4">
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
                                {filterOpen && activeTab === "Vendors" && (
                                    <div ref={filterDropdownRef} className="absolute right-0 mt-2 w-[260px] bg-white rounded-[20px] shadow-lg border border-gray-200 z-10 ">
                                        {/* <h3 className="font-medium text-gray-700 mb-3">Filter by Status</h3> */}
                                        <div className="space-y-2 flex flex-col gap-2  mb-6">
                                            {getCurrentStatusOptions().map((status) => (
                                                <label key={status} className="flex items-center border-b border-gray-200 px-4 py-2.5">
                                                    <input
                                                        type="checkbox"
                                                        checked={statusFilter.includes(status)}
                                                        onChange={() => handleStatusChange(status)}
                                                        className="rounded text-blue-600 mr-2" />
                                                    <span className="text-gray-700">{status}</span>
                                                </label>
                                            ))}
                                        </div>

                                        <div className="flex justify-between items-center gap-5 rounded-[12px] px-5 pb-5">
                                                                                       <button
                                                onClick={applyFilters}
                                                className="px-4 py-2 bg-[#2853A6] flex-1 text-white rounded-md hover:bg-blue-700"
                                            >
                                                Apply
                                            </button>
                                            <button
                                                onClick={resetFilters}
                                                className="px-4 py-2 flex-1 text-[#2853A6] cursor-pointer border border-[#2853A6] rounded-[12px] hover:text-[#fff] hover:bg-[#2853A6]"
                                            >
                                                Cancel
                                            </button>

                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Render the appropriate table based on active tab */}
                    <div className="overflow-x-auto">
                        {activeTab === "Vendors" && (
                            <VendorsTable
                                key={`vendors-${refreshKey}`}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                                searchTerm={searchTerm}
                                statusFilter={statusFilter}
                                dateFilter={dateFilter}
                                mobileView={mobileView} />
                        )}
                        {activeTab === "Guardians" && (
                            <GuardiansTable
                                key={`guardians-${refreshKey}`}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                                searchTerm={searchTerm}
                                statusFilter={statusFilter}
                                dateFilter={dateFilter}
                                mobileView={mobileView} />
                        )}
                        {activeTab === "Admin Users" && (
                            <AdminUsersTable
                                key={`admin-${refreshKey}`}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                                searchTerm={searchTerm}
                                statusFilter={statusFilter}
                                dateFilter={dateFilter}
                                mobileView={mobileView} />
                        )}
                    </div>

                    {/* Pagination */}
                    
                </div>
            </div>
        </div>
        <CreateAdminUserModal
                isOpen={isCreateAdminModalOpen}
                onClose={() => setIsCreateAdminModalOpen(false)}
                onSuccess={handleAdminUserSuccess}

                 />
                 {showDeletedUsers && (
                    <DeletedUsers
                        onClose={() => setShowDeletedUsers(false)}
                        onUserRestored={() => {
                            setRefreshKey(prev => prev + 1);
                        }}
                    />
                 )}
        </>
    );
}