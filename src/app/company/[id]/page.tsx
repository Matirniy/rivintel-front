"use server";

import { FaStar } from "react-icons/fa6";

import { fetchCompanyById } from "./actions";
import PlaceClient from "./placeClient";
import Loader from "@/components/shared/loader";
import { getDetails } from "./utils";

export default async function PlacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const place = await fetchCompanyById(id);

  if (!place) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col h-[calc(100%-32px)] m-4">
      <div className="flex items-center justify-between border-b pb-2 mb-4">
        <h1 className="text-2xl font-bold">{place.displayName.text}</h1>
        <div className="flex items-center text-lg">
          <FaStar /> {place.rating} ({place.userRatingCount})
        </div>
      </div>

      <PlaceClient place={place} details={getDetails(place)} />
    </div>
  );
}
