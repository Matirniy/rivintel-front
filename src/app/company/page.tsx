"use client";

import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

import { CompanyDataProps } from "@/types/company";
import { mockData } from "./constant";
import { getDetails } from "./utils";

export default function CompanyPage() {
  const [place, setPlace] = useState<CompanyDataProps | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  useEffect(() => {
    setPlace(mockData);
  }, []);

  if (!place) return <div className="p-4">Loading...</div>;

  const details = getDetails(place);

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <div
        className="
          bg-white rounded-xl shadow-lg p-6 
          grid grid-cols-1 md:grid-cols-2 gap-6 
          md:max-h-[90vh] overflow-hidden mb-10
        "
      >
        <div
          className="md:h-[88%] space-y-4 pr-2 "
        >
          <h1 className="flex justify-between items-center text-2xl font-bold mb-2 md:mb-4">
            {place.displayName}
            <div className="bg-yellow-400 rounded px-3 py-1 flex items-center gap-1 text-black font-semibold text-sm">
              <FaStar />
              <span>
                {place.rating} ({place.userRatingCount})
              </span>
            </div>
          </h1>

          <img
            src={place.photos[0]}
            alt="Main"
            className="w-full md:h-[47%] h-[250px] rounded-lg shadow-md object-cover"
          />

          {isLoaded && (
            <div className="w-full md:h-[40%] h-[200px] mt-4 md:mt-0 md:h-[300px]">
              <GoogleMap
                mapContainerStyle={{
                  width: "100%",
                  height: "100%",
                }}
                center={{
                  lat: place.location.latitude,
                  lng: place.location.longitude,
                }}
                zoom={15}
              >
                <Marker
                  position={{
                    lat: place.location.latitude,
                    lng: place.location.longitude,
                  }}
                />
              </GoogleMap>
            </div>
          )}
        </div>

        <div
          className="
            space-y-3 overflow-y-auto pr-2 
            md:max-h-[calc(90vh-130px)] 
            mt-6 md:mt-0
          "
        >
          <ul className="space-y-2 text-sm">
            {details.map((item, index) => (
              <li key={index}>
                <strong className="capitalize">
                  {item.label.replace(/([A-Z])/g, " $1")}:
                </strong>{" "}
                {item.value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
