"use client";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

import Loader from "./loader";

interface MapWrapperProps {
  location: {
    latitude: number;
    longitude: number;
  };
}

export default function MapWrapper({ location }: MapWrapperProps) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  if (!isLoaded) return <Loader />;

  return (
    <div className="w-full md:h-[40%] h-[200px] mt-4 md:mt-0 md:h-[300px]">
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "100%",
        }}
        center={{
          lat: location.latitude,
          lng: location.longitude,
        }}
        zoom={15}
      >
        <Marker
          position={{
            lat: location.latitude,
            lng: location.longitude,
          }}
        />
      </GoogleMap>
    </div>
  );
}
