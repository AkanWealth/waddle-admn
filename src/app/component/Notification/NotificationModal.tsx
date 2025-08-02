import { useState } from "react";
import { CiCircleCheck } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import EmptyNotification from "./EmptyNotification";

const NotificationsData = [
  {
    id: 1,
    name: "Event Approved",
    createdAt: "2023-08-15",
    description:
      "our event \"STEM Fair\" has been reviewed and approved. It is now live on the platform and available for bookings.",
  },
];

const NotificationModal = () => {
    
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);
  const handleNotificationMenuClick = () => {
    setShowNotificationMenu(!showNotificationMenu);
  };
  return (
    <section className="relative flex flex-col h-full">
      <div className="flex flex-col border-b py-4 gap-2.5">
        <div className="flex px-4 items-center justify-between">
          <h3 className="text-[#303237] text-[20px] font-semibold">
            Notifications
          </h3>
          <div className="bg-[#C2F0CD] px-2 py-1 rounded-2xl">
            <p className="text-[#1E9A64] font-medium text-[13px]  ">7 unread</p>
          </div>
        </div>
        <div className="flex px-4 items-center justify-between">
          {/* Tab buttons */}
          <div className="bg-[#E5E7EF] p-2 rounded-[8px] flex space-x-2">
            <button
              className={`px-[10px] py-[3.5px] rounded-[4px] text-sm font-medium transition-colors ${
                activeTab === "all"
                  ? "bg-[#1A379A] text-white"
                  : "bg-inherit text-[#1A379A]"
              }`}
              type="button"
              onClick={() => setActiveTab("all")}
            >
              All
            </button>
            <button
              className={`px-[10px] py-[3.5px] rounded-[4px] text-sm font-medium transition-colors ${
                activeTab === "unread"
                  ? "bg-[#1A379A] text-white"
                  : "bg-inherit text-[#1A379A]"
              }`}
              type="button"
              onClick={() => setActiveTab("unread")}
            >
              Unread
            </button>
          </div>

          {/* Dots icon */}
          <HiDotsVertical
            onClick={handleNotificationMenuClick}
            className="text-[#404040] h-[24px] w-[24px] cursor-pointer"
          />
        </div>

        {showNotificationMenu && (
          <div className="absolute flex flex-col gap-2 top-[120px] bg-white py-2 border border-[#E5E7EF] right-5 z-55 rounded-[20px]">
            <button
              className="text-[#303237] cursor-pointer flex items-center px-3 py-1.5 gap-2"
              type="button"
            >
              <CiCircleCheck className="h-[18px] w-[18px]" />
              <span className=" text-[14px] font-medium">Mark all as read</span>
            </button>
            <hr />
            <button
              className="text-[#CC0000] cursor-pointer flex items-center px-3 py-1.5 gap-2"
              type="button"
            >
              <FaRegTrashAlt className="h-[18px] w-[18px]" />
              <span className=" text-[14px] font-medium">Clear all</span>
            </button>
          </div>
        )}
      </div>
      {NotificationsData.length <= 0 && (
        <EmptyNotification/>
      )}
      <div className="flex h-[522px] justify-center items-center px-4"></div>
    </section>
  );
};

export default NotificationModal;
