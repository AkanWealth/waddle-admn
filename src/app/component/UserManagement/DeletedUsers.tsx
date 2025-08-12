import { useEffect, useState } from "react";
import { Trash2, XCircle } from "lucide-react";
import Image from "next/image";
import { authService } from "@/utils/authService";
import { useToastContext } from "@/context/toast";
import { adminService } from "@/utils/Adminservice";

type DeletedUserType = {
  id: string;
  profile_picture: string;
  name: string;
  email: string;
  phone_number: string;
  address: string;
  guardian_type: string | null;
  email_verify: boolean;
  isLocked: boolean;
  isDeleted: boolean;
  failedLoginAttempts: number;
  verification_token: string | null;
  verification_token_expiration: string | null;
  reset_token: string | null;
  reset_expiration: string | null;
  createdAt: string;
  updatedAt: string;
  fcmToken: string | null;
  role: "GUARDIAN" | string;
  fcmIsOn: boolean;
};

const DeletedUsers = ({
  onClose,
  onUserRestored,
}: {
  onClose: () => void;
  onUserRestored?: () => void;
}) => {
  const { showMessage } = useToastContext();
  const [loading, setLoading] = useState(true);
  const [deletedUsersList, setDeletedUsersList] = useState<DeletedUserType[]>(
    []
  );
  const [isDeletingUser, setIsDeletingUser] = useState<boolean>(false);
  const [isRestoringUser, setIsRestoringUser] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showRestoreModal, setShowRestoreModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<DeletedUserType | null>(
    null
  );

  useEffect(() => {
    const fetchDeletedUsers = async () => {
      try {
        const response = await authService.makeAuthenticatedRequest(
          `/api/v1/users/all-deleted`,
          { method: "GET" }
        );
        setDeletedUsersList(response);
      } catch (error) {
        console.error("Error fetching deleted users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeletedUsers();
  }, []);

  const handleRestore = (user: DeletedUserType) => {
    setSelectedUser(user);
    setShowRestoreModal(true);
  };

  const handleConfirmRestore = async () => {
    if (!selectedUser) return;

    setIsRestoringUser(true);
    try {
      // TODO: Implement actual restore API call
      console.log("Restoring user:", selectedUser.id);
      const result = await adminService.restoreUser(selectedUser.id);
      if (result.success) {
        showMessage("User Restored", result.message, "success");
        setDeletedUsersList((prev) =>
          prev.filter((user) => user.id !== selectedUser.id)
        );
        setShowRestoreModal(false);
        setSelectedUser(null);
        // Call the callback to refresh the main tables
        onUserRestored?.();
      } else {
        showMessage("Failed!", "Failed to restore user", "error");
        setSelectedUser(null);
      }

      // Remove from local state
    } catch (error) {
      console.error("Error restoring user:", error);
    } finally {
      setIsRestoringUser(false);
    }
  };

  const handleCancelRestore = () => {
    setShowRestoreModal(false);
    setSelectedUser(null);
  };

  const handleDelete = (user: DeletedUserType) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedUser) return;

    setIsDeletingUser(true);
    try {
      // TODO: Implement actual delete API call
      console.log("Deleting user:", selectedUser.id);
      const result = await adminService.deleteUser(selectedUser.id);
      if (result.success) {
        showMessage("User Deleted", result.message, "success");
        setDeletedUsersList((prev) =>
          prev.filter((user) => user.id !== selectedUser.id)
        );
        setShowDeleteModal(false);
        setSelectedUser(null);
      } else {
        showMessage("Failed!", "Failed to delete user", "error");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setIsDeletingUser(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedUser(null);
  };
  return (
    <div className="h-screen fixed top-0 left-0 w-full flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      {!showDeleteModal && !showRestoreModal && (
        <section className="w-full max-w-[90vw] md:max-w-4xl bg-white rounded-xl shadow-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="bg-[#F6AAA8] rounded-full p-1">
                <Trash2 className="w-5 h-5 text-[#CC0000]" />
              </div>
              <h3 className="text-[#303237] text-xl font-semibold">
                Deleted Accounts{" "}
                <span className="text-red-500">
                  ({deletedUsersList.length})
                </span>
              </h3>
            </div>
            <XCircle
              className="w-6 h-6 text-gray-500 cursor-pointer"
              onClick={onClose}
            />
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#F6AAA8]" />
            </div>
          ) : deletedUsersList.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E0E0E0] bg-[#F5F5F5]">
                  <th className="text-center text-[#7B7B7B] text-sm font-semibold py-3 px-2">
                    Name
                  </th>
                  <th className="text-center text-[#7B7B7B] text-sm font-semibold py-3 px-2">
                    Deletion Date
                  </th>
                  <th className="text-center text-[#7B7B7B] text-sm font-semibold py-3 px-2">
                    Deletion Time
                  </th>
                  <th className="text-center text-[#7B7B7B] text-sm font-semibold py-3 px-2">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {deletedUsersList.map((user) => (
                  <tr key={user.id} className="border-b border-[#E0E0E0]">
                    <td className="py-3 px-2 text-[#303237] text-center text-sm font-medium max-w-[200px] truncate">
                      {user.name}
                    </td>
                    <td className="py-3 px-2 text-[#303237] text-center text-sm font-medium">
                      {formatDate(user.updatedAt)}
                    </td>
                    <td className="py-3 px-2 text-[#303237] text-center text-sm font-medium">
                      {formatTime(user.updatedAt)}
                    </td>
                    <td className="py-3 px-2 flex items-center gap-2">
                      <button
                        onClick={() => handleRestore(user)}
                        className="bg-[#2853A6] cursor-pointer border border-[#2853A6] text-white px-4 py-1.5 rounded-md text-sm hover:bg-white hover:text-[#2853A6] hover:border hover:border-[#2853A6] transition w-full"
                      >
                        Restore
                      </button>
                      <button
                        onClick={() => handleDelete(user)}
                        className="bg-[#CC0000] cursor-pointer text-white px-4 py-1.5 rounded-md text-sm hover:bg-[#a00000] transition w-full"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <section className="flex flex-col items-center justify-center py-10 h-full">
              <Image
                src="/emptyFrame.png"
                alt="No deleted users"
                width={100}
                height={100}
              />
              <p className="text-[#565C69] font-semibold text-center mt-8">
                No Account Deleted in the last 3 days
              </p>
            </section>
          )}
        </section>
      )}

      {showDeleteModal && selectedUser && (
        <section className="w-full max-w-[50vw] md:max-w-[500px] bg-white rounded-xl shadow-2xl px-6 py-3">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-5">
              <div className="bg-[#F6AAA8] rounded-full p-4">
                <Trash2 className="w-5 h-5 text-[#CC0000]" />
              </div>
              <div className="">
                <h3 className="text-[#303237] text-xl font-semibold">
                  Permanently Delete User
                </h3>
                <p className="text-[#565C69] text-sm">
                  You&apos;re about to permanently delete {selectedUser.name}.
                  This action cannot be undone. If deleted, the user will no
                  longer be visible or recoverable.
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-9 gap-4">
            <button
              type="button"
              onClick={handleConfirmDelete}
              disabled={isDeletingUser}
              className="bg-[#CC0000] cursor-pointer text-white px-4 py-2.5 rounded-md text-sm hover:bg-[#a00000] transition w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeletingUser ? "Deleting..." : "Delete Permanently"}
            </button>
            <button
              onClick={handleCancelDelete}
              disabled={isDeletingUser}
              className="text-[#2853A6] cursor-pointer bg-white border border-[#2853A6] px-4 py-2.5 rounded-md text-sm hover:bg-[#2853A6] hover:text-white transition w-full disabled:opacity-50 disabled:cursor-not-allowed"
              type="button"
            >
              Cancel
            </button>
          </div>
        </section>
      )}

      {showRestoreModal && selectedUser && (
        <section className="w-full max-w-[50vw] md:max-w-[500px] bg-white rounded-xl shadow-2xl px-6 py-3">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-5">
              <div className="bg-[#2853A6] rounded-full p-4">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
              <div className="">
                <h3 className="text-[#303237] text-xl font-semibold">
                  Restore User
                </h3>
                <p className="text-[#565C69] text-sm">
                  You&apos;re about to restore {selectedUser.name}. This will
                  reactivate their account and they will be able to access the
                  platform again.
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-9 gap-4">
            <button
              type="button"
              onClick={handleConfirmRestore}
              disabled={isRestoringUser}
              className="bg-[#2853A6] cursor-pointer text-white px-4 py-2.5 rounded-md text-sm hover:bg-[#1e3a8a] transition w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRestoringUser ? "Restoring..." : "Restore User"}
            </button>
            <button
              onClick={handleCancelRestore}
              disabled={isRestoringUser}
              className="text-[#2853A6] cursor-pointer bg-white border border-[#2853A6] px-4 py-2.5 rounded-md text-sm hover:bg-[#2853A6] hover:text-white transition w-full disabled:opacity-50 disabled:cursor-not-allowed"
              type="button"
            >
              Cancel
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default DeletedUsers;

// --- Date Utilities ---
export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

export function formatTime(isoDate: string): string {
  const date = new Date(isoDate);
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${ampm}`;
}
