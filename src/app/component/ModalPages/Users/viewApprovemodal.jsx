"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import BaseModal from "../../Element/BaseModal";
import StatusBadge from "../../UserManagement/StatusBadge";
import SuspendVendorModal from "./suspendVendor";
import ActivateVendorModal from "./activateVendor";
import EnableVendorModal from "./EnableVendor";
import { InfoIcon, Phone, Mail, MapPin, Globe, Loader2 } from "lucide-react";
import { userService } from "@/utils/userService";
import formatCustomDate from "@/lib/formatDate";
import { useToastContext } from "@/context/toast";
import { getFileType } from "@/lib/getFileType";

const VendorApproveDetailsModal = ({
  vendor,
  isOpen,
  onClose,
  onApprove,
  onReject,
  onStatusChange, // <-- Add this prop
}) => {
  const { showMessage } = useToastContext();
  const [modals, setModals] = useState({
    suspend: false,
    activate: false,
    enable: false,
  });
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [prevEvents, setPrevEvents] = useState([]);
const [eventStats, setEventStats] = useState({
  totalEventsCreated: 0,
  upcomingEvents: 0,
  pastEvents: 0,
  totalAttendees: 0,
});
  console.log(vendor, "This is the vendor")
  const [loadingEvents, setLoadingEvents] = useState(false); // NEW


useEffect(() => {
  if (!vendor) return;

  const fetchPreviousEvents = async () => {
    setLoadingEvents(true); // START LOADING
    try {
      const result = await userService.fetchOrganizerPreviousEvents(vendor.id);
      if (result.success) {
        const stats = {
          totalEventsCreated: result.data.totalEventsCreated || 0,
          upcomingEvents: result.data.upcomingEvents || 0,
          pastEvents: result.data.pastEvents || 0,
          totalAttendees: result.data.totalAttendees || 0,
        };
        setEventStats(stats);
        setPrevEvents(result.data.events);
      } else {
        console.error("Error fetching previous events:", result.error);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setLoadingEvents(false); // STOP LOADING
    }
  };

  fetchPreviousEvents();
}, [vendor]);


  const handleModalOpen = useCallback(
    (type, vendor) => {
      if (onClose) onClose();
      setSelectedVendor(vendor);
      setModals((prev) => ({ ...prev, [type]: true }));
    },
    [onClose]
  );

  const handleModalClose = (type) => {
    setModals((prev) => ({ ...prev, [type]: false }));
  };
  useEffect(() => {
  setSelectedVendor(vendor);
}, [vendor]);


  const handleSuspendVendor = async(vendorId, reason) => {
    if(vendorId === selectedVendor.id) {
      const response = await userService.suspendVendor(vendorId, reason);
      if (response.success) {
          showMessage("Success", "Vendor suspended successfully", "success");
        if (typeof onStatusChange === "function") {
          onStatusChange(vendorId, "SUSPENDED");
          
        }
        onClose();
      } else{
        console.error("Error suspending vendor:", response.error);
        showMessage("Error", "Failed to suspend vendor", "error");
        }
    }
    console.log(`Suspending vendor ${vendorId}: ${reason}`);
  };

   const handleReactivateVendor = async(vendorId, reason) => {
    if(vendorId === selectedVendor.id) {
      const response = await userService.reactivateVendor(vendorId);
      if (response.success) {
          showMessage("Vendor Activated!", "The vendor has been notified of the activation.", "success");
        if (typeof onStatusChange === "function") {
          onStatusChange(vendorId, "APPROVED");
        }
        onClose();
      } else{
        console.error("Error suspending vendor:", response.error);
        showMessage("Error", "Failed to suspend vendor", "error");
        }
    }
    console.log(`Suspending vendor ${vendorId}: ${reason}`);
  };

  const getActions = useMemo(() => {
    if (!vendor) return {};

    const commonBtnStyle = "font-medium py-2 px-4 rounded w-full";
    const grayBtn = `border border-gray-300 text-gray-700 ${commonBtnStyle}`;

    switch (vendor.status) {

      case "Inactive":
      case "SUSPENDED":
        return {
          approve: {
            label: "Reactivate",
            onClick: () => handleModalOpen("activate", vendor),
            className:
              "bg-[#2853A6] rounded-[12px] hover:bg-green-700 text-white " + commonBtnStyle,
          },
          // reject: {
          //   label: "Send Re-engagement Email",
          //   onClick: () => {
          //     onReject(vendor.id);
          //     onClose();
          //   },
          //   className: "border rounded-[12px] border-[#2853A6] text-[#2853A6] " + commonBtnStyle,
          // },
        };
      case "APPROVED":
      case "Approved":
      case "Active":
        return {
          suspend: {
            label: "Suspend Vendor",
            onClick: () => handleModalOpen("suspend", vendor),
            className:
              "bg-red-600 hover:bg-red-700 text-white " + commonBtnStyle,
          },
          cancel: {
            label: "Cancel",
            onClick: onClose,
            className: grayBtn,
          },
        };

      case "Deactivated":
      case "REJECTED":
        return {
          suspend: {
            label: "Enable Account",
            onClick: () => handleModalOpen("enable", vendor),
            className:
              "bg-blue-600 hover:bg-green-700 text-white " + commonBtnStyle,
          },
          cancel: {
            label: "Cancel",
            onClick: onClose,
            className: grayBtn,
          },
        };

      default:
        return {
          close: {
            label: "Close",
            onClick: onClose,
            className: grayBtn,
          },
        };
    }
  }, [vendor, onClose, onReject, handleModalOpen]);

  if (!vendor) return null;

  const modalTitle = ["Active", "Inactive", "Approve", "APPROVED"].includes(vendor.status)
    ? "Organiser's Profile"
    : "Vendor's Profile";

  return (
    <>
      <BaseModal
        isOpen={isOpen}
        onClose={onClose}
        title={modalTitle}
        actions={getActions}
        buttonPlacement="bottom"
        size={{ width: "99%", maxWidth: "600px", height: "90vh" }}
        className="overflow-y-auto"
        showDividers={false}
        
      >
        <div>
          {console.log(vendor, "This is the vendor")}
          {(vendor.status === "Approved" || vendor.status === "Active" || vendor.status === "APPROVED") && (
            <div className="mb-4 text-gray-700 border-t border-gray-200 pt-4">
              <p>Last Login at: {formatCustomDate(vendor.lastLoginAt, "DD-MM-YYYY")}</p>
            </div>
          )}

          {vendor.status === "Inactive" && (
            <div className="mb-4 text-sm text-gray-700">
              <div className="flex items-center mb-2">
                <InfoIcon className="h-5 w-5 text-red-500 mr-2" />
                <span>
                  This organizer hasn’t logged in for 60 days and has no new
                  events in 90 days.
                </span>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-semibold text-[#303237]">{vendor.business_name}</h3>
            <StatusBadge status={vendor.status} />
          </div>
{            console.log(vendor, "This is the vendor that we have selected")}

          <p className="text-[#7E8494] text-lg font-semibold mb-4">
            {vendor.name || "Mary White"}
          </p>

          

          <p className="text-gray-700 mb-6">
            {vendor.description || "Designed to teach and train family..."}
          </p>

          <h4 className="text-lg font-medium border-t border-gray-200 pt-4 text-gray-800 mb-4">
            Contact 
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[
              {
                icon: <Phone className="h-5 w-5 text-gray-600" />,
                value: vendor.phone_number,
              },
              {
                icon: <Mail className="h-5 w-5 text-gray-600" />,
                value: vendor.email,
              },
              {
                icon: <MapPin className="h-5 w-5 text-gray-600" />,
                value: vendor.address,
              },
              {
                icon: <Globe className="h-5 w-5 text-gray-600" />,
                value: vendor.website,
              },
            ]
              .filter(item => item.value != null && item.value !== "")
              .map((item, i) => (
                <div
                  key={i}
                  className="flex items-center bg-[#F2F2F2] rounded-full px-5 py-1  w-fit"
                >
                  <div className="mr-2">
                    {item.icon}
                  </div>
                  <span className="text-gray-700 text-nowrap">{item.value}</span>
                </div>
              ))}
          </div>



          {( 
            vendor.status==="REJECTED"||
            vendor.status === "Inactive") && (


<div>
  <h4 className="text-gray-700 mb-3">Business License Document</h4>
  <a
  href={vendor.attachment}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center hover:bg-gray-50 p-2 rounded-lg transition"
>
  <div className="border rounded-lg overflow-hidden mr-2">
    <div className="w-12 h-14 relative bg-white p-2">
      <div className="w-full h-full border-2 border-gray-200 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      {vendor.attachment && (
        <div className="absolute bottom-0 right-0 w-6 h-4 bg-red-600 text-white text-xs flex items-center justify-center">
          {getFileType(vendor.attachment) || 'FILE'}
        </div>
      )}
    </div>
  </div>

  <span className="text-sm text-blue-600 underline">
    {vendor.attachment
      ? `View ${getFileType(vendor.attachment) || 'Document'}`
      : 'No document uploaded'}
  </span>
</a>


</div>
          )}

          {
                        (vendor.status === "Active" ||
            vendor.status === "APPROVED" || vendor.status==="SUSPENDED"|| vendor.status == "Approved" ) && (
                          <>
              <h4 className="text-lg font-medium text-gray-800 mb-4">
                Event Details
              </h4>
              {loadingEvents ? (
  <div className="flex items-center justify-center text-gray-500 py-6">
    <Loader2 className="animate-spin h-5 w-5 mr-2" />
    Loading stats...
  </div>
) : (

              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
{ label: "Total Events Created", value: eventStats.totalEventsCreated },
  { label: "Upcoming Events", value: eventStats.upcomingEvents },
  { label: "Past Events", value: eventStats.pastEvents },
  { label: "Total Attendees", value: eventStats.totalAttendees },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center">
                    <div className="mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="..." /> {/* Use correct icon path */}
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">{label}</div>
                      <div className="font-medium">{value}</div>
                    </div>
                  </div>
                ))}
              </div>
)}
              {
                vendor.status!=="REJECTED" &&(
<>
<h4 className="text-lg font-medium text-gray-800 mb-4">
  Past Events
</h4>
<div className="overflow-x-auto mb-6">
  {loadingEvents ? (
    <div className="flex items-center justify-center text-gray-500 py-6">
      <Loader2 className="animate-spin h-5 w-5 mr-2" />
      Loading events...
    </div>
  ) : prevEvents.length === 0 ? (
    <p className="text-gray-500 text-sm">No past events found</p>
  ) : (
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          {["Event Name", "Date", "Location", "Total Attendees"].map((h) => (
            <th
              key={h}
              className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {prevEvents.map((event) => (
          <tr key={event.id}>
            <td className="px-4 py-2 whitespace-nowrap">{event.name}</td>
            <td className="px-4 py-2 whitespace-nowrap">
              {formatCustomDate(event.date, "DD-MM-YYYY")}
            </td>
            <td className="px-4 py-2 whitespace-nowrap">{event.address}</td>
            <td className="px-4 py-2 whitespace-nowrap">{event.ticket_booked}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>

</>


                )

                
              }



            </>
            )
          }
        </div>
      </BaseModal>

      <SuspendVendorModal
        vendor={selectedVendor}
        isOpen={modals.suspend}
        onClose={() => handleModalClose("suspend")}
        onConfirm={handleSuspendVendor}
      />
      <ActivateVendorModal
        vendor={selectedVendor}
        isOpen={modals.activate}
        onClose={() => handleModalClose("activate")}
        onConfirm={handleReactivateVendor}
      />
      <EnableVendorModal
        vendor={selectedVendor}
        isOpen={modals.enable}
        onClose={() => handleModalClose("enable")}
        onConfirm={handleReactivateVendor}
      />
    </>
  );
};

export default VendorApproveDetailsModal;