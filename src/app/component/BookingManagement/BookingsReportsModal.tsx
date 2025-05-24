import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { X, Filter } from "lucide-react";
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
  const { closeReportModalModal } = useBookingStore();

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
    <div className="fixed inset-0 bg-white/30 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="relative h-screen">
        <div className="bg-white rounded-lg shadow-2xl w-full md:w-[50vw] absolute top-0 bottom-0 left-0">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-2xl font-bold text-[#303237]">
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

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            <div className="flex items-center justify-between mb-6">
              <div className="text-[20px] font-medium text-[#303237]">
                Feb 8 - Feb 14
              </div>
              <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                <Filter size={16} />
                Filter
              </button>
            </div>

            <div className="flex items-center gap-5">
              <div className="">
                <h3 className="text-[#7E8494] text-[14px] font-normal">
                  Total Bookings
                </h3>
                <p className="text-2xl font-bold text-gray-900">
                  {totalBookings}
                </p>
              </div>
              <div className="">
                <h3 className="text-[#7E8494] text-[14px] font-normal">
                  Cancellations
                </h3>
                <p className="text-2xl font-bold text-gray-900">
                  {completedBookings}
                </p>
              </div>
              <div className="">
                <h3 className="text-[#7E8494] text-[14px] font-normal">
                  Revenue
                </h3>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(totalRevenue)}
                </p>
              </div>
            </div>

            <div className="mb-8 w-[100%]">
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{ left: 40, right: 20, top: 20, bottom: 20 }}
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
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-0 text-sm font-medium text-gray-500">
                        Name
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                        Date
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                        Status
                      </th>
                      <th className="text-right py-3 px-0 text-sm font-medium text-gray-500">
                        Revenue
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookingsData.map((booking) => (
                      <tr key={booking.id} className="border-b border-gray-100">
                        <td className="py-4 px-0 text-sm text-gray-900">
                          {booking.name}
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-500">
                          {formatDate(booking.date)}
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`inline-flex px-2 py-1 text-xs text-[#303237] font-medium rounded-full `}
                          >
                            {booking.status}
                          </span>
                        </td>
                        <td className="py-4 px-0 text-sm text-gray-900 text-right">
                          {formatCurrency(booking.revenue)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
            <div className="flex justify-end">
              <button className="flex items-center rounded-[12px] gap-2 px-4 py-2 bg-[#2853A6] text-white text-sm font-medium cursor-pointer hover:bg-blue-700 transition-colors">
                <Image
                  src={SVGAssets.ReportIcon}
                  className=""
                  width={19}
                  height={19}
                  alt="Report"
                />
                <span className="">Download Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingsReportsModal;
