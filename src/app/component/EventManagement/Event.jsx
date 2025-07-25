import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Trash2,
  Filter,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

import EventTable from "./EventRender";
import PaginationComponent from "../Element/PaginationComponent";
import EventCreationModal from "../ModalPages/Events/createEventModal";
import { eventService } from "@/utils/eventService";

export default function EventManagement() {
  // State for active tab
  const [activeTab, setActiveTab] = useState("Vendors");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(4);

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusOpen, setStatusOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState([]);
  const [dateFilter, setDateFilter] = useState({ from: "", to: "" });

  const [eventList, setEventList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Create Event Modal state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Mobile responsive states
  const [mobileView, setMobileView] = useState(false);

  // Status options
  const statusOptions = [
    "All",
    "Approved",
    "Pending",
    "Draft",
    "Non-compliant",
    "Crown sourcing",
  ];

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
    setStatusFilter("");
    setDateFilter({ from: "", to: "" });
  };

  // Handle creating a new event
  const handleCreateEvent = () => {
    setIsCreateModalOpen(true);
  };

  // Handle saving event
  const handleSaveEvent = (eventData) => {
    console.log("Saving event:", eventData);
    // Here you would typically make an API call to save the event
    setIsCreateModalOpen(false);
  };

  // Check window size for responsive design
  useEffect(() => {
    const handleResize = () => {
      setMobileView(window.innerWidth < 768);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      const result = await eventService.getPaginatedEvents(currentPage, 7);
      if (result.success && Array.isArray(result.data?.events)) {
        setEventList(result.data.events);
        setTotalPages(result.data.totalPages || 1); // If your API returns total pages
      } else {
        console.error(result.error || "Failed to fetch events");
      }
      setIsLoading(false);
    };

    fetchEvents();
  }, [currentPage]);

  return (
    <div>
      <div className="font-inter flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
        <div className="gap-4 grid grid-cols-1 items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Event Management</h1>
          <p className="text-gray-500">View and manage your event here actually</p>
        </div>
        <div className="flex space-x-2 md:space-x-4 mt-4 md:mt-0">
          <button 
                        className="cursor-pointer flex items-center bg-[#2853A6] text-white px-2 py-1 md:px-4 md:py-2 rounded-md text-sm md:text-base"
                        onClick={handleCreateEvent}
                    >
                        <Plus className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
                        Create Event
                    </button>
          <button className="cursor-pointer flex items-center gap-2 border border-[#CC0000] text-[#CC0000] px-2 py-1 md:px-4 md:py-2 rounded-md text-sm md:text-base">
            <span className="text-[#CC0000]">
            Deleted Events
            </span>
            <Trash2 className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2 text-[#CC0000]" />
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            All Events
          </h2>

          {/* Search and Filter Section */}
          <div className="flex flex-wrap justify-between gap-4 mb-6">
            {/* Search Input */}
            <div className="relative flex-grow max-w-md">
              <input
                type="text"
                placeholder="Search by event name..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 text-black border border-gray-300 rounded-lg  outline-none"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>
            <div className="flex items-center space-x-2">
              {/* Status Filter Dropdown */}
              <div className="relative">
                <button
                  className="flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg text-gray-700 min-w-[120px]"
                  onClick={() => setStatusOpen(!statusOpen)}
                >
                  <span>Status</span>
                  <ChevronDown className="ml-2 w-4 h-4" />
                </button>

                {statusOpen && (
                  <div className="absolute mt-1 w-56 bg-white rounded-xl shadow-lg border border-gray-200 z-10 p-4">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setStatusOpen(false);
                        applyFilters();
                      }}
                    >
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
                                    setStatusFilter(
                                      statusFilter.filter((s) => s !== status)
                                    );
                                  } else {
                                    setStatusFilter([
                                      ...statusFilter.filter(
                                        (s) => s !== "All"
                                      ),
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
                      <div className="flex justify-between gap-2">
                        <button
                          type="submit"
                          className="bg-[#2853A6] text-white px-5 py-1.5 rounded-md font-medium"
                        >
                          Apply
                        </button>
                        <button
                          type="button"
                          onClick={() => setStatusOpen(false)}
                          className="border border-[#2853A6] text-blue-700 px-5 py-1.5 rounded-md font-medium bg-white"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
              {/* General Filter Button */}
              <div className="relative">
                <button
                  className="flex items-center justify-center border border-gray-300 rounded-lg px-4 py-2"
                  onClick={() => setFilterOpen(!filterOpen)}
                >
                  <Filter className="w-4 h-4 mr-2 text-gray-600" />
                  <span className="text-gray-600">Filter</span>
                  <ChevronDown className="h-4 w-4 text-gray-600 ml-2" />
                </button>

                {/* Filter dropdown */}
                {filterOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-10 p-4">
                    <h3 className="font-medium text-gray-700 mb-3">
                      Filter by Date
                    </h3>
                    <div className="space-y-2 mb-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">
                          From
                        </label>
                        <input
                          type="date"
                          value={dateFilter.from}
                          onChange={(e) =>
                            handleDateChange("from", e.target.value)
                          }
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">
                          To
                        </label>
                        <input
                          type="date"
                          value={dateFilter.to}
                          onChange={(e) =>
                            handleDateChange("to", e.target.value)
                          }
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
                        className="px-4 py-2 bg-[#2853A6] text-white rounded-md hover:bg-blue-700"
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
          <div className="overflow-x-auto min-h-[200px]">
            {isLoading ? (
              // Spinner or loading message
              <div className="flex flex-col items-center justify-center py-8">
                <svg className="animate-spin h-8 w-8 text-blue-600 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
                <span className="text-gray-500">Loading events...</span>
              </div>
            ) : (
              <EventTable
                data={eventList}
                currentPage={currentPage}
                searchTerm={searchTerm}
                statusFilter={statusFilter === "All" ? "" : statusFilter}
                dateFilter={dateFilter}
                mobileView={mobileView}
                isLoading={isLoading}
              />
            )}
          </div>

          {/* Pagination */}
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {/* Create Event Modal */}
      {isCreateModalOpen && (
        <EventCreationModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSave={handleSaveEvent}
        />
      )}
    </div>
  );
}
