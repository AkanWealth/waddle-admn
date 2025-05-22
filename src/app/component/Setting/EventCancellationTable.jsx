"use client";

import { useState, useEffect } from "react";
import { Calendar, CircleCheck, XCircle, Clock } from "lucide-react";

export default function NotificationTable({ currentPage, searchTerm, statusFilter, dateFilter, mobileView, onTotalPagesUpdate }) {
    // Sample data with updated status values
    const [allNotifications, setAllNotifications] = useState([
        {
            id: 1,
            eventName: "Kids Art Workshop",
            organizer: "FunKids Hub",
            date: "02-04-2025",
            bookedUsers: "24 Parents",
            status: "Notified",
            actions: "View Details"
        },
        {
            id: 2,
            eventName: "Science Fair",
            organizer: "ABC Events",
            date: "02-04-2025",
            bookedUsers: "12 Parents",
            status: "Cancelled",
            actions: "View & Notify"
        },
        {
            id: 3,
            eventName: "Happy Kids",
            organizer: "STEM Club",
            date: "02-04-2025",
            bookedUsers: "5 Parents",
            status: "Notified",
            actions: "View Details"
        },
        {
            id: 4,
            eventName: "Zoo Park",
            organizer: "Limitless Goal",
            date: "02-04-2025",
            bookedUsers: "12 Parents",
            status: "Cancelled",
            actions: "View & Notify"
        },
        {
            id: 5,
            eventName: "Kane Events",
            organizer: "Event Home",
            date: "02-04-2025",
            bookedUsers: "39 Parents",
            status: "Pending",
            actions: "View Details"
        },
        {
            id: 6,
            eventName: "Music Workshop",
            organizer: "Creative Kids",
            date: "03-04-2025",
            bookedUsers: "18 Parents",
            status: "Pending",
            actions: "View & Notify"
        },
        {
            id: 7,
            eventName: "Dance Class",
            organizer: "Move & Groove",
            date: "04-04-2025",
            bookedUsers: "25 Parents",
            status: "Cancelled",
            actions: "View & Notify"
        }
    ]);

    const [filteredNotifications, setFilteredNotifications] = useState([]);
    const [paginatedNotifications, setPaginatedNotifications] = useState([]);

    // Apply search and filters
    useEffect(() => {
        let results = [...allNotifications];

        // Apply search
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            results = results.filter(
                notification =>
                    notification.eventName.toLowerCase().includes(term) ||
                    notification.organizer.toLowerCase().includes(term) ||
                    notification.date.includes(term)
            );
        }

        // Apply status filter
        if (statusFilter && statusFilter.length > 0) {
            results = results.filter(notification =>
                statusFilter.includes(notification.status)
            );
        }

        // Apply date filter (simple implementation - you might want to improve this)
        if (dateFilter.from || dateFilter.to) {
            results = results.filter(notification => {
                const notificationDate = new Date(notification.date.split('-').reverse().join('-'));
                const fromDate = dateFilter.from ? new Date(dateFilter.from) : null;
                const toDate = dateFilter.to ? new Date(dateFilter.to) : null;

                if (fromDate && toDate) {
                    return notificationDate >= fromDate && notificationDate <= toDate;
                } else if (fromDate) {
                    return notificationDate >= fromDate;
                } else if (toDate) {
                    return notificationDate <= toDate;
                }
                return true;
            });
        }

        setFilteredNotifications(results);
    }, [allNotifications, searchTerm, statusFilter, dateFilter]);

    // Pagination logic
    const itemsPerPage = 5;

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setPaginatedNotifications(filteredNotifications.slice(startIndex, endIndex));

        // Calculate and update total pages
        const calculatedTotalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
        if (onTotalPagesUpdate) {
            onTotalPagesUpdate(calculatedTotalPages);
        }
    }, [currentPage, filteredNotifications, onTotalPagesUpdate]);

    // Status icon component
    const StatusIcon = ({ status }) => {
        switch (status) {
            case "Notified":
                return <CircleCheck className="w-4 h-4 text-green-500" />;
            case "Cancelled":
                return <XCircle className="w-4 h-4 text-red-500" />;
            case "Pending":
                return <Clock className="w-4 h-4 text-yellow-500" />;
            default:
                return <Check className="w-4 h-4 text-gray-500" />;
        }
    };

    // Get status badge color
    const getStatusBadgeColor = (status) => {
        switch (status) {
            case "Notified":
                return "bg-green-100 text-green-800";
            case "Cancelled":
                return "bg-red-100 text-red-800";
            case "Pending":
                return "bg-yellow-100 text-yellow-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    // Render mobile view
    if (mobileView) {
        return (
            <div className="space-y-4">
                {/* Mobile Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        {paginatedNotifications.length > 0 ? (
                            <>
                                <thead>
                                    <tr className="text-left text-gray-500 text-xs border-b">
                                        <th className="pb-2 pr-2 font-medium">Event</th>
                                        <th className="pb-2 px-2 font-medium text-center">Status</th>
                                        <th className="pb-2 pl-2 font-medium text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedNotifications.map((notification, index) => (
                                        <tr key={notification.id} className="text-gray-800 text-sm border-b">
                                            <td className="py-3 pr-2">
                                                <div>
                                                    <p className="font-medium">{notification.eventName}</p>
                                                    <p className="text-xs text-gray-500">{notification.organizer} • {notification.date}</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-2 text-center">
                                                <div className={`flex items-center justify-center px-2 py-1 rounded-full ${getStatusBadgeColor(notification.status)}`}>
                                                    <StatusIcon status={notification.status} />
                                                    <span className="ml-2 text-xs font-medium">
                                                        {notification.status}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-3 pl-2 text-center">
                                                <button className="text-blue-600 hover:underline text-xs">
                                                    {notification.actions}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </>
                        ) : (
                            <tbody>
                                <tr>
                                    <td colSpan="3" className="text-center py-8">
                                        <div className="w-16 h-16 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
                                            <Calendar className="w-8 h-8 text-blue-600" />
                                        </div>
                                        <h4 className="text-lg font-medium text-gray-800 mb-1">No Results Found</h4>
                                        <p className="text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
                                    </td>
                                </tr>
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
        );
    }

    // Desktop view
    return (
        <div className="space-y-4">
            {/* Desktop Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    {paginatedNotifications.length > 0 ? (
                        <>
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Name</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organiser</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booked Users</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {paginatedNotifications.map((notification) => (
                                    <tr key={notification.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{notification.eventName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{notification.organizer}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{notification.date}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{notification.bookedUsers}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div className={`flex items-center p-1 rounded-lg ${getStatusBadgeColor(notification.status)}`}>
                                                <StatusIcon status={notification.status} />
                                                <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(notification.status)}`}>
                                                    {notification.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <button className="text-blue-600 hover:underline">
                                                {notification.actions}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </>
                    ) : (
                        <tbody>
                            <tr>
                                <td colSpan="6" className="text-center py-12">
                                    <div className="w-16 h-16 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
                                        <Calendar className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <h4 className="text-lg font-medium text-gray-800 mb-1">No Results Found</h4>
                                    <p className="text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
}