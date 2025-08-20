import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { IBooking, IVendor } from "@/app/component/BookingManagement/IBooking";
import React from "react";
import { bookingsService } from "@/utils/bookingService";

interface RevenueData {
  date: string;
  amount: number;
}

interface StoreState {
  data: RevenueData[];
  fetchData: (period: string) => void;
}

interface FilterState {
  searchTerm: string;
  statusFilter: string[];
  vendor: string;
  dateRange: string;
  status: string;
}

interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
}

interface UIState {
  activeTab: string;
  isStatusModalOpen: boolean;
  isMainFilterOpen: boolean;
}

interface BookingStore {
  bookings: IBooking[];
  filters: FilterState;
  pagination: PaginationState;
  ui: UIState;

  selectedEvent: IBooking | null;
  setSelectedEvent: (event: IBooking) => void;
  clearSelectedEvent: () => void;

  setSearchTerm: (term: string) => void;
  setStatusFilter: (statuses: string[]) => void;
  setVendor: (vendor: string) => void;
  setDateRange: (dateRange: string) => void;
  setStatus: (status: string) => void;
  clearFilters: () => void;
  applyMainFilter: (filters: {
    vendor: string;
    dateRange: string;
    status: string;
  }) => void;

  setCurrentPage: (page: number) => void;
  setItemsPerPage: (items: number) => void;

  setActiveTab: (tab: string) => void;
  toggleStatusModal: () => void;
  setStatusModalOpen: (open: boolean) => void;
  toggleMainFilter: () => void;
  setMainFilterOpen: (open: boolean) => void;

  fetchBookingData: () => Promise<void>;
  getStatusBadge: (status: string) => string;

  isOpenBookingDetails: boolean;
  openBookingDetailsModal: () => void;
  closeBookingDetailsModal: () => void;
  isReportModalOpen: boolean;
  openReportModalModal: () => void;
  closeReportModalModal: () => void;

  isDownloadReportModalOpen: boolean;
  openDownloadReportModal: () => void;
  closeDownloadReportModal: () => void;

  isOpenGuardianDetails: boolean;
  openGuardianDetailsModal: () => void;
  closeGuardianDetailsModal: () => void;

  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const initialFilters: FilterState = {
  searchTerm: "",
  statusFilter: [],
  vendor: "",
  dateRange: "",
  status: "",
};

const initialPagination: PaginationState = {
  currentPage: 1,
  itemsPerPage: 8,
};

const initialUI: UIState = {
  activeTab: "Bookings",
  isStatusModalOpen: false,
  isMainFilterOpen: false,
};

export const useBookingStore = create<BookingStore>()(
  devtools(
    (set) => ({
      bookings: [],
      fetchBookingData: async () => {
        set({ isLoading: true });
        try {
          const res = await bookingsService.getAllBookings();
          if (res.success && Array.isArray(res.data)) {
            set({ bookings: res.data }, false, "fetchBookingData");
          } else {
            console.error("Failed to fetch bookings:", res.error);
          }
        } catch (error) {
          console.error("Error fetching bookings:", error);
        } finally {
          set({ isLoading: false });
        }
      },

      selectedEvent: null,

      setSelectedEvent: (event) =>
        set(() => ({ selectedEvent: event }), false, "setSelectedEvent"),

      clearSelectedEvent: () =>
        set(() => ({ selectedEvent: null }), false, "clearSelectedEvent"),

      filters: initialFilters,
      pagination: initialPagination,
      ui: initialUI,
      isReportModalOpen: false,
      openReportModalModal: () => set({ isReportModalOpen: true }),
      closeReportModalModal: () => set({ isReportModalOpen: false }),
      isOpenBookingDetails: false,
      openBookingDetailsModal: () => set({ isOpenBookingDetails: true }),
      closeBookingDetailsModal: () => set({ isOpenBookingDetails: false }),
      isOpenGuardianDetails: false,
      openGuardianDetailsModal: () => set({ isOpenGuardianDetails: true }),
      closeGuardianDetailsModal: () => set({ isOpenGuardianDetails: false }),
      isDownloadReportModalOpen: false,
      openDownloadReportModal: () => set({ isDownloadReportModalOpen: true }),
      closeDownloadReportModal: () => set({ isDownloadReportModalOpen: false }),

      isLoading: false,
      setIsLoading: (loading) => set({ isLoading: loading }),

      setSearchTerm: (term) =>
        set(
          (state) => ({
            filters: { ...state.filters, searchTerm: term },
            pagination: { ...state.pagination, currentPage: 1 },
          }),
          false,
          "setSearchTerm"
        ),

      setStatusFilter: (statuses) =>
        set(
          (state) => ({
            filters: { ...state.filters, statusFilter: statuses },
            pagination: { ...state.pagination, currentPage: 1 },
          }),
          false,
          "setStatusFilter"
        ),

      setVendor: (vendor) =>
        set(
          (state) => ({
            filters: { ...state.filters, vendor },
          }),
          false,
          "setVendor"
        ),

      setDateRange: (dateRange) =>
        set(
          (state) => ({
            filters: { ...state.filters, dateRange },
          }),
          false,
          "setDateRange"
        ),

      setStatus: (status) =>
        set(
          (state) => ({
            filters: { ...state.filters, status },
          }),
          false,
          "setStatus"
        ),

      clearFilters: () =>
        set(
          () => ({
            filters: initialFilters,
            pagination: { ...initialPagination },
          }),
          false,
          "clearFilters"
        ),

      applyMainFilter: (filters) =>
        set(
          (state) => ({
            filters: {
              ...state.filters,
              vendor: filters.vendor,
              dateRange: filters.dateRange,
              status: filters.status,
            },
            pagination: { ...state.pagination, currentPage: 1 },
          }),
          false,
          "applyMainFilter"
        ),

      setCurrentPage: (page) =>
        set(
          (state) => ({
            pagination: { ...state.pagination, currentPage: page },
          }),
          false,
          "setCurrentPage"
        ),

      setItemsPerPage: (items) =>
        set(
          (state) => ({
            pagination: {
              ...state.pagination,
              itemsPerPage: items,
              currentPage: 1,
            },
          }),
          false,
          "setItemsPerPage"
        ),

      setActiveTab: (tab) =>
        set(
          (state) => ({
            ui: { ...state.ui, activeTab: tab },
            pagination: { ...state.pagination, currentPage: 1 },
          }),
          false,
          "setActiveTab"
        ),

      toggleStatusModal: () =>
        set(
          (state) => ({
            ui: { ...state.ui, isStatusModalOpen: !state.ui.isStatusModalOpen },
          }),
          false,
          "toggleStatusModal"
        ),

      setStatusModalOpen: (open) =>
        set(
          (state) => ({
            ui: { ...state.ui, isStatusModalOpen: open },
          }),
          false,
          "setStatusModalOpen"
        ),

      toggleMainFilter: () =>
        set(
          (state) => ({
            ui: { ...state.ui, isMainFilterOpen: !state.ui.isMainFilterOpen },
          }),
          false,
          "toggleMainFilter"
        ),

      setMainFilterOpen: (open) =>
        set(
          (state) => ({
            ui: { ...state.ui, isMainFilterOpen: open },
          }),
          false,
          "setMainFilterOpen"
        ),

      getStatusBadge: (status: string) => {
        console.log(status, "This is the status for get status badge");
        const baseClasses =
          "px-2 py-1 rounded-[8px] text-xs font-normal flex items-center gap-1.5";
        switch (status) {
          case "Confirmed":
            return `${baseClasses} bg-[#E0F5E6] text-[#28A745]`;
          case "Pending":
            return `${baseClasses} bg-[#E5E5E5] text-[#272727]`;
          case "closed":
          case "cancelled":
          case "canceled":
          case "Canceled":
          case "Failed":
            console.log("Shoulf run this one");
            return `${baseClasses} bg-[#FFDEDE] text-[#CB1A14]`;
          default:
            return `${baseClasses} bg-gray-100 text-gray-800`;
        }
      },
    }),
    {
      name: "booking-store",
    }
  )
);

// export const useFilteredBookings = () => {
//   const bookings = useBookingStore((state) => state.bookings);
//   const filters = useBookingStore((state) => state.filters);

//   return React.useMemo(() => {
//     return bookings.filter((booking) => {
//       const matchesSearch =
//         booking?.event?.name
//           .toLowerCase()
//           .includes(filters.searchTerm.toLowerCase()) ||
//         booking?.event?.organiser?.name
//           .toLowerCase()
//           .includes(filters.searchTerm.toLowerCase());

//       const matchesStatus =
//         filters.statusFilter.length === 0 ||
//         filters.statusFilter.includes(booking.status);

//       const matchesVendor =
//         !filters.vendor ||
//         booking.organiser.toLowerCase().includes(filters.vendor.toLowerCase());

//       return matchesSearch && matchesStatus && matchesVendor;
//     });
//   }, [bookings, filters.searchTerm, filters.statusFilter, filters.vendor]);
// };

// Add this updated useFilteredBookings hook to your store file

export const useFilteredBookings = () => {
  const bookings = useBookingStore((state) => state.bookings);
  const filters = useBookingStore((state) => state.filters);

  return React.useMemo(() => {
    return bookings.filter((booking) => {
      // Search term filter
      const matchesSearch =
        !filters.searchTerm ||
        booking?.event?.name
          .toLowerCase()
          .includes(filters.searchTerm.toLowerCase()) ||
        booking?.event?.organiser?.name
          .toLowerCase()
          .includes(filters.searchTerm.toLowerCase()) ||
        booking?.id.toLowerCase().includes(filters.searchTerm.toLowerCase());

      // Status filter (array-based from status modal)
      const matchesStatusFilter =
        filters.statusFilter.length === 0 ||
        filters.statusFilter.includes(booking.status);

      // Single status filter (from main filter)
      const matchesStatus =
        !filters.status ||
        booking.status.toLowerCase() === filters.status.toLowerCase();

      // Vendor filter
      const matchesVendor =
        !filters.vendor ||
        booking.organiser
          ?.toLowerCase()
          .includes(filters.vendor.toLowerCase()) ||
        booking?.event?.organiser?.name
          ?.toLowerCase()
          .includes(filters.vendor.toLowerCase());

      // Date range filter
      const matchesDateRange = (() => {
        if (!filters.dateRange || !filters.dateRange.includes(" - ")) {
          return true; // No date filter applied
        }

        try {
          const [startDateStr, endDateStr] = filters.dateRange.split(" - ");
          const filterStartDate = new Date(startDateStr);
          const filterEndDate = new Date(endDateStr);

          // Set end date to end of day for inclusive comparison
          filterEndDate.setHours(23, 59, 59, 999);

          // Get booking event date - adjust this path based on your data structure
          let bookingDate;

          // Try different possible date field paths
          if (booking.event?.date) {
            bookingDate = new Date(booking.event.date);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } else if ((booking.event as any)?.startDate) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            bookingDate = new Date((booking.event as any).startDate);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } else if ((booking as any).date) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            bookingDate = new Date((booking as any).date);
          } else if (booking.createdAt) {
            bookingDate = new Date(booking.createdAt);
          } else {
            // If no date field found, include the booking
            return true;
          }

          // Check if booking date is within the filter range
          return bookingDate >= filterStartDate && bookingDate <= filterEndDate;
        } catch (error) {
          console.error("Error filtering by date range:", error);
          return true; // Include booking if there's an error parsing dates
        }
      })();

      return (
        matchesSearch &&
        matchesStatusFilter &&
        matchesStatus &&
        matchesVendor &&
        matchesDateRange
      );
    });
  }, [
    bookings,
    filters.searchTerm,
    filters.statusFilter,
    filters.vendor,
    filters.status,
    filters.dateRange,
  ]);
};

// Also update your clearFilters function to reset local date states
// You'll need to modify your store's clearFilters action to trigger a re-render of the filter component
export const usePaginatedBookings = () => {
  const filteredBookings = useFilteredBookings();
  const pagination = useBookingStore((state) => state.pagination);

  return React.useMemo(() => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    return filteredBookings.slice(
      startIndex,
      startIndex + pagination.itemsPerPage
    );
  }, [filteredBookings, pagination.currentPage, pagination.itemsPerPage]);
};

export const useTotalPages = () => {
  const filteredBookings = useFilteredBookings();
  const itemsPerPage = useBookingStore(
    (state) => state.pagination.itemsPerPage
  );

  return React.useMemo(() => {
    return Math.ceil(filteredBookings.length / itemsPerPage);
  }, [filteredBookings.length, itemsPerPage]);
};

export const useFilteredVendors = (vendors: IVendor[]) => {
  const filters = useBookingStore((state) => state.filters);

  return React.useMemo(() => {
    let filtered = vendors;

    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (vendor) =>
          vendor.name.toLowerCase().includes(searchLower) ||
          vendor.representative.toLowerCase().includes(searchLower)
      );
    }

    if (filters.vendor) {
      const vendorLower = filters.vendor.toLowerCase();
      filtered = filtered.filter((vendor) =>
        vendor.name.toLowerCase().includes(vendorLower)
      );
    }

    return filtered;
  }, [vendors, filters.searchTerm, filters.vendor]);
};

export const usePaginatedVendors = (vendors: IVendor[]) => {
  const filteredVendors = useFilteredVendors(vendors);
  const pagination = useBookingStore((state) => state.pagination);

  return React.useMemo(() => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const paginatedVendors = filteredVendors.slice(
      startIndex,
      startIndex + pagination.itemsPerPage
    );

    // Only count pages that actually have data
    const actualTotalPages = Math.ceil(
      filteredVendors.length / pagination.itemsPerPage
    );

    // If the current page has no data and it's not page 1, adjust totalPages
    const totalPages =
      paginatedVendors.length === 0 && pagination.currentPage > 1
        ? Math.max(1, actualTotalPages)
        : actualTotalPages;

    return {
      filteredVendors,
      paginatedVendors,
      totalPages,
      startIndex,
    };
  }, [filteredVendors, pagination.currentPage, pagination.itemsPerPage]);
};

export const useRevenueStore = create<StoreState>((set) => ({
  data: [],
  fetchData: async (period: string) => {
    const response = await bookingsService.getBookingRevenueData(period);
    if (response.success) {
      set({ data: response.data });
    } else {
      set({ data: [] });
    }
    // const mockData = [
    //   { date: "Jan", amount: 42000 },
    //   { date: "Feb", amount: 60000 },
    //   { date: "Mar", amount: 28000 },
    //   { date: "Apr", amount: 45000 },
    //   { date: "May", amount: 27000 },
    //   { date: "Jun", amount: 28735 },
    //   { date: "Jul", amount: 68000 },
    //   { date: "Aug", amount: 23000 },
    //   { date: "Sep", amount: 45000 },
    //   { date: "Oct", amount: 69000 },
    //   { date: "Nov", amount: 31000 },
    //   { date: "Dec", amount: 70000 },
    // ];
    // set({ data: mockData });
  },
}));
