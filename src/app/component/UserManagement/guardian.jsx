"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import StatusBadge from "./StatusBadge";
import GuardianDetailsModal from "../ModalPages/Users/Guardian/viewPendingDetail";
import { authService } from "@/utils/authService";
import PaginationComponent from "../Element/PaginationComponent";
import { formatTime } from "./DeletedUsers";



export default function GuardiansTable({ currentPage, onPageChange, searchTerm, statusFilter, dateFilter, mobileView }) {
    const [allGuardians, setAllGuardians] = useState([]);
    const [filteredGuardians, setFilteredGuardians] = useState([]);
    const [paginatedGuardians, setPaginatedGuardians] = useState([]);
    const [selectedGuardian, setSelectedGuardian] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch guardians from API
    const fetchGuardians = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await authService.makeAuthenticatedRequest('/api/v1/users/all');

            // Filter only guardians and map the data
            const guardiansData = response.filter(user => user.role === 'GUARDIAN').map(guardian => ({
                id: guardian.id,
                name: guardian.name || 'N/A',
                mobile: guardian.phone_number || 'N/A',
                email: guardian.email || 'N/A',
                address: guardian.address || 'N/A',
                date: guardian.createdAt ? new Date(guardian.createdAt).toISOString().split('T')[0] : 'N/A',
                status: guardian.email_verify ? 'Active' : 'Inactive',
                profile_picture: guardian.profile_picture,
                guardian_type: guardian.guardian_type,
                isLocked: guardian.isLocked,
                isDeleted: guardian.isDeleted,
                fcmIsOn: guardian.fcmIsOn,
                createdAt: guardian.createdAt,
                updatedAt: guardian.updatedAt
            }));

            setAllGuardians(guardiansData);
        } catch (err) {
            console.error('Error fetching guardians:', err);
            setError(err.message || 'Failed to fetch guardians');

            // Fallback to sample data if API fails (optional)
            setAllGuardians([]);
        } finally {
            setLoading(false);
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchGuardians();
    }, []);

    // Apply search and filters
    useEffect(() => {
        let results = [...allGuardians];

        // Apply search
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            results = results.filter(
                guardian =>
                    guardian.name.toLowerCase().includes(term) ||
                    guardian.email.toLowerCase().includes(term) ||
                    guardian.mobile.includes(term)
            );
        }

        // Apply status filter - only filter if status filters are selected
        if (statusFilter && statusFilter.length > 0) {
            results = results.filter(guardian =>
                statusFilter.map(s => s.toLowerCase()).includes(guardian.status.toLowerCase())
            );
        }
        // Apply date filter
        if (dateFilter.from) {
            results = results.filter(guardian => guardian.date >= dateFilter.from);
        }
        if (dateFilter.to) {
            results = results.filter(guardian => guardian.date <= dateFilter.to);
        }

        setFilteredGuardians(results);
    }, [allGuardians, searchTerm, statusFilter, dateFilter]);

    // Pagination logic
    const itemsPerPage = 7;
    const totalPages = Math.max(1, Math.ceil(filteredGuardians.length / itemsPerPage));

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setPaginatedGuardians(filteredGuardians.slice(startIndex, endIndex));
        // If currentPage is out of range, reset to 1
        if (currentPage > totalPages) {
            onPageChange(1);
        }
    }, [currentPage, filteredGuardians, totalPages, onPageChange]);

    const handleDeleteGuardian = async (guardianId) => {
        try {
            // You can implement the delete API call here
            // await authService.makeAuthenticatedRequest(`/api/v1/users/${guardianId}`, {
            //     method: 'DELETE'
            // });

            // Remove from local state
            setAllGuardians(prevGuardians =>
                prevGuardians.filter(guardian => guardian.id !== guardianId)
            );

            console.log('Guardian deleted:', guardianId);
        } catch (error) {
            console.error('Error deleting guardian:', error);
            // You might want to show an error message to the user
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Loading guardians...</span>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="text-center py-8">
                <div className="text-red-600 mb-2">Error: {error}</div>
                <button
                    onClick={fetchGuardians}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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
                    {paginatedGuardians.length > 0 ? (
                        <>
                            <thead>
                                <tr className="text-left text-gray-500 text-sm border-b">
                                    <th className="pb-3 pr-2 font-medium">User</th>
                                    <th className="pb-3 px-2 font-medium text-center">Status</th>
                                    <th className="pb-3 pl-2 font-medium text-center">-</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedGuardians.map((guardian, index) => (
                                    <tr key={guardian.id || index} className="text-gray-800 text-sm border-b">
                                        <td className="py-4 pr-2">{guardian.name}</td>
                                        <td className="py-4 px-2 text-center">
                                            <StatusBadge status={guardian.status} />
                                        </td>
                                        <td className="py-4 pl-2 text-center">
                                            <a
                                                href="#"
                                                className="text-blue-600 hover:underline"
                                                onClick={e => {
                                                    e.preventDefault();
                                                    setSelectedGuardian(guardian);
                                                    setIsModalOpen(true);
                                                }}
                                            >
                                                Details
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
                                    <img src="/emptyFrame.png" alt="No Guardians" className="w-auto h-auto mx-auto mb-4" />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="3" className="text-center py-2 text-gray-800 text-bold">
                                    No Guardians Found
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="3" className="text-center text-gray-500">
                                    No guardians match your current filter criteria. Try adjusting your filters or search terms.
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>
                <GuardianDetailsModal
                    vendor={selectedGuardian}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onDelete={handleDeleteGuardian}
                />
                {paginatedGuardians.length > 0 && (
                    <PaginationComponent
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={onPageChange}
                    />
                )}
            </div>
        );
    }

    // Desktop view
    return (
        <>
            <table className="min-w-full">
                {paginatedGuardians.length > 0 ? (
                    <>
                        <thead>
                            <tr className="text-left text-gray-500 text-sm">
                                <th className="pb-3 px-4 font-medium">Guardian Name</th>
                                <th className="pb-3 px-4 font-medium">Mobile Number</th>
                                <th className="pb-3 px-4 font-medium">Email Address</th>
                                <th className="pb-3 px-4 font-medium">Registration Date</th>
                                <th className="pb-3 px-4 font-medium">Time</th>
                                <th className="pb-3 px-4 font-medium">Status</th>
                                <th className="pb-3 px-4 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedGuardians.map((guardian, index) => (
                                <tr key={guardian.id || index} className="odd:bg-white even:bg-gray-50 text-gray-500 text-sm hover:bg-gray-50">
                                    <td className="py-4 px-4">{guardian.name}</td>
                                    <td className="py-4 px-4">{guardian.mobile}</td>
                                    <td className="py-4 px-4">{guardian.email}</td>
                                    <td className="py-4 px-4">{guardian.date}</td>
                                    <td className="py-4 px-4 text-nowrap">{formatTime(guardian.date)}</td>
                                    <td className="py-4 px-4"><StatusBadge status={guardian.status} /></td>
                                    <td className="py-4 px-4">
                                        <a
                                            href="#"
                                            className="text-blue-600 hover:underline"
                                            onClick={e => {
                                                e.preventDefault();
                                                setSelectedGuardian(guardian);
                                                setIsModalOpen(true);
                                            }}
                                        >
                                            View Profile
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </>
                ) : (
                    <tbody>
                        <tr>
                            <td colSpan="6" className="text-center py-4 text-gray-500">
                                <img src="/emptyFrame.png" alt="No Guardians" className="w-auto h-auto mx-auto mb-4" />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="6" className="text-center py-2 text-gray-800 text-bold">
                                No Guardians Found
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="6" className="text-center text-gray-500">
                                No guardians match your current filter criteria. Try adjusting your filters or search terms.
                            </td>
                        </tr>
                    </tbody>
                )}
            </table>
            <GuardianDetailsModal
                vendor={selectedGuardian}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onDelete={handleDeleteGuardian}
            />
            {paginatedGuardians.length > 0 && (
                <PaginationComponent
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />
            )}
        </>
    );
}