import React, { useEffect, useState } from "react";
import { usePaginatedVendors, useBookingStore } from "@/stores/useBookingStore";
import { bookingsService } from "@/utils/bookingService";
import PaginationComponent from "../Element/PaginationComponent";
import { Search } from "lucide-react";
import { IVendor } from "./IBooking";

// Table Skeleton Component
const TableSkeleton: React.FC = () => {
  return (
    <div className="w-full my-4">
      {/* Desktop Table Skeleton */}
      <div className="hidden md:block">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="h-6 bg-gray-200 rounded animate-pulse w-24"></div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <th key={i} className="px-6 py-3 text-left">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[1, 2, 3, 4, 5].map((row) => (
                  <tr key={row}>
                    {[1, 2, 3, 4, 5].map((cell) => (
                      <td key={cell} className="px-6 py-4 whitespace-nowrap">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Mobile Card Skeleton */}
      <div className="md:hidden max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div className="h-6 bg-gray-200 rounded animate-pulse w-24"></div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {[1, 2, 3].map((i) => (
                    <th key={i} className="px-6 py-3 text-left">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[1, 2, 3, 4, 5].map((row) => (
                  <tr key={row}>
                    {[1, 2, 3].map((cell) => (
                      <td key={cell} className="px-6 py-4 whitespace-nowrap">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const RevenueVendorTable: React.FC = () => {
  const [vendorList, setVendorList] = useState<IVendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Get pagination state and actions from store
  const { pagination, setCurrentPage } = useBookingStore();

  // Filter vendors based on search term
  const filteredVendorsBySearch = React.useMemo(() => {
    if (!searchTerm.trim()) {
      return vendorList;
    }

    return vendorList.filter((vendor) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        vendor.name?.toLowerCase().includes(searchLower) ||
        vendor.representative?.toLowerCase().includes(searchLower) ||
        vendor.totalEvents?.toString().includes(searchLower) ||
        vendor.totalBookings?.toString().includes(searchLower) ||
        vendor.revenue?.toString().includes(searchLower)
      );
    });
  }, [vendorList, searchTerm]);

  // Use filtered vendors for pagination
  const {
    paginatedVendors: searchPaginatedVendors,
    totalPages: searchTotalPages,
    filteredVendors: searchFilteredVendors,
    startIndex: searchStartIndex,
  } = usePaginatedVendors(filteredVendorsBySearch);

  // Calculate if we should show pagination
  const shouldShowPagination = React.useMemo(() => {
    const actualTotalPages = Math.ceil(
      searchFilteredVendors.length / pagination.itemsPerPage
    );
    return actualTotalPages >= 1 && searchPaginatedVendors.length > 0;
  }, [
    searchFilteredVendors.length,
    pagination.itemsPerPage,
    searchPaginatedVendors.length,
  ]);

  // Calculate the correct total pages to show
  const displayTotalPages = React.useMemo(() => {
    return Math.ceil(searchFilteredVendors.length / pagination.itemsPerPage);
  }, [searchFilteredVendors.length, pagination.itemsPerPage]);

  // Reset to page 1 if current page is beyond available data
  useEffect(() => {
    if (searchTotalPages > 0 && pagination.currentPage > searchTotalPages) {
      setCurrentPage(1);
    }
  }, [searchTotalPages, pagination.currentPage, setCurrentPage]);

  // Reset to page 1 when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, setCurrentPage]);

  // Debug logging
  console.log("RevenueVendorTable Debug:", {
    vendorListLength: vendorList.length,
    searchTerm,
    filteredVendorsBySearchLength: filteredVendorsBySearch.length,
    searchFilteredVendorsLength: searchFilteredVendors.length,
    searchPaginatedVendorsLength: searchPaginatedVendors.length,
    currentPage: pagination.currentPage,
    itemsPerPage: pagination.itemsPerPage,
    searchTotalPages,
    displayTotalPages,
    shouldShowPagination,
    searchStartIndex,
    searchPaginatedVendors,
    endIndex: searchStartIndex + pagination.itemsPerPage,
    hasDataOnCurrentPage: searchPaginatedVendors.length > 0,
  });

  useEffect(() => {
    const fetchVendorRevenueData = async () => {
      setLoading(true);
      try {
        const response = await bookingsService.getAllVendorRevenue();
        if (response.success) {
          setVendorList(response.data);
        } else {
          console.error("Failed to fetch vendor revenue data:", response.error);
        }
      } catch (error) {
        console.error("Error fetching vendor revenue data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVendorRevenueData();
  }, []);

  // Handle page change
  const handlePageChange = (page: number) => {
    console.log("Changing to page:", page);
    setCurrentPage(page);
  };

  // Show skeleton while loading
  if (loading) {
    return <TableSkeleton />;
  }

  // Empty state component
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Search className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {searchTerm ? "No vendors found" : "No vendors available"}
      </h3>
      <p className="text-gray-500 text-center max-w-md">
        {searchTerm
          ? `No vendors match your search for "${searchTerm}". Try adjusting your search terms.`
          : "There are currently no vendors in the system."}
      </p>
    </div>
  );

  return (
    <div className="w-full my-4">
      {/* Desktop Table - Hidden on small screens */}
      <div className="hidden md:block">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Vendors</h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#7B7B7B] w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search for vendor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 outline-none border border-[#D0D0D0] rounded-[8px] text-[#7B7B7B] font-normal focus:ring-2 focus:border-transparent w-64"
                />
              </div>
            </div>
          </div>

          {searchPaginatedVendors.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Vendor Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Representative
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Events
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Bookings
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Revenue
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {searchPaginatedVendors.map((vendor) => (
                      <tr key={vendor.name} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {vendor.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {vendor.representative}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {vendor.totalEvents}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {vendor.totalBookings}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          £{vendor.revenue}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination for Desktop */}
              {shouldShowPagination && (
                <div className="px-6 py-4 border-t border-gray-200">
                  <PaginationComponent
                    currentPage={pagination.currentPage}
                    totalPages={displayTotalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>

      {/* Mobile Card Layout - Hidden on large screens */}
      <div className="md:hidden max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Vendors</h2>
          </div>

          {searchPaginatedVendors.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Organization
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Bookings
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Revenue
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {searchPaginatedVendors.map((vendor) => (
                      <tr key={vendor.name} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {vendor.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {vendor.totalBookings}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          £{vendor.revenue}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination for Mobile */}
              {shouldShowPagination && (
                <div className="px-6 py-4 border-t border-gray-200">
                  <PaginationComponent
                    currentPage={pagination.currentPage}
                    totalPages={displayTotalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </div>
  );
};

export default RevenueVendorTable;
