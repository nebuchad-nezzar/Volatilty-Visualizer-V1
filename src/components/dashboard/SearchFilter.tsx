import React from 'react';
import { Search } from 'lucide-react';

interface SearchFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
}

export default function SearchFilter({
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus
}: SearchFilterProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
      <div className="relative w-full md:w-96">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search orders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="flex items-center space-x-4">
        <label className="text-sm font-medium text-gray-700">Status:</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="block w-40 pl-3 pr-10 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All Orders</option>
          <option value="pending">Pending</option>
          <option value="in-transit">In Transit</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>
    </div>
  );
}