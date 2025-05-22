"use client";

import { useState, useEffect } from "react";
import StatusBadge from "./StatusBadge";
import GuardianDetailsModal from "../ModalPages/Users/Guardian/viewPendingDetail";


export default function GuardiansTable({ currentPage, searchTerm, statusFilter, dateFilter, mobileView }) {
    // Sample data for guardians with the specific status types
    const [allGuardians, setAllGuardians] = useState([
        {
            name: "XYZ Events",
            mobile: "(212) 555-1234",
            email: "john.smith@email.com",
            date: "2024-05-15",
            status: "Registered"
        },
        {
            name: "ABC Org",
            mobile: "(323) 555-5678",
            email: "emily.j@email.com",
            date: "2024-06-20",
            status: "Active"
        },
        {
            name: "Happy Kids",
            mobile: "(312) 555-8765",
            email: "mwilliams@email.com",
            date: "2024-07-02",
            status: "Registered"
        },
        {
            name: "Elite Dancer School",
            mobile: "(713) 555-2345",
            email: "jessica.b@email.com",
            date: "2024-08-10",
            status: "Active"
        },
        {
            name: "ABC Events",
            mobile: "(305) 555-6789",
            email: "david.a@email.com",
            date: "2024-09-12",
            status: "Spam"
        },
        {
            name: "XYZ Events",
            mobile: "(206) 555-1357",
            email: "sarah.m@email.com",
            date: "2024-10-05",
            status: "Active"
        },
        {
            name: "Kane Events",
            mobile: "(720) 555-2468",
            email: "daniel.t@email.com",
            date: "2024-11-18",
            status: "Inactive"
        },
        {
            name: "Zoo Park",
            mobile: "(617) 555-9753",
            email: "laura.w@email.com",
            date: "2024-12-25",
            status: "Spam"
        },
        {
            name: "Happy Kids",
            mobile: "(312) 555-8765",
            email: "mwilliams@email.com",
            date: "2024-07-02",
            status: "Spam"
        },
        {
            name: "Elite Dancer School",
            mobile: "(713) 555-2345",
            email: "jessica.b@email.com",
            date: "2024-08-10",
            status: "Active"
        },
        {
            name: "ABC Events",
            mobile: "(305) 555-6789",
            email: "david.a@email.com",
            date: "2024-09-12",
            status: "Inactive"
        },
        {
            name: "XYZ Events",
            mobile: "(206) 555-1357",
            email: "sarah.m@email.com",
            date: "2024-10-05",
            status: "Active"
        },
        {
            name: "Kane Events",
            mobile: "(720) 555-2468",
            email: "daniel.t@email.com",
            date: "2024-11-18",
            status: "Inactive"
        },
        {
            name: "Zoo Park",
            mobile: "(617) 555-9753",
            email: "laura.w@email.com",
            date: "2024-12-25",
            status: "Inactive"
        }
    ]);

    const [filteredGuardians, setFilteredGuardians] = useState([]);
    const [paginatedGuardians, setPaginatedGuardians] = useState([]);
    const [selectedGuardian, setSelectedGuardian] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
            results = results.filter(guardian => statusFilter.includes(guardian.status));
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

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setPaginatedGuardians(filteredGuardians.slice(startIndex, endIndex));
    }, [currentPage, filteredGuardians]);

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
                                    <tr key={index} className="text-gray-800 text-sm border-b">
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
/>
            </div>
        );
    }

    // Desktop view
    return (
        <><table className="min-w-full">
            {paginatedGuardians.length > 0 ? (
                <>
                    <thead>
                        <tr className="text-left text-gray-500 text-sm">
                            <th className="pb-3 px-4 font-medium">Guardian Name</th>
                            <th className="pb-3 px-4 font-medium">Mobile Number</th>
                            <th className="pb-3 px-4 font-medium">Email Address</th>
                            <th className="pb-3 px-4 font-medium">Registration Date</th>
                            <th className="pb-3 px-4 font-medium">Status</th>
                            <th className="pb-3 px-4 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedGuardians.map((guardian, index) => (
                            <tr key={index} className="odd:bg-white even:bg-gray-50 text-gray-500 text-sm hover:bg-gray-50">
                                <td className="py-4 px-4">{guardian.name}</td>
                                <td className="py-4 px-4">{guardian.mobile}</td>
                                <td className="py-4 px-4">{guardian.email}</td>
                                <td className="py-4 px-4">{guardian.date}</td>
                                <td className="py-4 px-4"><StatusBadge status={guardian.status} /></td>
                                <td className="py-4 px-4">
                                    <a
                                        href="#"
                                        className="text-blue-600 hover:underline"
                                        onClick={e => {
                                            e.preventDefault();
                                            setSelectedGuardian(guardian);
                                            setIsModalOpen(true);
                                        } }
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
        </table><GuardianDetailsModal
                vendor={selectedGuardian}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)} /></>
    );
}