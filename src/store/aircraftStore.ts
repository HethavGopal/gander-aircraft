import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Aircraft, AircraftFilters } from '@/types/aircraft';

// Mock data - will be used as initial data if localStorage is empty
const initialAircraft: Aircraft[] = [
  {
    id: '1',
    tailNumber: 'N123AB',
    model: 'Boeing 737-800',
    status: 'available',
    location: { latitude: 40.7128, longitude: -74.0060 }, // NYC
  },
  {
    id: '2',
    tailNumber: 'N456CD',
    model: 'Airbus A320',
    status: 'maintenance',
    location: { latitude: 34.0522, longitude: -118.2437 }, // LA
  },
  {
    id: '3',
    tailNumber: 'N789EF',
    model: 'Boeing 777-300',
    status: 'aog',
    location: { latitude: 41.8781, longitude: -87.6298 }, // Chicago
  },
  {
    id: '4',
    tailNumber: 'N012GH',
    model: 'Embraer E175',
    status: 'available',
    location: { latitude: 25.7617, longitude: -80.1918 }, // Miami
  },
  {
    id: '5',
    tailNumber: 'N345IJ',
    model: 'Boeing 737-900',
    status: 'available',
    location: { latitude: 39.7392, longitude: -104.9903 }, // Denver
  },
  {
    id: '6',
    tailNumber: 'N678KL',
    model: 'Airbus A350',
    status: 'maintenance',
    location: { latitude: 47.6062, longitude: -122.3321 }, // Seattle
  },
  {
    id: '7',
    tailNumber: 'N901MN',
    model: 'Boeing 787-9',
    status: 'available',
    location: { latitude: 32.7767, longitude: -96.7970 }, // Dallas
  },
  {
    id: '8',
    tailNumber: 'N234OP',
    model: 'Embraer E190',
    status: 'aog',
    location: { latitude: 42.3601, longitude: -71.0589 }, // Boston
  },
];

interface AircraftStore {
  aircraft: Aircraft[];
  filters: AircraftFilters;
  selectedAircraft: Aircraft | null;
  isModalOpen: boolean;
  setFilters: (filters: Partial<AircraftFilters>) => void;
  updateAircraftStatus: (id: string, status: Aircraft['status']) => void;
  setSelectedAircraft: (aircraft: Aircraft | null) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  resetData: () => void;
}

export const useAircraftStore = create<AircraftStore>()(
  persist(
    (set, get) => ({
      aircraft: initialAircraft,
      filters: {
        tailNumber: '',
        model: '',
        status: '',
      },
      selectedAircraft: null,
      isModalOpen: false,
      
      setFilters: (newFilters) =>
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        })),
        
      updateAircraftStatus: (id, status) =>
        set((state) => ({
          aircraft: state.aircraft.map((aircraft) =>
            aircraft.id === id ? { ...aircraft, status } : aircraft
          ),
        })),
        
      setSelectedAircraft: (aircraft) =>
        set({ selectedAircraft: aircraft }),
        
      setIsModalOpen: (isOpen) =>
        set({ isModalOpen: isOpen }),

      resetData: () =>
        set({ aircraft: initialAircraft }),
    }),
    {
      name: 'flightops-aircraft-storage', // localStorage key
      storage: createJSONStorage(() => localStorage),
      // Only persist aircraft data, not UI state
      partialize: (state) => ({ 
        aircraft: state.aircraft 
      }),
    }
  )
); 