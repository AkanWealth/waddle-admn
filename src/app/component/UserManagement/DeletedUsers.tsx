import { useEffect, useState } from "react";
import { Trash2, XCircle } from "lucide-react";
import Image from "next/image";
import { authService } from "@/utils/authService";

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

const DeletedUsers = ({ onClose }: { onClose: () => void }) => {
  const [loading, setLoading] = useState(true);
  const [deletedUsersList, setDeletedUsersList] = useState<DeletedUserType[]>(
    []
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

  return (
    <div className="h-screen fixed top-0 left-0 w-full flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      <section className="w-full max-w-[90vw] md:max-w-4xl bg-white rounded-xl shadow-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="bg-[#F6AAA8] rounded-full p-1">
              <Trash2 className="w-5 h-5 text-[#CC0000]" />
            </div>
            <h3 className="text-[#303237] text-xl font-semibold">
              Deleted Users{" "}
              <span className="text-red-500">({deletedUsersList.length})</span>
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
                <th className="text-left text-[#7B7B7B] text-sm font-semibold py-3 px-2">
                  Name
                </th>
                <th className="text-left text-[#7B7B7B] text-sm font-semibold py-3 px-2">
                  Deletion Date
                </th>
                <th className="text-left text-[#7B7B7B] text-sm font-semibold py-3 px-2">
                  Deletion Time
                </th>
                <th className="text-left text-[#7B7B7B] text-sm font-semibold py-3 px-2">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {deletedUsersList.map((user) => (
                <tr key={user.id} className="border-b border-[#E0E0E0]">
                  <td className="py-3 px-2 text-[#303237] text-sm font-medium max-w-[200px] truncate">
                    {user.name}
                  </td>
                  <td className="py-3 px-2 text-[#303237] text-sm font-medium">
                    {formatDate(user.updatedAt)}
                  </td>
                  <td className="py-3 px-2 text-[#303237] text-sm font-medium">
                    {formatTime(user.updatedAt)}
                  </td>
                  <td className="py-3 px-2">
                    <button className="bg-[#2853A6] cursor-pointer text-white px-4 py-1.5 rounded-md text-sm hover:bg-[#e88580] transition">
                      Restore
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
