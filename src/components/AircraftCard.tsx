"use client";

import { MapPin, Plane, AlertTriangle, CheckCircle, Wrench } from 'lucide-react';
import { Aircraft } from '@/types/aircraft';
import { useAircraftStore } from '@/store/aircraftStore';

interface AircraftCardProps {
  aircraft: Aircraft;
}

export default function AircraftCard({ aircraft }: AircraftCardProps) {
  const { setSelectedAircraft, setIsModalOpen } = useAircraftStore();

  const handleCardClick = () => {
    setSelectedAircraft(aircraft);
    setIsModalOpen(true);
  };

  const getStatusConfig = (status: Aircraft['status']) => {
    switch (status) {
      case 'available':
        return {
          icon: CheckCircle,
          color: 'text-green-400',
          bgColor: 'bg-green-400/10',
          borderColor: 'border-green-400/20',
          label: 'Available'
        };
      case 'aog':
        return {
          icon: AlertTriangle,
          color: 'text-red-400',
          bgColor: 'bg-red-400/10',
          borderColor: 'border-red-400/20',
          label: 'AOG'
        };
      case 'maintenance':
        return {
          icon: Wrench,
          color: 'text-yellow-400',
          bgColor: 'bg-yellow-400/10',
          borderColor: 'border-yellow-400/20',
          label: 'Maint'
        };
    }
  };

  const statusConfig = getStatusConfig(aircraft.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div 
      className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-blue-400 hover:bg-gray-800 transition-all duration-200 cursor-pointer group"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
      aria-label={`View details for aircraft ${aircraft.tailNumber}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-400/10 rounded-lg border border-blue-400/20">
            <Plane className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
              {aircraft.tailNumber}
            </h3>
            <p className="text-gray-400 text-sm">{aircraft.model}</p>
          </div>
        </div>
        
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${statusConfig.bgColor} ${statusConfig.borderColor} min-w-0 shrink-0`}>
          <StatusIcon className={`w-4 h-4 ${statusConfig.color} shrink-0`} />
          <span className={`text-sm font-medium ${statusConfig.color} whitespace-nowrap`}>
            {statusConfig.label}
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-2 text-gray-400 text-sm">
        <MapPin className="w-4 h-4" />
        <span>
          {aircraft.location.latitude.toFixed(4)}, {aircraft.location.longitude.toFixed(4)}
        </span>
      </div>
      
      <div className="mt-4 text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
        Click to update status
      </div>
    </div>
  );
} 