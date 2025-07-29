"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Clock, TriangleAlert, AlertCircle, CircleCheck, XCircle, TrendingUpDown } from "lucide-react";
import DisputeDetailModal from "../ModalPages/Dispute/DisputeDetailModal";
import { disputeService } from "@/utils/disputeService";

export default function DisputeTable({ currentPage, searchTerm, statusFilter, dateFilter, mobileView, setHasDisputeData, setTotalDisputes }) {
    // State management
    const [allDisputes, setAllDisputes] = useState([]);
    const [paginatedDisputes, setPaginatedDisputes] = useState([]);
    const [selectedDispute, setSelectedDispute] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

    // Debounce search term
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500); // 500ms delay

        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Fetch disputes data on component mount
    const fetchDisputes = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            // Prepare query params
            const params = {
                page: currentPage,
                limit: 7,
                status: statusFilter && statusFilter.length === 1 ? statusFilter[0].toUpperCase().replace(/ /g, '_') : undefined,
                startDate: dateFilter?.from ? new Date(dateFilter.from).toISOString() : undefined,
                endDate: dateFilter?.to ? new Date(dateFilter.to).toISOString() : undefined,
                search: debouncedSearchTerm || undefined,
                // category: ... // Add if you have category filter
            };
            const result = await disputeService.getAllDisputes(params);
            if (result.success && result.data) {
                // Transform the API data to match your component's expected format
                const transformedData = transformApiData(result.data.data || []);
                setAllDisputes(transformedData);
                
                // Update pagination info from server response
                if (typeof setTotalDisputes === 'function' && result.data.pagination) {
                    setTotalDisputes(result.data.pagination.total);
                }
            } else {
                setError(result.error || "Failed to fetch disputes");
                setAllDisputes([]);
            }
        } catch (err) {
            setError("An unexpected error occurred while fetching disputes");
            console.error("Error fetching disputes:", err);
            setAllDisputes([]);
        } finally {
            setLoading(false);
        }
    }, [currentPage, statusFilter, dateFilter, debouncedSearchTerm]);

    // Fetch disputes when dependencies change
    useEffect(() => {
        fetchDisputes();
    }, [fetchDisputes]);

    // Map API status to display status
    const mapStatus = (apiStatus) => {
        switch (apiStatus) {
            case "PENDING": return "Pending";
            case "IN_REVIEW": return "In Review";
            case "RESOLVED": return "Resolved";
            default: return apiStatus || "Pending";
        }
    };

    // Transform API data to match component format
    const transformApiData = (apiData) => {
        if (Array.isArray(apiData)) {
            return apiData.map(item => ({
                id: item.id || item.ticketId || `#DPT-${item.id}`,
                event: item.event?.name || "N/A",
                booking:item.booking.id,
                customer: item.customer?.name || "N/A",
                vendor: item.vendor?.business_name || item.vendor?.name || "N/A",
                reason: item.reason || item.category || item.subject || "N/A",
                lastUpdated: formatDate(item.createdAt),
                status: mapStatus(item.status),
                file:item.file
            }));
        }
        return [];
    };

    // Format date to match your existing format (DD-MM-YYYY)
    const formatDate = (dateString) => {
        if (!dateString) return new Date().toLocaleDateString('en-GB');
        
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-GB');
        } catch {
            return dateString;
        }
    };

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

    // Since we're using server-side filtering and pagination, we don't need client-side filtering
    // The server handles all filtering including search, status, and date filters

    const parseDisputeDate = (dateString) => {
        const [day, month, year] = dateString.split('-');
        return new Date(year, month - 1, day);
    };

    const opendisputeDetails = (dispute) => {
        setSelectedDispute(dispute);
        setIsModalOpen(true);
    };

    // Since we're using server-side pagination, we don't need client-side pagination logic
    // The API returns the correct page of data
    useEffect(() => {
        setPaginatedDisputes(allDisputes);
    }, [allDisputes]);

    // Always call hooks at the top level
    useEffect(() => {
        if (typeof setHasDisputeData === 'function') {
            setHasDisputeData(paginatedDisputes.length > 0);
        }
    }, [paginatedDisputes, setHasDisputeData]);

    // Now, after all hooks, do early returns:
    if (loading) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Loading disputes...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-8">
                <div className="text-red-600 mb-2">
                    <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                    Error loading disputes
                </div>
                <p className="text-gray-600 text-sm">{error}</p>
                <button 
                    onClick={() => window.location.reload()} 
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Retry
                </button>
            </div>
        );
    }

    if (paginatedDisputes.length === 0) {
        return <EmptyDispute />;
    }

    // Render mobile view
    if (mobileView) {
        return (
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="text-left text-gray-500 text-sm border-b">
                            <th className="pb-3 pr-2 font-medium">Dispute ID</th>
                            <th className="pb-3 px-2 font-medium text-center">Status</th>
                            <th className="pb-3 pl-2 font-medium text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedDisputes.map((dispute, index) => (
                            <tr key={dispute.id || index} className="text-gray-800 text-sm border-b">
                                <td className="py-4 pr-2">{dispute.id}</td>
                                <td className="py-4 px-2 text-center">
                                    <StatusBadge status={dispute.status} />
                                </td>
                                <td className="py-4 pl-2 text-center">
                                    <button
                                        className="text-blue-600 hover:underline"
                                        onClick={() => opendisputeDetails(dispute)}>
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
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
        <>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-white">
                        <tr className="text-left text-gray-500 text-sm">
                            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">
                                Dispute Id
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">
                                Customer
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">
                                Vendor
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">
                                Reason
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">
                                Last Updated
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedDisputes.map((dispute, index) => (
                            <tr key={dispute.id || index} className="odd:bg-white even:bg-gray-50 text-gray-500 text-sm hover:bg-gray-50">
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
                                    <button
                                        className="hover:underline"
                                        onClick={() => opendisputeDetails(dispute)}>
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <DisputeDetailModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    dispute={selectedDispute}
                />
            </div>
        </>
    );
}

const EmptyDispute = () => {
    return(
        <section className="flex flex-col items-center justify-center h-[50vh]">
            <img src="/emptyFrame.png" alt="No disputes" className="w-auto h-auto mx-auto mb-4" />
            <h1 className="text-xl text-[#303237] font-bold">No disputes have been raised yet.</h1>
            <p className="text-[#666666] pt-3">All is running smoothly! If any disputes arise, they will appear here for review</p>
        </section>
    )
}
