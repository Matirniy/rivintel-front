"use client";

import Image from "next/image";
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
  const photos = place.photos?.slice(0, 3) || [];

  return (
    <div className="flex flex-1 overflow-visible md:overflow-hidden flex-col md:flex-row">
      <div className="flex flex-col md:flex-[0.6] md:mr-4 h-[600px] md:h-auto">
        <div className="flex flex-col h-[65%] mb-2">
          {photos[0] && (
            <div className="relative w-full rounded-lg overflow-hidden h-[70%] mb-2">
              <Image
                src={getPhotoUrl(photos[0].name) || ""}
                alt="Main photo"
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="flex h-[30%] gap-2">
            {photos.slice(1, 3).map((photo, idx) => (
              <div
                key={idx}
                className="relative flex-1 rounded-lg overflow-hidden"
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
          <div className="rounded-lg overflow-hidden mt-4 md:mt-0 h-[45%] md:h-[50%]">
            <MapWrapper location={place.location} />
          </div>
        )}
      </div>

      <div className="flex-1 border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0 md:pl-4 overflow-y-visible md:overflow-y-auto">
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
