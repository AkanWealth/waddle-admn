

"use client";

import React, { useState } from "react";
import { Search, ListFilter, ChevronDown } from "lucide-react";
import StatusFilterModal from "./StatusFilterModal";

interface SearchFilterBarProps {
  searchTerm: string;
  statusFilter: string[];
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string[]) => void;
}

const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  searchTerm,
  statusFilter,
  onSearchChange,
  onStatusChange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex items-center space-x-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#7B7B7B] w-4 h-4" />
        <input
          type="text"
          placeholder="Search for booking..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-4 py-2 outline-none border border-[#D0D0D0] rounded-[8px] text-[#7B7B7B] font-normal focus:ring-2 focus:border-transparent w-64"
        />
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => setIsModalOpen(!isModalOpen)}
          className="flex items-center px-3 py-2 outline-none border border-[#D0D0D0] rounded-[8px] text-[#7B7B7B] text-sm"
        >
          <span className="mr-2">
            {statusFilter.length === 1
              ? statusFilter[0]
              : statusFilter.length > 1
              ? "Multiple"
              : "Status"}
          </span>
          <ChevronDown
            className={`h-[19px] transform transition-transform duration-200 ${
              isModalOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-3 py-2 border border-[#D0D0D0] rounded-[8px] text-[#7B7B7B] text-sm"
        >
          <ListFilter className="w-4 h-4 mr-2" />
          Filter
        </button>
      </div>

      <StatusFilterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApply={onStatusChange}
        initialSelected={statusFilter}
      />
    </div>
  );
};

export default SearchFilterBar;
