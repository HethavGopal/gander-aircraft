"use client";

import { useState } from 'react';
import { Map, Grid3X3 } from 'lucide-react';

interface MapToggleProps {
  showMap: boolean;
  onToggle: (showMap: boolean) => void;
}

export default function MapToggle({ showMap, onToggle }: MapToggleProps) {
  return (
    <div className="flex items-center gap-2 mb-6">
      <span className="text-sm text-gray-400">View:</span>
      <div className="flex bg-gray-800 rounded-lg p-1 border border-gray-700">
        <button
          onClick={() => onToggle(true)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            showMap
              ? 'bg-blue-600 text-white'
              : 'text-gray-400 hover:text-white hover:bg-gray-700'
          }`}
        >
          <Map className="w-4 h-4" />
          Map View
        </button>
        <button
          onClick={() => onToggle(false)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            !showMap
              ? 'bg-blue-600 text-white'
              : 'text-gray-400 hover:text-white hover:bg-gray-700'
          }`}
        >
          <Grid3X3 className="w-4 h-4" />
          Grid View
        </button>
      </div>
    </div>
  );
} 