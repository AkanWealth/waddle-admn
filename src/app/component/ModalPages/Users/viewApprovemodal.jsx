"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import BaseModal from "../../Element/BaseModal";
import StatusBadge from "../../UserManagement/StatusBadge";
import SuspendVendorModal from "./suspendVendor";
import ActivateVendorModal from "./activateVendor";
import EnableVendorModal from "./EnableVendor";
import { InfoIcon } from "lucide-react";
import { userService } from "@/utils/userService";
import formatCustomDate from "@/lib/formatDate";

const VendorApproveDetailsModal = ({
  vendor,
  isOpen,
  onClose,
  onApprove,
  onReject,
}) => {
  const [modals, setModals] = useState({
    suspend: false,
    activate: false,
    enable: false,
  });
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [prevEvents, setPrevEvents] = useState([]);

  useEffect(() => {
    if (!vendor) return;

    const fetchPreviousEvents = async () => {
      try {
        const result = await userService.fetchOrganizerPreviousEvents(
          vendor.id
        );
        console.log(result);
        if (result.success) {
          setPrevEvents(result.data.events);
        } else {
          console.error("Error fetching previous events:", result.error);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
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

  const handleSuspendVendor = async(vendorId, reason) => {
    if(vendorId === selectedVendor.id) {
      const response = await userService.suspendVendor(vendorId);
      if (response.success) {
        toast.success("Vendor suspended successfully");
        onClose();
      } else{
        console.error("Error suspending vendor:", response.error);
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
        return {
          approve: {
            label: "Reactivate",
            onClick: () => handleModalOpen("activate", vendor),
            className:
              "bg-blue-600 hover:bg-green-700 text-white " + commonBtnStyle,
          },
          reject: {
            label: "Send Re-engagement Email",
            onClick: () => {
              onReject(vendor.id);
              onClose();
            },
            className: "border border-blue-600 text-blue-600 " + commonBtnStyle,
          },
        };

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

  const modalTitle = ["Active", "Inactive", "Approve"].includes(vendor.status)
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
        size={{ width: "99%", maxWidth: "600px" }}
        className="overflow-y-auto"
        showDividers={false}
      >
        <div>
          {console.log(vendor, "This is the vendor")}
          {(vendor.status === "Approved" || vendor.status === "Active") && (
            <div className="mb-4 text-gray-700">
              <p>Last Login :April 24th, 2025, 9:16 pm</p>
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
            <h3 className="text-xl font-medium text-gray-800">{vendor.name}</h3>
            <StatusBadge status={vendor.status} />
          </div>

          <p className="text-gray-600 mb-4">
            {vendor.contactName || "Mary White"}
          </p>

          <p className="text-gray-700 mb-6">
            {vendor.description || "Designed to teach and train family..."}
          </p>

          <h4 className="text-lg font-medium text-gray-800 mb-4">
            Contact Details
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[
              {
                icon: (
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493..." />
                ),
                value: vendor.contactDetails?.phone || "+4498274774",
              },
              {
                icon: <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8..." />,
                value: vendor.contactDetails?.email || "mary@abcorg.com",
              },
              {
                icon: <path d="M17.657 16.657L13.414 20.9a1.998..." />,
                value:
                  vendor.contactDetails?.address ||
                  "362 Sycamore St, Detroit, MI",
              },
              {
                icon: <path d="M21 12a9 9 0 01-9 9m9-9a9 9..." />,
                value: vendor.contactDetails?.website || "www.abcorg.com",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-fit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {item.icon}
                </svg>
                <span className="text-gray-700">{item.value}</span>
              </div>
            ))}
          </div>

          {(vendor.status === "Approved" ||
            vendor.status === "Active" ||
            vendor.status === "Inactive") && (
            <>
              <h4 className="text-lg font-medium text-gray-800 mb-4">
                Event Details
              </h4>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { label: "Total Events Created", value: "12" },
                  { label: "Upcoming Events", value: "3" },
                  { label: "Past Events", value: "9" },
                  { label: "Total Attendees", value: "85" },
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

              <h4 className="text-lg font-medium text-gray-800 mb-4">
                Past Events
              </h4>
              <div className="overflow-x-auto mb-6">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      {[
                        "Event Name",
                        "Date",
                        "Location",
                        "Total Attendees",
                      ].map((h) => (
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
                        <td className="px-4 py-2 whitespace-nowrap">
                          {event.name}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          {
                            formatCustomDate(event.date, "DD-MM-YYYY")
                          }
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          {event.address}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          {event.ticket_booked}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
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
        onConfirm={handleSuspendVendor}
      />
      <EnableVendorModal
        vendor={selectedVendor}
        isOpen={modals.enable}
        onClose={() => handleModalClose("enable")}
        onConfirm={handleSuspendVendor}
      />
    </>
  );
};

export default VendorApproveDetailsModal;
