"use client";

import { useState, useEffect } from "react";
import StatusBadge from "./StatusBadge";
import { authService } from "@/utils/authService";
import VendorDetailsModal from "../ModalPages/Users/viewPendingDetail";
import VendorApproveDetailsModal from "../ModalPages/Users/viewApprovemodal";
import PaginationComponent from "../Element/PaginationComponent";
import { useToastContext } from "@/context/toast";
import { formatTime } from "./DeletedUsers";

export default function VendorsTable({ currentPage, onPageChange, searchTerm, statusFilter, dateFilter, waddleApprovedOnly = false, mobileView }) {
    const { showMessage } = useToastContext();
    const [allVendors, setAllVendors] = useState([]);
    const [filteredVendors, setFilteredVendors] = useState([]);
    const [paginatedVendors, setPaginatedVendors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Modal state management
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVendor, setSelectedVendor] = useState(null);
    
    // Loading states for individual vendors
    const [approvingVendors, setApprovingVendors] = useState(new Set());
    const [rejectingVendors, setRejectingVendors] = useState(new Set());





    // Fetch vendors from API
    const fetchVendors = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await authService.makeAuthenticatedRequest('/api/v1/organisers/all');
            
            if (response && response.organiser) {
                setAllVendors(response.organiser);
            } else {
                setError('No vendors data received');
            }
        } catch (error) {
            console.error('Error fetching vendors:', error);
            setError(error.message || 'Failed to fetch vendors');
        } finally {
            setLoading(false);
        }
    };

    // Fetch vendors on component mount
    useEffect(() => {
        fetchVendors();
    }, []);

    // Apply search and filters
    useEffect(() => {
        let results = [...allVendors];

        // Apply search
        if (searchTerm) {
            const term = String(searchTerm).toLowerCase();
            results = results.filter(vendor => {
                if (!vendor) {
                    console.log('Vendor is undefined or null:', vendor);
                    return false;
                }
                try {
                    return (
                        String(vendor.business_name || vendor.name || '').toLowerCase().includes(term) ||
                        String(vendor.email || '').toLowerCase().includes(term) ||
                        String(vendor.phone_number || '').includes(term) ||
                        String(vendor.name || '').toLowerCase().includes(term)
                    );
                } catch (e) {
                    console.log('Error in vendor filter:', vendor, e);
                    return false;
                }
            });
        }

        // Apply status filter
        if (statusFilter && statusFilter.length > 0) {
            results = results.filter(vendor => {
                // Map database status to display status
                let displayStatus = "Pending";
                if (vendor.status) {
                    switch (vendor.status.toUpperCase()) {
                        case "APPROVED":
                            displayStatus = "Approved";
                            break;
                        case "REJECTED":
                            displayStatus = "Rejected";
                            break;
                        case "SUSPENDED":
                            displayStatus = "Suspended";
                            break;
                        case "PENDING":
                        default:
                            displayStatus = "Pending";
                            break;
                    }
                }
                return statusFilter.includes(displayStatus);
            });
        }

        // Apply Waddle Approved filter (only when selected)
        if (waddleApprovedOnly) {
            results = results.filter(vendor => vendor?.isWaddleApproved === true);
        }

        // Apply date filter
        if (dateFilter.from) {
            const fromDate = new Date(dateFilter.from);
            fromDate.setHours(0, 0, 0, 0); // Start of day
            results = results.filter(vendor => {
                const vendorDate = new Date(vendor.createdAt);
                vendorDate.setHours(0, 0, 0, 0); // Start of day for comparison
                return vendorDate >= fromDate;
            });
        }
        if (dateFilter.to) {
            const toDate = new Date(dateFilter.to);
            toDate.setHours(23, 59, 59, 999); // End of day
            results = results.filter(vendor => {
                const vendorDate = new Date(vendor.createdAt);
                return vendorDate <= toDate;
            });
        }

        setFilteredVendors(results);
    }, [allVendors, searchTerm, statusFilter, dateFilter, waddleApprovedOnly]);

    // Pagination logic
    const itemsPerPage = 7;
    const totalPages = Math.max(1, Math.ceil(filteredVendors.length / itemsPerPage));

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setPaginatedVendors(filteredVendors.slice(startIndex, endIndex));
        // If currentPage is out of range, reset to 1
        if (currentPage > totalPages) {
            onPageChange(1);
        }
    }, [currentPage, filteredVendors, totalPages, onPageChange]);

    // Function to open vendor details modal
    const openVendorDetails = (vendor) => {
        setSelectedVendor(vendor);
        setIsModalOpen(true);
    };

    // Function to handle vendor approval
    const handleApprove = async (vendorId) => {
        try {
            // Add vendor to approving set
            setApprovingVendors(prev => new Set([...prev, vendorId]));
            
            // Make API call to approve vendor
            await authService.makeAuthenticatedRequest(`/api/v1/organisers/${vendorId}/approve`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    isApproved: true
                })
            });

            // Update local state
            setAllVendors(allVendors.map(vendor =>
                vendor.id === vendorId ? { ...vendor, status: "Approved" } : vendor
            ));
            
            console.log(`Vendor ${vendorId} approved successfully`);
            
            // Show success message
            showMessage("Success", "Vendor approved successfully", "success");
            setError(null);
            
        } catch (error) {
            console.error('Error approving vendor:', error);
            showMessage("Error", `Failed to approve vendor: ${error.message}`, "error");
            setError(`Failed to approve vendor: ${error.message}`);
        } finally {
            // Remove vendor from approving set
            setApprovingVendors(prev => {
                const newSet = new Set(prev);
                newSet.delete(vendorId);
                return newSet;
            });
        }
    };

    // Function to handle vendor rejection
    const handleReject = async (vendorId, reason = null) => {
        try {
            // Add vendor to rejecting set
            setRejectingVendors(prev => new Set([...prev, vendorId]));
            
            // Prepare request body
            const requestBody = {
                isApproved: false,
                rejectionReason:reason
            };
            
            // // Add reason if provided
            // if (reason) {
            //     requestBody.rejectionReason = reason;
            // }
            
            // Make API call to reject vendor
            console.log("Rejection reason", requestBody)
            await authService.makeAuthenticatedRequest(`/api/v1/organisers/${vendorId}/approve`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            // Update local state
            setAllVendors(allVendors.map(vendor =>
                vendor.id === vendorId ? { ...vendor, status: "Rejected" } : vendor
            ));
            
            console.log(`Vendor ${vendorId} rejected successfully`);
            
            // Show success message
            showMessage("Success", "Vendor rejected successfully", "success");
            setError(null);
            
        } catch (error) {
            console.error('Error rejecting vendor:', error);
            showMessage("Error", `Failed to reject vendor: ${error.message}`, "error");
            setError(`Failed to reject vendor: ${error.message}`);
        } finally {
            // Remove vendor from rejecting set
            setRejectingVendors(prev => {
                const newSet = new Set(prev);
                newSet.delete(vendorId);
                return newSet;
            });
        }
    };

    // Function to refresh vendors list after approval/rejection
    const refreshVendors = async () => {
        await fetchVendors();
    };

    // Function to update vendor status in state
    const handleVendorStatusChange = (vendorId, newStatus) => {
        setAllVendors(vendors =>
            vendors.map(v =>
                v.id === vendorId ? { ...v, status: newStatus } : v
            )
        );
        // If the new status is Suspended, ensure the filter includes it
        if (newStatus === "Suspended" && !statusFilter.includes("Suspended")) {
            setStatusFilter([...statusFilter, "Suspended"]);
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="text-gray-500">Loading vendors...</div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="flex flex-col justify-center items-center py-8">
                <div className="text-red-500 mb-4">Error: {error}</div>
                <button 
                    onClick={fetchVendors}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Retry
                </button>
            </div>
        );
    }

    // Render mobile view as a simplified table
    if (mobileView) {
        return (
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    {paginatedVendors.length > 0 ? (
                        <>
                            <thead>
                                <tr className="text-left text-gray-500 text-sm border-b">
                                    <th className="pb-3 pr-2 font-medium">Vendor</th>
                                    <th className="pb-3 px-2 font-medium text-center">Status</th>
                                    <th className="pb-3 pl-2 font-medium text-center">-</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedVendors.map((vendor, index) => (
                                    <tr key={vendor.id} className="text-gray-800 text-sm border-b">
                                        <td className="py-4 pr-2">{vendor.business_name || vendor.name}</td>
                                        <td className="py-4 px-2 text-center">
                                            <StatusBadge status={vendor.status} />
                                        </td>
                                        <td className="py-4 pl-2 text-center">
                                            <button
                                                onClick={() => openVendorDetails(vendor)}
                                                className="text-blue-600 hover:underline"
                                                disabled={approvingVendors.has(vendor.id) || rejectingVendors.has(vendor.id)}
                                            >
                                                {approvingVendors.has(vendor.id) || rejectingVendors.has(vendor.id) 
                                                    ? 'Processing...' 
                                                    : 'Details'
                                                }
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
                                    <img src="/emptyFrame.png" alt="No Vendors" className="w-auto h-auto mx-auto mb-4" />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="3" className="text-center py-2 text-gray-800 text-bold">
                                    No Vendors Yet
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2" className="text-center text-gray-500">
                                    It looks like no vendors have joined the platform yet. Once vendors sign up, their details will appear here.
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>

                {/* Vendor Details Modal */}
                {selectedVendor && selectedVendor.status === "PENDING" ? (
                    <VendorDetailsModal
                        vendor={selectedVendor}
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onApprove={handleApprove}
                        onReject={handleReject}
                        onRefresh={refreshVendors}
                        isApproving={approvingVendors.has(selectedVendor.id)}
                        isRejecting={rejectingVendors.has(selectedVendor.id)}
                    />
                ) : (
                    <VendorApproveDetailsModal
                        vendor={selectedVendor}
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onApprove={handleApprove}
                        onReject={handleReject}
                        onStatusChange={handleVendorStatusChange}
                        onRefresh={refreshVendors}
                        isApproving={approvingVendors.has(selectedVendor?.id)}
                        isRejecting={rejectingVendors.has(selectedVendor?.id)}
                    />
                )}
                {paginatedVendors.length > 0 && (
                    <PaginationComponent
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={onPageChange}
                    />
                )}
            </div>
        );
    }

    // Desktop view remains unchanged but with modal functionality
    return (
        <>
            <table className="min-w-full">
                {paginatedVendors.length > 0 ? (
                    <>
                        <thead>
                            <tr className="text-left text-gray-500 text-sm">
                                <th className="pb-3 px-4 font-medium">User Name</th>
                                <th className="pb-3 px-4 font-medium">Mobile Number</th>
                                <th className="pb-3 px-4 font-medium">Email Address</th>
                                <th className="pb-3 px-4 font-medium">Registration Date</th>
                                <th className="pb-3 px-4 font-medium">Time</th>
                                <th className="pb-3 px-4 font-medium">Status</th>
                                <th className="pb-3 px-4 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedVendors.map((vendor, index) => (
                                <tr key={vendor.id} className="odd:bg-white even:bg-gray-50 text-gray-500 text-sm hover:bg-gray-50">
                                    <td className="py-4 px-4">{vendor.business_name || vendor.name}</td>
                                    <td className="py-4 px-4">{vendor.phone_number}</td>
                                    <td className="py-4 px-4">{vendor.email}</td>
                                    <td className="py-4 px-4">{new Date(vendor.createdAt).toISOString().split('T')[0]}</td>
                                    <td className="py-4 px-4 text-nowrap">{formatTime(vendor.createdAt)}</td>
                                    <td className="py-4 px-4"><StatusBadge status={vendor.status} /></td>
                                    <td className="py-4 px-4">
                                        <button
                                            onClick={() => openVendorDetails(vendor)}
                                            className="text-blue-600 hover:underline disabled:text-gray-400 disabled:cursor-not-allowed"
                                            disabled={approvingVendors.has(vendor.id) || rejectingVendors.has(vendor.id)}
                                        >
                                            {approvingVendors.has(vendor.id) || rejectingVendors.has(vendor.id) 
                                                ? 'Processing...' 
                                                : 'View Profile'
                                            }
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
                                <img src="/emptyFrame.png" alt="No Vendors" className="w-auto h-auto mx-auto mb-4" />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="6" className="text-center py-2 text-gray-800 text-bold">
                                No Vendors Yet
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" className="text-center text-gray-500">
                                It looks like no vendors have joined the platform yet. Once vendors sign up, their details will appear here.
                            </td>
        </tr>
                    </tbody>
                )}
            </table>

            {/* Vendor Details Modal */}
            {selectedVendor && selectedVendor.status === "PENDING" ? (
                <VendorDetailsModal
                    vendor={selectedVendor}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onApprove={handleApprove}
                    onReject={handleReject}
                    onRefresh={refreshVendors}
                    isApproving={approvingVendors.has(selectedVendor.id)}
                    isRejecting={rejectingVendors.has(selectedVendor.id)}
                />
            ) : (
                <VendorApproveDetailsModal
                    vendor={selectedVendor}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onApprove={handleApprove}
                    onReject={handleReject}
                    onStatusChange={handleVendorStatusChange}
                    onRefresh={refreshVendors}
                    isApproving={approvingVendors.has(selectedVendor?.id)}
                    isRejecting={rejectingVendors.has(selectedVendor?.id)}
                />
            )}
            {paginatedVendors.length > 0 && (
                <PaginationComponent
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />
            )}
        </>
    );
}