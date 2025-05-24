import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { X, Filter, Mail, Phone, House, Globe } from "lucide-react";
import { useBookingStore } from "@/stores/useBookingStore";
import Image from "next/image";
import SVGAssets from "@/assets/svg";

const chartData = [
  { month: "Feb", revenue: 20000 },
  { month: "Mar", revenue: 45000 },
  { month: "Apr", revenue: 25000 },
  { month: "May", revenue: 35000 },
  { month: "Jun", revenue: 50000 },
  { month: "Jul", revenue: 30000 },
  { month: "Aug", revenue: 55000 },
];

const bookingsData = [
  {
    id: 1,
    name: "Kids 123",
    date: "2024-07-02",
    status: "Completed",
    revenue: 1200,
  },
  {
    id: 2,
    name: "Learn xyz",
    date: "2024-08-10",
    status: "Cancelled",
    revenue: 3800,
  },
  {
    id: 3,
    name: "Pronunciation",
    date: "2024-09-12",
    status: "Completed",
    revenue: 4200,
  },
  {
    id: 4,
    name: "Lion Bear",
    date: "2024-12-25",
    status: "Completed",
    revenue: 2800,
  },
  {
    id: 5,
    name: "White Mouse",
    date: "2024-11-18",
    status: "Cancelled",
    revenue: 4000,
  },
];

const BookingsReportsModal: React.FC = () => {
  const { closeReportModalModal, isReportModalOpen, openDownloadReportModal } = useBookingStore();

  

  const totalBookings = bookingsData.length;
  const totalRevenue = bookingsData.reduce(
    (sum, booking) => sum + booking.revenue,
    0
  );
  const completedBookings = bookingsData.filter(
    (booking) => booking.status === "Completed"
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

          <div className="p-4 md:p-6 overflow-y-auto flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
              <div className="text-base md:text-lg font-medium text-[#303237]">
                Feb 8 - Feb 14
              </div>
              <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                <Filter size={16} />
                Filter
              </button>
            </div>

            <div className="flex flex-col gap-1 my-2.5">
              <h3 className="text-[#303237] font-semibold">ABC Events</h3>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex items-center gap-1">
                  <Mail height={14} className="text-sm text-[#404040]" />
                  <span className="text-sm text-[#404040]">
                    mary@abcorg.com
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone height={14} className="text-sm text-[#404040]" />
                  <span className="text-sm text-[#404040]">+4498274774</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex items-center gap-1">
                  <House height={14} className="text-sm text-[#404040]" />
                  <span className="text-sm text-[#404040]">
                    362 Sycamore St, Detroit, MI
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe height={14} className="text-sm text-[#404040]" />
                  <span className="text-sm text-[#404040]">www.abcorg.com</span>
                </div>
              </div>
            </div>

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
                        Name
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">
                        Date
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
                    {bookingsData.map((booking) => (
                      <tr key={booking.id} className="border-b border-gray-100">
                        <td className="py-4 px-2 text-sm text-gray-900">
                          {booking.name}
                        </td>
                        <td className="py-4 px-2 text-sm text-gray-500">
                          {formatDate(booking.date)}
                        </td>
                        <td className="py-4 px-2">
                          <span className="inline-flex px-2 py-1 text-xs text-[#303237] font-medium rounded-full">
                            {booking.status}
                          </span>
                        </td>
                        <td className="py-4 px-2 text-sm text-gray-900 text-right">
                          {formatCurrency(booking.revenue)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-4 bg-gray-50 flex-shrink-0">
            <div className="flex justify-end">
              <button  onClick={openDownloadReportModal} className="flex items-center rounded-[12px] gap-2 px-4 py-2 bg-[#2853A6] text-white text-sm font-medium cursor-pointer hover:bg-blue-700 transition-colors">
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
