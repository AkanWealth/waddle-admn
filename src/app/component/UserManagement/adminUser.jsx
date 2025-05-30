"use client";

import React, { useState, useEffect } from "react";
import StatusBadge from "./StatusBadge";
import CreateAdminUserModal from "../ModalPages/Users/Admin/CreateAdminModal";
import ResendInivteModal from "../ModalPages/Users/Admin/ResendInvite";
import DeleteAdminModal from "../ModalPages/Users/Admin/DeleteAdmin";
import { ChevronRight, MoreVertical, Edit, RefreshCw, UserX, UserCheck, Trash2 } from "lucide-react";

export default function AdminUsersTable({ currentPage, searchTerm, statusFilter, dateFilter, mobileView }) {
    // Updated sample data to match the UI design
    const [adminUsers, setAdminUsers] = useState([
        {
            id: 1,
            fullName: "Tomi Dossy",
            email: "john.smith@email.com",
            adminRole: "Admin",
            registrationDate: "2024-05-15",
            status: "Pending"
        },
        {
            id: 2,
            fullName: "Emily Johnson",
            email: "emily.j@email.com",
            adminRole: "Admin",
            registrationDate: "2024-06-20",
            status: "Inactive"
        },
        {
            id: 3,
            fullName: "Michael Williams",
            email: "mwilliams@email.com",
            adminRole: "Event Manager",
            registrationDate: "2024-07-02",
            status: "Active"
        },
        {
            id: 4,
            fullName: "Jessica Brown",
            email: "emily.j@email.com",
            adminRole: "Event Manager",
            registrationDate: "2024-08-10",
            status: "Active"
        },
        {
            id: 5,
            fullName: "David Anderson",
            email: "mwilliams@email.com",
            adminRole: "Event Manager",
            registrationDate: "2024-09-12",
            status: "Active"
        },
        {
            id: 6,
            fullName: "Jessica Brown",
            email: "jessica.b@email.com",
            adminRole: "Event Manager",
            registrationDate: "2024-08-10",
            status: "Active"
        },
        {
            id: 7,
            fullName: "Michael Williams",
            email: "david.a@email.com",
            adminRole: "Event Manager",
            registrationDate: "2024-07-02",
            status: "Pending"
        },
        {
            id: 8,
            fullName: "Emily Johnson",
            email: "jessica.b@email.com",
            adminRole: "Event Manager",
            registrationDate: "2024-06-20",
            status: "Inactive"
        }
    ]);
    const [isResendInviteOpen, setIsResendInviteOpen] = useState(false);
    const [filteredAdmins, setFilteredAdmin] = useState([]);
    const [paginatedAdmin, setPaginatedAdmin] = useState([]);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deletingAdmin, setDeletingAdmin] = useState(null);

    // Modal state
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingAdmin, setEditingAdmin] = useState(null);

    // Apply search and filters
    useEffect(() => {
        let results = [...adminUsers];

        // Apply search
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            results = results.filter(
                admin =>
                    admin.fullName.toLowerCase().includes(term) ||
                    admin.email.toLowerCase().includes(term) ||
                    admin.adminRole.toLowerCase().includes(term)
            );
        }

        // Apply status filter
        if (statusFilter && statusFilter.length > 0) {
            results = results.filter(admin => statusFilter.includes(admin.status));
        }

        // Apply date filter
        if (dateFilter.from) {
            results = results.filter(admin => admin.registrationDate >= dateFilter.from);
        }
        if (dateFilter.to) {
            results = results.filter(admin => admin.registrationDate <= dateFilter.to);
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


    const handleResendInvite = (adminId) => {
        // Call your API to resend invite here
        // Optionally show a toast or feedback
        setIsResendInviteOpen(false);
    };

    const handleDropdownToggle = (index) => {
        setActiveDropdown(activeDropdown === index ? null : index);
    };

    const handleAction = (action, admin) => {
        console.log(`${action} action for:`, admin);
        setActiveDropdown(null);

        switch (action) {
            case 'edit':
                setEditingAdmin(admin);
                setIsEditModalOpen(true);
                break;
            case 'resend':
                // Handle resend invite logic
                console.log('Resending invite to:', admin.email);
                break;
            case 'deactivate':
                // Handle deactivate logic
                handleStatusChange(admin.id, 'Inactive');
                break;
            case 'reactivate':
                // Handle reactivate logic
                handleStatusChange(admin.id, 'Active');
                break;
            case 'delete':
                setDeletingAdmin(admin);
                setIsDeleteModalOpen(true);
                break;
            default:
                break;
        }
    };

    const handleStatusChange = (adminId, newStatus) => {
        setAdminUsers(prevUsers =>
            prevUsers.map(user =>
                user.id === adminId ? { ...user, status: newStatus } : user
            )
        );
        console.log(`Admin status changed to: ${newStatus}`);
    };

    const handleDeleteAdmin = (adminId) => {
        if (window.confirm('Are you sure you want to delete this admin?')) {
            setAdminUsers(prevUsers => prevUsers.filter(user => user.id !== adminId));
            console.log(`Admin with ID ${adminId} deleted`);
        }
    };

    const handleModalClose = () => {
        setIsEditModalOpen(false);
        setEditingAdmin(null);
    };

    // Function to determine which action button to show based on status
    const getStatusAction = (status) => {
        switch (status) {
            case 'Active':
                return {
                    action: 'deactivate',
                    label: 'Deactivate Admin',
                    icon: UserX,
                    className: 'flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left'
                };
            case 'Inactive':
                return {
                    action: 'reactivate',
                    label: 'Reactivate Admin',
                    icon: UserCheck,
                    className: 'flex items-center px-4 py-2 text-sm text-green-600 hover:bg-green-50 w-full text-left'
                };
            default:
                return {
                    action: 'deactivate',
                    label: 'Deactivate Admin',
                    icon: UserX,
                    className: 'flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left'
                };
        }
    };

    // Render mobile view as a simplified table
    if (mobileView) {
        return (
            <>
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        {paginatedAdmin.length > 0 ? (
                            <>
                                <thead>
                                    <tr className="text-left text-gray-500 text-sm border-b">
                                        <th className="pb-3 pr-2 font-medium">Admin</th>
                                        <th className="pb-3 px-2 font-medium text-center">Status</th>
                                        <th className="pb-3 pl-2 font-medium text-center">-</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedAdmin.map((admin, index) => (
                                        <tr key={admin.id} className="text-gray-800 text-sm border-b">
                                            <td className="py-4 pr-2">{admin.fullName}</td>
                                            <td className="py-4 px-2 text-center">
                                                <StatusBadge status={admin.status} />
                                            </td>
                                            <td className="py-4 pl-2 text-center">
                                                <button
                                                    onClick={() => handleAction('edit', admin)}
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    Edits
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
                                        <img src="/emptyFrame.png" alt="No Admins" className="w-auto h-auto mx-auto mb-4" />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="3" className="text-center py-2 text-gray-800 font-bold">
                                        No Admin Users Yet
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="3" className="text-center text-gray-500">
                                        It looks like no admin users have been added yet. Once admin users are added, their details will appear here.
                                    </td>
                                </tr>
                            </tbody>
                        )}
                    </table>
                </div>

                {/* Edit Modal */}
                <CreateAdminUserModal
                    isOpen={isEditModalOpen}
                    onClose={handleModalClose}
                    editData={editingAdmin}
                    mode="edit"
                />
            </>
        );
    }

    // Desktop view updated to match UI design
    return (
        <>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    {paginatedAdmin.length > 0 ? (
                        <>
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="pb-3 px-4 text-left text-sm font-medium text-gray-500">Full Name</th>
                                    <th className="pb-3 px-4 text-left text-sm font-medium text-gray-500">Email Address</th>
                                    <th className="pb-3 px-4 text-left text-sm font-medium text-gray-500">Admin Role</th>
                                    <th className="pb-3 px-4 text-left text-sm font-medium text-gray-500">Registration Date</th>
                                    <th className="pb-3 px-4 text-left text-sm font-medium text-gray-500">Status</th>
                                    <th className="pb-3 px-4 text-left text-sm font-medium text-gray-500">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedAdmin.map((admin, index) => {
                                    const statusAction = getStatusAction(admin.status);
                                    const StatusActionIcon = statusAction.icon;

                                    return (
                                        <tr key={admin.id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="py-4 px-4 text-sm text-gray-900">{admin.fullName}</td>
                                            <td className="py-4 px-4 text-sm text-gray-600">{admin.email}</td>
                                            <td className="py-4 px-4 text-sm text-gray-600">{admin.adminRole}</td>
                                            <td className="py-4 px-4 text-sm text-gray-600">{admin.registrationDate}</td>
                                            <td className="py-4 px-4">
                                                <StatusBadge status={admin.status} />
                                            </td>
                                            <td className="py-4 px-4 relative">
                                                <button
                                                    onClick={() => handleDropdownToggle(index)}
                                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                                >
                                                    <MoreVertical className="w-4 h-4 text-gray-500" />
                                                </button>

                                                {activeDropdown === index && (
                                                    <div className="absolute right-4 top-12 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-10 min-w-48">
                                                        <button
                                                            onClick={() => handleAction('edit', admin)}
                                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
                                                        >
                                                            <Edit className="w-4 h-4 mr-3" />
                                                            Edit Admin Details
                                                        </button>

                                                        {/* Resend Invite - Only show for Pending status */}
                                                        <button
                                                            onClick={() => setIsResendInviteOpen(true)}
                                                            disabled={admin.status !== 'Pending'}
                                                            className={`flex items-center px-4 py-2 text-sm w-full text-left ${admin.status === 'Pending'
                                                                ? 'text-gray-700 hover:bg-gray-50'
                                                                : 'text-gray-400 cursor-not-allowed bg-gray-50'
                                                                }`}
                                                        >
                                                            <RefreshCw className="w-4 h-4 mr-3" />
                                                            Resend Invite
                                                        </button>

                                                        {/* Status Action - Dynamic based on current status */}
                                                        <button
                                                            onClick={() => handleAction(statusAction.action, admin)}
                                                            className={statusAction.className}
                                                        >
                                                            <StatusActionIcon className="w-4 h-4 mr-3" />
                                                            {statusAction.label}
                                                        </button>

                                                        <hr className="my-1 border-gray-100" />
                                                        <button
                                                            onClick={() => handleAction('delete', admin)}
                                                            className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                                                        >
                                                            <Trash2 className="w-4 h-4 mr-3" />
                                                            Delete Admin
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </>
                    ) : (
                        <tbody>
                            <tr>
                                <td colSpan="6" className="text-center py-8 text-gray-500">
                                    <img src="/emptyFrame.png" alt="No Admin Users" className="w-auto h-auto mx-auto mb-4" />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="6" className="text-center py-2 text-gray-800 font-bold">
                                    No Admin Users Yet
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="6" className="text-center text-gray-500 pb-8">
                                    It looks like no admin users have been added yet. Once admin users are added, their details will appear here.
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>

                {/* Click outside to close dropdown */}
                {activeDropdown !== null && (
                    <div
                        className="fixed inset-0 z-5"
                        onClick={() => setActiveDropdown(null)}
                    ></div>
                )}
            </div>

            {/* Edit Modal */}
            <CreateAdminUserModal
                isOpen={isEditModalOpen}
                onClose={handleModalClose}
                editData={editingAdmin}
                mode="edit"
            />
            <ResendInivteModal
                // admin={admin}
                isOpen={isResendInviteOpen}
                onClose={() => setIsResendInviteOpen(false)}
                onConfirm={handleResendInvite}
            />
            <DeleteAdminModal
                admin={deletingAdmin}
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={() => {
                    // Remove the admin from the list after deletion
                    setAdminUsers(prev => prev.filter(user => user.id !== deletingAdmin?.id));
                    setIsDeleteModalOpen(false);
                    setDeletingAdmin(null);
                }}
            />
        </>
    );
}