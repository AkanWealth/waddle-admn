import React from "react";
import { X, Calendar, Clock, MapPin, Users, Phone, Mail } from "lucide-react";
import { useBookingStore } from "@/stores/useBookingStore";
import { GuardianDetailsData } from "./SampleData";

const BookingDetailsModal = () => {
  const {
    isOpenBookingDetails,
    closeBookingDetailsModal,
  } = useBookingStore();

  if (!isOpenBookingDetails)  return;

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-xs flex items-center justify-center p-4  z-50">
      <div className="bg-white rounded-lg shadow-xl my-4 max-w-md w-full max-h-screen overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
          </h2>
          <button
            onClick={closeBookingDetailsModal}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">
              Kid Timeout with Jane
            </h3>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              Paid
            </span>
          </div>

          <h3 className="text-sm text-gray-600">XYZ Events</h3>

          <p className="text-sm text-gray-700">
            Designed to teach and train family both parents and children to
            communicate effectively. Bring your kids let us train them to be
            professionals from foundation.
          </p>

          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-sm text-gray-700">
              <Calendar size={16} className="text-gray-400" />
              <span>14th February 2024</span>
            </div>

            <div className="flex items-center space-x-3 text-sm text-gray-700">
              <Clock size={16} className="text-gray-400" />
              <span>8am - 2pm</span>
            </div>

            <div className="flex items-center space-x-3 text-sm text-gray-700">
              <MapPin size={16} className="text-gray-400" />
              <span>Viveton, 6 miles away</span>
            </div>

            <div className="flex items-center space-x-3 text-sm text-gray-700">
              <Users size={16} className="text-gray-400" />
              <span>2-10 years old</span>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">£20/person</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tickets booked</span>
              <span className="font-semibold">340</span>
            </div>
            <div className="flex justify-between text-sm font-semibold">
              <span className="text-gray-900">Total revenue</span>
              <span className="text-gray-900">£6,800</span>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">
              Organizer
            </h4>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 text-xs font-semibold">
                  XYZ
                </span>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">
                  XYZ Events
                </div>
                <div className="text-sm text-gray-600">Mary Jane</div>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail size={14} />
                <span>xyz@sendgrid.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone size={14} />
                <span>+448674774</span>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-gray-900">
                Guardian details
              </h4>
              <button className="text-blue-600 text-sm hover:text-blue-800">
                See all
              </button>
            </div>

            <div className="grid grid-cols-5 gap-2 text-xs font-medium text-gray-500 mb-2 px-2">
              <span>Guardian Name</span>
              <span>Email</span>
              <span>Children Name</span>
              <span>Children</span>
              <span></span>
            </div>

            <div className="space-y-2">
              {GuardianDetailsData.map((guardian, index) => (
                <div
                  key={index}
                  className="grid grid-cols-5 gap-2 text-xs text-gray-700 py-2 px-2 bg-gray-50 rounded"
                >
                  
                    
                  <div className="font-medium">{guardian.name}</div>
                  <div className="text-gray-500">{guardian.email}</div>
                  <div className="text-gray-500">{guardian.phone}</div>
                  <div>{guardian.children || guardian.child}</div>
                  <div className="text-center">{guardian.count}</div>
                  
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModal;
