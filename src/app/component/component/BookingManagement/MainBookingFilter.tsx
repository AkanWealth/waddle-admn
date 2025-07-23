import { useBookingStore } from "@/stores/useBookingStore";
import React, { useRef, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import clsx from "clsx";
import { format } from "date-fns"; 

interface MainBookingFilterProps {
  isOpen: boolean;
  onClose: () => void;
}

const MainBookingFilter: React.FC<MainBookingFilterProps> = ({
  isOpen,
  onClose,
}) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const endDateRef = useRef<HTMLInputElement>(null); 

  const {
    filters: { vendor, dateRange, status },

    setVendor,
    setDateRange,
    setStatus,
    applyMainFilter,
    clearFilters,
  } = useBookingStore();

  if (!isOpen) return null;

  const handleApply = () => {
    applyMainFilter({ vendor, dateRange, status });
    onClose();
  };

  const handleClear = () => {
    clearFilters();
    onClose();
  };
  const handleDateChange = (type: "start" | "end", value: string) => {
    if (type === "start") {
      setStartDate(value);
      setTimeout(() => endDateRef.current?.focus(), 200); 
    } else {
      setEndDate(value);
    }

    const newStart = type === "start" ? value : startDate;
    const newEnd = type === "end" ? value : endDate;

    if (newStart && newEnd) {
      const formatted = `${format(new Date(newStart), "MM/dd/yyyy")} - ${format(
        new Date(newEnd),
        "MM/dd/yyyy"
      )}`;
      setDateRange(formatted);
    }
  };

  return (
    <div className="min-w-[563px] absolute right-0 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-md">
        <div className="text-[#303237] flex items-center justify-between">
          <h2 className="text-lg font-semibold mb-4">Filter By</h2>
          <X onClick={onClose} />
        </div>

        <div className="flex flex-col w-full gap-6">
          <div className="flex flex-col gap-3">
            <label className="block text-sm font-medium text-[#303237]">
              Vendor Name
            </label>
            <input
              value={vendor}
              onChange={(e) => setVendor(e.target.value)}
              className="w-full mt-1 outline-none text-[#303237] border border-gray-300 rounded-md px-3 py-2"
              placeholder="ABC Events"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="block text-sm font-medium text-gray-700">
              Event Date Range
            </label>

            <div className="flex space-x-2">
              <input
                type="date"
                value={startDate}
                onChange={(e) => handleDateChange("start", e.target.value)}
                className="w-full mt-1 outline-none text-[#303237] border border-gray-300 rounded-md px-3 py-2"
                placeholder="Start Date"
              />
             
            </div>
          </div>


          <div className="flex flex-col gap-3">
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <StatusDropdown value={status} onChange={setStatus} />
          </div>
        </div>

        <div className="flex justify-between items-center gap-4 mt-6 flex-col ">
          <button
            onClick={handleApply}
            className="bg-[#2853A6]  text-white font-medium py-2 px-4 rounded-xl w-full"
          >
            Apply Filter
          </button>
          <button
            onClick={handleClear}
            className="border border-[#CC0000] text-[#CC0000] font-medium py-2 px-4 rounded-xl w-full"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainBookingFilter;

const statusOptions = ["Confirmed", "Pending", "Canceled"];

interface StatusDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const StatusDropdown: React.FC<StatusDropdownProps> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (option: string) => {
    onChange(option);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full bg-white border border-gray-300 text-left px-3 py-2 rounded-md flex justify-between items-center text-[#303237]"
      >
        {value || "Select option"}
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>

      {open && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md overflow-hidden">
          {statusOptions.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className={clsx(
                "px-4 py-2 cursor-pointer text-[#303237] hover:bg-gray-100",
                value === option && "bg-[#E5EEFF] text-[#303237]"
              )}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
