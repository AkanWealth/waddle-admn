"use client";

import React, { useState } from "react";
import BaseModal from "../../Element/BaseModal";
import StatusBadge from "../../UserManagement/StatusBadge";
import SuspendVendorModal from "./suspendVendor";
/**
 * VendorApproveDetailsModal - Component for displaying vendor details in a modal
 * 
 * @param {Object} props
 * @param {Object} props.vendor - Vendor data object
 * @param {boolean} props.isOpen - Controls the visibility of the modal
 * @param {function} props.onClose - Function to call when modal closes
 * @param {function} props.onApprove - Function to handle vendor approval
 * @param {function} props.onReject - Function to handle vendor rejection
 */
const VendorDeactiviateDetailsModal = ({ vendor, isOpen, onClose, onApprove, onReject }) => {

    
    // If no vendor is selected, don't render the modal
    if (!vendor) return null;

    // Determine if status is "Pending" to show action buttons
    const isPending = vendor.status === "Pending";
    
    // Determine button actions based on vendor status
    const getActions = () => {
        if (isPending) {
            return {
                approve: {
                    label: "Approve",
                    onClick: () => {
                        onApprove(vendor.id);
                        onClose();
                    },
                    className: "bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded"
                },
                reject: {
                    label: "Reject",
                    onClick: () => {
                        onReject(vendor.id);
                        onClose();
                    },
                    className: "bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded"
                }
            };
        } else if (vendor.status === "Approved" || vendor.status === "Active") {
            return {
                suspend: {
                    label: "Suspend Vendor",
                    onClick: () => openSuspendModal(vendor), // <-- Open the suspend modal
                    className: "bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded w-full"
                },
                cancel: {
                    label: "Cancel",
                    onClick: onClose,
                    className: "border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded w-full"
                }
            };
        } else {
            return {
                close: {
                    label: "Close",
                    onClick: onClose,
                    className: "border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded"
                }
            };
        }
    };

    const [suspendModalOpen, setSuspendModalOpen] = useState(false);
const [selectedVendor, setSelectedVendor] = useState(null);

const handleSuspendVendor = (vendorId, reason) => {
  // Your suspension logic here
  console.log(`Suspending vendor ${vendorId}: ${reason}`);
};

// When you want to open the modal
const openSuspendModal = (vendor) => {
  if (onClose) onClose(); // Close the approve modal
  setSelectedVendor(vendor);
  setSuspendModalOpen(true);
};

    // Title for the modal based on status
    const modalTitle = vendor.status === "Active" ? "Organiser's Profile" : "Vendor's Profile";

    return (
        <><BaseModal
            isOpen={isOpen}
            onClose={onClose}
            title={modalTitle}
            actions={getActions()}
            buttonPlacement={vendor.status === "Approved" || vendor.status === "Active" ? "bottom" : "bottom"}
            size={{ width: "99%", maxWidth: "600px" }}
            className="overflow-y-auto"
            showDividers={false}
        >
            <div>
                {/* Last Login Information */}
                {(vendor.status === "Approved" || vendor.status === "Active") && (
                    <div className="mb-4 text-gray-700">
                        <p>Last Login :April 24th, 2025, 9:16 pm</p>
                    </div>
                )}

                {/* Status badge and vendor name section */}
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-medium text-gray-800">{vendor.name}</h3>
                    <StatusBadge status={vendor.status} />
                </div>

                {/* Contact name */}
                <p className="text-gray-600 mb-4">{vendor.contactName || "Mary White"}</p>

                {/* Description */}
                <p className="text-gray-700 mb-6">
                    {vendor.description || "Designed to teach and train family both parents and children to communicate effectively. Bring your kids let us train them to be professional from foundation."}
                </p>

                {/* Contact Details Section */}
                <h4 className="text-lg font-medium text-gray-800 mb-4">Contact Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {/* <div className="flex flex-col-2 gap-4"> */}
                    {/* Phone */}
                    <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-fit">
                        <div className="mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                        <span className="text-gray-700">
                            {vendor.contactDetails?.phone || "+4498274774"}
                        </span>
                    </div>

                    {/* Email */}
                    <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-fit">
                        <div className="mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <span className="text-gray-700">
                            {vendor.contactDetails?.email || "mary@abcorg.com"}
                        </span>
                    </div>

                    {/* Address if available */}
                    <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-fit">
                        <div className="mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <span className="text-gray-700">
                            {vendor.contactDetails?.address || "362 Sycamore St, Detroit, MI"}
                        </span>
                    </div>

                    {/* Website if available */}
                    <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-fit">
                        <div className="mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                        </div>
                        <span className="text-gray-700">
                            {vendor.contactDetails?.website || "www.abcorg.com"}
                        </span>
                    </div>
                    {/* </div> */}
                </div>

                {/* Event Details Section for Approved/Active vendors */}
                {(vendor.status === "Approved" || vendor.status === "Active") && (
                    <>
                        <h4 className="text-lg font-medium text-gray-800 mb-4">Event Details</h4>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="flex items-center">
                                <div className="mr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Total Events Created:</div>
                                    <div className="font-medium">12</div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="mr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Upcoming Events:</div>
                                    <div className="font-medium">3</div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="mr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Past Events:</div>
                                    <div className="font-medium">9</div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="mr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Total Attendees:</div>
                                    <div className="font-medium">85</div>
                                </div>
                            </div>
                        </div>

                        {/* Past Events Table */}
                        <h4 className="text-lg font-medium text-gray-800 mb-4">Past Events</h4>
                        <div className="overflow-x-auto mb-6">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Name</th>
                                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Attendees</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">Kid Timeout with Jane</td>
                                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">02-04-2025</td>
                                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">Colchester Sup.</td>
                                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">200</td>
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">Family Fun Day</td>
                                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">02-04-2025</td>
                                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">Colchester Sup.</td>
                                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">430</td>
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">Storytelling Session</td>
                                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">02-04-2025</td>
                                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">Central Park</td>
                                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">1500</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
        </BaseModal><SuspendVendorModal
                vendor={selectedVendor}
                isOpen={suspendModalOpen}
                onClose={() => setSuspendModalOpen(false)}
                onConfirm={handleSuspendVendor} /></>
    );
};

export default VendorDeactiviateDetailsModal;