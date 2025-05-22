"use client";

import React, { useState, useEffect } from "react";
import { Clock, TriangleAlert, AlertCircle, CircleCheck, XCircle, TrendingUpDown } from "lucide-react";
import DisputeDetailModal from "../ModalPages/Dispute/DisputeDetailModal";



export default function DisputeTable({ currentPage, searchTerm, statusFilter, dateFilter, mobileView }) {

    // Sample data for disputes
    const [allDisputes, setAllDisputes] = useState([
        {
            id: "#DPT-1023",
            customer: "John Doe",
            vendor: "FunKids Hub",
            reason: "Refund Request",
            lastUpdated: "04-03-2025",
            status: "In Review"
        },
        {
            id: "#DPT-1023",
            customer: "Jane Smith",
            vendor: "PlayZone Events",
            reason: "Service Issue",
            lastUpdated: "04-03-2025",
            status: "Resolved"
        },
        {
            id: "#DPT-1023",
            customer: "Mark Johnson",
            vendor: "Little Explorers",
            reason: "Refund Request",
            lastUpdated: "04-03-2025",
            status: "Closed"
        },
        {
            id: "#DPT-1023",
            customer: "Jane Smith",
            vendor: "PlayZone Events",
            reason: "Misleading Info",
            lastUpdated: "04-03-2025",
            status: "Closed"
        },
        {
            id: "#DPT-1023",
            customer: "Mark Johnson",
            vendor: "FunKids Hub",
            reason: "Service Issue",
            lastUpdated: "04-03-2025",
            status: "In Review"
        },
        {
            id: "#DPT-1023",
            customer: "John Doe",
            vendor: "Little Explorers",
            reason: "Refund Request",
            lastUpdated: "04-03-2025",
            status: "Active"
        },
        {
            id: "#DPT-1023",
            customer: "Jane Smith",
            vendor: "PlayZone Events",
            reason: "Refund Request",
            lastUpdated: "04-03-2025",
            status: "Pending"
        },
        {
            id: "#DPT-1023",
            customer: "Mark Johnson",
            vendor: "FunKids Hub",
            reason: "Misleading Info",
            lastUpdated: "04-03-2025",
            status: "Inactive"
        }
    ]);

    const [filteredDisputes, setFilteredDisputes] = useState([]);
    const [paginatedDisputes, setPaginatedDisputes] = useState([]);
    const [selectedDispute, setSelectedDispute] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Status badge component
    const StatusBadge = ({ status }) => {
        const getStatusStyles = () => {
            switch (status) {
                case "In Review":
                    return "bg-blue-100 text-blue-700";
                case "Resolved":
                    return "bg-yellow-100 text-yellow-700";
                case "Closed":
                    return "bg-green-100 text-green-700";
                case "Active":
                    return "bg-green-100 text-green-700";
                case "Pending":
                    return "bg-gray-100 text-gray-700";
                case "Inactive":
                    return "bg-red-100 text-red-700";
                default:
                    return "bg-gray-100 text-gray-700";
            }
        };

        const getStatusIcon = () => {
            switch (status) {
                case "In Review":
                    return <TrendingUpDown className="w-4 h-4 mr-1 text-blue-500" />;
                case "Resolved":
                    return <TriangleAlert className="w-4 h-4 mr-1 text-orange-500" />;
                case "Closed":
                    return <CircleCheck className="w-4 h-4 mr-1 text-green-500" />;
                case "Active":
                    return <CircleCheck className="w-4 h-4 mr-1 text-green-500" />;
                case "Pending":
                    return <Clock className="w-4 h-4 mr-1 text-gray-500" />;
                case "Inactive":
                    return <XCircle className="w-4 h-4 mr-1 text-red-500" />;
                default:
                    return null;
            }
        };

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium ${getStatusStyles()}`}>
                {getStatusIcon() && <span className="mr-1">{getStatusIcon()}</span>}
                {status}
            </span>
        );
    };


    // Apply search and filters
    useEffect(() => {
        let results = [...allDisputes];

        // Apply search - make it more comprehensive
        if (searchTerm) {
            const term = searchTerm.toLowerCase().trim();
            results = results.filter(
                dispute =>
                    dispute.id.toLowerCase().includes(term) ||
                    dispute.customer.toLowerCase().includes(term) ||
                    dispute.vendor.toLowerCase().includes(term) ||
                    dispute.reason.toLowerCase().includes(term) || // Add reason to search
                    dispute.status.toLowerCase().includes(term)    // Add status to search
            );
        }

        // Apply status filter
        if (statusFilter && statusFilter.length > 0) {
            results = results.filter(dispute => statusFilter.includes(dispute.status));
        }

        // Apply date filter - improve date comparison
        if (dateFilter.from) {
            const fromDate = new Date(dateFilter.from);
            results = results.filter(dispute => {
                const disputeDate = parseDisputeDate(dispute.lastUpdated);
                return disputeDate >= fromDate;
            });
        }
        if (dateFilter.to) {
            const toDate = new Date(dateFilter.to);
            results = results.filter(dispute => {
                const disputeDate = parseDisputeDate(dispute.lastUpdated);
                return disputeDate <= toDate;
            });
        }

        setFilteredDisputes(results);
    }, [allDisputes, searchTerm, statusFilter, dateFilter]);

    const parseDisputeDate = (dateString) => {
        const [day, month, year] = dateString.split('-');
        return new Date(year, month - 1, day);
    };

    const opendisputeDetails = (dispute) => {
        setSelectedDispute(dispute);
        setIsModalOpen(true);
    };

    // Pagination logic
    const itemsPerPage = 7;

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setPaginatedDisputes(filteredDisputes.slice(startIndex, endIndex));
    }, [currentPage, filteredDisputes]);

    // Render mobile view
    if (mobileView) {
        return (
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    {paginatedDisputes.length > 0 ? (
                        <>
                            <thead>
                                <tr className="text-left text-gray-500 text-sm border-b">
                                    <th className="pb-3 pr-2 font-medium">Dispute ID</th>
                                    <th className="pb-3 px-2 font-medium text-center">Status</th>
                                    <th className="pb-3 pl-2 font-medium text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedDisputes.map((dispute, index) => (
                                    <tr key={index} className="text-gray-800 text-sm border-b">
                                        <td className="py-4 pr-2">{dispute.id}</td>
                                        <td className="py-4 px-2 text-center">
                                            <StatusBadge status={dispute.status} />
                                        </td>
                                        <td className="py-4 pl-2 text-center">
                                            <a
                                                href="#"
                                                className="text-blue-600 hover:underline"
                                                onClick={() => opendisputeDetails(dispute)}>
                                                View Details
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </>
                    ) : (
                        <tbody>
                            <tr>
                                <td colSpan="3" className="text-center py-4 text-gray-500">
                                    <img src="/emptyFrame.png" alt="No disputes" className="w-auto h-auto mx-auto mb-4" />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="3" className="text-center py-2 text-gray-800 text-bold">
                                    No Disputes Yet
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="3" className="text-center text-gray-500">
                                    It looks like no disputes have been filed yet. When disputes are created, they will appear here.
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>

                <DisputeDetailModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    dispute={selectedDispute}
                />
            </div>
        );
    }

    // Desktop view
    return (
        <> {/* Change from overflow-x-auto */}
            <div className="overflow-x-auto">
            <table className="min-w-full">
                {paginatedDisputes.length > 0 ? (
                    <>
                        <thead className="bg-white">
                            <tr className="text-left text-gray-500 text-sm ">
                                <th scope="col" className="px-6 py-3 white-space-nowrap text-left text-sm font-medium text-gray-500 tracking-wider">
                                    Dispute Id
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500  tracking-wider">
                                    Customer
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500  tracking-wider">
                                    Vendor
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500  tracking-wider">
                                    Reason
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500  tracking-wider">
                                    Last Updated
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500  tracking-wider">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500  tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {paginatedDisputes.map((dispute, index) => (
                                <tr key={index} className="odd:bg-white even:bg-gray-50 text-gray-500 text-sm hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                                        {dispute.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {dispute.customer}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {dispute.vendor}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {dispute.reason}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {dispute.lastUpdated}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <StatusBadge status={dispute.status} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                                        <a
                                         href="#" 
                                         className="hover:underline"
                                          onClick={() => opendisputeDetails(dispute)}>View Details</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </>
                ) : (
                    <tbody>
                        <tr>
                            <td colSpan="7" className="text-center py-4 text-gray-500">
                                <img src="/emptyFrame.png" alt="No disputes" className="w-auto h-auto mx-auto mb-4" />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="7" className="text-center py-2 text-gray-800 text-bold">
                                No Disputes Yet
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="7" className="text-center text-gray-500">
                                It looks like no disputes have been filed yet. When disputes are created, they will appear here.
                            </td>
                        </tr>
                    </tbody>
                )}
            </table>
             <DisputeDetailModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                dispute={selectedDispute}/>
            </div>
            {/* Modal for dispute details */}
           
        </>
    );
}