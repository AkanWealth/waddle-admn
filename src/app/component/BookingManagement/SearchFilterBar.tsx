import React from 'react';
import { Search, Filter } from 'lucide-react';

interface SearchFilterBarProps {
  searchTerm: string;
  statusFilter: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  searchTerm,
  statusFilter,
  onSearchChange,
  onStatusChange
}) => (
  <div className="flex items-center space-x-4">
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <input
        type="text"
        placeholder="Search for user..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
      />
    </div>

    <div className="flex items-center space-x-2">
      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="All">Status</option>
        <option value="Confirmed">Confirmed</option>
        <option value="Pending">Pending</option>
        <option value="Canceled">Canceled</option>
      </select>

      <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
        <Filter className="w-4 h-4 mr-2" />
        Filter
      </button>
    </div>
  </div>
);

export default SearchFilterBar;
