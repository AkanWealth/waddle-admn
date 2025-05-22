"use client";
import { useBookingStore } from "@/stores/useBookingStore";
import { useState, useEffect } from "react";

type StatusFilterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: string[]) => void;
  initialSelected?: string[];
};

const statusOptions = ["Confirmed", "Pending", "Canceled"];

export default function StatusFilterModal({
  isOpen,
  onApply,
  initialSelected = [],
}: StatusFilterModalProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const { setStatusModalOpen } = useBookingStore();

  useEffect(() => {
    if (isOpen) setSelected(initialSelected);
  }, [isOpen, initialSelected]);

  const toggle = (status: string) => {
    setSelected((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const handleApply = () => {
    onApply(selected);
    setStatusModalOpen(false);
  };

  const handleCancel = () => {
    setStatusModalOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 z-50 -10 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-md w-[280px] space-y-4 py-3">
        <div className="">
          {statusOptions.map((status) => (
            <label
              key={status}
              className={`flex items-center space-x-2 text-sm text-gray-700 border-b border-[#E5E5E5] px-4 py-3`}
            >
              <input
                type="checkbox"
                checked={selected.includes(status)}
                onChange={() => toggle(status)}
                className="accent-blue-700 w-4 h-4"
              />
              <span className="text-[#303237] font-normal font-inter">
                {status}
              </span>
            </label>
          ))}
        </div>
        <div className="flex justify-between pt-2 mx-3 gap-2.5">
          <button
            onClick={handleApply}
            disabled={selected.length < 1}
            className={`w-full px-4 py-1.5 rounded-[12px] text-sm text-white ${
              selected.length >= 1
                ? "bg-[#2853A6] hover:bg-blue-800 cursor-pointer font-semibold"
                : "bg-[#2853A6]/50 cursor-not-allowed opacity-60"
            }`}
          >
            Apply
          </button>
          <button
            onClick={handleCancel}
            className="w-full border-[#2853A6] cursor-pointer font-semibold border text-[#2853A6] px-4 py-1.5 rounded-[12px] text-sm hover:bg-blue-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}