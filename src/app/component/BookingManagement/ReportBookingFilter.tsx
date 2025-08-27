// import React, { useEffect, useRef, useState } from "react";
// import ReactDOM from "react-dom";
// import { X, ChevronDown } from "lucide-react";
// import clsx from "clsx";
// import { useBookingStore } from "@/stores/useBookingStore";

// interface ReportBookingFilterProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const ReportBookingFilter: React.FC<ReportBookingFilterProps> = ({
//   isOpen,
//   onClose,
// }) => {
//   const filterRef = useRef<HTMLDivElement>(null);

//   const {
//     filters: { vendor, dateRange, status },
//     setVendor,
//     setDateRange,
//     setStatus,
//     applyMainFilter,
//     clearFilters,
//   } = useBookingStore();

//   const [startDate, setStartDate] = useState<string>("");
//   const [endDate, setEndDate] = useState<string>("");

//   useEffect(() => {
//     if (dateRange && dateRange.includes(" - ")) {
//       const [start, end] = dateRange.split(" - ");
//       // dateRange stored as MM/dd/yyyy - MM/dd/yyyy → convert to yyyy-MM-dd for inputs
//       const [sm, sd, sy] = start.split("/");
//       const [em, ed, ey] = end.split("/");
//       setStartDate(`${sy}-${sm.padStart(2, "0")}-${sd.padStart(2, "0")}`);
//       setEndDate(`${ey}-${em.padStart(2, "0")}-${ed.padStart(2, "0")}`);
//     } else {
//       setStartDate("");
//       setEndDate("");
//     }
//   }, [dateRange, isOpen]);

//   useEffect(() => {
//     const handleOutsideClick = (event: MouseEvent) => {
//       const target = event.target as HTMLElement | null;
//       if (filterRef.current && target && !filterRef.current.contains(target)) {
//         onClose();
//       }
//     };

//     if (isOpen) {
//       document.addEventListener("mousedown", handleOutsideClick);
//     }
//     return () => document.removeEventListener("mousedown", handleOutsideClick);
//   }, [isOpen, onClose]);

//   if (!isOpen) return null;

//   const handleApply = () => {
//     applyMainFilter({ vendor, dateRange, status });
//     onClose();
//   };

//   const handleClear = () => {
//     clearFilters();
//     setStartDate("");
//     setEndDate("");
//     setDateRange("");
//     onClose();
//   };

//   const onDateChange = (type: "start" | "end", value: string) => {
//     if (type === "start") setStartDate(value);
//     else setEndDate(value);

//     const newStart = type === "start" ? value : startDate;
//     const newEnd = type === "end" ? value : endDate;
//     if (newStart && newEnd) {
//       const [ys, ms, ds] = newStart.split("-");
//       const [ye, me, de] = newEnd.split("-");
//       // store expects MM/dd/yyyy - MM/dd/yyyy
//       const formatted = `${ms}/${ds}/${ys} - ${me}/${de}/${ye}`;
//       setDateRange(formatted);
//     }
//   };

//   const panel = (
//     <div className="fixed top-24 right-4 z-[130] min-w-[563px] pointer-events-auto">
//       <div
//         ref={filterRef}
//         className="bg-white w-full max-w-md p-6 rounded-lg shadow-md"
//       >
//         <div className="text-[#303237] flex items-center justify-between">
//           <h2 className="text-lg font-semibold mb-4">Filter By</h2>
//           <X
//             onClick={onClose}
//             className="cursor-pointer hover:text-gray-600 transition-colors"
//             size={20}
//           />
//         </div>

//         <div className="flex flex-col w-full gap-6">
//           {/* Vendor */}
//           <div className="flex flex-col gap-3">
//             <label className="block text-sm font-medium text-[#303237]">
//               Vendor Name
//             </label>
//             <input
//               value={vendor}
//               onChange={(e) => setVendor(e.target.value)}
//               className="w-full mt-1 outline-none text-[#303237] border border-gray-300 rounded-md px-3 py-2 focus:border-[#2853A6] focus:ring-1 focus:ring-[#2853A6] transition-colors"
//               placeholder="ABC Events"
//             />
//           </div>

//           {/* Date Range (native inputs for reliability over modals) */}
//           <div className="flex flex-col gap-3">
//             <label className="block text-sm font-medium text-gray-700">
//               Event Date Range
//             </label>
//             <div className="flex space-x-2">
//               <input
//                 type="date"
//                 value={startDate}
//                 onChange={(e) => onDateChange("start", e.target.value)}
//                 className="flex-1 w-full outline-none text-[#303237] border border-gray-300 rounded-md px-3 py-2 focus:border-[#2853A6] focus:ring-1 focus:ring-[#2853A6] transition-colors"
//                 placeholder="Start Date"
//               />
//               <input
//                 type="date"
//                 value={endDate}
//                 min={startDate || undefined}
//                 onChange={(e) => onDateChange("end", e.target.value)}
//                 className="flex-1 w-full outline-none text-[#303237] border border-gray-300 rounded-md px-3 py-2 focus:border-[#2853A6] focus:ring-1 focus:ring-[#2853A6] transition-colors"
//                 placeholder="End Date"
//               />
//             </div>
//           </div>

//           {/* Status */}
//           <div className="flex flex-col gap-3">
//             <label className="block text-sm font-medium text-gray-700">
//               Status
//             </label>
//             <StatusDropdown value={status} onChange={setStatus} />
//           </div>
//         </div>

//         <div className="flex justify-between items-center gap-4 mt-6 flex-col">
//           <button
//             onClick={handleApply}
//             className="bg-[#2853A6] hover:bg-[#1e3d7a] text-white font-medium py-2 px-4 rounded-xl w-full transition-colors"
//           >
//             Apply Filter
//           </button>
//           <button
//             onClick={handleClear}
//             className="border border-[#CC0000] text-[#CC0000] hover:bg-[#CC0000] hover:text-white font-medium py-2 px-4 rounded-xl w-full transition-colors"
//           >
//             Clear
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   return ReactDOM.createPortal(
//     panel,
//     typeof document !== "undefined" ? document.body : ({} as HTMLElement)
//   );
// };

// export default ReportBookingFilter;

// const statusOptions = ["Confirmed", "Pending", "Failed"];

// interface StatusDropdownProps {
//   value: string;
//   onChange: (value: string) => void;
// }

// const StatusDropdown: React.FC<StatusDropdownProps> = ({ value, onChange }) => {
//   const [open, setOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleOutsideClick = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setOpen(false);
//       }
//     };
//     if (open) document.addEventListener("mousedown", handleOutsideClick);
//     return () => document.removeEventListener("mousedown", handleOutsideClick);
//   }, [open]);

//   const handleSelect = (option: string) => {
//     onChange(option);
//     setOpen(false);
//   };

//   const handleClear = () => {
//     onChange("");
//     setOpen(false);
//   };

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <button
//         type="button"
//         onClick={() => setOpen(!open)}
//         className="w-full bg-white border border-gray-300 text-left px-3 py-2 rounded-md flex justify-between items-center text-[#303237] hover:border-gray-400 focus:border-[#2853A6] focus:ring-1 focus:ring-[#2853A6] transition-colors"
//       >
//         {value || "Select status"}
//         <ChevronDown
//           className={clsx(
//             "w-4 h-4 text-gray-500 transition-transform",
//             open && "rotate-180"
//           )}
//         />
//       </button>
//       {open && (
//         <ul className="absolute z-[140] mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden">
//           {value && (
//             <li
//               onClick={handleClear}
//               className="px-4 py-2 cursor-pointer text-gray-500 hover:bg-gray-100 border-b border-gray-200"
//             >
//               Clear selection
//             </li>
//           )}
//           {statusOptions.map((option) => (
//             <li
//               key={option}
//               onClick={() => handleSelect(option)}
//               className={clsx(
//                 "px-4 py-2 cursor-pointer text-[#303237] hover:bg-gray-100",
//                 value === option && "bg-[#E5EEFF] text-[#303237] font-medium"
//               )}
//             >
//               {option}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { X, ChevronDown } from "lucide-react";
import clsx from "clsx";

type FilterState = {
  vendor: string;
  dateRange: string;
  status: string;
};

interface ReportBookingFilterProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onApplyFilter: (filters: FilterState) => void;
  onClearFilters: () => void;
}

const ReportBookingFilter: React.FC<ReportBookingFilterProps> = ({
  isOpen,
  onClose,
  filters,
  onApplyFilter,
  onClearFilters,
}) => {
  const filterRef = useRef<HTMLDivElement>(null);

  const [localFilters, setLocalFilters] = useState<FilterState>(filters);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  // Sync local filters with prop filters when modal opens
  useEffect(() => {
    if (isOpen) {
      setLocalFilters(filters);
    }
  }, [isOpen, filters]);

  useEffect(() => {
    if (localFilters.dateRange && localFilters.dateRange.includes(" - ")) {
      const [start, end] = localFilters.dateRange.split(" - ");
      // dateRange stored as MM/dd/yyyy - MM/dd/yyyy → convert to yyyy-MM-dd for inputs
      const [sm, sd, sy] = start.split("/");
      const [em, ed, ey] = end.split("/");
      setStartDate(`${sy}-${sm.padStart(2, "0")}-${sd.padStart(2, "0")}`);
      setEndDate(`${ey}-${em.padStart(2, "0")}-${ed.padStart(2, "0")}`);
    } else {
      setStartDate("");
      setEndDate("");
    }
  }, [localFilters.dateRange, isOpen]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (filterRef.current && target && !filterRef.current.contains(target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleApply = () => {
    onApplyFilter(localFilters);
    onClose();
  };

  const handleClear = () => {
    const clearedFilters = {
      vendor: "",
      dateRange: "",
      status: "",
    };
    setLocalFilters(clearedFilters);
    setStartDate("");
    setEndDate("");
    onClearFilters();
    onClose();
  };

  const onDateChange = (type: "start" | "end", value: string) => {
    if (type === "start") setStartDate(value);
    else setEndDate(value);

    const newStart = type === "start" ? value : startDate;
    const newEnd = type === "end" ? value : endDate;
    if (newStart && newEnd) {
      const [ys, ms, ds] = newStart.split("-");
      const [ye, me, de] = newEnd.split("-");
      // store expects MM/dd/yyyy - MM/dd/yyyy
      const formatted = `${ms}/${ds}/${ys} - ${me}/${de}/${ye}`;
      setLocalFilters((prev) => ({ ...prev, dateRange: formatted }));
    }
  };

  const updateLocalFilter = (key: keyof FilterState, value: string) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  };

  const panel = (
    <div className="fixed top-24 right-4 z-[130] min-w-[563px] pointer-events-auto">
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
          {/* Vendor */}
          <div className="flex flex-col gap-3">
            <label className="block text-sm font-medium text-[#303237]">
              Event Name
            </label>
            <input
              value={localFilters.vendor}
              onChange={(e) => updateLocalFilter("vendor", e.target.value)}
              className="w-full mt-1 outline-none text-[#303237] border border-gray-300 rounded-md px-3 py-2 focus:border-[#2853A6] focus:ring-1 focus:ring-[#2853A6] transition-colors"
              placeholder="ABC Events"
            />
          </div>

          {/* Date Range (native inputs for reliability over modals) */}
          <div className="flex flex-col gap-3">
            <label className="block text-sm font-medium text-gray-700">
              Event Date Range
            </label>
            <div className="flex space-x-2">
              <input
                type="date"
                value={startDate}
                onChange={(e) => onDateChange("start", e.target.value)}
                className="flex-1 w-full outline-none text-[#303237] border border-gray-300 rounded-md px-3 py-2 focus:border-[#2853A6] focus:ring-1 focus:ring-[#2853A6] transition-colors"
                placeholder="Start Date"
              />
              <input
                type="date"
                value={endDate}
                min={startDate || undefined}
                onChange={(e) => onDateChange("end", e.target.value)}
                className="flex-1 w-full outline-none text-[#303237] border border-gray-300 rounded-md px-3 py-2 focus:border-[#2853A6] focus:ring-1 focus:ring-[#2853A6] transition-colors"
                placeholder="End Date"
              />
            </div>
          </div>

          {/* Status */}
          <div className="flex flex-col gap-3">
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <StatusDropdown
              value={localFilters.status}
              onChange={(value) => updateLocalFilter("status", value)}
            />
          </div>
        </div>

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

  return ReactDOM.createPortal(
    panel,
    typeof document !== "undefined" ? document.body : ({} as HTMLElement)
  );
};

export default ReportBookingFilter;

const statusOptions = ["Completed", "Cancelled", "Pending"];

interface StatusDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const StatusDropdown: React.FC<StatusDropdownProps> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
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
          className={clsx(
            "w-4 h-4 text-gray-500 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>
      {open && (
        <ul className="absolute z-[140] mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden">
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
