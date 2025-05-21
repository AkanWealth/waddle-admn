

"use client";

import { useState, useEffect } from "react";
import StatusBadge from "./StatusBadge";
import { ChevronRight } from "lucide-react";

export default function AdminUsersTable({ currentPage, searchTerm, statusFilter, dateFilter, mobileView }) {
    // Sample data for vendors
    const [adminUsers, setAdminUsers] = useState([
        {
            name: "XYZ Events",
            mobile: "(212) 555-1234",
            email: "john.smith@email.com",
            date: "2024-05-15",
            status: "Pending"
        },
        {
            name: "ABC Org",
            mobile: "(323) 555-5678",
            email: "emily.j@email.com",
            date: "2024-06-20",
            status: "Rejected"
        },
        {
            name: "Happy Kids",
            mobile: "(312) 555-8765",
            email: "mwilliams@email.com",
            date: "2024-07-02",
            status: "Approved"
        },
        {
            name: "Elite Dancer School",
            mobile: "(713) 555-2345",
            email: "jessica.b@email.com",
            date: "2024-08-10",
            status: "Rejected"
        },
        {
            name: "ABC Events",
            mobile: "(305) 555-6789",
            email: "david.a@email.com",
            date: "2024-09-12",
            status: "Approved"
        },
        {
            name: "XYZ Events",
            mobile: "(206) 555-1357",
            email: "sarah.m@email.com",
            date: "2024-10-05",
            status: "Rejected"
        },
        {
            name: "Kane Events",
            mobile: "(720) 555-2468",
            email: "daniel.t@email.com",
            date: "2024-11-18",
            status: "Deactivated"
        },
        {
            name: "Zoo Park",
            mobile: "(617) 555-9753",
            email: "laura.w@email.com",
            date: "2024-12-25",
            status: "Approved"
        },
        {
            name: "Happy Kids",
            mobile: "(312) 555-8765",
            email: "mwilliams@email.com",
            date: "2024-07-02",
            status: "Approved"
        },
        {
            name: "Elite Dancer School",
            mobile: "(713) 555-2345",
            email: "jessica.b@email.com",
            date: "2024-08-10",
            status: "Rejected"
        },
        {
            name: "ABC Events",
            mobile: "(305) 555-6789",
            email: "david.a@email.com",
            date: "2024-09-12",
            status: "Approved"
        },
        {
            name: "XYZ Events",
            mobile: "(206) 555-1357",
            email: "sarah.m@email.com",
            date: "2024-10-05",
            status: "Rejected"
        },
        {
            name: "Kane Events",
            mobile: "(720) 555-2468",
            email: "daniel.t@email.com",
            date: "2024-11-18",
            status: "Deactivated"
        },
        {
            name: "Zoo Park",
            mobile: "(617) 555-9753",
            email: "laura.w@email.com",
            date: "2024-12-25",
            status: "Approved"
        }
    ]);

    const [filteredAdmins, setFilteredAdmin] = useState([]);
    const [paginatedAdmin, setPaginatedAdmin] = useState([]);

    // Apply search and filters
    useEffect(() => {
        let results = [...adminUsers];

        // Apply search
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            results = results.filter(
                admin =>
                    admin.name.toLowerCase().includes(term) ||
                    admin.email.toLowerCase().includes(term) ||
                    admin.mobile.includes(term)
            );
        }

        // Apply status filter
        if (statusFilter && statusFilter.length > 0) {
            results = results.filter(admin => statusFilter.includes(admin.status));
        }

        // Apply date filter
        if (dateFilter.from) {
            results = results.filter(admin => admin.date >= dateFilter.from);
        }
        if (dateFilter.to) {
            results = results.filter(admin => admin.date <= dateFilter.to);
        }

        setFilteredAdmin(results);
    }, [adminUsers, searchTerm, statusFilter, dateFilter]);

    // Pagination logic
    const itemsPerPage = 7;

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setPaginatedAdmin(filteredAdmins.slice(startIndex, endIndex));
    }, [currentPage, filteredAdmins]);

    // Render mobile view as a simplified table
    if (mobileView) {
        return (

            <div className="overflow-x-auto">
                <table className="min-w-full">
                    {paginatedAdmin.length > 0 ? (
                        <>
                            <thead>
                                <tr className="text-left text-gray-500 text-sm border-b">
                                    <th className="pb-3 pr-2 font-medium">Vendor</th>
                                    <th className="pb-3 px-2 font-medium text-center">Status</th>
                                    <th className="pb-3 pl-2 font-medium text-center">-</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedAdmin.map((admin, index) => (
                                    <tr key={index} className="text-gray-800 text-sm border-b">
                                        <td className="py-4 pr-2">{admin.name}</td>
                                        <td className="py-4 px-2 text-center">
                                            <StatusBadge status={admin.status} />
                                        </td>
                                        <td className="py-4 pl-2 text-center">
                                            <a href="#" className="text-blue-600 hover:underline">Details</a>
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
            </div>
        );
    }

    // Desktop view remains unchanged
    return (

        <table className="min-w-full">
            {paginatedAdmin.length > 0 ? (
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
                        {paginatedAdmin.map((admin, index) => (
                            <tr key={index} className="text-gray-500 text-sm hover:bg-gray-50">
                                <td className="py-4 px-4">{admin.name}</td>
                                <td className="py-4 px-4">{admin.mobile}</td>
                                <td className="py-4 px-4">{admin.email}</td>
                                <td className="py-4 px-4">{admin.date}</td>
                                <td className="py-4 px-4"><StatusBadge status={admin.status} /></td>
                                <td className="py-4 px-4">
                                    <a href="#" className="text-blue-600 hover:underline">View Profile</a>
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
    );
}