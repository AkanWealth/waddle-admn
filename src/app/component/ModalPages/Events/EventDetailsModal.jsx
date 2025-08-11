"use client";

import React, { useState } from 'react';
import formatCustomDate from '@/lib/formatDate';
import BaseModal from '../../Element/BaseModal';
import { Clock, CalendarDaysIcon, MapPin,User, BadgeDollarSign, Phone, Mail } from 'lucide-react';
import ApproveEventModal from './approveEventModal';
import RejectEventModal from './RejectEventModal';
import EventCreationModal from "./createEventModal";
import Image from 'next/image';
const EventDetailsModal = ({
    event,
    isOpen,
    onClose,
    onApprove,
    onReject,
    onEdit
}) => {
    console.log("This is the event that is selected",event)
    
    // Helper function to format date
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            return formatCustomDate(dateString, 'DD-MM-YYYY');
        } catch {
            return 'Invalid Date';
        }
    };

    // Helper function to format time
    const formatTime = (timeString) => {
        if (!timeString) return 'N/A';
        try {
            const [hours, minutes] = timeString.split(':');
            const hour = parseInt(hours);
            const ampm = hour >= 12 ? 'PM' : 'AM';
            const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
            return `${displayHour}:${minutes} ${ampm}`;
        } catch {
            return 'Invalid Time';
        }
    };

    // Helper function to get organizer info
    const getOrganizerInfo = (event) => {
        if (event.organiser) {
            return {
                name: event.organiser.name || 'N/A',
                company: event.organiser.business_name || 'N/A',
                email: event.organiser.email || 'N/A',
                phone: event.organiser.phone_number || 'N/A'
            };
        } else if (event.admin) {
            return {
                name: `${event.admin.first_name || ''} ${event.admin.last_name || ''}`.trim(),
                company: 'Admin',
                email: event.admin.email || 'N/A',
                phone: 'N/A'
            };
        }
        return {
            name: 'N/A',
            company: 'N/A',
            email: 'N/A',
            phone: 'N/A'
        };
    };

    // Helper function to get event status

const getEventStatus = (event) => {
  if (event.isDeleted) return 'Deleted'; // Not part of EventStatus enum, assumed custom
  if (event.status === "APPROVED" && event.isPublished) return 'Published';

  switch (event.status) {
    case "PENDING":
      return 'Pending';
    case "DRAFT":
      return 'Draft';
    case "NON_COMPLIANT":
      return 'Non-Compliant';
    case "CROWD_SOURCED":
      return 'Crowd Sourced';
    default:
      return 'Unknown';
  }
};

    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [eventToEdit, setEventToEdit] = useState(null);




    const handleApproveClick = () => {
        // Close details modal
        // onClose();
        // Open approve modal
        setIsApproveModalOpen(true);
    };

    // Handle reject button click - opens reject modal
    const handleRejectClick = () => {
        // Close details modal
        // onClose();
        // Open reject modal
        setIsRejectModalOpen(true);
    };
    const handleEditClick = () => {
        // Close details modal
        onClose();
        // Open edit modal
        setIsEditModalOpen(true);
    };

    // Merge with actual event data if provided

    const mergedEvent = event ? {
        title: event.name || 'N/A',
        description: event.description || 'No description available',
        safetyMeasures: event.instructions ? event.instructions : [],
        details: [
            { label: "Date", value: formatDate(event.date), icon: "calendar" },
            { label: "Time", value: formatTime(event.time), icon: "clock" },
            { label: "Location", value: event.address || 'N/A', icon: "location" },
            { label: "Age Range", value: event.age_range || 'N/A', icon: "person" },
            { label: "Price", value: `£${event.price || '0'}/person`, icon: "money" }
        ],
        organizer: getOrganizerInfo(event),
        images: event.files || [],
        status: getEventStatus(event)
    } : {
        title: 'N/A',
        description: 'No description available',
        safetyMeasures: [],
        details: [
            { label: "Date", value: 'N/A', icon: "calendar" },
            { label: "Time", value: 'N/A', icon: "clock" },
            { label: "Location", value: 'N/A', icon: "location" },
            { label: "Age Range", value: 'N/A', icon: "person" },
            { label: "Price", value: 'N/A', icon: "money" }
        ],
        organizer: { name: 'N/A', company: 'N/A', email: 'N/A', phone: 'N/A' },
        images: [],
        status: 'N/A'
    };

    
    // Ensure images is always an array
    if (mergedEvent.images && typeof mergedEvent.images === 'string') {
        mergedEvent.images = [{ name: "Event Image", size: "Unknown", url: mergedEvent.images }];
    } else if (!mergedEvent.images || !Array.isArray(mergedEvent.images)) {
        mergedEvent.images = [];
    }

    const modalActions =
  event.status === "DRAFT"
    ? {
        edit: {
          label: "Edit Event",
          onClick: () => {
            setEventToEdit(event); // Set the event to edit
            setEditModalOpen(true); // Open the edit modal
          },
          className:
            "text-blue-600 border border-blue-600 px-12 py-1 rounded-lg hover:bg-blue-50",
        },
      }
    : {
        reject: {
          label: "Reject",
          onClick: handleRejectClick,
          className:
            "bg-white text-red-600 border border-red-600 px-12 py-1 rounded-lg hover:bg-red-50",
        },
        approve: {
          label: "Approve",
          onClick: handleApproveClick,
          className:
            "bg-blue-600 text-white px-12 py-1 rounded-lg hover:bg-blue-700",
        },
      };


    // Render icon based on detail type
    const renderIcon = (iconType) => {
        switch (iconType) {
            case 'calendar':
                return <span className="text-gray-600 mr-2"><CalendarDaysIcon className='w-4 h-4 text-gray-500'/></span>;
            case 'clock':
                return <span className="text-gray-600 mr-2"><Clock className='w-4 h-4 text-gray-500'/></span>;
            case 'location':
                return <span className="text-gray-600 mr-2"><MapPin className='w-4 h-4 text-gray-500'/></span>;
            case 'person':
                return <span className="text-gray-600 mr-2"><User className='w-4 h-4 text-gray-500'/></span>;
            case 'money':
                return <span className="text-gray-600 mr-2"><BadgeDollarSign className='w-4 h-4 text-gray-500'/></span>;
            default:
                return null;
        }
    };

    return (
        <><BaseModal
            isOpen={isOpen}
            onClose={onClose}
            title="Event Details"
            actions={modalActions}
            buttonPlacement="top-left"
            className="overflow-y-auto"
            size={{ width: "99%", maxWidth: "800px" }}
            showDividers={true}
        >
            <div className="space-y-6 text-black">
                {/* Status Badge - Top right corner */}
                <div className="flex justify-end items-center mb-4 mt-2">
                    {/* <button
        onClick={onEdit}
        className="text-blue-600 border border-blue-600 px-6 py-2 rounded hover:bg-blue-50"
    >
        Edit Event
    </button> */}
                    <div className="flex items-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-200">
                            <span className="mr-1"><Clock className='w-4 h-4 text-gray-500 mr-1' /></span> {mergedEvent.status}
                        </span>
                    </div>
                </div>

                {/* Event Title and Description */}
                <section>
                    <h2 className="text-xl font-semibold">{mergedEvent.title}</h2>
                    <p className="text-gray-700 whitespace-pre-line mt-2">{mergedEvent.description}</p>
                </section>
                <hr className="border-gray-300 mb-6" />
                {/* Safety Measures */}
                <section>
                    <h3 className="text-lg font-medium mb-2 text-black">Safety Measures</h3>
                    <div className="flex  gap-3">
                        {
                            mergedEvent.safetyMeasures.length > 0 ? (
                                mergedEvent.safetyMeasures.map((measure, index) => (
                                    <div key={index} className="bg-yellow-50 text-yellow-800 px-4 py-2 rounded-full">
                                        {console.log(measure, "This is the measure")}
                                        {measure}
                                    </div>
                                ))
                            ) : (
                                <div className="text-gray-500">No safety measures listed.</div>
                            )}
                    </div>
                </section>
                <hr className="border-gray-300 mb-6" />

                {/* Event Details */}
                <section className="space-y-2">
                    <div className="flex items-center">
                        {renderIcon('calendar')}
                        <span>{mergedEvent.details[0].value}</span>
                    </div>
                    <div className="flex items-center">
                        {renderIcon('clock')}
                        <span>{mergedEvent.details[1].value}</span>
                    </div>
                    <div className="flex items-center">
                        {renderIcon('location')}
                        <span>{mergedEvent.details[2].value}</span>
                    </div>
                    <div className="flex items-center t">
                        {renderIcon('person')}
                        <span>{mergedEvent.details[3].value}</span>
                    </div>
                    <div className="flex items-center ">
                        {renderIcon('money')}
                        <span>{mergedEvent.details[4].value}</span>
                    </div>
                </section>
                <hr className="border-gray-300 mb-6" />
                {/* Organizer */}
                <section>
                                        <h3 className="text-lg font-medium mb-2 text-black">Organiser</h3>
                                        <div className="flex items-start">
                                            <div className="mr-3 text-3xl">
                                                <img src="/Chief.png" alt="Organizer" className="rounded-full w-12 h-12" />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="font-medium">{mergedEvent.organizer.name}</p>
                                                <p className="text-gray-700">{mergedEvent.organizer.company}</p>
                                                <div className="flex flex-col sm:flex-row sm:gap-4">
                                                    <div className="flex items-center">
                                                        <span className="mr-1"><Mail className='w-4 h-4 text-gray-500'/></span>
                                                        <a
                                                            href={`mailto:${mergedEvent.organizer.email}`}
                                                            className="text-blue-600 hover:underline"
                                                        >
                                                            {mergedEvent.organizer.email}
                                                        </a>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="mr-1"><Phone className='w-4 h-4 text-gray-500'/></span>
                                                        <span>{mergedEvent.organizer.phone}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                {/* Images */}
                <section>
                    <h3 className="text-lg font-medium mb-2">Images</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {mergedEvent?.images.map((image, index) => (
                            <div key={index} className="bg-gray-50 p-2 rounded">
                                <Image
                                    width={64}
                                    height={64}
                                    unoptimized
                                    src={image}
                                    alt={image}
                                    className="bg-gray-200 h-16 w-full object-cover mb-2 rounded" />
                                <p className="text-sm truncate">{image.split('/').pop()}</p>
                                <p className="text-xs text-gray-500">{image.size}</p>
                            </div>
                        ))}
                    </div>
                </section>
                {/* <div className="mt-10 flex justify-center space-x-4">
        <button
            onClick={onReject}
            className="px-6 py-2 border border-red-600 text-red-600 rounded hover:bg-red-50"
        >
            Reject
        </button>
        <button
            onClick={onApprove}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
            Approve
        </button>
    </div> */}
            </div>
        </BaseModal>
 <EventCreationModal
                isOpen={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                onSave={(updatedEvent) => {
                    // handle save logic here if needed
                    setEditModalOpen(false);
                }}
                isEditMode={true} // Add this crucial prop
                eventData={eventToEdit} // Pass the event to edit
            />

        <ApproveEventModal
                isOpen={isApproveModalOpen}
                onClose={() => setIsApproveModalOpen(false)}
                onConfirm={onApprove}
                eventData={event} />
        <RejectEventModal
                isOpen={isRejectModalOpen}
                onClose={() => setIsRejectModalOpen(false)}
                onConfirm={onReject}
                eventData={event} /></>
    );
};

export default EventDetailsModal;