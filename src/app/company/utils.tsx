const fieldLabels: Record<string, string> = {
  id: "ID",
  displayName: "Name",
  formattedAddress: "Address",
  googleMapsUri: "Google Maps",
  internationalPhoneNumber: "Phone Number",
  websiteUri: "Website",
  rating: "Rating",
  userRatingCount: "User Ratings Count",
  businessStatus: "Business Status",
  location: "Location",
  viewport: "Viewport",
  plusCode: "Plus Code",
  types: "Types",
  addressComponents: "Address Components",
  regularOpeningHours: "Opening Hours (Regular)",
  currentOpeningHours: "Opening Hours (Current)",
  secondaryOpeningHours: "Opening Hours (Secondary)",
  specialDays: "Special Days",
  utcOffsetMinutes: "UTC Offset",
  photos: "Photos",
  reviews: "Reviews",
  priceLevel: "Price Level",
  accessibilityOptions: "Accessibility",
  editorialSummary: "Summary",
  takeout: "Takeout Available",
  delivery: "Delivery Available",
  dineIn: "Dine-in Available",
  servesBeer: "Serves Beer",
  servesBreakfast: "Serves Breakfast",
  servesBrunch: "Serves Brunch",
  servesDinner: "Serves Dinner",
  servesLunch: "Serves Lunch",
  servesVegetarianFood: "Vegetarian Options",
  servesWine: "Serves Wine",
  reservable: "Reservable",
  goodForChildren: "Good for Children",
  paymentOptions: "Payment Options",
  parkingOptions: "Parking Options",
  businessName: "Business Legal Name",
  businessContact: "Business Contact",
};

export const getDetails = (place: Record<string, any>) => {
  const entries = Object.entries(place);

  return entries
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(([key, value]) => {
      let renderedValue: React.ReactNode = value;

      if (typeof value === "boolean") {
        renderedValue = value ? "Yes" : "No";
      } else if (typeof value === "object") {
        if (Array.isArray(value)) {
          renderedValue = value.length > 0 ? value.join(", ") : null;
        } else {
          renderedValue = JSON.stringify(value);
        }
      }

      if (
        typeof value === "string" &&
        (key === "websiteUri" || key === "googleMapsUri")
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
      }

      return {
        label: fieldLabels[key] || key,
        value: renderedValue,
      };
    });
};
