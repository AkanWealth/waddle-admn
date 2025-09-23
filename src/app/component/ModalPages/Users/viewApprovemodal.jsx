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
  import { ToastContainer } from "react-toastify";
import Image from "next/image";

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
    const [isWaddleApproved, setIsWaddleApproved] = useState(!!vendor?.isWaddleApproved);
    const [showGrantBadgeModal, setShowGrantBadgeModal] = useState(false);
    const [showRevokeBadgeModal, setShowRevokeBadgeModal] = useState(false);
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
    setIsWaddleApproved(!!vendor?.isWaddleApproved);
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
    const handleAccountReactivateVendor = async(vendorId) => {
      if(vendorId === selectedVendor.id) {
        const response = await userService.reactivateAccountVendor(vendorId);
        if (response.success) {
            showMessage("Vendor Activated!", "The vendor has been notified of the activation.", "success");
          if (typeof onStatusChange === "function") {
            onStatusChange(vendorId, "APPROVED");
          }
          onClose();
        } else{
          console.error("Error reactivating vendor:", response.error);
          showMessage("Error", "Failed to reactivate vendor", "error");
          }
      }
    };

    const handleGrantWaddleApproveTag=async(vendorId)=>{
      const response = await userService.grantOrRemoveWaddleApprovedTag(vendorId, true);
      if(response.success){
        showMessage("Badge Granted", "Organizer has been awarded the Waddle Approved badge.", "success");
        setIsWaddleApproved(true);
        setShowGrantBadgeModal(false);
      }
    }
     const handleRevokeWaddleApproveTag=async(vendorId)=>{
      const response = await userService.grantOrRemoveWaddleApprovedTag(vendorId, true);
      if(response.success){
        showMessage("Badge Revoked", "Waddle Approved badge removed from organizer.", "success");
        setIsWaddleApproved(false);
        setShowRevokeBadgeModal(false);
      }
    }

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
          size={{ width: "99%", maxWidth: "850px", height: "90vh" }}
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
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold text-[#303237]">{vendor.business_name}</h3>
                {isWaddleApproved && <div className="border-[#E5E7EF] border flex items-center gap-[8px] px-2 py-1 rounded-[8px]">
                  <div className="bg-[#EAEEF6] h-[28px] w-[28px] rounded-[32px] flex items-center justify-center">


                  <Image src="/WaddleImg.png" className="" width={20} height={20}  />
                                    </div>
                  <span className="text-[#303237] font-medium text-base">Waddle Approved</span>
                  </div>}
                <StatusBadge status={vendor.status} />
              </div>
              {
                vendor.status === "APPROVED" && <>
                {
                  isWaddleApproved ? (
                    <button onClick={() => setShowRevokeBadgeModal(true)} className="bg-inherit border border-[#CC0000] text-[#CC0000] cursor-pointer font-semibold px-4 py-2 rounded-[12px]">
                      Revoke Badge
                    </button>
                  ) : (
                    <button onClick={() => setShowGrantBadgeModal(true)} className="bg-inherit border border-[#2853A6] text-[#2853A6] cursor-pointer font-semibold px-4 py-2 rounded-[12px]">
                      Grant Waddle Approved
                    </button>
                  )
                }
                </>
              }
              {console.log(vendor, "This is the ")}

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
    ) : prevEvents.length === 0 || eventStats.pastEvents < 1 ? (
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

        {/* Grant Waddle Approved - Confirm Modal (DownloadReportModal style) */}
        {showGrantBadgeModal && (
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[10000] p-4"
            onClick={() => setShowGrantBadgeModal(false)}
          >
            <div
              className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 space-y-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start space-x-4">
                <div className="px-4 bg-[#DFEAFF] h-[56px] w-[56px] rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="text-blue-600" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#303237]">Grant Waddle Approved</h3>
                  <p className="text-sm text-gray-600">
                    This organizer will receive the Waddle Approved badge. It will display on their events as a mark of trust and quality for parents.
                  </p>
                </div>
              </div>

              <div className="flex space-x-3">
                <button 
                  type="button" 
                  onClick={() => { handleGrantWaddleApproveTag(vendor.id) }} 
                  className="cursor-pointer flex-1 px-4 py-2 bg-[#2853A6] text-white rounded-[12px] font-semibold transition"
                >
                  Grant
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowGrantBadgeModal(false)} 
                  className="cursor-pointer flex-1 px-4 py-2 border border-[#2853A6] text-[#2853A6] rounded-[12px] font-semibold transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Revoke Waddle Approved - Confirm Modal (DownloadReportModal style) */}
        {showRevokeBadgeModal && (
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[10000] p-4"
            onClick={() => setShowRevokeBadgeModal(false)}
          >
            <div
              className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 space-y-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start space-x-4">
                <div className="px-4 bg-red-100 h-[56px] w-[56px] rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="text-red-600" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#303237]">Remove Waddle Approved Badge</h3>
                  <p className="text-sm text-gray-600">
Are you sure you want to remove this badge? It will no longer show on the organizer’s events.                  </p>
                </div>
              </div>

              <div className="flex space-x-3">
                <button 
                  type="button" 
                  onClick={() => { handleRevokeWaddleApproveTag(vendor.id) }} 
                  className="cursor-pointer flex-1 px-4 py-2 bg-[#CC0000] text-white rounded-[12px] font-semibold transition"
                >
                  Remove Badge
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowRevokeBadgeModal(false)} 
                  className="cursor-pointer flex-1 px-4 py-2 border border-[#CC0000] text-[#CC0000] rounded-[12px] font-semibold transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

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
          onConfirm={handleAccountReactivateVendor}
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