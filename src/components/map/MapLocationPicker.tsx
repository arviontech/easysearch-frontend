"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapPin } from "lucide-react";

// Fix for default marker icon in Leaflet
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface MapLocationPickerProps {
  latitude: number;
  longitude: number;
  onLocationChange: (lat: number, lng: number) => void;
  height?: string;
}

// Component to handle map clicks
function LocationMarker({
  position,
  setPosition,
}: {
  position: [number, number];
  setPosition: (pos: [number, number]) => void;
}) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position ? <Marker position={position} icon={icon} /> : null;
}

const MapLocationPicker = ({
  latitude,
  longitude,
  onLocationChange,
  height = "h-96",
}: MapLocationPickerProps) => {
  const [position, setPosition] = useState<[number, number]>([
    latitude || 24.3745, // Default to Rajshahi coordinates
    longitude || 88.6042,
  ]);
  const [isClient, setIsClient] = useState(false);

  // Only render map on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Update position when props change
  useEffect(() => {
    if (latitude && longitude) {
      setPosition([latitude, longitude]);
    }
  }, [latitude, longitude]);

  // Notify parent of position change
  useEffect(() => {
    onLocationChange(position[0], position[1]);
  }, [position, onLocationChange]);

  if (!isClient) {
    return (
      <div
        className={`${height} bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300`}
      >
        <div className="text-center">
          <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className={`${height} rounded-xl overflow-hidden border-2 border-gray-200 shadow-sm`}>
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker position={position} setPosition={setPosition} />
        </MapContainer>
      </div>

      {/* Coordinates Display */}
      <div className="flex items-center justify-between bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-4 border border-cyan-200">
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-cyan-600" />
          <div>
            <p className="text-xs text-gray-600 font-medium">Selected Location</p>
            <p className="text-sm text-gray-900 font-semibold">
              {position[0].toFixed(6)}, {position[1].toFixed(6)}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            // Get current location
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (pos) => {
                  setPosition([pos.coords.latitude, pos.coords.longitude]);
                },
                (error) => {
                  console.error("Error getting location:", error);
                },
              );
            }
          }}
          className="px-3 py-1.5 bg-white text-cyan-600 text-sm font-medium rounded-lg hover:bg-cyan-50 transition-colors border border-cyan-200 shadow-sm"
        >
          Use My Location
        </button>
      </div>

      {/* Instructions */}
      <div className="bg-yellow-50 rounded-xl p-3 border border-yellow-200">
        <p className="text-xs text-yellow-800">
          <span className="font-semibold">💡 Tip:</span> Click anywhere on the map to select the
          property location, or use "Use My Location" button to auto-detect.
        </p>
      </div>
    </div>
  );
};

export default MapLocationPicker;
