import React from "react";
import SearchFilterBar from "./SearchFilterBar";
import BookingTable from "./BookingTable";
import PaginationComponent from "../Element/PaginationComponent";
import {
  useBookingStore,
  usePaginatedBookings,
  useTotalPages,
} from "@/stores/useBookingStore";
import StatusFilterModal from "./StatusFilterModal";
import MainBookingFilter from "./MainBookingFilter";
import BookingDetailsModal from "./BookingDetailsModal";
import RevenueChart from "./RevenueChart";

const BookingManagement: React.FC = () => {
  const paginatedBookings = usePaginatedBookings();
  const totalPages = useTotalPages();

  const {
    isOpenBookingDetails,
    filters: { statusFilter },
    ui: { activeTab },
    pagination: { currentPage },
    ui: { isStatusModalOpen, isMainFilterOpen },
    toggleMainFilter,
    setActiveTab,
    setCurrentPage,
    getStatusBadge,
    setStatusModalOpen,
    setStatusFilter,
  } = useBookingStore();
  console.log(activeTab);

  return (
    <div className="">
      <div className="bg-white relative">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 overflow-x-hidden">
          <section className="w-full ">
            <h1 className="text-xl font-semibold text-gray-900">
              All Bookings
            </h1>
            <section className="flex relative justify-between items-center mt-4 flex-col md:flex-row">
              <div className="font-inter flex items-center border-[#D0D0D0] border-[1px] rounded-[12px] px-2">
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
              <SearchFilterBar />
            </section>
          </section>
        </div>

        <StatusFilterModal
          isOpen={isStatusModalOpen}
          onClose={() => setStatusModalOpen(false)}
          onApply={setStatusFilter}
          initialSelected={statusFilter}
        />
        <MainBookingFilter
          isOpen={isMainFilterOpen}
          onClose={toggleMainFilter}
        />
        {activeTab == "Bookings" && (
          <BookingTable
            bookings={paginatedBookings}
            getStatusBadge={getStatusBadge}
          />
        )}

        {activeTab == "Revenue" && <RevenueChart />}

        {isOpenBookingDetails && <BookingDetailsModal />}
      </div>
      <div className="px-6 py-4 border-t border-gray-200">
        {paginatedBookings.length >= 1 && (
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default BookingManagement;
