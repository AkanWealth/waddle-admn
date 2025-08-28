import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { X } from "lucide-react";
import { useBookingStore } from "@/stores/useBookingStore";
import Image from "next/image";
import SVGAssets from "@/assets/svg";
import { useEffect, useMemo, useState } from "react";
import { bookingsService } from "@/utils/bookingService";
import ReportBookingFilter from "./ReportBookingFilter";
import StatusBadge from "../PaymentManagement/StatusBadge.jsx";
import { formatTime } from "../UserManagement/DeletedUsers";

type VendorBookingDataType = {
  id: number;
  name: string;
  date: string;
  status: "Completed" | "Cancelled" | "Pending";
  revenue: number;
  createdAt: string;
};

type FilterState = {
  vendor: string;
  dateRange: string;
  status: string;
};

const BookingsReportsModal: React.FC = () => {
  const { closeReportModalModal, isReportModalOpen, openDownloadReportModal } =
    useBookingStore();

  const [vendorsBookingData, setvendorsBookingData] = useState([]);
  const [isMainFilterOpen, setIsMainFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    vendor: "",
    dateRange: "",
    status: "",
  });

  useEffect(() => {
    const fetchVendorRevenueData = async () => {
      const result = await bookingsService.getAllVendorBooking();
      console.log(result.data, "This is the result of the api call");
      if (result.success) {
        setvendorsBookingData(result.data);
      } else {
        console.error("Failed to fetch vendor revenue data:", result.error);
      }
    };
    fetchVendorRevenueData();
  }, []);

  // Date label reflects selected filter range; defaults to last 3 months
  const headerDateLabel = useMemo(() => {
    const fmt = (d: Date) =>
      d.toLocaleString("en-US", { month: "short" }) + " " + d.getDate();

    if (filters.dateRange && filters.dateRange.includes(" - ")) {
      try {
        const [startDateStr, endDateStr] = filters.dateRange.split(" - ");
        const [startMonth, startDay, startYear] = startDateStr.split("/");
        const [endMonth, endDay, endYear] = endDateStr.split("/");
        const start = new Date(
          parseInt(startYear),
          parseInt(startMonth) - 1,
          parseInt(startDay)
        );
        const end = new Date(
          parseInt(endYear),
          parseInt(endMonth) - 1,
          parseInt(endDay)
        );
        return `${fmt(start)} - ${fmt(end)}`;
      } catch {
        // fall through to default
      }
    }

    const end = new Date();
    const start = new Date();
    start.setMonth(start.getMonth() - 3);
    return `${fmt(start)} - ${fmt(end)}`;
  }, [filters.dateRange]);

  const filteredVendorsBookingData: VendorBookingDataType[] = useMemo(() => {
    console.log(
      vendorsBookingData,
      "This is the vendors booking data sent from the modal our api"
    );
    return vendorsBookingData.filter((booking: VendorBookingDataType) => {
      const matchesStatus =
        !filters.status ||
        booking.status.toLowerCase() === filters.status.toLowerCase();

      const matchesVendor =
        !filters.vendor ||
        booking.name.toLowerCase().includes(filters.vendor.toLowerCase());

      const matchesDateRange = (() => {
        if (!filters.dateRange || !filters.dateRange.includes(" - "))
          return true;
        try {
          const [startDateStr, endDateStr] = filters.dateRange.split(" - ");
          const [startMonth, startDay, startYear] = startDateStr.split("/");
          const [endMonth, endDay, endYear] = endDateStr.split("/");
          const filterStartDate = new Date(
            parseInt(startYear),
            parseInt(startMonth) - 1,
            parseInt(startDay)
          );
          const filterEndDate = new Date(
            parseInt(endYear),
            parseInt(endMonth) - 1,
            parseInt(endDay)
          );
          filterEndDate.setHours(23, 59, 59, 999);
          const bookingDate = new Date(booking.date);
          return bookingDate >= filterStartDate && bookingDate <= filterEndDate;
        } catch (e) {
          console.error("Error parsing date range in report modal:", e);
          return true;
        }
      })();

      return matchesStatus && matchesVendor && matchesDateRange;
    });
  }, [vendorsBookingData, filters.vendor, filters.status, filters.dateRange]);

  const totalBookings = filteredVendorsBookingData.length;
  console.log(
    JSON.stringify(vendorsBookingData),
    "This is the vendors bookinng data"
  );
  const totalRevenue = filteredVendorsBookingData.reduce(
    (sum, booking: VendorBookingDataType) =>
      booking.status === "Completed" ? sum + booking.revenue : sum,
    0
  );
  const completedBookings = filteredVendorsBookingData.filter(
    (booking: VendorBookingDataType) => booking.status == "Cancelled"
  ).length;

  const formatCurrency = (amount: number) => {
    return `£${amount.toLocaleString()}`;
  };

  const formatYAxisCurrency = (value: number) => {
    return `£${value.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  // Build chart series: ensure months with zero values appear inside the selected range
  const chartData = (() => {
    const monthTotals = new Map<string, number>();
    const monthLabel = (d: Date) =>
      d.toLocaleString("en-GB", { month: "short" });
    const ymKey = (d: Date) =>
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;

    // Sum revenue for Completed bookings per year-month
    filteredVendorsBookingData.forEach((booking: VendorBookingDataType) => {
      if (booking.status !== "Completed") return;
      const d = new Date(booking.date);
      const key = ymKey(d);
      monthTotals.set(key, (monthTotals.get(key) || 0) + booking.revenue);
    });

    // Determine the range to display: either from filters.dateRange or from data min/max
    let rangeStart: Date | null = null;
    let rangeEnd: Date | null = null;

    if (filters.dateRange && filters.dateRange.includes(" - ")) {
      try {
        const [startDateStr, endDateStr] = filters.dateRange.split(" - ");
        const startParts = startDateStr.split("/");
        const endParts = endDateStr.split("/");
        const startMonth = startParts[0];
        const startYear = startParts[2];
        const endMonth = endParts[0];
        const endYear = endParts[2];
        rangeStart = new Date(parseInt(startYear), parseInt(startMonth) - 1, 1);
        rangeEnd = new Date(parseInt(endYear), parseInt(endMonth) - 1, 1);
      } catch {
        rangeStart = null;
        rangeEnd = null;
      }
    }

    if (!rangeStart || !rangeEnd) {
      // Default to the same window as headerDateLabel (3 months ago to now, inclusive)
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth() - 3, 1);
      const end = new Date(now.getFullYear(), now.getMonth(), 1);
      rangeStart = start;
      rangeEnd = end;
    }

    // Iterate month by month from start to end, populating zeros where needed
    const series: { month: string; revenue: number }[] = [];
    const cursor = new Date(rangeStart.getFullYear(), rangeStart.getMonth(), 1);
    const endCursor = new Date(rangeEnd.getFullYear(), rangeEnd.getMonth(), 1);

    while (cursor <= endCursor) {
      const key = ymKey(cursor);
      const revenue = monthTotals.get(key) || 0;
      series.push({ month: monthLabel(cursor), revenue });
      cursor.setMonth(cursor.getMonth() + 1);
    }

    return series;
  })();

  const toggleMainFilter = () => {
    setIsMainFilterOpen(!isMainFilterOpen);
  };

  const handleApplyFilter = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      vendor: "",
      dateRange: "",
      status: "",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-end">
      <div
        className={`w-full lg:w-1/2 h-full bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isReportModalOpen
            ? "animate-slide-in-right"
            : "animate-slide-out-right"
        } `}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between py-2 px-4 border-b border-gray-200 flex-shrink-0">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#303237]">
                Bookings report
              </h2>
              <p className="text-sm text-[#7E8494] mt-1">
                This is the report of all bookings. Available for download in
                CSV and PDF
              </p>
            </div>
            <button
              onClick={closeReportModalModal}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-4 md:p-6 overflow-y-auto flex-1 relative">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
              <div className="text-base md:text-lg font-medium text-[#303237]">
                {headerDateLabel}
              </div>
              <button
                className="flex items-center px-3 py-2 border border-[#D0D0D0] rounded-[8px] text-[#7B7B7B] text-sm"
                onClick={toggleMainFilter}
              >
                <span className="mr-2">Filter</span>
              </button>
            </div>

            <ReportBookingFilter
              isOpen={isMainFilterOpen}
              onClose={toggleMainFilter}
              filters={filters}
              onApplyFilter={handleApplyFilter}
              onClearFilters={handleClearFilters}
            />

            <div className="flex flex-wrap gap-5 my-6">
              <div>
                <h3 className="text-[#7E8494] text-sm font-normal">
                  Total Bookings
                </h3>
                <p className="text-xl font-bold text-gray-900">
                  {totalBookings}
                </p>
              </div>
              <div>
                <h3 className="text-[#7E8494] text-sm font-normal">
                  Cancellations
                </h3>
                <p className="text-xl font-bold text-gray-900">
                  {completedBookings}
                </p>
              </div>
              <div>
                <h3 className="text-[#7E8494] text-sm font-normal">Revenue</h3>
                <p className="text-xl font-bold text-gray-900">
                  {formatCurrency(totalRevenue)}
                </p>
              </div>
            </div>

            <div className="mb-8 w-full">
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{ left: 20, right: 20, top: 20, bottom: 20 }}
                  >
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#6B7280" }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#6B7280" }}
                      tickFormatter={formatYAxisCurrency}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: "#3B82F6" }}
                    />
                    <Tooltip
                      formatter={(value) => [
                        formatYAxisCurrency(Number(value)),
                        "Revenue",
                      ]}
                      labelFormatter={(label) => `${label}`}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Bookings
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">
                        Event Name
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">
                        Date
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">
                        Time
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">
                        Status
                      </th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-gray-500">
                        Revenue
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredVendorsBookingData?.map(
                      (booking: VendorBookingDataType) => (
                        <tr
                          key={booking.id}
                          className="border-b border-gray-100"
                        >
                          <td className="py-4 px-2 text-sm text-gray-900">
                            {booking?.name}
                          </td>
                          <td className="py-4 px-2 text-sm text-gray-500">
                            {formatDate(booking.date)}
                          </td>
                          <td className="py-4 px-2 text-sm text-gray-500">
                            {formatTime(booking.createdAt)}
                          </td>
                          <td className="py-4 px-2">
                            <StatusBadge
                              status={
                                booking.status === "Completed"
                                  ? "Confirmed"
                                  : booking.status
                              }
                            />
                          </td>
                          <td className="py-4 px-2 text-sm text-gray-900 text-right">
                            {formatCurrency(booking.revenue)}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-4 bg-gray-50 flex-shrink-0">
            <div className="flex justify-end">
              <button
                onClick={openDownloadReportModal}
                className="flex items-center rounded-[12px] gap-2 px-4 py-2 bg-[#2853A6] text-white text-sm font-medium cursor-pointer hover:bg-blue-700 transition-colors"
              >
                <Image
                  src={SVGAssets.ReportIcon}
                  width={19}
                  height={19}
                  alt="Report"
                />
                <span>Download Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        @keyframes slide-out-right {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(100%);
          }
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-in-out forwards;
        }
        .animate-slide-out-right {
          animation: slide-out-right 0.3s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default BookingsReportsModal;
