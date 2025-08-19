"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

import { useMapSearchStore } from "@/store/map";
import Loader from "./loader";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = { lat: 0, lng: 0 };

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

  const setLat = useMapSearchStore((state) => state.setLat);
  const setLng = useMapSearchStore((state) => state.setLng);
  const radius = useMapSearchStore((state) => state.radius);
  const setRadius = useMapSearchStore((state) => state.setRadius);

  const mapRef = useRef<google.maps.Map | null>(null);
  const circleRef = useRef<google.maps.Circle | null>(null);

  const onMapClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (e.latLng) {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();

        setSelectedPosition({ lat, lng });
        setLat(lat);
        setLng(lng);
      }
    },
    [setLat, setLng]
  );

  useEffect(() => {
    if (!mapRef.current) return;

    if (selectedPosition) {
      if (!circleRef.current) {
        circleRef.current = new google.maps.Circle({
          map: mapRef.current,
          center: selectedPosition,
          radius: radius,
          fillColor: "#3b82f6",
          fillOpacity: 0.2,
          strokeColor: "#3b82f6",
          strokeOpacity: 0.7,
          strokeWeight: 2,
        });
      } else {
        circleRef.current.setCenter(selectedPosition);
        circleRef.current.setRadius(radius);
      }
    } else {
      if (circleRef.current) {
        circleRef.current.setMap(null);
        circleRef.current = null;
      }
    }
  }, [selectedPosition, radius]);

  if (!isLoaded) return <Loader />;

  return (
    <div className="w-full h-[calc(100%-45px)]">
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">
          Radius: {radius} meters
        </label>
        <input
          type="range"
          min={1000}
          max={6000}
          step={100}
          value={radius}
          onChange={(e) => setRadius(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div style={{ height: "calc(100% - 64px)" }}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={selectedPosition ?? center}
          zoom={selectedPosition ? 12 : 2}
          options={options}
          onClick={onMapClick}
          onLoad={(map) => {
            mapRef.current = map;
          }}
        >
          {selectedPosition && <Marker position={selectedPosition} />}
        </GoogleMap>
      </div>
    </div>
  );
}
