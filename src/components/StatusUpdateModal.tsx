"use client";

import { useEffect, useState } from 'react';
import { X, Plane, Save } from 'lucide-react';
import { Aircraft } from '@/types/aircraft';
import { useAircraftStore } from '@/store/aircraftStore';

export default function StatusUpdateModal() {
  const { 
    selectedAircraft, 
    isModalOpen, 
    setIsModalOpen, 
    setSelectedAircraft, 
    updateAircraftStatus 
  } = useAircraftStore();
  
  const [selectedStatus, setSelectedStatus] = useState<Aircraft['status']>('available');

  useEffect(() => {
    if (selectedAircraft) {
      setSelectedStatus(selectedAircraft.status);
    }
  }, [selectedAircraft]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedAircraft(null);
  };

  const handleSave = () => {
    if (selectedAircraft) {
      updateAircraftStatus(selectedAircraft.id, selectedStatus);
      handleClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  if (!isModalOpen || !selectedAircraft) {
    return null;
  }

  const statusOptions = [
    { value: 'available', label: 'Available', description: 'Ready for operation' },
    { value: 'aog', label: 'AOG', description: 'Aircraft on Ground - Not operational' },
    { value: 'maintenance', label: 'Maintenance', description: 'Scheduled maintenance' },
  ] as const;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-400/10 rounded-lg border border-blue-400/20">
              <Plane className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 id="modal-title" className="text-xl font-semibold text-white">
                Update Status
              </h2>
              <p className="text-gray-400 text-sm">
                {selectedAircraft.tailNumber} - {selectedAircraft.model}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <label className="block text-sm font-medium text-gray-300">
            Select New Status
          </label>
          
          <div className="space-y-2">
            {statusOptions.map((option) => (
              <label
                key={option.value}
                className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedStatus === option.value
                    ? 'border-blue-400 bg-blue-400/10'
                    : 'border-gray-600 hover:border-gray-500 hover:bg-gray-800'
                }`}
              >
                <input
                  type="radio"
                  name="status"
                  value={option.value}
                  checked={selectedStatus === option.value}
                  onChange={(e) => setSelectedStatus(e.target.value as Aircraft['status'])}
                  className="mt-1 text-blue-400 bg-gray-800 border-gray-600 focus:ring-blue-400 focus:ring-2"
                />
                <div>
                  <div className="text-white font-medium">{option.label}</div>
                  <div className="text-gray-400 text-sm">{option.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg border border-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Save className="w-4 h-4" />
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
} 