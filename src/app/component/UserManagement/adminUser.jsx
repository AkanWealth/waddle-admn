"use client";
import React, { useState, useEffect, useRef } from "react";
import StatusBadge from "./StatusBadge";
import { useToastContext } from "@/context/toast";
import CreateAdminUserModal from "../ModalPages/Users/Admin/CreateAdminModal";
import DeativateAdmineModal from "../ModalPages/Users/Admin/DeacticivateAdmin";
import ActivateAdmineModal from "../ModalPages/Users/Admin/Activivate";
import ResendInivteModal from "../ModalPages/Users/Admin/ResendInvite";
import DeleteAdminModal from "../ModalPages/Users/Admin/DeleteAdmin";
import {
  ChevronRight,
  MoreVertical,
  Edit,
  RefreshCw,
  UserX,
  UserCheck,
  Trash2,
} from "lucide-react";
import { authService } from "@/utils/authService";
import PaginationComponent from "../Element/PaginationComponent";

export default function AdminUsersTable({
  currentPage,
  onPageChange,
  searchTerm,
  statusFilter,
  dateFilter,
  mobileView,
}) {
  const [adminUsers, setAdminUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isResendInviteOpen, setIsResendInviteOpen] = useState(false);
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [isReactivateModalOpen, setIsReactivateModalOpen] = useState(false);
  const [filteredAdmins, setFilteredAdmin] = useState([]);
  const [paginatedAdmin, setPaginatedAdmin] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingAdmin, setDeletingAdmin] = useState(null);
  const { showMessage } = useToastContext();
  // Modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  // Refs for dropdown positioning
  const dropdownRefs = useRef({});
  const tableRef = useRef(null);
  const tableContainerRef = useRef(null);

  // Fetch admin users from API
  const fetchAdminUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      // Make authenticated request to get admin users
      const response = await authService.makeAuthenticatedRequest(
        "/api/v1/host/all"
      );

      if (response && response.admin) {
        // Transform API data to match your component's expected format
        const transformedAdmins = response.admin.map((admin) => {
          const fullName = `${admin.first_name} ${admin.last_name}`;
          const registrationDate = new Date(admin.createdAt)
            .toISOString()
            .split("T")[0];

          // Determine status based on email verification and activation status
          let status = "Pending";

          if (admin.email_verify && admin.activationStatus === "ACTIVE") {
            status = "Active";
          } else if (
            admin.email_verify &&
            (admin.activationStatus === "INACTIVE" ||
              admin.activationStatus === "PENDING")
          ) {
            status = "Inactive";
          } else if (
            !admin.email_verify &&
            admin.activationStatus === "PENDING"
          ) {
            status = "Pending";
          }

          return {
            id: admin.id,
            fullName,
            email: admin.email,
            adminRole: admin.role === "ADMIN" ? "Admin" : "Event Manager",
            registrationDate,
            status,
            email_verify: admin.email_verify,
            fcmIsOn: admin.fcmIsOn,
            createdAt: admin.createdAt,
            updatedAt: admin.updatedAt,
          };
        });

        setAdminUsers(transformedAdmins);
      }
    } catch (err) {
      console.error("Error fetching admin users:", err);
      setError(err.message || "Failed to fetch admin users");
    } finally {
      setLoading(false);
    }
  };

  // Load admin users on component mount
  useEffect(() => {
    fetchAdminUsers();
  }, []);

  // Apply search and filters
  useEffect(() => {
    let results = [...adminUsers];

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        (admin) =>
          admin.fullName.toLowerCase().includes(term) ||
          admin.email.toLowerCase().includes(term) ||
          admin.adminRole.toLowerCase().includes(term)
      );
    }

    // Apply status filter
    if (statusFilter && statusFilter.length > 0) {
      results = results.filter((admin) => statusFilter.includes(admin.status));
    }

    // Apply date filter
    if (dateFilter.from) {
      results = results.filter(
        (admin) => admin.registrationDate >= dateFilter.from
      );
    }
    if (dateFilter.to) {
      results = results.filter(
        (admin) => admin.registrationDate <= dateFilter.to
      );
    }

    setFilteredAdmin(results);
  }, [adminUsers, searchTerm, statusFilter, dateFilter]);

  // Pagination logic
  const itemsPerPage = 7;
  const totalPages = Math.max(1, Math.ceil(filteredAdmins.length / itemsPerPage));

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedAdmin(filteredAdmins.slice(startIndex, endIndex));
    // If currentPage is out of range, reset to 1
    if (currentPage > totalPages) {
      onPageChange(1);
    }
  }, [currentPage, filteredAdmins, totalPages, onPageChange]);

  // Calculate dropdown position with portal positioning
  const calculateDropdownPosition = (index) => {
    const buttonElement = dropdownRefs.current[index];
    const tableContainer = tableContainerRef.current;

    if (!buttonElement || !tableContainer) return { top: 0, left: 0 };

    const buttonRect = buttonElement.getBoundingClientRect();
    const containerRect = tableContainer.getBoundingClientRect();
    const dropdownHeight = 280; // Approximate dropdown height
    const dropdownWidth = 200; // Approximate dropdown width

    // Calculate position relative to viewport
    let top = buttonRect.bottom + 2; // 2px margin
    let left = buttonRect.right - dropdownWidth; // Align right edge

    // Adjust if dropdown would go below viewport
    const spaceBelow = window.innerHeight - buttonRect.bottom;
    if (spaceBelow < dropdownHeight) {
      top = buttonRect.top - dropdownHeight - 2; // Show above
    }

    // Adjust if dropdown would go off-screen horizontally
    if (left < 10) {
      left = buttonRect.left; // Align to left edge of button
    }

    return { top, left };
  };

  // Resend invite API call
  const handleResendInvite = async (adminId) => {
    try {
      await authService.makeAuthenticatedRequest(
        `/api/v1/host/invite/${adminId}`,
        {
          method: "POST",
        }
      );

      setIsResendInviteOpen(false);
      showMessage("success", "Invite resent successfully!", "success");
    } catch (error) {
      console.error("Error resending invite:", error);
      showMessage("Error", "Error resending invite: " + error, "success");
    }
  };

  // Deactivate admin API call
  const handleDeactivateAdmin = async (adminId) => {
    try {
      const res = await userService.deactivateAdmin(adminId);
      // Update local state
      setAdminUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === adminId
            ? {
                ...user,
                status: "Inactive",
                email_verify: false,
              }
            : user
        )
      );
      showMessage("success", "Admin deactivated successfully", "success");
    } catch (error) {
      console.error("Error deactivating admin:", error);
      showMessage("Error", "Error deactivating admin: " + error, "error");
    }
  };

  // Reactivate admin API call
  const handleReactivateAdmin = async (adminId) => {
    try {
      const res = await userService.reactivateAdmin(adminId);

      // Update local state
      setAdminUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === adminId
            ? {
                ...user,
                status: "Active",
                email_verify: true,
              }
            : user
        )
      );
      showMessage("success", "Admin reactivated successfully", "success");
    } catch (error) {
      console.error("Error reactivating admin:", error);
      showMessage("Error", "Error reactivating admin: " + error, "error");
    }
  };

  const handleDropdownToggle = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handleAction = (action, admin) => {
    setActiveDropdown(null);

    switch (action) {
      case "edit":
        setEditingAdmin(admin);
        setIsEditModalOpen(true);
        break;
      case "resend":
        setSelectedAdmin(admin);
        setIsResendInviteOpen(true);
        break;
      case "deactivate":
        setSelectedAdmin(admin);
        setIsDeactivateModalOpen(true);
        break;
      case "reactivate":
        setSelectedAdmin(admin);
        setIsReactivateModalOpen(true);
        break;
      case "delete":
        setDeletingAdmin(admin);
        setIsDeleteModalOpen(true);
        break;
      default:
        break;
    }
  };

  const handleDeleteAdmin = async (adminId) => {
    try {
      // Make API call to delete admin
      await authService.makeAuthenticatedRequest(
        `/api/v1/host/web/${adminId}`,
        {
          method: "DELETE",
        }
      );

      // Update local state
      setAdminUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== adminId)
      );
      showMessage("success", `Admin with ID ${adminId} deleted`, "success");
    } catch (error) {
      console.error("Error deleting admin:", error);
      showMessage("Error", "Error deleting admin: " + error, "error");
    }
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false);
    setEditingAdmin(null);
  };

  // Refresh data function
  const refreshData = () => {
    fetchAdminUsers();
  };

  // Function to determine which action button to show based on status
  const getStatusAction = (status) => {
    switch (status) {
      case "Active":
        return {
          action: "deactivate",
          label: "Deactivate Admin",
          icon: UserX,
          className:
            "flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left",
        };
      case "Inactive":
        return {
          action: "reactivate",
          label: "Reactivate Admin",
          icon: UserCheck,
          className:
            "flex items-center px-4 py-2 text-sm text-green-600 hover:bg-green-50 w-full text-left",
        };
      default:
        return {
          action: "deactivate",
          label: "Deactivate Admin",
          icon: UserX,
          className:
            "flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left",
        };
    }
  };

  // Dropdown Portal Component
  const DropdownPortal = ({ index, admin }) => {
    const statusAction = getStatusAction(admin.status);
    const StatusActionIcon = statusAction.icon;
    const position = calculateDropdownPosition(index);

    return (
      <div
        className="fixed bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50 min-w-48"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
      >
        <button
          onClick={() => handleAction("edit", admin)}
          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
        >
          <Edit className="w-4 h-4 mr-3" />
          Edit Admin Details
        </button>

        {/* Resend Invite - Only show for Pending status */}
        <button
          onClick={() => handleAction("resend", admin)}
          disabled={admin.status !== "Pending"}
          className={`flex items-center px-4 py-2 text-sm w-full text-left ${
            admin.status === "Pending"
              ? "text-gray-700 hover:bg-gray-50"
              : "text-gray-400 cursor-not-allowed bg-gray-50"
          }`}
        >
          <RefreshCw className="w-4 h-4 mr-3" />
          Resend Invite
        </button>

        {/* Status Action - Dynamic based on current status */}
        <button
          onClick={(e) => {
            if (admin.status === "Pending") {
              e.preventDefault();
              return;
            }
            handleAction(statusAction.action, admin);
          }}
          className={`${statusAction.className} ${
            admin.status === "Pending" ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={admin.status === "Pending"}
        >
          <StatusActionIcon className="w-4 h-4 mr-3" />
          {statusAction.label}
        </button>

        <hr className="my-1 border-gray-100" />
        <button
          onClick={() => handleAction("delete", admin)}
          className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
        >
          <Trash2 className="w-4 h-4 mr-3" />
          Delete Admin
        </button>
      </div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading admin users...</span>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 mb-4">Error: {error}</div>
        <button
          onClick={refreshData}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

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
                    <th className="pb-3 px-2 font-medium text-center">
                      Status
                    </th>
                    <th className="pb-3 pl-2 font-medium text-center">-</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedAdmin.map((admin, index) => (
                    <tr
                      key={admin.id}
                      className="text-gray-800 text-sm border-b"
                    >
                      <td className="py-4 pr-2">{admin.fullName}</td>
                      <td className="py-4 px-2 text-center">
                        <StatusBadge status={admin.status} />
                      </td>
                      <td className="py-4 pl-2 text-center">
                        <button
                          onClick={() => handleAction("edit", admin)}
                          className="text-blue-600 hover:underline"
                        >
                          Edit
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
                    <img
                      src="/emptyFrame.png"
                      alt="No Admins"
                      className="w-auto h-auto mx-auto mb-4"
                    />
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="3"
                    className="text-center py-2 text-gray-800 font-bold"
                  >
                    No Admin Users Yet
                  </td>
                </tr>
                <tr>
                  <td colSpan="3" className="text-center text-gray-500">
                    It looks like no admin users have been added yet. Once admin
                    users are added, their details will appear here.
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
          onSuccess={refreshData}
        />
        {paginatedAdmin.length > 0 && (
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        )}
      </>
    );
  }

  // Desktop view with portal-based dropdown positioning
  return (
    <>
      <div className="overflow-x-auto" ref={tableContainerRef}>
        <table className="min-w-full bg-white" ref={tableRef}>
          {paginatedAdmin.length > 0 ? (
            <>
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-3 px-4 text-left text-sm font-medium text-gray-500">
                    Full Name
                  </th>
                  <th className="pb-3 px-4 text-left text-sm font-medium text-gray-500">
                    Email Address
                  </th>
                  <th className="pb-3 px-4 text-left text-sm font-medium text-gray-500">
                    Admin Role
                  </th>
                  <th className="pb-3 px-4 text-left text-sm font-medium text-gray-500">
                    Registration Date
                  </th>
                  <th className="pb-3 px-4 text-left text-sm font-medium text-gray-500">
                    Status
                  </th>
                  <th className="pb-3 px-4 text-left text-sm font-medium text-gray-500">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedAdmin.map((admin, index) => (
                  <tr
                    key={admin.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4 px-4 text-sm text-gray-900">
                      {admin.fullName}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {admin.email}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {admin.adminRole}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {admin.registrationDate}
                    </td>
                    <td className="py-4 px-4">
                      <StatusBadge status={admin.status} />
                    </td>
                    <td className="py-4 px-4">
                      <button
                        ref={(el) => (dropdownRefs.current[index] = el)}
                        onClick={() => handleDropdownToggle(index)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-500" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          ) : (
            <tbody>
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-500">
                  <img
                    src="/emptyFrame.png"
                    alt="No Admin Users"
                    className="w-auto h-auto mx-auto mb-4"
                  />
                </td>
              </tr>
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-2 text-gray-800 font-bold"
                >
                  No Admin Users Yet
                </td>
              </tr>
              <tr>
                <td colSpan="6" className="text-center text-gray-500 pb-8">
                  It looks like no admin users have been added yet. Once admin
                  users are added, their details will appear here.
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>

      {/* Portal-based dropdown - rendered outside table */}
      {activeDropdown !== null && (
        <DropdownPortal
          index={activeDropdown}
          admin={paginatedAdmin[activeDropdown]}
        />
      )}

      {/* Click outside to close dropdown */}
      {activeDropdown !== null && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setActiveDropdown(null)}
        ></div>
      )}

      {/* Modals */}
      <CreateAdminUserModal
        isOpen={isEditModalOpen}
        onClose={handleModalClose}
        editData={editingAdmin}
        mode="edit"
        onSuccess={refreshData}
      />
      <ResendInivteModal
        admin={selectedAdmin}
        isOpen={isResendInviteOpen}
        onClose={() => setIsResendInviteOpen(false)}
        onConfirm={() => handleResendInvite(selectedAdmin?.id)}
      />
      <DeativateAdmineModal
        admin={selectedAdmin}
        isOpen={isDeactivateModalOpen}
        onClose={() => setIsDeactivateModalOpen(false)}
        onConfirm={(adminId) => {
          handleDeactivateAdmin(adminId);
          setIsDeactivateModalOpen(false);
          setSelectedAdmin(null);
        }}
      />
      <ActivateAdmineModal
        admin={selectedAdmin}
        isOpen={isReactivateModalOpen}
        onClose={() => setIsReactivateModalOpen(false)}
        onConfirm={(adminId) => {
          handleReactivateAdmin(adminId);
          setIsReactivateModalOpen(false);
          setSelectedAdmin(null);
        }}
      />
      <DeleteAdminModal
        admin={deletingAdmin}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          handleDeleteAdmin(deletingAdmin?.id);
          setIsDeleteModalOpen(false);
          setDeletingAdmin(null);
        }}
      />
      {paginatedAdmin.length > 0 && (
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
}
