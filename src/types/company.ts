export interface CompanyCardProps {
  name: string;
  rating: number;
  address: string;
  phone: string;
  email: string;
  website: string;
}

export interface CompanyDataProps {
  id: string;
  displayName: string;
  formattedAddress: string;
  googleMapsUri: string;
  internationalPhoneNumber: string;
  websiteUri: string;
  rating: number;
  userRatingCount: number;
  businessStatus: string;
  location: { latitude: number; longitude: number };
  viewport: any;
  plusCode: string;
  types: string[];
  addressComponents: any[];
  regularOpeningHours: any;
  currentOpeningHours: any;
  secondaryOpeningHours: any;
  specialDays: any[];
  utcOffsetMinutes: number;
  photos: string[];
  reviews: any[];
  priceLevel?: number;
  accessibilityOptions?: any;
  editorialSummary?: { text: string };
  takeout?: boolean;
  delivery?: boolean;
  dineIn?: boolean;
  servesBeer?: boolean;
  servesBreakfast?: boolean;
  servesBrunch?: boolean;
  servesDinner?: boolean;
  servesLunch?: boolean;
  servesVegetarianFood?: boolean;
  servesWine?: boolean;
  reservable?: boolean;
  goodForChildren?: boolean;
  paymentOptions?: any;
  parkingOptions?: any;
  businessName?: string;
  businessContact?: any;
}
