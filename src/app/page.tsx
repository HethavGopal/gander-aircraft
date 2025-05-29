"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Plane } from 'lucide-react';
import AircraftFilters from '@/components/AircraftFilters';
import AircraftList from '@/components/AircraftList';
import StatusUpdateModal from '@/components/StatusUpdateModal';
import MapToggle from '@/components/MapToggle';

// Dynamically import the map component with SSR disabled
const AircraftMap = dynamic(() => import('@/components/AircraftMap'), {
  ssr: false,
  loading: () => (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-8 mb-6">
      <div className="animate-pulse flex items-center justify-center h-96">
        <div className="text-gray-400">Loading map...</div>
      </div>
    </div>
  ),
});

export default function HomePage() {
  const [showMap, setShowMap] = useState(true);

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="flex justify-center py-4">
        <div className="bg-gray-950/70 backdrop-blur-md border border-gray-700 rounded-lg px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Plane className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">FlightOps Pro</h1>
              <p className="text-xs text-gray-400">Aircraft Management System</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Aircraft Fleet Status</h1>
          <p className="text-gray-400">
            Monitor and manage your aircraft fleet status in real-time. Click on any aircraft to update its operational status.
          </p>
        </div>

        {/* View Toggle */}
        <MapToggle showMap={showMap} onToggle={setShowMap} />

        {/* Map View */}
        {showMap && <AircraftMap />}

        {/* Filters - only show when in grid view */}
        {!showMap && <AircraftFilters />}

        {/* Aircraft List - only show when in grid view */}
        {!showMap && <AircraftList />}
      </main>

      {/* Modal */}
      <StatusUpdateModal />
    </div>
  );
}
