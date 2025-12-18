import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { type WellReport } from '../lib/wellData';

// Fix for default marker icons in react-leaflet
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface WellMapProps {
  report: WellReport;
}

export function WellMap({ report }: WellMapProps) {
  const { targetLocation, nearestWells } = report;

  // Create custom icons
  const targetIcon = new Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgb(37, 99, 235)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3" fill="rgb(37, 99, 235)"></circle>
      </svg>
    `),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const wellIcon = new Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgb(59, 130, 246)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10" fill="rgb(219, 234, 254)"></circle>
        <circle cx="12" cy="12" r="3" fill="rgb(59, 130, 246)"></circle>
      </svg>
    `),
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });

  return (
    <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200" style={{ height: '500px' }}>
      <MapContainer
        center={[targetLocation.lat, targetLocation.lon]}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Target location marker */}
        <Marker position={[targetLocation.lat, targetLocation.lon]} icon={targetIcon}>
          <Popup>
            <div className="p-2">
              <div className="font-semibold text-blue-600">Your Property</div>
              <div className="text-sm text-gray-600">{targetLocation.address}</div>
            </div>
          </Popup>
        </Marker>

        {/* 5-mile radius circle */}
        <Circle
          center={[targetLocation.lat, targetLocation.lon]}
          radius={8046.72} // 5 miles in meters
          pathOptions={{
            color: 'rgb(37, 99, 235)',
            fillColor: 'rgb(191, 219, 254)',
            fillOpacity: 0.1,
            weight: 1,
            dashArray: '5, 5',
          }}
        />

        {/* Nearby wells */}
        {nearestWells.map((well, index) => (
          <Marker
            key={well.id}
            position={[well.lat, well.lon]}
            icon={wellIcon}
          >
            <Popup>
              <div className="p-2 max-w-xs">
                <div className="font-semibold text-blue-600 mb-1">
                  Well #{index + 1}: {well.name}
                </div>
                <div className="space-y-1 text-sm">
                  <div>
                    <span className="text-gray-600">Distance:</span>{' '}
                    <span className="font-medium">{well.distance_miles} miles</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Depth:</span>{' '}
                    <span className="font-medium">{well.depth || 'Unknown'}</span>
                  </div>
                  {well.aquifer && well.aquifer !== 'Unknown' && (
                    <div>
                      <span className="text-gray-600">Aquifers:</span>{' '}
                      <span className="font-medium text-xs">{well.aquifer}</span>
                    </div>
                  )}
                  {well.elevation && well.elevation !== 'Unknown' && (
                    <div>
                      <span className="text-gray-600">Elevation:</span>{' '}
                      <span className="font-medium">{well.elevation} ft</span>
                    </div>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
