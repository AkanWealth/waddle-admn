// "use client";

// import { useState, useEffect } from "react";
// import StatusBadge from "./StatusBadge";
// import CrownSourcingModal from "../ModalPages/Events/CrownSourcingModal";
// import EventApproveDetailsModal from "../ModalPages/Events/viewDeactivateEventModal";
// import EventDetailsModal from "../ModalPages/Events/EventDetailsModal";

// export default function EventTable({ data,currentPage, searchTerm, statusFilter, dateFilter, mobileView }) {
//     console.log(data, "This is the data")
//     // Sample data for events
//     const [allevents, setAllevents] = useState(data);
//     useEffect(() => {
//   setAllevents(data);
// }, [data]);


//     const [filteredevents, setFilteredevents] = useState([]);
//     const [paginatedevents, setPaginatedevents] = useState([]);

//     // Modal state management
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [selectedevent, setSelectedevent] = useState(null);

//     // Removed the auto-popup for pending events

//     // Apply search and filters
//     useEffect(() => {
//         let results = [...allevents];

//         // Apply search
//         if (searchTerm) {
//             const term = searchTerm.toLowerCase();
//             results = results.filter(
//                 event =>
//                     event.name.toLowerCase().includes(term) ||
//                     event.email.toLowerCase().includes(term) ||
//                     event.mobile.includes(term)
//             );
//         }

//         // Apply status filter
//         if (statusFilter && statusFilter.length > 0) {
//             results = results.filter(event => statusFilter.includes(event.status));
//         }

//         // Apply date filter
//         if (dateFilter.from) {
//             results = results.filter(event => event.date >= dateFilter.from);
//         }
//         if (dateFilter.to) {
//             results = results.filter(event => event.date <= dateFilter.to);
//         }

//         setFilteredevents(results);
//     }, [allevents, searchTerm, statusFilter, dateFilter]);

//     // Pagination logic
//     const itemsPerPage = 7;

//     useEffect(() => {
//         const startIndex = (currentPage - 1) * itemsPerPage;
//         const endIndex = startIndex + itemsPerPage;
//         setPaginatedevents(filteredevents.slice(startIndex, endIndex));
//     }, [currentPage, filteredevents]);

//     // Function to open event details modal
//     const openeventDetails = (event) => {
//         setSelectedevent(event);
//         setIsModalOpen(true);
//     };

//     // Function to handle event approval
//     const handleApprove = (eventId) => {
//         setAllevents(allevents.map(event =>
//             event.id === eventId ? { ...event, status: "Approved" } : event
//         ));
//         // You would typically make an API call here to update the status in your backend
//         console.log(`event ${eventId} approved`);
//     };

//     // Function to handle event rejection
//     const handleReject = (eventId) => {
//         setAllevents(allevents.map(event =>
//             event.id === eventId ? { ...event, status: "Rejected" } : event
//         ));
//         // You would typically make an API call here to update the status in your backend
//         console.log(`event ${eventId} rejected`);
//     };

//     // Render mobile view as a simplified table
//     if (mobileView) {
//         return (
//             <div className="overflow-x-auto">
//                 <table className="min-w-full">
//                     {paginatedevents.length > 0 ? (
//                         <>
//                             <thead>
//                                 <tr className="text-left text-gray-500 text-sm border-b">
//                                     <th className="pb-3 pr-2 font-medium">event</th>
//                                     <th className="pb-3 px-2 font-medium text-center">Status</th>
//                                     <th className="pb-3 pl-2 font-medium text-center">-</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {paginatedevents.map((event, index) => (
//                                     <tr key={index} className="text-gray-800 text-sm border-b">
//                                         <td className="py-4 pr-2">{event.name}</td>
//                                         <td className="py-4 px-2 text-center">
//                                             <StatusBadge status={event.status} />
//                                         </td>
//                                         <td className="py-4 pl-2 text-center">
//                                             <button
//                                                 onClick={() => openeventDetails(event)}
//                                                 className="text-blue-600 hover:underline"
//                                             >
//                                                 Details
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </>
//                     ) : (
//                         <tbody>
//                             <tr>
//                                 <td colSpan="3" className="text-center py-4 text-gray-500">
//                                     <img src="/emptyFrame.png" alt="No events" className="w-auto h-auto mx-auto mb-4" />
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td colSpan="3" className="text-center py-2 text-gray-800 text-bold">
//                                     No events Yet
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td colSpan="2" className="text-center text-gray-500">
//                                     It looks like no events have joined the platform yet. Once events sign up, their details will appear here.
//                                 </td>
//                             </tr>
//                         </tbody>
//                     )}
//                 </table>

//                 {/* event Details Modal */}
//                 {selectedevent && selectedevent.status === "Pending" ? (
//                     <EventDetailsModal
//                         event={selectedevent}
//                         isOpen={isModalOpen}
//                         onClose={() => setIsModalOpen(false)}
//                         onApprove={handleApprove}
//                         onReject={handleReject}
//                     />
//                 ) : selectedevent && selectedevent.status === "Crown sourcing" ? (
//                     <CrownSourcingModal
//                         event={selectedevent}
//                         isOpen={isModalOpen}
//                         onClose={() => setIsModalOpen(false)}
//                         onApprove={handleApprove}
//                         onReject={handleReject}
//                     />
//                 ) : (
//                     <EventApproveDetailsModal
//                         event={selectedevent}
//                         isOpen={isModalOpen}
//                         onClose={() => setIsModalOpen(false)}
//                     // onApprove={handleApprove}
//                     // onReject={handleReject}
//                     />
//                 )}
//             </div>
//         );
//     }

//     // Desktop view remains unchanged but with modal functionality
//     return (
//         <>
//             <table className="min-w-full">
//                 {paginatedevents.length > 0 ? (
//                     <>
//                         <thead>
//                             <tr className="text-left text-gray-500 text-sm">
//                                 <th className="pb-3 px-4 font-medium">User Name</th>
//                                 <th className="pb-3 px-4 font-medium">Mobile Number</th>
//                                 <th className="pb-3 px-4 font-medium">Email Address</th>
//                                 <th className="pb-3 px-4 font-medium">Registration Date</th>
//                                 <th className="pb-3 px-4 font-medium">Status</th>
//                                 <th className="pb-3 px-4 font-medium">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {paginatedevents.map((event, index) => (
//                                 <tr key={index} className="odd:bg-white even:bg-gray-50 text-gray-500 text-sm hover:bg-gray-50">
//                                     <td className="py-4 px-4">{event.name}</td>
//                                     <td className="py-4 px-4">{event.mobile}</td>
//                                     <td className="py-4 px-4">{event.email}</td>
//                                     <td className="py-4 px-4">{event.date}</td>
//                                     <td className="py-4 px-4"><StatusBadge status={event.status} /></td>
//                                     <td className="py-4 px-4">
//                                         <button
//                                             onClick={() => openeventDetails(event)}
//                                             className="text-blue-600 hover:underline"
//                                         >
//                                             View Profile
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </>
//                 ) : (
//                     <tbody>
//                         <tr>
//                             <td colSpan="6" className="text-center py-4 text-gray-500">
//                                 <img src="/emptyFrame.png" alt="No events" className="w-auto h-auto mx-auto mb-4" />
//                             </td>
//                         </tr>
//                         <tr>
//                             <td colSpan="6" className="text-center py-2 text-gray-800 text-bold">
//                                 No events Yet
//                             </td>
//                         </tr>
//                         <tr>
//                             <td colSpan="2" className="text-center text-gray-500">
//                                 It looks like no events have joined the platform yet. Once events sign up, their details will appear here.
//                             </td>
//                         </tr>
//                     </tbody>
//                 )}
//             </table>

//             {/* event Details Modal */}
//             {selectedevent && selectedevent.status === "Pending" ? (
//                 <EventDetailsModal
//                     event={selectedevent}
//                     isOpen={isModalOpen}
//                     onClose={() => setIsModalOpen(false)}
//                     onApprove={handleApprove}
//                     onReject={handleReject}
//                 />
//             ) : selectedevent && selectedevent.status === "Crown sourcing" ? (
//                 <CrownSourcingModal
//                     event={selectedevent}
//                     isOpen={isModalOpen}
//                     onClose={() => setIsModalOpen(false)}
//                     onApprove={handleApprove}
//                     onReject={handleReject}
//                 />
//             ) : (
//                 <EventApproveDetailsModal
//                     event={selectedevent}
//                     isOpen={isModalOpen}
//                     onClose={() => setIsModalOpen(false)}
//                 // onApprove={handleApprove}
//                 // onReject={handleReject}
//                 />
//             )}
//         </>
//     );
// }


"use client";

import { useState, useEffect } from "react";
import StatusBadge from "./StatusBadge";
import CrownSourcingModal from "../ModalPages/Events/CrownSourcingModal";
import EventApproveDetailsModal from "../ModalPages/Events/viewDeactivateEventModal";
import EventDetailsModal from "../ModalPages/Events/EventDetailsModal";

export default function EventTable({ data, currentPage, searchTerm, statusFilter, dateFilter, mobileView }) {
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
        if (!event.isPublished) return "Draft";
        if (event.isPublished) return "Published";
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
                                                onReject={handleReject}

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
                        {paginatedevents.length > 0 ? (
                            <>
                                <thead>
                                    <tr className="text-left text-gray-500 text-sm border-b">
                                        <th className="pb-3 pr-2 font-medium">Event</th>
                                        <th className="pb-3 px-2 font-medium text-center">Status</th>
                                        <th className="pb-3 pl-2 font-medium text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedevents.map((event, index) => {
                                        const eventStatus = getEventStatus(event);
                                        return (
                                            <tr key={event.id || index} className="text-gray-800 text-sm border-b">
                                                <td className="py-4 pr-2">
                                                    <div>
                                                        <div className="font-medium">{event.name || 'N/A'}</div>
                                                        <div className="text-xs text-gray-500">{event.category || 'N/A'}</div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-2 text-center">
                                                    <StatusBadge status={eventStatus} />
                                                </td>
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
                                <EmptyState colSpan={3} />
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
                    {paginatedevents.length > 0 ? (
                        <>
                            <thead>
                                <tr className="text-left text-gray-500 text-sm">
                                    <th className="pb-3 px-4 font-medium min-w-[200px]">Event Details</th>
                                    <th className="pb-3 px-4 font-medium min-w-[150px]">Organizer</th>
                                    <th className="pb-3 px-4 font-medium min-w-[120px]">Date & Time</th>
                                    <th className="pb-3 px-4 font-medium min-w-[100px]">Price</th>
                                    <th className="pb-3 px-4 font-medium min-w-[80px]">Status</th>
                                    <th className="pb-3 px-4 font-medium min-w-[100px]">Actions</th>
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
                                            <td className="py-4 px-4">
                                                <div>
                                                    <div className="font-medium text-gray-800 mb-1">{event.name || 'N/A'}</div>
                                                    <div className="text-xs text-gray-500 mb-1">{event.category || 'N/A'}</div>
                                                    <div className="text-xs text-gray-400">
                                                        {event.ticket_booked || 0}/{event.total_ticket || 0} tickets booked
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <div>
                                                    <div className="font-medium text-gray-800 mb-1">{organizer.name}</div>
                                                    <div className="text-xs text-gray-400 truncate max-w-[140px]">{organizer.email}</div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <div>
                                                    <div className="font-medium text-gray-800 mb-1">{formatDate(event.date)}</div>
                                                    <div className="text-xs text-gray-400">{event.time || 'N/A'}</div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="font-medium text-gray-800">
                                                    {event.price ? `₦${parseInt(event.price).toLocaleString()}` : 'Free'}
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <StatusBadge status={eventStatus} />
                                            </td>
                                            <td className="py-4 px-4">
                                                <button
                                                    onClick={() => openeventDetails(event)}
                                                    className="text-blue-600 hover:underline focus:outline-none focus:underline whitespace-nowrap"
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
                            <EmptyState colSpan={6} />
                        </tbody>
                    )}
                </table>
            </div>
            {renderModal()}
        </>
    );
}