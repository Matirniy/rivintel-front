"use client";

import { useCallback, useRef, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useMapSearchStore } from "@/store/map";
import Loader from "./loader";

const containerStyle = { width: "100%", height: "100%" };
const center = { lat: 0, lng: 0 };
const options = { disableDefaultUI: true, zoomControl: true };

export default function GoogleMapWithRadius() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const [selectedPosition, setSelectedPosition] =
    useState<google.maps.LatLngLiteral | null>(null);

  const { lat, lng, radius, setLat, setLng, setRadius } = useMapSearchStore();

  const mapRef = useRef<google.maps.Map | null>(null);
  const circleRef = useRef<google.maps.Circle | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const isDashboard = pathname === "/dashboard";

  const updateQuery = (updates: Record<string, string | null>) => {
    if (!isDashboard) return;

    const params = new URLSearchParams(searchParams.toString());

    for (const key in updates) {
      const value = updates[key];
      if (value === null) params.delete(key);
      else params.set(key, value);
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const drawOrUpdateCircle = (pos: google.maps.LatLngLiteral, r: number) => {
    if (!mapRef.current) return;

    if (!circleRef.current) {
      circleRef.current = new google.maps.Circle({
        map: mapRef.current,
        center: pos,
        radius: r,
        fillColor: "#3b82f6",
        fillOpacity: 0.2,
        strokeColor: "#3b82f6",
        strokeOpacity: 0.7,
        strokeWeight: 2,
      });
    } else {
      circleRef.current.setCenter(pos);
      circleRef.current.setRadius(r);
    }

    const bounds = circleRef.current.getBounds();

    if (bounds) {
      requestAnimationFrame(() => mapRef.current!.fitBounds(bounds));
    }
  };

  const onMapClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (!e.latLng) return;
      const newLat = e.latLng.lat();
      const newLng = e.latLng.lng();

      const pos = { lat: newLat, lng: newLng };
      setSelectedPosition(pos);
      setLat(newLat);
      setLng(newLng);
      updateQuery({ lat: newLat.toString(), lng: newLng.toString() });

      drawOrUpdateCircle(pos, radius);
    },
    [radius, setLat, setLng]
  );

  const onRadiusChange = (newRadius: number) => {
    setRadius(newRadius);
    updateQuery({ radius: newRadius.toString() });

    if (selectedPosition) {
      drawOrUpdateCircle(selectedPosition, newRadius);
    } else if (lat != null && lng != null) {
      const pos = { lat, lng };
      setSelectedPosition(pos);
      drawOrUpdateCircle(pos, newRadius);
    }
  };

  const onMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;

    const qsLat = parseFloat(searchParams.get("lat") || "");
    const qsLng = parseFloat(searchParams.get("lng") || "");
    const qsRadius = parseFloat(searchParams.get("radius") || "");

    const initialLat = lat ?? (Number.isFinite(qsLat) ? qsLat : null);
    const initialLng = lng ?? (Number.isFinite(qsLng) ? qsLng : null);
    const initialRadius =
      radius ?? (Number.isFinite(qsRadius) ? qsRadius : null) ?? 1000;

    if (initialLat != null && lat == null) setLat(initialLat);
    if (initialLng != null && lng == null) setLng(initialLng);
    if (Number.isFinite(qsRadius) && radius == null) setRadius(initialRadius);

    if (initialLat != null && initialLng != null) {
      const pos = { lat: initialLat, lng: initialLng };
      setSelectedPosition(pos);
      drawOrUpdateCircle(pos, initialRadius);

      updateQuery({
        lat: initialLat.toString(),
        lng: initialLng.toString(),
        radius: initialRadius.toString(),
      });
    }
  };

  if (!isLoaded) return <Loader />;

  return (
    <div className="w-full h-[calc(100%-90px)]">
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">
          Radius: {radius} meters
        </label>
        <input
          type="range"
          min={100}
          max={6000}
          step={100}
          value={radius ?? 300}
          onChange={(e) => onRadiusChange(Number(e.target.value))}
          className="w-full accent-primary"
        />
      </div>

      <div style={{ height: "calc(100% - 64px)" }}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={selectedPosition ?? center}
          zoom={selectedPosition ? 12 : 2}
          options={options}
          onClick={onMapClick}
          onLoad={onMapLoad}
        >
          {selectedPosition && <Marker position={selectedPosition} />}
        </GoogleMap>
      </div>
    </div>
  );
}
