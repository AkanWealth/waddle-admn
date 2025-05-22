import React from "react";
import { X, Calendar, Clock, MapPin, Users, Phone, Mail } from "lucide-react";
import { useBookingStore } from "@/stores/useBookingStore";

const BookingDetailsModal = () => {
  const {
    isOpenBookingDetails,
    openBookingDetailsModal,
    closeBookingDetailsModal,
  } = useBookingStore();

  if (!isOpenBookingDetails) {
    return (
      <div className="p-8">
        <button
          onClick={openBookingDetailsModal}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Open Booking Modal
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-xs flex items-center justify-center p-4  z-50">
     
    </div>
  );
};

export default BookingDetailsModal;
