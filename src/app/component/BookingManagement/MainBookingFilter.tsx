import { useBookingStore } from "@/stores/useBookingStore";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { ChevronDown, X } from "lucide-react";
import clsx from "clsx";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import { CalendarDays, Calendar } from "lucide-react";

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

  const filterRef = useRef<HTMLDivElement>(null);

  // Initialize local state with existing filter values
  useEffect(() => {
    if (dateRange && dateRange.includes(" - ")) {
      const [start, end] = dateRange.split(" - ");
      try {
        // Convert MM/dd/yyyy format back to yyyy-MM-dd for input fields
        const startDateObj = new Date(start);
        const endDateObj = new Date(end);

        if (!isNaN(startDateObj.getTime()) && !isNaN(endDateObj.getTime())) {
          setStartDate(format(startDateObj, "yyyy-MM-dd"));
          setEndDate(format(endDateObj, "yyyy-MM-dd"));
        }
      } catch (error) {
        console.error("Error parsing existing date range:", error);
      }
    }
  }, [dateRange, isOpen]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const clickedInsidePanel = !!(
        filterRef.current &&
        target &&
        filterRef.current.contains(target)
      );
      // Allow clicks inside react-datepicker popper without closing
      const clickedInsideDatepicker = !!(
        target &&
        (target.closest(".react-datepicker") ||
          target.closest(".react-datepicker-popper"))
      );
      if (!clickedInsidePanel && !clickedInsideDatepicker) {
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

  if (!isOpen) return null;

  const handleApply = () => {
    applyMainFilter({ vendor, dateRange, status });
    onClose();
  };

  const handleClear = () => {
    clearFilters();
    setStartDate("");
    setEndDate("");
    setDateRange(""); // clears the store too
    onClose();
  };

  const handleDateChange = (type: "start" | "end", value: string) => {
    if (type === "start") {
      setStartDate(value);
      // Auto-focus end date after a brief delay
      setTimeout(() => endDateRef.current?.focus(), 200);
    } else {
      setEndDate(value);
    }

    const newStart = type === "start" ? value : startDate;
    const newEnd = type === "end" ? value : endDate;

    // Only set date range if both dates are provided
    if (newStart && newEnd) {
      try {
        // Parse the YYYY-MM-DD format and convert to MM/dd/yyyy
        const startDateParts = newStart.split("-");
        const endDateParts = newEnd.split("-");

        const formatted = `${startDateParts[1]}/${startDateParts[2]}/${startDateParts[0]} - ${endDateParts[1]}/${endDateParts[2]}/${endDateParts[0]}`;

        // Debug logging
        console.log("Date Filter Debug - Setting Date Range:", {
          newStart,
          newEnd,
          formatted,
          startDateObj: new Date(newStart),
          endDateObj: new Date(newEnd),
        });

        setDateRange(formatted);
      } catch (error) {
        console.error("Error formatting date range:", error);
      }
    } else if (!newStart && !newEnd) {
      // Clear date range if both dates are empty
      setDateRange("");
    }
  };

  const panel = (
    <div className="min-w-[563px] fixed top-24 right-4 z-[120] flex items-center justify-center pointer-events-auto">
      <div
        ref={filterRef}
        className="bg-white w-full max-w-md p-6 rounded-lg shadow-md"
      >
        <div className="text-[#303237] flex items-center justify-between">
          <h2 className="text-lg font-semibold mb-4">Filter By</h2>
          <X
            onClick={onClose}
            className="cursor-pointer hover:text-gray-600 transition-colors"
            size={20}
          />
        </div>

        <div className="flex flex-col w-full gap-6">
          {/* Vendor Name Filter */}
          <div className="flex flex-col gap-3">
            <label className="block text-sm font-medium text-[#303237]">
              Vendor Name
            </label>
            <input
              value={vendor}
              onChange={(e) => setVendor(e.target.value)}
              className="w-full mt-1 outline-none text-[#303237] border border-gray-300 rounded-md px-3 py-2 focus:border-[#2853A6] focus:ring-1 focus:ring-[#2853A6] transition-colors"
              placeholder="ABC Events"
            />
          </div>

          {/* Date Range Filter */}
          {/* <div className="flex flex-col gap-3">
            <label className="block text-sm font-medium text-gray-700">
              Event Date Range
            </label>
            <div className="flex space-x-2">
              <div className="flex-1">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => handleDateChange("start", e.target.value)}
                  className="w-full outline-none text-[#303237] border border-gray-300 rounded-md px-3 py-2 focus:border-[#2853A6] focus:ring-1 focus:ring-[#2853A6] transition-colors"
                  placeholder="Start Date"
                />
              </div>
              <div className="flex-1">
                <input
                  ref={endDateRef}
                  type="date"
                  value={endDate}
                  min={startDate} // Prevent end date from being before start date
                  onChange={(e) => handleDateChange("end", e.target.value)}
                  className="w-full outline-none text-[#303237] border border-gray-300 rounded-md px-3 py-2 focus:border-[#2853A6] focus:ring-1 focus:ring-[#2853A6] transition-colors"
                  placeholder="End Date"
                />
              </div>
            </div>
            {startDate && endDate && (
              <div className="text-xs text-gray-600 mt-1">
                Selected range: {format(new Date(startDate), "MMM dd, yyyy")} -{" "}
                {format(new Date(endDate), "MMM dd, yyyy")}
              </div>
            )}
          </div> */}
          {/* Date Range Filter */}
          <div className="flex flex-col gap-3">
            <label className="block text-sm font-medium text-gray-700">
              Event Date Range
            </label>
            <div className="flex space-x-2">
              {/* Start Date */}
              <div className="flex items-center border border-gray-300 rounded-lg bg-white px-3 py-2 flex-1">
                <CalendarDays className="w-4 h-4 text-blue-700 mr-2" />
                <DatePicker
                  selected={startDate ? new Date(startDate) : null}
                  onChange={(date) => {
                    if (!date) return;
                    const value = dayjs(date).format("YYYY-MM-DD");
                    setStartDate(value);
                    handleDateChange("start", value);
                  }}
                  maxDate={dayjs().add(1, "day").toDate()} // cap at tomorrow
                  dateFormat="MMM dd, yyyy"
                  placeholderText="Start date"
                  className="text-sm text-gray-800 border-none bg-transparent focus:outline-none cursor-pointer min-w-[100px]"
                  showPopperArrow={false}
                />
              </div>

              {/* End Date */}
              <div className="flex items-center border border-gray-300 rounded-lg bg-white px-3 py-2 flex-1">
                <Calendar className="w-4 h-4 text-green-700 mr-2" />
                <DatePicker
                  selected={endDate ? new Date(endDate) : null}
                  onChange={(date) => {
                    if (!date) return;
                    const value = dayjs(date).format("YYYY-MM-DD");
                    setEndDate(value);
                    handleDateChange("end", value);
                  }}
                  minDate={startDate ? new Date(startDate) : undefined} // prevent before start
                  maxDate={dayjs().add(1, "day").toDate()} // block future beyond tomorrow
                  dateFormat="MMM dd, yyyy"
                  placeholderText="End date"
                  className="text-sm text-gray-800 border-none bg-transparent focus:outline-none cursor-pointer min-w-[100px]"
                  showPopperArrow={false}
                />
              </div>
            </div>

            {/* Show selected range */}
            {startDate && endDate && (
              <div className="text-xs text-gray-600 mt-1">
                Selected range: {dayjs(startDate).format("MMM DD, YYYY")} –{" "}
                {dayjs(endDate).format("MMM DD, YYYY")}
              </div>
            )}
          </div>

          {/* Status Filter */}
          <div className="flex flex-col gap-3">
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <StatusDropdown value={status} onChange={setStatus} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center gap-4 mt-6 flex-col">
          <button
            onClick={handleApply}
            className="bg-[#2853A6] hover:bg-[#1e3d7a] text-white font-medium py-2 px-4 rounded-xl w-full transition-colors"
          >
            Apply Filter
          </button>
          <button
            onClick={handleClear}
            className="border border-[#CC0000] text-[#CC0000] hover:bg-[#CC0000] hover:text-white font-medium py-2 px-4 rounded-xl w-full transition-colors"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );

  // Render using a portal to ensure it sits above other overlays
  return ReactDOM.createPortal(
    panel,
    typeof document !== "undefined" ? document.body : ({} as HTMLElement)
  );
};

export default MainBookingFilter;

const statusOptions = ["Confirmed", "Pending", "Failed"];

interface StatusDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const StatusDropdown: React.FC<StatusDropdownProps> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open]);

  const handleSelect = (option: string) => {
    onChange(option);
    setOpen(false);
  };

  const handleClear = () => {
    onChange("");
    setOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full bg-white border border-gray-300 text-left px-3 py-2 rounded-md flex justify-between items-center text-[#303237] hover:border-gray-400 focus:border-[#2853A6] focus:ring-1 focus:ring-[#2853A6] transition-colors"
      >
        {value || "Select status"}
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden">
          {value && (
            <li
              onClick={handleClear}
              className="px-4 py-2 cursor-pointer text-gray-500 hover:bg-gray-100 border-b border-gray-200"
            >
              Clear selection
            </li>
          )}
          {statusOptions.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className={clsx(
                "px-4 py-2 cursor-pointer text-[#303237] hover:bg-gray-100",
                value === option && "bg-[#E5EEFF] text-[#303237] font-medium"
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
