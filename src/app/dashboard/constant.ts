import { PlacesFields } from "@/types/google";

const DEFAULT_FIELDS: PlacesFields[] = [
  PlacesFields.ID,
  PlacesFields.DISPLAY_NAME,
  PlacesFields.RATING,
  PlacesFields.FORMATTED_ADDRESS,
  PlacesFields.INTERNATIONAL_PHONE_NUMBER,
  PlacesFields.WEBSITE_URI,
];

export default DEFAULT_FIELDS;
