import React from "react";
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Users,
  Phone,
  Mail,
  CircleCheck,
} from "lucide-react";
import { useBookingStore } from "@/stores/useBookingStore";
import { GuardianDetailsData } from "./SampleData";
import GuardianDetailsModal from "./GuardianDetailsModal";
import Image from "next/image";
import SVGAssets from "@/assets/svg";

const BookingDetailsModal = () => {
  const {
    isOpenBookingDetails,
    closeBookingDetailsModal,
    openGuardianDetailsModal,
    isOpenGuardianDetails,
  } = useBookingStore();

  if (!isOpenBookingDetails) return;

  return (
  <div className="fixed inset-0 modal-backdrop flex items-center justify-center p-4  z-50">
      <div className="bg-white rounded-lg shadow-xl my-4 max-w-[700px] w-full max-h-screen overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900"></h2>
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
            <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center gap-1.5">
              <CircleCheck className="w-4 h-4" />
              <span className="">Paid</span>
            </div>
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
            <div className="flex items-center text-sm gap-2">
              <Image
                src={SVGAssets.PricePerIcon}
                className=""
                alt="Price per icon"
                width={20}
                height={20}
              />
              <span className="text-gray-600">£20/person</span>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg space-y-2">
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
              <button
                onClick={openGuardianDetailsModal}
                className="text-blue-600 text-sm hover:text-blue-800"
              >
                See all
              </button>
            </div>

            <div className="w-full">
              <div className="grid grid-cols-5 gap-2 text-sm font-semibold text-gray-800 py-3 px-3 bg-gray-200 rounded-t border-b">
                <div>Guardian Name</div>
                <div>Email</div>
                <div>Phone</div>
                <div>Children</div>
                <div className="text-center">Count</div>
              </div>

              <div className="space-y-1">
                {GuardianDetailsData.map((guardian, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-5 gap-2 text-sm text-gray-700 py-3 px-3 bg-white hover:bg-gray-50 border-b border-gray-100 transition-colors"
                  >
                    <div className="font-medium text-gray-900">
                      {guardian.name}
                    </div>
                    <div className="text-gray-600 break-all">
                      {guardian.email}
                    </div>
                    <div className="text-gray-600">{guardian.phone}</div>
                    <div className="text-gray-600">
                      {guardian.children || "N/A"}
                    </div>
                    <div className="text-center font-medium">
                      {guardian.count}
                    </div>
                  </div>
                ))}
              </div>

              {GuardianDetailsData.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No guardian data available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isOpenGuardianDetails && <GuardianDetailsModal />}
    </div>
  );
};

export default BookingDetailsModal;
