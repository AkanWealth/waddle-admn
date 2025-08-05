"use client";

import { useState, useEffect } from "react";
import StatusBadge from "./StatusBadge";
import EventApproveDetailsModal from "../ModalPages/Events/viewDeactivateEventModal";
import EventDetailsModal from "../ModalPages/Events/EventDetailsModal";
import { useRecommendationsStore } from '@/stores/useRecommendationStore';
import { eventService } from "@/utils/eventService";
import { useToastContext } from "@/context/toast";

export default function EventTable({ data, currentPage, searchTerm, statusFilter, dateFilter, mobileView, isLoading }) {
    
    // State management
    const [paginatedevents, setPaginatedevents] = useState([]);

    // Modal state management
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { selectedEvent, setSelectedEvent } = useRecommendationsStore();

    // Pagination logic - data is already filtered from parent component
    const itemsPerPage = 7; // Changed back to 7 to match parent component calculation
    const {showMessage}=useToastContext()

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setPaginatedevents(data.slice(startIndex, endIndex));
    }, [currentPage, data]);

    // Updated helper function to get event status - now handles backend enum
    const getEventStatus = (event) => {
        // Handle soft delete first
        if (event.isDeleted) return "Deleted";
        
        // Use backend status if available
        if (event.status) {
            switch (event.status) {
                case 'APPROVED':
                    return 'Approved';
                case 'PENDING':
                    return 'Pending';
                case 'DRAFT':
                    return 'Draft';
                case 'NON_COMPLIANT':
                    return 'Non-Compliant';
                case 'CROWD_SOURCED':
                    return 'Crowd Sourced';
                default:
                    return event.status;
            }
        }
        
        // Fallback to old logic for backward compatibility
        if (event.isPublished) return "Published";
        return "Draft";
    };

    // Helper function to check if event can be approved
    const canApproveEvent = (event) => {
        const status = getEventStatus(event);
        return ['Draft', 'Pending', ].includes(status);
    };

    // Helper function to check if event is published/approved
    const isEventPublished = (event) => {
        const status = getEventStatus(event);
        return ['Approved', 'Published', 'Crowd Sourced'].includes(status);
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

    // Function to open event details modal
    const openeventDetails = (event) => {
        if (!event) return;
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    // Function to close modal
    const closeModal = () => {
        setSelectedEvent(null);
        setIsModalOpen(false);
    };

    // Function to handle event approval (toggle published status)
    const handleApprove = async(eventId) => {
                // console.log(`Event ${eventId} approved/published (handled by parent)`);

        if (!eventId) return;
        try{
            const response = await eventService.approveAdminEvent(eventId);
            if (response.success) {
                setPaginatedevents(prevEvents =>
            prevEvents.map(event =>
                event.id === eventId ? { ...event, status:"APPROVED", isPublished: true } : event
            )
        );
                console.log(response, "Event approved successfully");
                showMessage("Success", "Event approved successfully", "success");
                        closeModal();

            }
            else {
                showMessage("Error", "Failed to approve event", "error");
            }
        }catch (error) {
            console.error("Error approving event:", error);
            return;
        }
        
    };

    // Function to handle event rejection (unpublish)
    const handleReject = async(eventId) => {
        if (!eventId) return;
        try{
            const response = await eventService.rejectAdminEvent(eventId);
            if (response.success) {
                setPaginatedevents(prevEvents =>
            prevEvents.map(event =>
                event.id === eventId ? { ...event, status: "NON_COMPLIANT", isPublished: false } : event
            )
        );
                // setSelectedEvent(null);
                console.log(response, "Event rejected successfully");
                showMessage("Success", "Event rejected successfully", "success");
                closeModal();

            }
            else {
                showMessage("Error", "Failed to reject event", "error");
            }
        }catch (error) {
            console.error("Error rejecting event:", error);
            return;
        }
        
        // Close modal after rejection
        closeModal();
    };

    // Function to handle event deletion
    const handleDelete = async (eventId) => {
        console.log(`Event ${eventId} deleted (handled by parent)`);

        if (!eventId) return;
        try{
            await eventService.softDeleteEvent(eventId);
           
                setPaginatedevents(prevEvents =>
                prevEvents.filter(event => event.id !== eventId)
            );
            showMessage("Success", "Event deleted successfully", "success");
                closeModal();            
        }catch (error) {
            showMessage("Failed", "Failed to delete event", "error"); 
            return;
        }
        
        // This function is now handled by the parent component, so no direct state update here
        // The parent component will re-fetch or update the data
        
        // Close modal after deletion
        closeModal();
    };

    // Updated render modal function to handle different statuses
    const renderModal = () => {
        if (!selectedEvent || !isModalOpen) return null;

        const eventStatus = getEventStatus(selectedEvent);
        const modalProps = {
            event: selectedEvent,
            isOpen: isModalOpen,
            onClose: closeModal,
        };

        // Show approval modal for events that can be approved
        if (canApproveEvent(selectedEvent)) {
            return (
                <EventDetailsModal
                    {...modalProps}
                    onApprove={handleApprove}
                    onReject={handleReject}
                />
            );
        }
        
        // Show view/deactivate modal for published/approved events
        if (isEventPublished(selectedEvent)) {
            return (
                <EventApproveDetailsModal
                    {...modalProps}
                    onDelete={handleDelete}
                />
            );
        }

        // Default case - show view modal
        return (
            <EventApproveDetailsModal
                {...modalProps}
                onDelete={handleDelete}
            />
        );
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
                                            <td className="py-4 px-4">{event?.organiser?.name || 'Waddle'}</td>
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