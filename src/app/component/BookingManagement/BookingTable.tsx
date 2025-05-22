import React from "react";
import { IBooking } from "./IBooking";
import { CircleCheck, Clock, CircleX } from "lucide-react";

interface BookingTableProps {
  bookings: IBooking[];
  getStatusBadge: (status: string) => string;
}

const renderStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case "confirmed":
      return <CircleCheck className="h-[16px] w-[16px]" />;
    case "pending":
      return <Clock className="h-[16px] w-[16px]" />;
    case "closed":
    case "cancelled":
    case "canceled":
      return <CircleX className="h-[16px] w-[16px]" />;
    default:
      return null;
  }
};

const BookingTable: React.FC<BookingTableProps> = ({
  bookings,
  getStatusBadge,
}) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead className="bg-[#F7F7F7]">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Event Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Booking ID
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Organiser Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Date
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {bookings.map((booking, index) => (
          <tr key={booking.id} className={`${
            index % 2 !== 0 ? "bg-[#F7F7F7]" : ""
          } hover:bg-gray-100 transition-colors`}>
            <td className="px-6 py-4 text-sm font-medium text-[#303237] font-inter ">
              {booking.eventName}
            </td>
            <td className="px-6 py-4 font-normal text-sm text-[#515151]">
              {booking.id}
            </td>
            <td className="px-6 py-4 font-normal text-sm text-[#515151]">
              {booking.organiser}
            </td>
            <td className="px-6 py-4 font-normal text-sm text-[#515151] text-nowrap">
              {booking.date}
            </td>

            <td className="px-6 py-4 ">
              <div className={getStatusBadge(booking.status)}>
                {renderStatusIcon(booking.status)}
                <span className="text-sm ">{booking.status}</span>
              </div>
            </td>
            <td className="px-6 py-4 text-base font-medium text-[#2853A6]">
              <button className="hover:text-blue-800 text-nowrap">
                View Details
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default BookingTable;
