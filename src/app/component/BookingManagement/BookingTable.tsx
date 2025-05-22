import React from 'react';
import { IBooking } from './IBooking';

interface BookingTableProps {
  bookings: IBooking[];
  getStatusBadge: (status: string) => string;
}

const BookingTable: React.FC<BookingTableProps> = ({ bookings, getStatusBadge }) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Name</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organiser Name</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {bookings.map((booking, index) => (
          <tr key={index} className="hover:bg-gray-50">
            <td className="px-6 py-4 text-sm font-medium text-gray-900">{booking.eventName}</td>
            <td className="px-6 py-4 text-sm text-gray-500">{booking.id}</td>
            <td className="px-6 py-4 text-sm text-gray-500">{booking.organiser}</td>
            <td className="px-6 py-4 text-sm text-gray-500">{booking.date}</td>
            <td className="px-6 py-4">
              <span className={getStatusBadge(booking.status)}>{booking.status}</span>
            </td>
            <td className="px-6 py-4 text-sm text-blue-600">
              <button className="hover:text-blue-800">View Details</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default BookingTable;
