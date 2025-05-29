"use client";

import { useAircraftStore } from '@/store/aircraftStore';
import AircraftCard from './AircraftCard';

export default function AircraftList() {
  const aircraft = useAircraftStore((state) => state.aircraft);
  const filters = useAircraftStore((state) => state.filters);

  // Filter aircraft based on current filters
  const filteredAircraft = aircraft.filter((aircraft) => {
    const matchesTailNumber = !filters.tailNumber || 
      aircraft.tailNumber.toLowerCase().includes(filters.tailNumber.toLowerCase());
    const matchesModel = !filters.model || 
      aircraft.model.toLowerCase().includes(filters.model.toLowerCase());
    const matchesStatus = !filters.status || aircraft.status === filters.status;
    
    return matchesTailNumber && matchesModel && matchesStatus;
  });

  if (filteredAircraft.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-2">No aircraft found</div>
        <div className="text-gray-500 text-sm">
          Try adjusting your filters to see more results
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredAircraft.map((aircraft) => (
        <AircraftCard key={aircraft.id} aircraft={aircraft} />
      ))}
    </div>
  );
} 