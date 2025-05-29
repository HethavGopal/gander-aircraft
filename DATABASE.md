# FlightOps Pro - Data Storage & Features

## Current Setup (Local Storage Database)

The application now uses **localStorage** for persistent data storage with Zustand:

- **Data Location**: Browser's localStorage + `src/store/aircraftStore.ts`
- **Storage Type**: JSON in browser localStorage 
- **Persistence**: ✅ Data survives page refresh and browser restart
- **Storage Key**: `flightops-aircraft-storage`
- **Initial Data**: 8 aircraft with different statuses and locations

### Current Aircraft Data Structure:
```typescript
interface Aircraft {
  id: string;
  tailNumber: string;
  model: string;
  status: 'available' | 'aog' | 'maintenance';
  location: {
    latitude: number;
    longitude: number;
  };
}
```

## Application Features

### ✅ **Map Visualization**
- **Interactive Map**: Real-time aircraft location display using Leaflet/OpenStreetMap
- **Status Markers**: Color-coded aircraft icons (green=available, red=AOG, yellow=maintenance)
- **Click to Update**: Click map markers to open status update modal
- **Auto-fit Bounds**: Map automatically adjusts to show all aircraft
- **Toggle Views**: Switch between Map View and Grid View

### ✅ **Grid View** 
- **Aircraft Cards**: Professional card layout with status indicators
- **Advanced Filtering**: Filter by tail number, model, and status
- **Click to Update**: Click cards to open status update modal
- **Responsive Design**: Adapts to all screen sizes

### ✅ **Real-time Updates**
- **Status Management**: Update aircraft status with confirmation modal
- **Auto-save**: All changes automatically persist to localStorage
- **Live UI Updates**: Status changes reflect immediately across all views

## How It Works

1. **Initial Load**: App loads with default aircraft data and map view
2. **Map Interaction**: Click aircraft markers or use view toggle
3. **Status Updates**: Click any aircraft (map or card) to update status
4. **Auto-Save**: Changes automatically save to localStorage
5. **Persistence**: Data persists across browser sessions

### Data Flow:
1. User updates aircraft status via modal (from map or grid view)
2. Zustand store updates aircraft array
3. Zustand persist middleware automatically saves to localStorage
4. UI re-renders with new status across both map and grid views
5. Data persists on page refresh

## Technical Stack

- ✅ **Next.js 14+** with App Router and TypeScript
- ✅ **Tailwind CSS** for styling with dark theme
- ✅ **Zustand** for state management with localStorage persistence
- ✅ **React-Leaflet** for interactive map visualization
- ✅ **Lucide React** for consistent iconography
- ✅ **OpenStreetMap** tiles for free map data

## Storage Features

- ✅ **Automatic persistence** via Zustand middleware
- ✅ **Selective storage** (only aircraft data, not UI state)
- ✅ **JSON serialization** for complex data structures
- ✅ **Reset functionality** to restore default data
- ✅ **Storage status indicator** showing active persistence

## Browser Support

localStorage and map features are supported in all modern browsers:
- ✅ Chrome/Edge 4+
- ✅ Firefox 3.5+
- ✅ Safari 4+
- ✅ iOS Safari 3.2+
- ✅ Android Browser 2.1+

## Storage Limits

- **Typical limit**: 5-10MB per domain
- **Current usage**: ~2KB for 8 aircraft
- **Scalability**: Can handle hundreds of aircraft easily

## Potential Future Upgrades

### Option 1: Enhanced Local Storage
- Add data compression for larger datasets
- Implement data versioning/migration
- Add export/import functionality

### Option 2: Enhanced Map Features
- **Custom map tiles** (satellite, aviation charts)
- **Real-time tracking** with GPS updates
- **Flight paths** and route visualization
- **Geofencing** and area alerts
- **Weather overlay** integration

### Option 3: Cloud Database (Production)
- **Supabase**: PostgreSQL with real-time features  
- **Firebase**: NoSQL with real-time updates
- **PlanetScale**: MySQL-compatible serverless database
- **Vercel KV**: Redis-compatible key-value store

### Option 4: Hybrid Approach
- localStorage for offline capability
- Cloud sync when online
- Conflict resolution for multi-device usage 