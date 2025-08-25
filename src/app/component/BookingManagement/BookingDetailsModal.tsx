import React, { useState, useEffect } from "react";
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Users,
  Phone,
  Mail,
  CircleCheck,
  CircleX,
} from "lucide-react";
import { useBookingStore } from "@/stores/useBookingStore";
// import { GuardianDetailsData } from "./SampleData";
// import GuardianDetailsModal from "./GuardianDetailsModal";
import Image from "next/image";
import SVGAssets from "@/assets/svg";
import formatCustomDate from "@/lib/formatDate";
import { GuardianDetailsTableSkeleton } from "../Element/LoadingSpinner";
import { bookingsService } from "@/utils/bookingService";

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

const BookingDetailsModal = () => {
  const {
    getStatusBadge,
    selectedEvent,
    isOpenBookingDetails,
    closeBookingDetailsModal,
    // openGuardianDetailsModal,
    // isOpenGuardianDetails,
  } = useBookingStore();

  // State for guardian data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [guardianData, setGuardianData] = useState<any[]>([]);
  const [isLoadingGuardians, setIsLoadingGuardians] = useState(false);
  const [guardianError, setGuardianError] = useState<string | null>(null);

  // Fetch guardian data when modal opens
  useEffect(() => {
    if (isOpenBookingDetails && selectedEvent?.id) {
      fetchGuardianData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenBookingDetails, selectedEvent?.id]);

  const fetchGuardianData = async () => {
    if (!selectedEvent?.id) return;

    setIsLoadingGuardians(true);
    setGuardianError(null);

    try {
      const response = await bookingsService.getAllBookingConsent(
        selectedEvent.id
      );
      if (response.success) {
        setGuardianData(response.data?.consent || []);
      } else {
        setGuardianError(response.error || "Failed to fetch guardian data");
        setGuardianData([]);
      }
    } catch (error) {
      console.error("Error fetching guardian data:", error);
      setGuardianError("Failed to fetch guardian data");
      setGuardianData([]);
    } finally {
      setIsLoadingGuardians(false);
    }
  };

  if (!isOpenBookingDetails) return;
  if (!selectedEvent) return;

  console.log(selectedEvent?.status);

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
              {selectedEvent?.event.name}
            </h3>
            <div
              className={`${getStatusBadge(
                selectedEvent?.status as string
              )} flex items-center gap-1`}
            >
              {renderStatusIcon(selectedEvent?.status as string)}
              <span className="">{selectedEvent?.status}</span>
            </div>
          </div>

          <h3 className="text-sm text-gray-600">
            {selectedEvent?.event.category}
          </h3>

          <p className="text-sm text-gray-700">
            {selectedEvent?.event.description}
          </p>

          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-sm text-gray-700">
              <Calendar size={16} className="text-gray-400" />
              <span>
                {formatCustomDate(selectedEvent.event.date, "DD-MM-YYYY")}
              </span>
            </div>

            <div className="flex items-center space-x-3 text-sm text-gray-700">
              <Clock size={16} className="text-gray-400" />
              <span>{selectedEvent.event.time}</span>
            </div>

            <div className="flex items-center space-x-3 text-sm text-gray-700">
              <MapPin size={16} className="text-gray-400" />
              <span>{selectedEvent.event.address}</span>
            </div>

            <div className="flex items-center space-x-3 text-sm text-gray-700">
              <Users size={16} className="text-gray-400" />
              <span>{selectedEvent.event.age_range}</span>
            </div>
            <div className="flex items-center text-sm gap-2">
              <Image
                src={SVGAssets.PricePerIcon}
                className=""
                alt="Price per icon"
                width={20}
                height={20}
              />
              <span className="text-gray-600">
                £{selectedEvent.event.price}/person
              </span>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tickets booked</span>
              <span className="text-gray-600 font-semibold">
                {selectedEvent.ticket_quantity}
              </span>
            </div>
            <div className="flex justify-between text-sm font-semibold">
              <span className="text-gray-900">Total revenue</span>
              <span className="text-gray-900">
                £
                {(
                  selectedEvent.event.price * selectedEvent.ticket_quantity
                ).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">
              Organizer
            </h4>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10  rounded-full flex items-center justify-center">
                <Image
                  src={
                    selectedEvent?.event?.organiser?.business_logo
                      ? `https://waddleapp-bucket.s3.eu-north-1.amazonaws.com/vendors/${selectedEvent.event.organiser.business_logo}`
                      : selectedEvent?.event?.adminId
                      ? selectedEvent?.event?.admin?.avatarUrl
                      : "/Avatar.jpg"
                  }
                  alt="Organiser logo"
                  width={50}
                  height={50}
                  className="h-full w-full rounded-full"
                  unoptimized
                />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">
                  {selectedEvent?.event?.organiser?.business_name || "Waddle"}
                </div>
                <div className="text-sm text-gray-600">
                  {selectedEvent?.event?.organiser?.name || selectedEvent?.event?.admin?.first_name + " " + selectedEvent?.event?.admin?.last_name}
                </div>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail size={14} />
                <span>{selectedEvent?.event?.organiser?.email || selectedEvent?.event?.admin?.email}</span>
              </div>
              {
                selectedEvent?.event?.organiser?.phone_number && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone size={14} />
                    <span>{selectedEvent?.event?.organiser?.phone_number}</span>
                  </div>
                )
              }
              {
                selectedEvent?.event?.admin?.phone_number && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone size={14} />
                    <span>{selectedEvent?.event?.admin?.phone_number}</span>
                  </div>
                )
              }
              
              
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-gray-900">
                Guardian details
              </h4>
              {/* <button
                onClick={openGuardianDetailsModal}
                className="text-blue-600 text-sm hover:text-blue-800"
              >
                See all
              </button> */}
            </div>

            <div className="w-full">
              <div className="grid grid-cols-5 gap-2 text-sm font-semibold text-gray-800 py-3 px-3 bg-gray-200 rounded-t border-b">
                <div>Guardian Name</div>
                <div>Email</div>
                <div>Phone</div>
                <div>Children</div>
                <div className="text-center">Age</div>
              </div>

              <div className="space-y-1">
                {isLoadingGuardians ? (
                  <GuardianDetailsTableSkeleton />
                ) : guardianError ? (
                  <div className="text-center py-8 text-red-500">
                    {guardianError}
                  </div>
                ) : guardianData.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No guardian data available
                  </div>
                ) : (
                  guardianData.map((guardian, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-5 gap-2 text-sm text-gray-700 py-3 px-3 bg-white hover:bg-gray-50 border-b border-gray-100 transition-colors"
                    >
                      <div className="font-medium text-gray-900">
                        {selectedEvent.user.name}
                      </div>
                      <div className="text-gray-600 break-all">
                        {selectedEvent.user.email}
                      </div>
                      <div className="text-gray-600">
                        {selectedEvent.user.phone_number || "NA"}
                      </div>
                      <div className="text-gray-600">
                        {guardian.name || "N/A"}
                      </div>
                      <div className="text-center font-medium">
                        {guardian.age}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {isOpenGuardianDetails && <GuardianDetailsModal />} */}
    </div>
  );
};

export default BookingDetailsModal;
