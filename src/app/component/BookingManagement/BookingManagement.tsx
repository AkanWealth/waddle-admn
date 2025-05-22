import React, { useState } from "react";
import BookingsData from "./SampleData";
import SearchFilterBar from "./SearchFilterBar";
import BookingTable from "./BookingTable";
import PaginationComponent from "../Element/PaginationComponent";

const BookingManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);

  const [activeTab, setActiveTab] = useState("Bookings");

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded-[8px] text-xs font-normal flex items-center gap-1.5";
    switch (status) {
      case "Confirmed":
        return `${baseClasses} bg-[#E0F5E6] text-[#28A745]`;
      case "Pending":
        return `${baseClasses} bg-[#E5E5E5] text-[#272727]`;
        case "closed":
    case "cancelled":
    case "canceled":
      case "Canceled":
        return `${baseClasses} bg-[#FFDEDE] text-[#CB1A14]`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const filteredBookings = BookingsData.filter((booking) => {
    const matchesSearch =
      booking.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.organiser.toLowerCase().includes(searchTerm.toLowerCase());
  
    const matchesStatus =
      statusFilter.length === 0 || statusFilter.includes(booking.status);
  
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
          <section className="flex relative  justify-between items-center mt-4">
            <div className="font-inter flex items-center  border-[#D0D0D0] border-[1px] rounded-[12px] px-2">
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
