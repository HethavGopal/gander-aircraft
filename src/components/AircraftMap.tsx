"use client";

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { divIcon, LatLngExpression } from 'leaflet';
import { useAircraftStore } from '@/store/aircraftStore';
import { Aircraft } from '@/types/aircraft';
import 'leaflet/dist/leaflet.css';

// Custom aircraft markers based on status
const createAircraftIcon = (status: Aircraft['status']) => {
  const colors = {
    available: '#10b981', // green
    aog: '#ef4444',       // red
    maintenance: '#f59e0b' // yellow
  };

  const color = colors[status];
  
  return divIcon({
    html: `
      <div style="
        background-color: ${color};
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          color: white;
          font-size: 10px;
          font-weight: bold;
        ">✈</div>
      </div>
    `,
    className: 'custom-aircraft-icon',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

// Component to fit map bounds to show all aircraft
function MapBounds({ aircraft }: { aircraft: Aircraft[] }) {
  const map = useMap();

  useEffect(() => {
    if (aircraft.length > 0) {
      const coordinates: [number, number][] = aircraft.map(a => 
        [a.location.latitude, a.location.longitude]
      );
      map.fitBounds(coordinates, { padding: [20, 20] });
    }
  }, [aircraft, map]);

  return null;
}

export default function AircraftMap() {
  const aircraft = useAircraftStore((state) => state.aircraft);
  const { setSelectedAircraft, setIsModalOpen } = useAircraftStore();
  const [isClient, setIsClient] = useState(false);

  // Handle SSR - only render map on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleMarkerClick = (aircraft: Aircraft) => {
    setSelectedAircraft(aircraft);
    setIsModalOpen(true);
  };

  if (!isClient) {
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-8 mb-6">
        <div className="animate-pulse flex items-center justify-center h-96">
          <div className="text-gray-400">Loading map...</div>
        </div>
      </div>
    );
  }

  const mapCenter: LatLngExpression = [39.8283, -98.5795]; // Geographic center of US

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden mb-6">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-white mb-1">Aircraft Locations</h2>
        <p className="text-sm text-gray-400">
          Real-time fleet positioning • Click markers to update status
        </p>
      </div>
      
      <div className="h-96 relative">
        <MapContainer
          center={mapCenter}
          zoom={4}
          style={{ height: '100%', width: '100%' }}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <MapBounds aircraft={aircraft} />
          
          {aircraft.map((aircraftItem) => {
            const position: LatLngExpression = [
              aircraftItem.location.latitude, 
              aircraftItem.location.longitude
            ];
            
            return (
              <Marker
                key={aircraftItem.id}
                position={position}
                icon={createAircraftIcon(aircraftItem.status)}
                eventHandlers={{
                  click: () => handleMarkerClick(aircraftItem),
                }}
              >
                <Popup>
                  <div className="text-gray-900">
                    <div className="font-semibold text-base mb-1">{aircraftItem.tailNumber}</div>
                    <div className="text-sm text-gray-600 mb-2">{aircraftItem.model}</div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        aircraftItem.status === 'available' ? 'bg-green-100 text-green-800' :
                        aircraftItem.status === 'aog' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {aircraftItem.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {aircraftItem.location.latitude.toFixed(4)}, {aircraftItem.location.longitude.toFixed(4)}
                    </div>
                    <div className="mt-2 text-xs text-blue-600 cursor-pointer">
                      Click to update status →
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
      
      {/* Legend */}
      <div className="p-4 border-t border-gray-700 bg-gray-950">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <span className="text-gray-300">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <span className="text-gray-300">AOG</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <span className="text-gray-300">Maintenance</span>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            {aircraft.length} aircraft displayed
          </div>
        </div>
      </div>
    </div>
  );
} 