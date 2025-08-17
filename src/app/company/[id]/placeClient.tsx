"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import MapWrapper from "@/components/shared/mapWrapper";

import { CompanyDataProps } from "@/types/company";
import { getPhotoUrl } from "./utils";

interface Props {
  place: CompanyDataProps;
  details: {
    label: string;
    value: React.ReactNode;
  }[];
}

export default function PlaceClient({ place, details }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.clientHeight);
    }
  }, []);

  const photos = place.photos?.slice(0, 3) || [];

  return (
    <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
      <div
        className="flex flex-col md:flex-[0.6] md:mr-4"
        ref={containerRef}
        style={{ minHeight: 400 }}
      >
        <div
          style={{ height: containerHeight * 0.65, marginBottom: 8 }}
          className="flex flex-col"
        >
          {photos[0] && (
            <div
              className="relative w-full rounded-lg overflow-hidden"
              style={{
                height: containerHeight * 0.65 * 0.7,
                marginBottom: 8,
              }}
            >
              <Image
                src={getPhotoUrl(photos[0].name) || ""}
                alt="Main photo"
                fill
                className="object-cover"
              />
            </div>
          )}

          <div
            className="flex"
            style={{ height: containerHeight * 0.65 * 0.3 }}
          >
            {photos.slice(1, 3).map((photo, idx) => (
              <div
                key={idx}
                className="relative flex-1 rounded-lg overflow-hidden"
                style={{
                  height: "100%",
                  marginRight: idx !== photos.slice(1, 3).length - 1 ? 8 : 0,
                }}
              >
                <Image
                  src={getPhotoUrl(photo.name) || ""}
                  alt={`Small photo ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {place.location?.latitude && (
          <div
            style={{ height: containerHeight * 0.35 }}
            className="rounded-lg overflow-hidden mt-4 md:mt-0"
          >
            <MapWrapper location={place.location} />
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0 md:pl-4">
        <ul>
          {details.map((item, idx) => (
            <li key={idx} className="mb-2">
              <strong>{item.label}:</strong> {item.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
