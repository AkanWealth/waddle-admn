import React, { useState } from "react";
import BookingsData from "./SampleData";
import SearchFilterBar from "./SearchFilterBar";
import BookingTable from "./BookingTable";
import PaginationComponent from "../Element/PaginationComponent";

const BookingManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");
  const [activeTab, setActiveTab] = useState("Bookings");

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case "Confirmed":
        return `${baseClasses} bg-green-100 text-green-800`;
      case "Pending":
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case "Canceled":
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const filteredBookings = BookingsData.filter((booking) => {
    const matchesSearch =
      booking.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.organiser.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBookings = filteredBookings.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <section className="w-full">
          <h1 className="text-xl font-semibold text-gray-900">All Bookings</h1>
          <section className="flex  justify-between items-center">
            <div className="font-inter flex items-center space-x-6 border-[#D0D0D0] border-[1px] rounded-[12px] p-2">
              {["Bookings", "Revenue"].map((tab) => (
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
            <SearchFilterBar
              searchTerm={searchTerm}
              statusFilter={statusFilter}
              onSearchChange={setSearchTerm}
              onStatusChange={setStatusFilter}
            />
          </section>
        </section>
      </div>

      <BookingTable
        bookings={paginatedBookings}
        getStatusBadge={getStatusBadge}
      />

      <div className="px-6 py-4 border-t border-gray-200">
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default BookingManagement;
