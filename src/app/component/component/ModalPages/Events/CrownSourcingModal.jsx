"use client";

import React, { useState } from 'react';
import BaseModal from '../../Element/BaseModal';
import { TrendingUpDown } from 'lucide-react';
import ApproveEventModal from './approveEventModal';
import { Mail, Phone,Clock, CalendarDaysIcon, MapPin,User, BadgeDollarSign } from 'lucide-react';
import RejectEventModal from './RejectEventModal';
import EventCreationModal from "./createEventModal";

const CrownSourcingModal = ({
    event,
    isOpen,
    onClose,
    onApprove,
    onReject,
    onEdit
}) => {
    // Default data structure similar to EventDetailsModal
    const eventData = {
        title: "Dance Class by Aura Jean",
        description: "Very nice event organised to teach and entertain family both parents and children. This is a crown sourced event which means it was suggested by a community member and has been validated by our team. Bring your kids and enjoy a memorable experience!",
        safetyMeasures: [
            "Snacks included",
            "Parental supervision required",
            "Vetted by community"
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
        status: "Crown Sourced" 
    };
    
    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [eventToEdit, setEventToEdit] = useState(null);

    const handleApproveClick = () => {
        onClose();
        setIsApproveModalOpen(true);
    };

    const handleRejectClick = () => {
        onClose();
        setIsRejectModalOpen(true);
    };

    const handleEditClick = () => {
        onClose();
        setIsEditModalOpen(true);
    };

    // Merge with actual event data if provided
    const mergedEvent = { ...eventData, ...event };

    const modalActions = {
        edit: {
            label: "Edit Event",
            onClick: () => {
                        setEventToEdit(event);
                        setEditModalOpen(true); 
                        onClose();
                    },
            className: "text-blue-600 border border-blue-600 px-12 py-1 rounded-lg hover:bg-blue-50"
        },
        reject: {
            label: "Reject",
            onClick: handleRejectClick,
            className: "bg-white text-red-600 border border-red-600 px-12 py-1 rounded-lg hover:bg-red-50",
            disabled: true 
        },
        approve: {
            label: "Approve",
            onClick: handleApproveClick,
            className: "bg-blue-600 text-white px-12 py-1 rounded-lg hover:bg-blue-700",
            disabled: true 
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
        <>
            <BaseModal
                isOpen={isOpen}
                onClose={onClose}
                title="Event Details"
                actions={modalActions}
                buttonPlacement="top-left"
                className="overflow-y-auto"
                size={{ width: "99%", maxWidth: "800px" }}
                showDividers={false}
                description ="This event was submitted by a parent/guardian. Please review the details, approve if appropriate, and add any missing information before publishing."
            >
                <div className="space-y-8 py-6">
                    {/* Status Badge - Top right corner */}
                    <div className="flex justify-between items-center mb-4 mt-4">
                        <h2 className="text-xl font-semibold">{mergedEvent.title}</h2>

                        <div className="flex items-center ">

                            <span className="inline-flex items-center justify-end px-3 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                <TrendingUpDown className="w-4 h-4 text-blue-600 mr-1" /> Crowd sourced
                            </span>
                        </div>
                    </div>

                    {/* Event Title and Description */}
                    {/* <section>
                        <h2 className="text-xl font-semibold">{mergedEvent.title}</h2>
                        {/* <p className="text-gray-700 whitespace-pre-line mt-2">{mergedEvent.description}</p> */}
                    {/* </section> */}
                    {/* <hr className="border-gray-300 mb-6" /> */}
                    
                    {/* Safety Measures */}
                    {/* <section>
                        <h3 className="text-lg font-medium mb-2">Safety Measures</h3>
                        <div className="flex flex-wrap gap-2">
                            {mergedEvent.safetyMeasures.map((measure, index) => (
                                <div key={index} className="bg-yellow-50 text-yellow-800 px-4 py-2 rounded-full">
                                    {measure}
                                </div>
                            ))}
                        </div>
                    </section> */}
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

                    {/* Community Validation Section - Specific to Crown Sourcing */}
                    {/* <section>
                        <h3 className="text-lg font-medium mb-2">Community Validation</h3>
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <div className="flex items-start">
                                <Crown className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                                <div>
                                    <p className="font-medium text-blue-800">Crown Sourced Event</p>
                                    <p className="text-gray-700">This event was suggested by a community member and has been validated by our team. Crown sourced events meet our quality standards and community guidelines.</p>
                                </div>
                            </div>
                        </div>
                    </section> */}

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
                event={event} 
            />
            
            <RejectEventModal
                isOpen={isRejectModalOpen}
                onClose={() => setIsRejectModalOpen(false)}
                onConfirm={onReject}
                event={event} 
            />
        </>
    );
};

export default CrownSourcingModal;