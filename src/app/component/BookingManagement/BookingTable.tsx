import React from "react";
import { IBooking } from "./IBooking";
import { CircleCheck, Clock, CircleX } from "lucide-react";
import { useBookingStore } from "@/stores/useBookingStore";

interface BookingTableProps {
  bookings: IBooking[];
  getStatusBadge: (status: string) => string;
}

const renderStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case "confirmed":
      return <CircleCheck className="h-4 w-4" />;
    case "pending":
      return <Clock className="h-4 w-4" />;
    case "closed":
    case "cancelled":
    case "canceled":
      return <CircleX className="h-4 w-4" />;
    default:
      return null;
  }
};

const BookingTable: React.FC<BookingTableProps> = ({
  bookings,
  getStatusBadge,
}) => {
  const {
    openBookingDetailsModal,
  } = useBookingStore();
  return(
<div className="overflow-x-auto w-full">
    <table className="w-full table-auto border-collapse">
      <thead className="bg-[#F7F7F7] hidden md:table-header-group">
        <tr>
          {["Event Name", "Booking ID", "Organiser Name", "Date", "Status", "Actions"].map((heading) => (
            <th
              key={heading}
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {heading}
            </th>
          ))}
        </tr>
       </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {bookings.map((booking, index) => (
          <tr
            key={booking.id}
            className={`${
              index % 2 !== 0 ? "bg-[#F7F7F7]" : ""
            } hover:bg-gray-100 transition-colors md:table-row block w-full mb-4 md:mb-0`}
          >
            <td className="px-4 py-2 md:py-4 text-sm font-medium text-[#303237] font-inter md:table-cell block">
              <span className="font-semibold block md:hidden">Event Name:</span>
              {booking.eventName}
            </td>
            <td className="px-4 py-2 md:py-4 font-normal text-sm text-[#515151] md:table-cell block">
              <span className="font-semibold block md:hidden">Booking ID:</span>
              {booking.id}
            </td>
            <td className="px-4 py-2 md:py-4 font-normal text-sm text-[#515151] md:table-cell block">
              <span className="font-semibold block md:hidden">Organiser Name:</span>
              {booking.organiser}
            </td>
            <td className="px-4 py-2 md:py-4 font-normal text-sm text-[#515151] text-nowrap md:table-cell block">
              <span className="font-semibold block md:hidden">Date:</span>
              {booking.date}
            </td>
            <td className="px-4 py-2 md:py-4 md:table-cell block">
              <span className="font-semibold block md:hidden">Status:</span>
              <div className={`${getStatusBadge(booking.status)} flex items-center gap-1`}>
                {renderStatusIcon(booking.status)}
                <span className="text-sm">{booking.status}</span>
              </div>
            </td>
            <td className="px-4 py-2 md:py-4 text-base font-medium text-[#2853A6] md:table-cell block">
              <button 
              onClick={openBookingDetailsModal}
              
              className="hover:text-blue-800 text-nowrap">View Details</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
}
  

export default BookingTable;
