import React from "react";

import { PlaceFields } from "@/types/google";

const fieldLabels: Record<PlaceFields, string> = {
  [PlaceFields.Attributions]: "Attributions",
  [PlaceFields.Id]: "ID",
  [PlaceFields.Name]: "Name",
  [PlaceFields.Photos]: "Photos",
  [PlaceFields.AddressComponents]: "Address Components",
  [PlaceFields.AddressDescriptor]: "Address Descriptor",
  [PlaceFields.AdrFormatAddress]: "ADR Format Address",
  [PlaceFields.FormattedAddress]: "Address",
  [PlaceFields.Location]: "Location",
  [PlaceFields.PlusCode]: "Plus Code",
  [PlaceFields.PostalAddress]: "Postal Address",
  [PlaceFields.ShortFormattedAddress]: "Short Address",
  [PlaceFields.Types]: "Types",
  [PlaceFields.Viewport]: "Viewport",
  [PlaceFields.AccessibilityOptions]: "Accessibility",
  [PlaceFields.BusinessStatus]: "Business Status",
  [PlaceFields.ContainingPlaces]: "Containing Places",
  [PlaceFields.DisplayName]: "Display Name",
  [PlaceFields.GoogleMapsLinks]: "Google Maps Links",
  [PlaceFields.GoogleMapsUri]: "Google Maps URL",
  [PlaceFields.IconBackgroundColor]: "Icon Background Color",
  [PlaceFields.IconMaskBaseUri]: "Icon Mask Base URI",
  [PlaceFields.PrimaryType]: "Primary Type",
  [PlaceFields.PrimaryTypeDisplayName]: "Primary Type Display Name",
  [PlaceFields.PureServiceAreaBusiness]: "Pure Service Area Business",
  [PlaceFields.SubDestinations]: "Sub Destinations",
  [PlaceFields.UtcOffsetMinutes]: "UTC Offset",
  [PlaceFields.CurrentOpeningHours]: "Opening Hours (Current)",
  [PlaceFields.CurrentSecondaryOpeningHours]:
    "Opening Hours (Current Secondary)",
  [PlaceFields.InternationalPhoneNumber]: "International Phone Number",
  [PlaceFields.NationalPhoneNumber]: "National Phone Number",
  [PlaceFields.PriceLevel]: "Price Level",
  [PlaceFields.PriceRange]: "Price Range",
  [PlaceFields.Rating]: "Rating",
  [PlaceFields.RegularOpeningHours]: "Opening Hours (Regular)",
  [PlaceFields.RegularSecondaryOpeningHours]:
    "Opening Hours (Regular Secondary)",
  [PlaceFields.UserRatingCount]: "User Ratings Count",
  [PlaceFields.WebsiteUri]: "Website URL",
};

const hiddenFields: PlaceFields[] = [PlaceFields.Id, PlaceFields.Photos];

const renderValue = (value: any): React.ReactNode => {
  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return null;
    return (
      <ul className="list-disc ml-6">
        {value.map((v, i) => (
          <li key={i}>{renderValue(v)}</li>
        ))}
      </ul>
    );
  }

  if (typeof value === "object" && value !== null) {
    return (
      <ul className="list-none ml-4 border-l pl-2">
        {Object.entries(value).map(([k, v]) => (
          <li key={k}>
            <strong>{k}:</strong> {renderValue(v)}
          </li>
        ))}
      </ul>
    );
  }

  return String(value);
};

export const getDetails = (place: Record<string, any>) => {
  return Object.entries(place)
    .filter(
      ([key, value]) =>
        value !== undefined &&
        value !== null &&
        Object.values(PlaceFields).includes(key as PlaceFields) &&
        !hiddenFields.includes(key as PlaceFields)
    )
    .map(([key, value]) => {
      let renderedValue: React.ReactNode;

      if (
        typeof value === "string" &&
        (key === PlaceFields.WebsiteUri || key === PlaceFields.GoogleMapsUri)
      ) {
        renderedValue = (
          <a
            href={value}
            className="text-primary underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {value}
          </a>
        );
      } else {
        renderedValue = renderValue(value);
      }

      return {
        label: fieldLabels[key as PlaceFields] || key,
        value: renderedValue,
      };
    });
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
