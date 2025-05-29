"use client";

import { Database, RotateCcw } from 'lucide-react';
import { useAircraftStore } from '@/store/aircraftStore';

export default function StorageStatus() {
  const { aircraft, resetData } = useAircraftStore();

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all aircraft data to defaults?')) {
      resetData();
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-green-400">
            <Database className="w-4 h-4" />
            <span className="text-sm font-medium">Local Storage Active</span>
          </div>
          <div className="text-gray-400 text-sm">
            {aircraft.length} aircraft • Changes auto-saved
          </div>
        </div>
        
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-600 rounded-md transition-colors"
          title="Reset to default data"
        >
          <RotateCcw className="w-3 h-3" />
          Reset Data
        </button>
      </div>
    </div>
  );
} 