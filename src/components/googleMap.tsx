"use client";

import {
  GoogleMap,
  useLoadScript,
  Marker,
  Circle,
} from "@react-google-maps/api";
import { useCallback, useMemo, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 52.52,
  lng: 13.405,
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

export default function GoogleMapWithRadius() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const [selectedPosition, setSelectedPosition] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [radius, setRadius] = useState(1000);

  const onMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setSelectedPosition({
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      });
    }
  }, []);

  const mapCenter = useMemo(
    () => selectedPosition ?? center,
    [selectedPosition]
  );

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className="w-full">
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">
          Radius: {radius} meters
        </label>
        <input
          type="range"
          min={100}
          max={10000}
          step={100}
          value={radius}
          onChange={(e) => setRadius(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div style={{ height: "calc(100vh - 64px - 100px - 64px - 120px)" }}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={selectedPosition ? 13 : 11}
          options={options}
          onClick={onMapClick}
        >
          {selectedPosition && (
            <>
              <Marker position={selectedPosition} />
              <Circle
                center={selectedPosition}
                radius={radius}
                options={{
                  fillColor: "#3b82f6",
                  fillOpacity: 0.2,
                  strokeColor: "#3b82f6",
                  strokeOpacity: 0.7,
                  strokeWeight: 2,
                }}
              />
            </>
          )}
        </GoogleMap>
      </div>
    </div>
  );
}
