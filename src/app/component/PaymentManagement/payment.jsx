
"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useToastContext } from "@/context/toast";
import { Search, Plus, Trash2, Filter, ChevronDown, Menu, X, XIcon } from "lucide-react";
import VendorsPaymentTable from "./VendorPayment";
import TransactionTable from "./Transaction";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import { CalendarDays, Calendar } from "lucide-react";


import PaginationComponent from "../Element/PaginationComponent";
import StatusDropdown from "./StatusDropdown";
import { usePermissions } from "@/hooks/usePermissions";
import { ViewGuard } from "@/components/PermissionGuard";
// import CreateAdminUserModal from "../ModalPages/Users/Admin/CreateAdminModal";

export default function Payment() {
    // State for active tab
    const [activeTab, setActiveTab] = useState("Transaction");
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    
    // Search and filter states
    const [searchTerm, setSearchTerm] = useState("");
    const [filterOpen, setFilterOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState([]);
    const [dateFilter, setDateFilter] = useState({ from: "", to: "" });
    const [isCreateAdminModalOpen, setIsCreateAdminModalOpen] = useState(false);
    const { showMessage } = useToastContext();
    const [paymentStatus, setPaymentStatus] = useState("");
    const [bookingStatus, setBookingStatus] = useState("");
    const [searchInput, setSearchInput] = useState("");

useEffect(() => {
  const delayDebounce = setTimeout(() => {
    setSearchTerm(searchInput); // Only update after delay
    setCurrentPage(1); // Reset pagination on new search
  }, 500); // 500ms debounce

  return () => clearTimeout(delayDebounce); // Cleanup on new keystroke
}, [searchInput]);

const handleSearchChange = (e) => {
  console.log("Typing:", e.target.value);
  setSearchInput(e.target.value);
};    
    // Mobile responsive states
    const [mobileView, setMobileView] = useState(false);

    // Get user permissions
    const { canView: canViewPayments } = usePermissions();

    // Define status options for each tab
    const statusOptions = {
        "Transaction": ["SUCCESSFUL", "PENDING", "FAILED", "REFUNDED"],
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
    // const handleSearchChange = (e) => {
    //     console.log('Search term change:', e.target.value);
    //     setSearchTerm(e.target.value);
    //     setCurrentPage(1); // Reset to first page when searching
    // };

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
        console.log('Date filter change:', { type, value });
        setDateFilter({ ...dateFilter, [type]: value });
        setCurrentPage(1); // Reset to first page when filtering
    };

    // Apply filters
    const applyFilters = () => {
        setFilterOpen(false);
        // Logic for applying filters would update the data in the respective tables
    };
    
    // Handle pagination update from Transaction component
    const handlePaginationUpdate = (pagination) => {
        setTotalPages(pagination.totalPages);
        setTotalItems(pagination.total);
    };

    // Reset filters
    const resetFilters = () => {
        setStatusFilter([]);
        setDateFilter({ from: "", to: "" });
    };

    // Handle apply filter button click
    const handleApply = () => {
        // Convert dropdown values to statusFilter array format
        const newStatusFilter = [];
        if (paymentStatus) {
            newStatusFilter.push(paymentStatus.toUpperCase());
        }
        if (bookingStatus) {
            // Map booking status to correct backend format
            let mappedBookingStatus;
            switch (bookingStatus) {
                case "No Booking":
                    mappedBookingStatus = "FAILED";
                    break;
                case "Successful":
                    mappedBookingStatus = "SUCCESSFUL";
                    break;
                case "Cancelled":
                    mappedBookingStatus = "CANCELLED";
                    break;
                default:
                    mappedBookingStatus = bookingStatus.toUpperCase();
            }
            newStatusFilter.push(mappedBookingStatus);
        }
        
        console.log('Applying filters:', { paymentStatus, bookingStatus, newStatusFilter, dateFilter });
        
        setStatusFilter(newStatusFilter);
        setFilterOpen(false);
        setCurrentPage(1); // Reset to first page when applying filters
    };

    // Handle clear filter button click
    const handleClear = () => {
        console.log('Clearing all filters');
        setPaymentStatus("");
        setBookingStatus("");
        setDateFilter({ from: "", to: "" });
        setStatusFilter([]);
        setFilterOpen(false);
        setCurrentPage(1); // Reset to first page when clearing filters
    };

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
            <ViewGuard module="payment">
                <div className="bg-white rounded-lg shadow-sm">
                    <div className="p-6">
                        <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">All {activeTab}</h2>

                    {/* Tabs and Search/Filter */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-5 px-2 rounded-lg">
                        {/* Tabs - always visible, even on mobile */}
                        {/* <div className="flex mb-4 lg:mb-0 border-1 rounded-lg border-gray-200 px-2 overflow-x-auto">
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
                        </div> */}

                        {/* Search and Filter */}
                        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
                            <div className="relative w-full md:w-64">
                                {/* <input
                                    type="text"
                                    placeholder="Search by transaction ID, user name, event name..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="w-full pl-10 pr-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" /> */}
                                    <input
  type="text"
  placeholder="Search by transaction ID, user name, event name..."
  value={searchInput}
  onChange={handleSearchChange}
  className="w-full pl-10 pr-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

                                <Search className="absolute left-3 top-2.5 text-black w-5 h-5" />
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
                                    <div className="absolute right-0 mt-2 w-[450px] text-black bg-white rounded-lg shadow-lg border border-gray-200 z-10 p-4">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-[#303237] font-semibold text-[18px]">Filter By</h3>
                                            <XIcon className="h-[20.5px] w-[20.5px] cursor-pointer" onClick={() => setFilterOpen(!filterOpen)} />
                                        </div>
                                        <div className="my-[30px] flex flex-col gap-[24px]">
                                             {/* <div className="flex flex-col gap-2">
                                                 <label className="block text-sm text-[#303237] mb-1 font-medium">Start Date</label>
                                                 <input
                                                     type="date"
                                                     value={dateFilter.from}
                                                     onChange={(e) => handleDateChange("from", e.target.value)}
                                                     className="w-full p-2 border border-gray-300 rounded" />
                                             </div>
                                             <div className="flex flex-col gap-2">
                                                 <label className="block text-sm text-[#303237] mb-1 font-medium">End Date</label>
                                                 <input
                                                     type="date"
                                                     value={dateFilter.to}
                                                     onChange={(e) => handleDateChange("to", e.target.value)}
                                                     className="w-full p-2 border border-gray-300 rounded" />
                                             </div> */}
                                             {/* From Date */}
<div className="flex items-center border border-gray-300 rounded-lg bg-white px-3 py-2">
  <CalendarDays className="w-4 h-4 text-blue-700 mr-2" />
  <span className="text-xs text-gray-600 mr-2">From:</span>
  <DatePicker
    selected={dateFilter.from ? new Date(dateFilter.from) : null}
    onChange={(date) =>
      handleDateChange("from", dayjs(date).format("YYYY-MM-DD"))
    }
    maxDate={dayjs().add(1, "day").toDate()} // cap at tomorrow
    dateFormat="MMM dd, yyyy"
    className="text-sm text-gray-800 border-none bg-transparent focus:outline-none cursor-pointer min-w-[100px]"
    placeholderText="Select start date"
    showPopperArrow={false}
    popperClassName="event-datepicker"
  />
</div>

{/* To Date */}
<div className="flex items-center border border-gray-300 rounded-lg bg-white px-3 py-2">
  <Calendar className="w-4 h-4 text-green-700 mr-2" />
  <span className="text-xs text-gray-600 mr-2">To:</span>
  <DatePicker
    selected={dateFilter.to ? new Date(dateFilter.to) : null}
    onChange={(date) =>
      handleDateChange("to", dayjs(date).format("YYYY-MM-DD"))
    }
    maxDate={dayjs().add(1, "day").toDate()} // prevent selecting beyond tomorrow
    minDate={dateFilter.from ? new Date(dateFilter.from) : null}
    dateFormat="MMM dd, yyyy"
    className="text-sm text-gray-800 border-none bg-transparent focus:outline-none cursor-pointer min-w-[100px]"
    placeholderText="Select end date"
    showPopperArrow={false}
    popperClassName="event-datepicker"
  />
</div>

                                             <div className="flex flex-col gap-3">
                                                <label className="block text-sm font-medium text-gray-700">Payment Status</label>
                                                <StatusDropdown usedFor="payment" value={paymentStatus} onChange={setPaymentStatus} />
                                            </div>
                                            <div className="flex flex-col gap-3">
                                                <label className="block text-sm font-medium text-gray-700">Booking Status</label>
                                                <StatusDropdown usedFor="booking"  value={bookingStatus} onChange={setBookingStatus}  />
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center gap-4 mt-6 flex-col">
                                            <button
                                                onClick={handleApply}
                                                className="bg-[#2853A6] hover:bg-[#1e3d7a] text-white font-medium py-2 px-4 rounded-xl w-full transition-colors">Apply Filter
                                            </button>
                                            <button onClick={handleClear}   className="border border-[#CC0000] text-[#CC0000] hover:bg-[#CC0000] hover:text-white font-medium py-2 px-4 rounded-xl w-full transition-colors">
                                                Clear
                                            </button>
                                        </div>
                                            

                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    </div>

                    {/* Render the appropriate table based on active tab */}
                    <div className="overflow-x-auto">
                        {/* Debug logging */}
                        {console.log('TransactionTable props:', { currentPage, searchTerm, statusFilter, dateFilter, paymentStatus, bookingStatus })}
                        
                        {/* {activeTab === "Transaction" && ( */}
                            <TransactionTable
                                currentPage={currentPage}
                                searchTerm={searchTerm}
                                statusFilter={statusFilter}
                                dateFilter={dateFilter}
                                paymentStatus={paymentStatus}
                                bookingStatus={bookingStatus}
                                mobileView={mobileView}
                                onPaginationUpdate={handlePaginationUpdate} />
                        {/* )} */}
                        {/* {activeTab === "Vendor Payment" && (
                            <VendorsPaymentTable
                                currentPage={currentPage}
                                searchTerm={searchTerm}
                                statusFilter={statusFilter}
                                dateFilter={dateFilter}
                                mobileView={mobileView} />
                        )} */}
                        
                    </div>

                    {/* Pagination */}
                    <PaginationComponent
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange} />
                </div>
                </div>
            </ViewGuard>
        </div>

        </>
    );
}