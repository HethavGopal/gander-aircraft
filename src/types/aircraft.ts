export interface Aircraft {
  id: string;
  tailNumber: string;
  model: string;
  status: 'available' | 'aog' | 'maintenance';
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface AircraftFilters {
  tailNumber: string;
  model: string;
  status: string;
} 