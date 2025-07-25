"use client";

import { useState, useEffect } from "react";
import StatusBadge from "./StatusBadge";
import CrownSourcingModal from "../ModalPages/Events/CrownSourcingModal";
import EventApproveDetailsModal from "../ModalPages/Events/viewDeactivateEventModal";
import EventDetailsModal from "../ModalPages/Events/EventDetailsModal";

export default function EventTable({ data, currentPage, searchTerm, statusFilter, dateFilter, mobileView, isLoading }) {
    console.log(data, "This is the data");
    
    // State management
    const [allevents, setAllevents] = useState(data || []);
    const [filteredevents, setFilteredevents] = useState([]);
    const [paginatedevents, setPaginatedevents] = useState([]);

    // Modal state management
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedevent, setSelectedevent] = useState(null);

    // Update allevents when data prop changes
    useEffect(() => {
        setAllevents(data || []);
    }, [data]);

    // Helper function to get event status
    const getEventStatus = (event) => {
        if (event.isDeleted) return "Deleted";
        
        if (event.isPublished) return "Published";
        if (event.isPublished) return "Draft";
        return "Unknown";
    };

    // Helper function to format date
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch {
            return 'Invalid Date';
        }
    };

    // Helper function to get organizer info
    const getOrganizerInfo = (event) => {
        if (event.organiser) {
            return {
                name: `${event.organiser.first_name || ''} ${event.organiser.last_name || ''}`.trim(),
                email: event.organiser.email || 'N/A',
                mobile: event.organiser.mobile || 'N/A'
            };
        } else if (event.admin) {
            return {
                name: `${event.admin.first_name || ''} ${event.admin.last_name || ''}`.trim(),
                email: event.admin.email || 'N/A',
                mobile: event.admin.mobile || 'N/A'
            };
        }
        return {
            name: 'N/A',
            email: 'N/A',
            mobile: 'N/A'
        };
    };

    // Apply search and filters
    useEffect(() => {
        let results = [...allevents];

        // Apply search filter
        if (searchTerm && searchTerm.trim()) {
            const term = searchTerm.toLowerCase().trim();
            results = results.filter(event => {
                const organizer = getOrganizerInfo(event);
                return (
                    (event.name && event.name.toLowerCase().includes(term)) ||
                    (event.description && event.description.toLowerCase().includes(term)) ||
                    (event.category && event.category.toLowerCase().includes(term)) ||
                    (organizer.name && organizer.name.toLowerCase().includes(term)) ||
                    (organizer.email && organizer.email.toLowerCase().includes(term)) ||
                    (event.address && event.address.toLowerCase().includes(term))
                );
            });
        }

        // Apply status filter
        if (statusFilter && Array.isArray(statusFilter) && statusFilter.length > 0) {
            results = results.filter(event => {
                const eventStatus = getEventStatus(event);
                return statusFilter.includes(eventStatus);
            });
        }

        // Apply date filter
        if (dateFilter) {
            if (dateFilter.from) {
                results = results.filter(event => {
                    if (!event.date) return false;
                    const eventDate = new Date(event.date);
                    const fromDate = new Date(dateFilter.from);
                    return eventDate >= fromDate;
                });
            }
            if (dateFilter.to) {
                results = results.filter(event => {
                    if (!event.date) return false;
                    const eventDate = new Date(event.date);
                    const toDate = new Date(dateFilter.to);
                    return eventDate <= toDate;
                });
            }
        }

        setFilteredevents(results);
    }, [allevents, searchTerm, statusFilter, dateFilter]);

    // Pagination logic
    const itemsPerPage = 7;

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setPaginatedevents(filteredevents.slice(startIndex, endIndex));
    }, [currentPage, filteredevents]);

    // Function to open event details modal
    const openeventDetails = (event) => {
        if (!event) return;
        setSelectedevent(event);
        setIsModalOpen(true);
    };

    // Function to close modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedevent(null);
    };

    // Function to handle event approval (toggle published status)
    const handleApprove = (eventId) => {
        if (!eventId) return;
        
        setAllevents(prevEvents =>
            prevEvents.map(event =>
                event.id === eventId ? { ...event, isPublished: true } : event
            )
        );
        
        // Close modal after approval
        closeModal();
        
        // API call would go here
        console.log(`Event ${eventId} approved/published`);
    };

    // Function to handle event rejection (unpublish)
    const handleReject = (eventId) => {
        if (!eventId) return;
        
        setAllevents(prevEvents =>
            prevEvents.map(event =>
                event.id === eventId ? { ...event, isPublished: false } : event
            )
        );
        
        // Close modal after rejection
        closeModal();
        
        // API call would go here
        console.log(`Event ${eventId} rejected/unpublished`);
    };

    // Function to handle event deletion
    const handleDelete = (eventId) => {
        if (!eventId) return;
        
        setAllevents(prevEvents =>
            prevEvents.map(event =>
                event.id === eventId ? { ...event, isDeleted: true } : event
            )
        );
        
        // Close modal after deletion
        closeModal();
        
        // API call would go here
        console.log(`Event ${eventId} deleted`);
    };

    // Render modal based on event status
    const renderModal = () => {
        if (!selectedevent || !isModalOpen) return null;

        const eventStatus = getEventStatus(selectedevent);
        const modalProps = {
            event: selectedevent,
            isOpen: isModalOpen,
            onClose: closeModal,
        };

        switch (eventStatus) {
            case "Draft":
                return (
                    <EventDetailsModal
                    event={selectedevent}
                        {...modalProps}
                        onApprove={handleApprove}
                        onReject={handleReject}
                    />
                );
            case "Published":
                return (
                    <EventApproveDetailsModal
                        {...modalProps}
                        onDelete={handleDelete}
                    />
                );
            default:
                return (
                    <EventApproveDetailsModal
                        {...modalProps}
                    />
                );
        }
    };

    // Empty state component
    const EmptyState = ({ colSpan }) => (
        <>
            <tr>
                <td colSpan={colSpan} className="text-center py-4 text-gray-500">
                    <img src="/emptyFrame.png" alt="No events" className="w-auto h-auto mx-auto mb-4" />
                </td>
            </tr>
            <tr>
                <td colSpan={colSpan} className="text-center py-2 text-gray-800 font-bold">
                    No Events Yet
                </td>
            </tr>
            <tr>
                <td colSpan={colSpan} className="text-center text-gray-500 px-4">
                    It looks like no events have been created yet. Once events are added, their details will appear here.
                </td>
            </tr>
        </>
    );

    // Mobile view
    if (mobileView) {
        return (
            <>
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        {isLoading ? (
                            <tbody>
                                <tr>
                                    <td colSpan={3} className="text-center py-8">
                                        <svg className="animate-spin h-8 w-8 text-blue-600 mb-2 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                        </svg>
                                        <span className="text-gray-500">Loading events...</span>
                                    </td>
                                </tr>
                            </tbody>
                        ) : paginatedevents.length > 0 ? (
                            <>
                                <thead>
                                    <tr className="text-left text-gray-500 text-sm border-b">
                                        <th className="pb-3 pr-2 font-medium">Event</th>
                                        <th className="pb-3 px-2 font-medium text-center">Status</th>
                                        <th className="pb-3 pl-2 font-medium text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedevents.map((event, index) => {
                                        const eventStatus = getEventStatus(event);
                                        return (
                                            <tr key={event.id || index} className="text-gray-800 text-sm border-b">
                                                <td className="py-4 pr-2">{event.name || 'N/A'}</td>
                                                <td className="py-4 px-2 text-center"><StatusBadge status={eventStatus} /></td>
                                                <td className="py-4 pl-2 text-center">
                                                    <button
                                                        onClick={() => openeventDetails(event)}
                                                        className="text-blue-600 hover:underline focus:outline-none focus:underline"
                                                    >
                                                        Details
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </>
                        ) : (
                            <tbody>
                                {!isLoading && <EmptyState colSpan={3} />}
                            </tbody>
                        )}
                    </table>
                </div>
                {renderModal()}
            </>
        );
    }

    // Desktop view
    return (
        <>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    {isLoading ? (
                        <tbody>
                            <tr>
                                <td colSpan={6} className="text-center py-8">
                                    <svg className="animate-spin h-8 w-8 text-blue-600 mb-2 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                    </svg>
                                    <span className="text-gray-500">Loading events...</span>
                                </td>
                            </tr>
                        </tbody>
                    ) : paginatedevents.length > 0 ? (
                        <>
                            <thead>
                                <tr className="text-left bg-[#FAFAFA]  text-gray-500 text-sm">
                                    <th className="pb-3 px-4 py-2 font-medium min-w-[200px]">Event Name</th>
                                    <th className="pb-3 px-4 py-2 font-medium min-w-[150px]">Organiser Name</th>
                                    <th className="pb-3 px-4 py-2 font-medium min-w-[120px]">Date</th>
                                    <th className="pb-3 px-4 py-2 font-medium min-w-[120px]">Location</th>
                                    <th className="pb-3 px-4 py-2 font-medium min-w-[80px]">Status</th>
                                    <th className="pb-3 px-4 py-2 font-medium min-w-[100px]">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedevents.map((event, index) => {
                                    const organizer = getOrganizerInfo(event);
                                    const eventStatus = getEventStatus(event);
                                    return (
                                        <tr 
                                            key={event.id || index} 
                                            className="odd:bg-white even:bg-gray-50 text-gray-500 text-sm hover:bg-gray-50 transition-colors"
                                        >
                                        {console.log(event, "This is the event we have")}
                                            <td className="py-4 px-4">{event.name || 'N/A'}</td>
                                            <td className="py-4 px-4">{event.organiser.name || 'Waddle'}</td>
                                            <td className="py-4 px-4">{formatDate(event.date)}</td>
                                            <td className="py-4 px-4">{event.address || 'N/A'}</td>
                                            <td className="py-4 px-4"><StatusBadge status={eventStatus} /></td>
                                            <td className="py-4 px-4">
                                                <button
                                                    onClick={() => openeventDetails(event)}
                                                    className="text-[#2853A6] cursor-pointer hover:underline focus:outline-none focus:underline whitespace-nowrap"
                                                >
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </>
                    ) : (
                        <tbody>
                            {!isLoading && <EmptyState colSpan={6} />}
                        </tbody>
                    )}
                </table>
            </div>
            {renderModal()}
        </>
    );
}