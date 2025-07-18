"use client";

import React, { useState } from 'react';
import BaseModal from '../../Element/BaseModal';
import { Clock, CalendarDaysIcon, MapPin,User, BadgeDollarSign, Phone, Mail } from 'lucide-react';
import ApproveEventModal from './approveEventModal';
import RejectEventModal from './RejectEventModal';
import EventCreationModal from "./createEventModal";
const EventDetailsModal = ({
    event,
    isOpen,
    onClose,
    onApprove,
    onReject,
    onEdit
}) => {
    console.log("This is the event that is selected",event)
    // Merge with default data if needed or use provided event data
    const eventData = {
        title: "Dance Class by Aura Jean",
        description: "Very nice event organised to teach and entertain family both parents and children. this is very nice this rich and enjoyable. Bring your kids\nVery nice event organised to teach and entertain family both parents and children. this is very nice this rich and enjoyable. Bring your kids",
        safetyMeasures: [
            "Snacks included",
            "Parental supervision required"
        ],
        details: [
            { label: "Date", value: "14th February 2024", icon: "calendar" },
            { label: "Time", value: "8am - 2pm", icon: "clock" },
            { label: "Location", value: "Wivehoe, 6 miles away", icon: "location" },
            { label: "Age Range", value: "2-10 years old", icon: "person" },
            { label: "Price", value: "£20/person", icon: "money" }
        ],
        organizer: {
            name: "Aura Jean",
            company: "Chef Food Limited",
            email: "aurajean@cheffood.com",
            phone: "+4498274774"
        },
        images: [
            { name: "Thrive in Uncertain...", size: "200kb", url: "/editImage.jpg" },
            { name: "Thrive in Uncertain...", size: "200kb", url: "/editImage.jpg" },
            { name: "Thrive in Uncertain...", size: "200kb", url: "/editImage.jpg" },
            { name: "Thrive in Uncertain...", size: "200kb", url: "/editImage.jpg" }
        ],
        status: "Pending" // This would come from props
    };
    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [eventToEdit, setEventToEdit] = useState(null);




    const handleApproveClick = () => {
        // Close details modal
        onClose();
        // Open approve modal
        setIsApproveModalOpen(true);
    };

    // Handle reject button click - opens reject modal
    const handleRejectClick = () => {
        // Close details modal
        onClose();
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
    const mergedEvent = { ...eventData, ...event };

    const modalActions = {
        edit: {
            label: "Edit Event",
            onClick: () => {
                        setEventToEdit(event); // Set the event to edit
                        setEditModalOpen(true);
                        onClose(); // Open the edit modal
                    },
            className: "text-blue-600 border border-blue-600 px-12 py-1 rounded-lg hover:bg-blue-50"
        },
        reject: {
            label: "Reject",
            onClick: handleRejectClick,
            className: "bg-white text-red-600 border border-red-600 px-12 py-1 rounded-lg hover:bg-red-50"
        },
        approve: {
            label: "Approve",
            onClick: handleApproveClick,
            className: "bg-blue-600 text-white px-12 py-1 rounded-lg hover:bg-blue-700"
        }

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
            <div className="space-y-6">
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
                            <span className="mr-1"><Clock className='w-4 h-4 text-gray-500 mr-1' /></span> Pending
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
                    <h3 className="text-lg font-medium mb-2">Safety Measures</h3>
                    <div className="flex flex-wrap gap-2">
                        {mergedEvent.safetyMeasures.map((measure, index) => (
                            <div key={index} className="bg-yellow-50 text-yellow-800 px-4 py-2 rounded-full">
                                {measure}
                            </div>
                        ))}
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
                    <div className="flex items-center">
                        {renderIcon('person')}
                        <span>{mergedEvent.details[3].value}</span>
                    </div>
                    <div className="flex items-center">
                        {renderIcon('money')}
                        <span>{mergedEvent.details[4].value}</span>
                    </div>
                </section>
                <hr className="border-gray-300 mb-6" />
                {/* Organizer */}
                <section>
                                        <h3 className="text-lg font-medium mb-2">Organiser</h3>
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
                        {mergedEvent.images.map((image, index) => (
                            <div key={index} className="bg-gray-50 p-2 rounded">
                                <img
                                    src={image.url}
                                    alt={image.name}
                                    className="bg-gray-200 h-16 w-full object-cover mb-2 rounded" />
                                <p className="text-sm truncate">{image.name}</p>
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
                eventData={eventToEdit} // Pass the event to edit
            />

        <ApproveEventModal
                isOpen={isApproveModalOpen}
                onClose={() => setIsApproveModalOpen(false)}
                onConfirm={onApprove}
                event={event} />
        <RejectEventModal
                isOpen={isRejectModalOpen}
                onClose={() => setIsRejectModalOpen(false)}
                onConfirm={onReject}
                event={event} /></>
    );
};

export default EventDetailsModal;