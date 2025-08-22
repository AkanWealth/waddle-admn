// "use client";

// import React, { useState, useEffect } from "react";
// import { Search, Filter, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
// import DisputeTable from "./DisputeRender";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import dayjs from "dayjs";
// import { CalendarDays, Calendar } from "lucide-react";


// export default function DisputeManagement() {
//     // Pagination state
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);

//     // Search and filter states
//     const [searchTerm, setSearchTerm] = useState("");
//     const [statusOpen, setStatusOpen] = useState(false);
//     const [filterOpen, setFilterOpen] = useState(false);
//     const [statusFilter, setStatusFilter] = useState([]);
//     const [dateFilter, setDateFilter] = useState({ from: "", to: "" });
    
    
//     // Mobile responsive states
//     const [mobileView, setMobileView] = useState(false);

//     // Add a state to track if there is data
//     const [hasDisputeData, setHasDisputeData] = useState(false);
//     const [totalDisputes, setTotalDisputes] = useState(0);

//     // Status options
//     const statusOptions = ["All", "In Review", "Resolved","Pending"];

//     // Handle page change
//     const handlePageChange = (pageNumber) => {
//         setCurrentPage(pageNumber);
//     };

//     // Handle search input change
//     const handleSearchChange = (e) => {
//         setSearchTerm(e.target.value);
//         setCurrentPage(1); // Reset to first page when searching
//     };

//     // Handle status filter change
//     const handleStatusChange = (status) => {
//         setStatusFilter(status);
//         setStatusOpen(false);
//         setCurrentPage(1); // Reset to first page when filtering
//     };

//     // Handle date filter change
//     const handleDateChange = (type, value) => {
//         setDateFilter({ ...dateFilter, [type]: value });
//         setCurrentPage(1); // Reset to first page when filtering
//     };

//     // Apply filters
//     const applyFilters = () => {
//         setFilterOpen(false);
//         // Logic for applying filters would update the data in the respective tables
//     };

//     // Reset filters
//     const resetFilters = () => {
//         setStatusFilter([]);
//         setDateFilter({ from: "", to: "" });
//     };

//     // Update total pages when dispute data changes
//     useEffect(() => {
//         // Calculate total pages based on total disputes from server
//         const newTotalPages = Math.ceil(totalDisputes / 7);
//         setTotalPages(newTotalPages);
        
//         // Reset to page 1 if current page is greater than total pages
//         if (currentPage > newTotalPages && newTotalPages > 0) {
//             setCurrentPage(1);
//         }
//     }, [totalDisputes, currentPage]);

//     // Check window size for responsive design
//     useEffect(() => {
//         const handleResize = () => {
//             setMobileView(window.innerWidth < 768);
//         };

//         // Initial check
//         handleResize();

//         // Add event listener
//         window.addEventListener('resize', handleResize);

//         // Cleanup
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     return (
//         <div >
//             <div className="font-inter mb-6">
//                 <h1 className="text-2xl font-bold text-gray-800">Dispute Management</h1>
//                 <p className="text-gray-500">Review, respond, and take action on vendor-escalated disputes.</p>
//             </div>

//             {/* Main content */}
//             <div className="bg-white rounded-lg shadow-sm">
//                 <div className="p-6">
//                     <h2 className="text-xl font-semibold text-gray-800 mb-4">Dispute History Log</h2>

//                     {/* Search and Filter Section */}
//                     <div className="flex flex-wrap justify-end gap-4 mb-6">
//                         {/* Search Input */}
//                         <div className="relative flex-grow max-w-md">
//                             <input
//                                 type="text"
//                                 placeholder="Search by Dispute ID, Event Name, Customer Name, Vendor Name"
//                                 value={searchTerm}
//                                 onChange={handleSearchChange}
//                                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none text-black "
//                             />
//                             <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
//                         </div>
//                         <div className="flex items-center space-x-2">
//                             {/* Filter Button */}
//                             <div className="relative">
//                                 <button
//                                     className="flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg text-gray-700"
//                                     onClick={() => setFilterOpen(!filterOpen)}
//                                 >
//                                     <Filter className="w-4 h-4 mr-2" />
//                                     <span>Filter</span>
//                                     <ChevronDown className="ml-2 w-4 h-4" />
//                                 </button>

//                                 {filterOpen && (
//                                     <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-10 p-4">
//                                         <h3 className="font-medium text-gray-700 mb-3">Filter by Status</h3>
//                                         <div className="space-y-2 mb-4">
//                                             {statusOptions.map((status) => (
//                                                 <label
//                                                     key={status}
//                                                     className="flex items-center px-2 py-2 rounded hover:bg-gray-50 cursor-pointer"
//                                                 >
//                                                     <input
//                                                         type="checkbox"
//                                                         checked={
//                                                             status === "All"
//                                                                 ? statusFilter.length === 0
//                                                                 : statusFilter.includes(status)
//                                                         }
//                                                         onChange={() => {
//                                                             if (status === "All") {
//                                                                 setStatusFilter([]);
//                                                             } else {
//                                                                 if (statusFilter.includes(status)) {
//                                                                     setStatusFilter(statusFilter.filter(s => s !== status));
//                                                                 } else {
//                                                                     setStatusFilter([
//                                                                         ...statusFilter.filter(s => s !== "All"),
//                                                                         status,
//                                                                     ]);
//                                                                 }
//                                                             }
//                                                         }}
//                                                         className="form-checkbox rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3"
//                                                     />
//                                                     <span className="text-gray-700">{status}</span>
//                                                 </label>
//                                             ))}
//                                         </div>
                                        
//                                         <h3 className="font-medium text-gray-700 mb-3">Filter by Date</h3>
// <div className="space-y-3 mb-4">
//   {/* From Date */}
//   <div className="flex items-center border border-gray-300 rounded-lg bg-white px-3 py-2">
//     <CalendarDays className="w-4 h-4 text-blue-700 mr-2" />
//     <span className="text-xs text-gray-600 mr-2">From:</span>
//     <DatePicker
//       selected={dateFilter.from ? new Date(dateFilter.from) : null}
//       onChange={(date) =>
//         handleDateChange("from", dayjs(date).format("YYYY-MM-DD"))
//       }
//       maxDate={dayjs().add(1, "day").toDate()} // cap at tomorrow
//       dateFormat="MMM dd, yyyy"
//       className="text-sm text-gray-800 border-none bg-transparent focus:outline-none cursor-pointer min-w-[100px]"
//       placeholderText="Select start date"
//       showPopperArrow={false}
//       popperClassName="event-datepicker"
//     />
//   </div>

//   {/* To Date */}
//   <div className="flex items-center border border-gray-300 rounded-lg bg-white px-3 py-2">
//     <Calendar className="w-4 h-4 text-green-700 mr-2" />
//     <span className="text-xs text-gray-600 mr-2">To:</span>
//     <DatePicker
//       selected={dateFilter.to ? new Date(dateFilter.to) : null}
//       onChange={(date) =>
//         handleDateChange("to", dayjs(date).format("YYYY-MM-DD"))
//       }
//       maxDate={dayjs().add(1, "day").toDate()} // prevent beyond tomorrow
//       minDate={dateFilter.from ? new Date(dateFilter.from) : null} // cannot be before From
//       dateFormat="MMM dd, yyyy"
//       className="text-sm text-gray-800 border-none bg-transparent focus:outline-none cursor-pointer min-w-[100px]"
//       placeholderText="Select end date"
//       showPopperArrow={false}
//       popperClassName="event-datepicker"
//     />
//   </div>
// </div>


//                                         <div className="flex justify-between">
//                                             <button
//                                                 onClick={resetFilters}
//                                                 className="px-4 py-2 text-gray-600 hover:text-gray-800"
//                                             >
//                                                 Reset
//                                             </button>
//                                             <button
//                                                 onClick={applyFilters}
//                                                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//                                             >
//                                                 Apply
//                                             </button>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>

//                     {/* Table Content */}
//                     <div className="overflow-x-auto">
//                         <DisputeTable
//                             currentPage={currentPage}
//                             searchTerm={searchTerm}
//                             statusFilter={statusFilter}
//                             dateFilter={dateFilter}
//                             mobileView={mobileView}
//                             setHasDisputeData={setHasDisputeData}
//                             setTotalDisputes={setTotalDisputes}
//                         />
//                     </div>

//                     {/* Pagination */}
//                     {hasDisputeData && (
//                     <div className="flex items-center justify-center space-x-2 mt-6">
//                         <button 
//                             className="flex items-center justify-center w-8 h-8 rounded-full border"
//                             onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
//                             disabled={currentPage === 1}
//                         >
//                             <ChevronLeft className="w-4 h-4" />
//                         </button>
//                         {[...Array(totalPages)].map((_, i) => (
//                             <button
//                                 key={i + 1}
//                                 onClick={() => handlePageChange(i + 1)}
//                                 className={`flex items-center justify-center w-8 h-8 rounded-full ${
//                                     currentPage === i + 1
//                                         ? "bg-blue-600 text-white"
//                                         : "text-gray-700 hover:bg-gray-100"
//                                 }`}
//                             >
//                                 {i + 1}
//                             </button>
//                         ))}
//                         <button 
//                             className="flex items-center justify-center w-8 h-8 rounded-full border"
//                             onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
//                             disabled={currentPage === totalPages}
//                         >
//                             <ChevronRight className="w-4 h-4" />
//                         </button>
//                     </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Calendar,
} from "lucide-react";
import DisputeTable from "./DisputeRender";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

export default function DisputeManagement() {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusOpen, setStatusOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState([]);
  const [dateFilter, setDateFilter] = useState({ from: "", to: "" });

  // Mobile responsive states
  const [mobileView, setMobileView] = useState(false);

  // Data state
  const [hasDisputeData, setHasDisputeData] = useState(false);
  const [totalDisputes, setTotalDisputes] = useState(0);

  // Dropdown refs
  const filterRef = useRef(null);
  const statusRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setFilterOpen(false);
      }
      if (statusRef.current && !statusRef.current.contains(event.target)) {
        setStatusOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Status options
  const statusOptions = ["All", "In Review", "Resolved", "Pending"];

  // Pagination handlers
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = (status) => {
    setStatusFilter(status === "All" ? [] : [status]);
    setStatusOpen(false);
    setCurrentPage(1);
  };

  const handleDateChange = (type, value) => {
    setDateFilter({ ...dateFilter, [type]: value });
    setCurrentPage(1);
  };

  const applyFilters = () => {
    setFilterOpen(false);
  };

  const resetFilters = () => {
    setStatusFilter([]);
    setDateFilter({ from: "", to: "" });
  };

  // Pagination recalculation
  useEffect(() => {
    const newTotalPages = Math.ceil(totalDisputes / 7);
    setTotalPages(newTotalPages);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(1);
    }
  }, [totalDisputes, currentPage]);

  // Mobile check
  useEffect(() => {
    const handleResize = () => setMobileView(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <div className="font-inter mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dispute Management</h1>
        <p className="text-gray-500">
          Review, respond, and take action on vendor-escalated disputes.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Dispute History Log
          </h2>

          {/* Search + Filters */}
          <div className="flex flex-wrap justify-end gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-grow max-w-md">
              <input
                type="text"
                placeholder="Search by Dispute ID, Event Name, Customer Name, Vendor Name"
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none text-black"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>

            <div className="flex items-center space-x-2">
              {/* Status Dropdown */}
              <div className="relative" ref={statusRef}>
                <button
                  className="flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg text-gray-700"
                  onClick={() => setStatusOpen(!statusOpen)}
                >
                  <span>Status</span>
                  <ChevronDown className="ml-2 w-4 h-4" />
                </button>

                {statusOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                    {statusOptions.map((status) => (
                      <button
                        key={status}
                        onClick={() => handleStatusChange(status)}
                        className={`block w-full text-left px-4 py-2 hover:bg-gray-50 ${
                          (status === "All" && statusFilter.length === 0) ||
                          statusFilter.includes(status)
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-700"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Filter Dropdown */}
              <div className="relative" ref={filterRef}>
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
                    <h3 className="font-medium text-gray-700 mb-3">
                      Filter by Date
                    </h3>
                    <div className="space-y-3 mb-4">
                      {/* From Date */}
                      <div className="flex items-center border border-gray-300 rounded-lg bg-white px-3 py-2">
                        <CalendarDays className="w-4 h-4 text-blue-700 mr-2" />
                        <span className="text-xs text-gray-600 mr-2">From:</span>
                        <DatePicker
                          selected={
                            dateFilter.from ? new Date(dateFilter.from) : null
                          }
                          onChange={(date) =>
                            handleDateChange(
                              "from",
                              dayjs(date).format("YYYY-MM-DD")
                            )
                          }
                          maxDate={dayjs().add(1, "day").toDate()}
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
                          selected={
                            dateFilter.to ? new Date(dateFilter.to) : null
                          }
                          onChange={(date) =>
                            handleDateChange(
                              "to",
                              dayjs(date).format("YYYY-MM-DD")
                            )
                          }
                          maxDate={dayjs().add(1, "day").toDate()}
                          minDate={
                            dateFilter.from ? new Date(dateFilter.from) : null
                          }
                          dateFormat="MMM dd, yyyy"
                          className="text-sm text-gray-800 border-none bg-transparent focus:outline-none cursor-pointer min-w-[100px]"
                          placeholderText="Select end date"
                          showPopperArrow={false}
                          popperClassName="event-datepicker"
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

          {/* Table */}
          <div className="overflow-x-auto">
            <DisputeTable
              currentPage={currentPage}
              searchTerm={searchTerm}
              statusFilter={statusFilter}
              dateFilter={dateFilter}
              mobileView={mobileView}
              setHasDisputeData={setHasDisputeData}
              setTotalDisputes={setTotalDisputes}
            />
          </div>

          {/* Pagination */}
          {hasDisputeData && (
            <div className="flex items-center justify-center space-x-2 mt-6">
              <button
                className="flex items-center justify-center w-8 h-8 rounded-full border"
                onClick={() =>
                  currentPage > 1 && handlePageChange(currentPage - 1)
                }
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
                onClick={() =>
                  currentPage < totalPages && handlePageChange(currentPage + 1)
                }
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
