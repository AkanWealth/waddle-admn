"use client";

import { useState, useEffect } from "react";
import StatusBadge from "./StatusBadge";
import CrownSourcingModal from "../ModalPages/Events/CrownSourcingModal";
import EventApproveDetailsModal from "../ModalPages/Events/viewDeactivateEventModal";
import EventDetailsModal from "../ModalPages/Events/EventDetailsModal";

export default function EventTable({ currentPage, searchTerm, statusFilter, dateFilter, mobileView }) {
    // Sample data for events
    const [allevents, setAllevents] = useState([
        {
            id: 1,
            name: "XYZ Events",
            mobile: "(212) 555-1234",
            email: "john.smith@email.com",
            date: "2024-05-15",
            status: "Pending",
            contactName: "John Smith",
            description: "Professional event management services for corporate and private clients.",
            contactDetails: {
                phone: "(212) 555-1234",
                email: "john.smith@email.com",
                address: "123 Broadway, New York, NY",
                website: "www.xyzevents.com"
            },
            taxId: "123-45-6789",
            businessLicense: "XYZ Events License.PDF"
        },
        {
            id: 2,
            name: "ABC Org",
            mobile: "(323) 555-5678",
            email: "emily.j@email.com",
            date: "2024-06-20",
            status: "Non-compliant"
        },
        {
            id: 3,
            name: "Happy Kids",
            mobile: "(312) 555-8765",
            email: "mwilliams@email.com",
            date: "2024-07-02",
            status: "Approved"
        },
        {
            id: 4,
            name: "Elite Dancer School",
            mobile: "(713) 555-2345",
            email: "jessica.b@email.com",
            date: "2024-08-10",
            status: "Pending",
            contactName: "Jessica Brown",
            description: "Designed to teach and train family both parents and children. this is very nice this rich and enjoyable. Bring your kids let us train them to be professional from foundation.",
            contactDetails: {
                phone: "(713) 555-2345",
                email: "jessica.b@email.com",
                address: "362 Sycamore St, Detroit, MI",
                website: "www.elitedancers.com"
            },
            taxId: "987-65-4321",
            businessLicense: "Elite Dancer Business Licence.PDF"
        },
        {
            id: 5,
            name: "ABC Events",
            mobile: "(305) 555-6789",
            email: "david.a@email.com",
            date: "2024-09-12",
            status: "Crown sourcing"
        },
        {
            id: 6,
            name: "XYZ Events",
            mobile: "(206) 555-1357",
            email: "sarah.m@email.com",
            date: "2024-10-05",
            status: "Draft"
        },
        {
            id: 7,
            name: "Kane Events",
            mobile: "(720) 555-2468",
            email: "daniel.t@email.com",
            date: "2024-11-18",
            status: "Non-compliant"
        },
        // Rest of data...
    ]);

    const [filteredevents, setFilteredevents] = useState([]);
    const [paginatedevents, setPaginatedevents] = useState([]);

    // Modal state management
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedevent, setSelectedevent] = useState(null);

    // Removed the auto-popup for pending events

    // Apply search and filters
    useEffect(() => {
        let results = [...allevents];

        // Apply search
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            results = results.filter(
                event =>
                    event.name.toLowerCase().includes(term) ||
                    event.email.toLowerCase().includes(term) ||
                    event.mobile.includes(term)
            );
        }

        // Apply status filter
        if (statusFilter && statusFilter.length > 0) {
            results = results.filter(event => statusFilter.includes(event.status));
        }

        // Apply date filter
        if (dateFilter.from) {
            results = results.filter(event => event.date >= dateFilter.from);
        }
        if (dateFilter.to) {
            results = results.filter(event => event.date <= dateFilter.to);
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
        setSelectedevent(event);
        setIsModalOpen(true);
    };

    // Function to handle event approval
    const handleApprove = (eventId) => {
        setAllevents(allevents.map(event =>
            event.id === eventId ? { ...event, status: "Approved" } : event
        ));
        // You would typically make an API call here to update the status in your backend
        console.log(`event ${eventId} approved`);
    };

    // Function to handle event rejection
    const handleReject = (eventId) => {
        setAllevents(allevents.map(event =>
            event.id === eventId ? { ...event, status: "Rejected" } : event
        ));
        // You would typically make an API call here to update the status in your backend
        console.log(`event ${eventId} rejected`);
    };

    // Render mobile view as a simplified table
    if (mobileView) {
        return (
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    {paginatedevents.length > 0 ? (
                        <>
                            <thead>
                                <tr className="text-left text-gray-500 text-sm border-b">
                                    <th className="pb-3 pr-2 font-medium">event</th>
                                    <th className="pb-3 px-2 font-medium text-center">Status</th>
                                    <th className="pb-3 pl-2 font-medium text-center">-</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedevents.map((event, index) => (
                                    <tr key={index} className="text-gray-800 text-sm border-b">
                                        <td className="py-4 pr-2">{event.name}</td>
                                        <td className="py-4 px-2 text-center">
                                            <StatusBadge status={event.status} />
                                        </td>
                                        <td className="py-4 pl-2 text-center">
                                            <button
                                                onClick={() => openeventDetails(event)}
                                                className="text-blue-600 hover:underline"
                                            >
                                                Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </>
                    ) : (
                        <tbody>
                            <tr>
                                <td colSpan="3" className="text-center py-4 text-gray-500">
                                    <img src="/emptyFrame.png" alt="No events" className="w-auto h-auto mx-auto mb-4" />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="3" className="text-center py-2 text-gray-800 text-bold">
                                    No events Yet
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2" className="text-center text-gray-500">
                                    It looks like no events have joined the platform yet. Once events sign up, their details will appear here.
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>

                {/* event Details Modal */}
                {selectedevent && selectedevent.status === "Pending" ? (
                    <EventDetailsModal
                        event={selectedevent}
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onApprove={handleApprove}
                        onReject={handleReject}
                    />
                ) : selectedevent && selectedevent.status === "Crown sourcing" ? (
                    <CrownSourcingModal
                        event={selectedevent}
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onApprove={handleApprove}
                        onReject={handleReject}
                    />
                ) : (
                    <EventApproveDetailsModal
                        event={selectedevent}
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                    // onApprove={handleApprove}
                    // onReject={handleReject}
                    />
                )}
            </div>
        );
    }

    // Desktop view remains unchanged but with modal functionality
    return (
        <>
            <table className="min-w-full">
                {paginatedevents.length > 0 ? (
                    <>
                        <thead>
                            <tr className="text-left text-gray-500 text-sm">
                                <th className="pb-3 px-4 font-medium">User Name</th>
                                <th className="pb-3 px-4 font-medium">Mobile Number</th>
                                <th className="pb-3 px-4 font-medium">Email Address</th>
                                <th className="pb-3 px-4 font-medium">Registration Date</th>
                                <th className="pb-3 px-4 font-medium">Status</th>
                                <th className="pb-3 px-4 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedevents.map((event, index) => (
                                <tr key={index} className="text-gray-500 text-sm hover:bg-gray-50">
                                    <td className="py-4 px-4">{event.name}</td>
                                    <td className="py-4 px-4">{event.mobile}</td>
                                    <td className="py-4 px-4">{event.email}</td>
                                    <td className="py-4 px-4">{event.date}</td>
                                    <td className="py-4 px-4"><StatusBadge status={event.status} /></td>
                                    <td className="py-4 px-4">
                                        <button
                                            onClick={() => openeventDetails(event)}
                                            className="text-blue-600 hover:underline"
                                        >
                                            View Profile
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </>
                ) : (
                    <tbody>
                        <tr>
                            <td colSpan="6" className="text-center py-4 text-gray-500">
                                <img src="/emptyFrame.png" alt="No events" className="w-auto h-auto mx-auto mb-4" />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="6" className="text-center py-2 text-gray-800 text-bold">
                                No events Yet
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" className="text-center text-gray-500">
                                It looks like no events have joined the platform yet. Once events sign up, their details will appear here.
                            </td>
                        </tr>
                    </tbody>
                )}
            </table>

            {/* event Details Modal */}
            {selectedevent && selectedevent.status === "Pending" ? (
                <EventDetailsModal
                    event={selectedevent}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onApprove={handleApprove}
                    onReject={handleReject}
                />
            ) : selectedevent && selectedevent.status === "Crown sourcing" ? (
                <CrownSourcingModal
                    event={selectedevent}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onApprove={handleApprove}
                    onReject={handleReject}
                />
            ) : (
                <EventApproveDetailsModal
                    event={selectedevent}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                // onApprove={handleApprove}
                // onReject={handleReject}
                />
            )}
        </>
    );
}