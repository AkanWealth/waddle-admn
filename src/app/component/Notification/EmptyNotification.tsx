import Image from "next/image";
import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";

const EmptyNotification = () => {
    const [activeTab, setActiveTab] = useState<"all" | "unread">("all");

  return (
    <section className="flex flex-col h-full">
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
          <HiDotsVertical className="text-[#404040] h-[24px] w-[24px] cursor-pointer" />
        </div>
      </div>
      <div className="flex h-[522px] justify-center items-center px-4">
        <div className="flex flex-col gap-3 items-center justify-between">
          <Image
            src="/NoNotification.svg"
            alt="emptyNotification"
            width={80}
            height={80}
          />
          <h3 className="text-center text-[#303237] text-[16px] font-medium">
            No new notifications at the moment
          </h3>
          <p className="text-center text-[#565C69] text-[14px]">
            Check back later for updates.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EmptyNotification;
