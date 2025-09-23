import React from "react";

import { PlaceFields } from "@/types/google.types";

const fieldLabels: Record<string, string> = {
  [PlaceFields.Id]: "ID",
  [PlaceFields.Name]: "Name",
  [PlaceFields.FormattedAddress]: "Address",
  [PlaceFields.PlusCode]: "Open Location Code (Google)",
  [PlaceFields.Location]: "Location",
  [PlaceFields.Rating]: "Rating",
  [PlaceFields.RegularOpeningHours]: "Opening Hours",
  [PlaceFields.CurrentSecondaryOpeningHours]:
    "Opening Hours (Current Secondary)",
  [PlaceFields.RegularSecondaryOpeningHours]:
    "Opening Hours (Regular Secondary)",
  [PlaceFields.BusinessStatus]: "Business Status",
  [PlaceFields.PriceLevel]: "Price Level",
  [PlaceFields.UserRatingCount]: "Number of reviews",
  [PlaceFields.Types]: "Types",
  [PlaceFields.WebsiteUri]: "Website URL",
  [PlaceFields.GoogleMapsUri]: "Google Maps URL",
  [PlaceFields.GoogleMapsLinks]: "Google Maps Links",
  [PlaceFields.PriceRange]: "Price Range",
  [PlaceFields.PostalAddress]: "Postal Code",
  [PlaceFields.PrimaryType]: "Primary Type",
  [PlaceFields.AccessibilityOptions]: "Accessibility",
  [PlaceFields.NationalPhoneNumber]: "Phone",
  [PlaceFields.InternationalPhoneNumber]: "Phone",
  [PlaceFields.PureServiceAreaBusiness]: "Pure Service Area Business",
  [PlaceFields.UtcOffsetMinutes]: "Local time",
  [PlaceFields.DisplayName]: "Full Name",
};

const hiddenFields: PlaceFields[] = [
  PlaceFields.Id,
  PlaceFields.Photos,
  PlaceFields.AddressComponents,
  PlaceFields.Viewport,
  PlaceFields.AdrFormatAddress,
  PlaceFields.IconMaskBaseUri,
  PlaceFields.IconBackgroundColor,
  PlaceFields.CurrentOpeningHours,
  PlaceFields.AddressDescriptor,
  PlaceFields.Name,
  PlaceFields.ShortFormattedAddress,
  PlaceFields.PrimaryTypeDisplayName,
  PlaceFields.ContainingPlaces,
];

const renderValue = (key: string, value: any): React.ReactNode => {
  // Phones
  if (
    key === PlaceFields.NationalPhoneNumber ||
    key === PlaceFields.InternationalPhoneNumber
  ) {
    return (
      <a
        href={`tel:${value.replace(/\s+/g, "")}`}
        className="text-primary underline"
      >
        {value.replace(/\s+/g, "")}
      </a>
    );
  }

  // Coordinates
  if (key === "location" && value?.latitude && value?.longitude) {
    return `${value.latitude}x${value.longitude}`;
  }

  // Plus Code
  if (key === PlaceFields.PlusCode && value?.globalCode) {
    return value.globalCode;
  }

  // Map URL
  if (key === PlaceFields.GoogleMapsUri) {
    return (
      <a className="text-primary underline" href={value}>
        link
      </a>
    );
  }

  // Opening Hours (Regular)
  if (key === PlaceFields.RegularOpeningHours) {
    const openNow = value?.openNow;

    const weekdays = value?.weekdayDescriptions || {};

    return (
      <div className="flex flex-col gap-2">
        {openNow !== undefined && (
          <div
            className={`font-bold ${
              openNow ? "text-green-600" : "text-red-600"
            }`}
          >
            {openNow ? "Open Now" : "Closed Now"}
          </div>
        )}

        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          {Object.entries(weekdays as Record<string, string>).map(
            ([day, status]) => (
              <div
                key={day}
                className={
                  status.toLowerCase().includes("open")
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {status}
              </div>
            )
          )}
        </div>
      </div>
    );
  }

  // Google Maps Links
  if (key === PlaceFields.GoogleMapsLinks) {
    const labels: Record<string, string> = {
      directionsUri: "Directions",
      placeUri: "Place URL",
      writeAReviewUri: "Write a Review",
      reviewsUri: "Reviews",
      photosUri: "Photos",
    };
    return (
      <ul className="ml-4 list-disc">
        {Object.entries(value).map(([k, v]) => (
          <li key={k}>
            <a
              href={v as string}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              {labels[k] || k}
            </a>
          </li>
        ))}
      </ul>
    );
  }

  // Local time
  if (key === PlaceFields.UtcOffsetMinutes) {
    const offsetHours = Math.floor(value / 60);
    const offsetMinutes = value % 60;
    const sign = offsetHours >= 0 ? "+" : "-";

    return (
      <span>
        UTC{sign}
        {String(Math.abs(offsetHours)).padStart(2, "0")}:
        {String(offsetMinutes).padStart(2, "0")}
      </span>
    );
  }

  // Price Range
  if (key === PlaceFields.PriceRange && value?.startPrice && value?.endPrice) {
    const start = value.startPrice.units;
    const end = value.endPrice.units;
    const currency = value.endPrice.currencyCode;
    return `${start}-${end} ${currency}`;
  }

  // Accessibility options
  if (key === PlaceFields.AccessibilityOptions) {
    const labels: Record<string, string> = {
      wheelchairAccessibleParking: "Wheelchair Accessible Parking",
      wheelchairAccessibleEntrance: "Wheelchair Accessible Entrance",
      wheelchairAccessibleRestroom: "Wheelchair Accessible Restroom",
      wheelchairAccessibleSeating: "Wheelchair Accessible Seating",
      pureServiceAreaBusiness: "Pure Service Area Business",
    };
    return (
      <ul className="ml-4 list-disc">
        {Object.entries(value).map(([k, v]) => (
          <li key={k}>
            {labels[k] || k}:{" "}
            {v ? (
              <span className="text-green-600">Yes</span>
            ) : (
              <span className="text-red-600">No</span>
            )}
          </li>
        ))}
      </ul>
    );
  }

  // Types
  if (key === PlaceFields.Types) {
    return value.map((type: string) => type.replace(/_/g, " ")).join(", ");
  }

  // DisplayName / primaryTypeDisplayName
  if (key === PlaceFields.DisplayName && value?.text && value?.languageCode) {
    return (
      <>
        <span>{value.text}</span>
        <div>
          <b>Language Name Code:</b> {value.languageCode}
        </div>
      </>
    );
  }

  if (key === "primaryTypeDisplayName" && value?.text) {
    return (
      <div>
        <b>Company Type:</b> {value.text}
      </div>
    );
  }

  // Rating / PriceLevel / userRatingCount
  if (["rating", "priceLevel", "userRatingCount"].includes(key)) {
    return <span>{String(value)}</span>;
  }

  // Postal Code
  if (key === "postalAddress" && value?.postalCode) {
    return value.postalCode;
  }

  // Fallback
  if (typeof value === "boolean")
    return value ? (
      <span className="text-green-600">Yes</span>
    ) : (
      <span className="text-red-600">No</span>
    );
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object" && value !== null)
    return <pre className="ml-4">{JSON.stringify(value, null, 2)}</pre>;

  return String(value);
};

export const getDetails = (place: Record<string, any>) => {
  return Object.entries(place)
    .filter(
      ([key, value]) =>
        value !== undefined &&
        value !== null &&
        !hiddenFields.includes(key as PlaceFields)
    )
    .map(([key, value]) => ({
      label: fieldLabels[key] || key,
      value: renderValue(key, value),
    }));
};

export const getPhotoUrl = (
  photoName: string,
  maxWidth = 400
): string | null => {
  const parts = photoName.split("/photos/");
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  if (parts.length !== 2) return null;

  const photoReference = parts[1];

  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photoreference=${photoReference}&key=${apiKey}`;
};
