"use client";

import { Search, Filter } from 'lucide-react';
import { useAircraftStore } from '@/store/aircraftStore';

export default function AircraftFilters() {
  const { filters, setFilters } = useAircraftStore();

  return (
    <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-blue-400" />
        <h2 className="text-lg font-semibold text-white">Filter Aircraft</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="tailNumber" className="block text-sm font-medium text-gray-300 mb-2">
            Tail Number
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              id="tailNumber"
              type="text"
              placeholder="Search tail number..."
              className="w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              value={filters.tailNumber}
              onChange={(e) => setFilters({ tailNumber: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label htmlFor="model" className="block text-sm font-medium text-gray-300 mb-2">
            Aircraft Model
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              id="model"
              type="text"
              placeholder="Search model..."
              className="w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              value={filters.model}
              onChange={(e) => setFilters({ model: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-2">
            Status
          </label>
          <select
            id="status"
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            value={filters.status}
            onChange={(e) => setFilters({ status: e.target.value })}
          >
            <option value="">All</option>
            <option value="available">Available</option>
            <option value="aog">AOG</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
      </div>
    </div>
  );
} 