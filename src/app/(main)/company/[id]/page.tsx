"use server";

import { FaStar } from "react-icons/fa6";

import { fetchCompanyById } from "./actions";
import PlaceClient from "./placeClient";
import Loader from "@/components/shared/loader";
import { getDetails } from "./utils";
import BackButton from "@/components/shared/backButton";

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
    <div className="flex flex-col h-full min-h-[calc(100vh-112px)] m-3 sm:m-4 md:h-[calc(100%-32px)] md:min-h-0">
      <div className="flex flex-col gap-2 border-b border-base-300 pb-3 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <BackButton />
          <h1 className="text-xl font-bold break-words sm:text-2xl">
            {place.displayName.text}
          </h1>
        </div>
        <div className="flex shrink-0 items-center gap-1 text-warning text-lg">
          <FaStar /> {place.rating} ({place.userRatingCount})
        </div>
      </div>

      <PlaceClient place={place} details={getDetails(place)} />
    </div>
  );
}
