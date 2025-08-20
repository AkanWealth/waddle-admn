"use client";
import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

interface RecommendationStatusFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: string[]) => void;
  initialSelected?: string[];
  activeTab: "Places" | "Events";
}

const getStatusOptions = (activeTab: "Places" | "Events") => {
  if (activeTab === "Places") {
    return ["PENDING", "APPROVED", "REJECTED"];
  } else {
    return ["Pending", "Approved", "Rejected"];
  }
};

export default function RecommendationStatusFilterModal({
  isOpen,
  onClose,
  onApply,
  initialSelected = [],
  activeTab,
}: RecommendationStatusFilterModalProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);

  const statusOptions = getStatusOptions(activeTab);

  useEffect(() => {
    if (isOpen) {
      setSelected(initialSelected);
    }
  }, [isOpen, initialSelected]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  const toggle = (status: string) => {
    setSelected((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const handleApply = () => {
    onApply(selected);
    onClose();
  };

  const handleCancel = () => {
    setSelected([]);
    onApply([]);
    onClose();
  };

  //   const handleClearAll = () => {
  //     setSelected([]);
  //   };

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 z-50 flex items-center justify-center">
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-md w-[280px] space-y-4 py-3"
      >
        <div className="flex items-center justify-between px-4 pb-2 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-[#303237]">
            Filter by Status
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-4">
          {statusOptions.map((status) => (
            <label
              key={status}
              className="flex items-center space-x-3 text-sm text-gray-700 border-b border-[#E5E5E5] px-0 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <input
                type="checkbox"
                checked={selected.includes(status)}
                onChange={() => toggle(status)}
                className="accent-blue-700 w-4 h-4 rounded"
              />
              <span className="text-[#303237] font-normal font-inter flex-1">
                {activeTab === "Places"
                  ? status.charAt(0) + status.slice(1).toLowerCase()
                  : status}
              </span>
            </label>
          ))}
        </div>

        <div className="px-4 pt-2">
          {/* {selected.length > 0 && (
            <button
              onClick={handleClearAll}
              className="w-full mb-3 px-4 py-2 text-sm text-gray-500 hover:text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear All
            </button>
          )} */}

          <div className="flex justify-between gap-2.5">
            <button
              onClick={handleCancel}
              className="flex-1 border-[#2853A6] cursor-pointer font-semibold border text-[#2853A6] px-4 py-2 rounded-lg text-sm hover:bg-blue-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              disabled={selected.length < 1}
              className={`flex-1 px-4 py-2 rounded-lg text-sm text-white font-semibold transition-colors ${
                selected.length >= 1
                  ? "bg-[#2853A6] hover:bg-blue-800 cursor-pointer"
                  : "bg-[#2853A6]/50 cursor-not-allowed opacity-60"
              }`}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
