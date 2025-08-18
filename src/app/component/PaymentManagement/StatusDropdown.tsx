import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";

const paymentOptions = ["Successful", "Pending", "Failed", "Refunded"];
const bookingOptions = ["Successful", "No Booking", "Cancelled"];

interface StatusDropdownProps {
  usedFor: "payment" | "booking";
  value: string;
  onChange: (value: string) => void;
}

const StatusDropdown: React.FC<StatusDropdownProps> = ({
  value,
  onChange,
  usedFor,
}) => {
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

  const options = usedFor === "booking" ? bookingOptions : paymentOptions;

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
          {options.map((option) => (
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

export default StatusDropdown;
