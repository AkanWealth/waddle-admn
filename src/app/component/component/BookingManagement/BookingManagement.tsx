import React, { useEffect } from "react";
import SearchFilterBar from "./SearchFilterBar";
import BookingTable from "./BookingTable";
import PaginationComponent from "../Element/PaginationComponent";
import StatusFilterModal from "./StatusFilterModal";
import MainBookingFilter from "./MainBookingFilter";
import BookingDetailsModal from "./BookingDetailsModal";
import RevenueChart from "./RevenueChart";
import RevenueVendorTable from "./RevenueVendorTable";
import {
  useBookingStore,
  usePaginatedBookings,
  useTotalPages,
  usePaginatedVendors,
  // useInitializeBookings,
  // useInitializeBookingStore,
} from "@/stores/useBookingStore";
import { VendorData } from "./SampleData";

const BookingManagement: React.FC = () => {
  const paginatedBookings = usePaginatedBookings();
  const totalPages = useTotalPages();
  const { paginatedVendors, totalPages: vendorTotalPages } =
    usePaginatedVendors(VendorData);

  const fetchBookingData = useBookingStore((state) => state.fetchBookingData);

  useEffect(() => {
    fetchBookingData();
  }, [fetchBookingData]);

  const {
    isOpenBookingDetails,
    filters: { statusFilter },
    ui: { activeTab, isStatusModalOpen, isMainFilterOpen },
    pagination: { currentPage },
    setActiveTab,
    setCurrentPage,
    setStatusModalOpen,
    setStatusFilter,
    toggleMainFilter,
    getStatusBadge,
  } = useBookingStore();

  const tabs = ["Bookings", "Revenue"];

  const shouldShowPagination = () => {
    if (activeTab === "Bookings") {
      return paginatedBookings.length >= 1;
    }
    if (activeTab === "Revenue") {
      return paginatedVendors.length >= 1;
    }
    return false;
  };

  const getCurrentTotalPages = () => {
    return activeTab === "Revenue" ? vendorTotalPages : totalPages;
  };

  return (
    <div className=" relative">
      <header className="p-6 border-b border-gray-200 bg-white">
        <h1 className="text-xl font-semibold text-gray-900 mb-4">
          All Bookings
        </h1>

        <div className="flex justify-between items-center flex-col md:flex-row gap-4">
          <nav className="flex items-center border border-gray-300 rounded-lg p-0.5">
            {tabs.map((tab) => (
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
          </nav>

          <SearchFilterBar />
        </div>
      </header>

      <StatusFilterModal
        isOpen={isStatusModalOpen}
        onClose={() => setStatusModalOpen(false)}
        onApply={setStatusFilter}
        initialSelected={statusFilter}
      />

      <MainBookingFilter isOpen={isMainFilterOpen} onClose={toggleMainFilter} />

      {isOpenBookingDetails && <BookingDetailsModal />}

      <main className="min-h-[400px]">
        {activeTab === "Bookings" && (
          <BookingTable
            bookings={paginatedBookings}
            getStatusBadge={getStatusBadge}
          />
        )}

        {activeTab === "Revenue" && (
          <section className="w-full">
            <RevenueChart />
            <RevenueVendorTable />
          </section>
        )}
      </main>

      {shouldShowPagination() && (
        <footer className="px-6 py-4 border-t border-gray-200">
          <PaginationComponent
            currentPage={currentPage}
            totalPages={getCurrentTotalPages()}
            onPageChange={setCurrentPage}
          />
        </footer>
      )}
    </div>
  );
};

export default BookingManagement;
