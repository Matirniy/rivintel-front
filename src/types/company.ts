export interface AuthorAttribution {
  displayName?: string;
  uri?: string;
  photoUri?: string;
}

export interface Photo {
  name: string;
  widthPx: number;
  heightPx: number;
  authorAttributions?: AuthorAttribution[];
  flagContentUri?: string;
  googleMapsUri?: string;
}

export interface AddressComponent {
  longText: string;
  shortText: string;
  types: string[];
  languageCode: string;
}

export interface PlusCode {
  globalCode: string;
  compoundCode: string;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface ViewportBound {
  latitude: number;
  longitude: number;
}

export interface Viewport {
  low: ViewportBound;
  high: ViewportBound;
}

export interface OpeningHours {
  openNow: boolean;
  periods: any[];
  weekdayDescriptions: string[];
}

export interface DisplayName {
  text: string;
  languageCode: string;
}

export interface ContainingPlace {
  name: string;
  id: string;
}

export interface LandmarkOrArea {
  [key: string]: any;
}

export interface AddressDescriptor {
  landmarks: LandmarkOrArea[];
  areas: LandmarkOrArea[];
}

export interface GoogleMapsLinks {
  directionsUri: string;
  placeUri: string;
  writeAReviewUri: string;
  reviewsUri: string;
  photosUri: string;
}

export interface PostalAddress {
  regionCode: string;
  languageCode: string;
  postalCode: string;
  locality: string;
  addressLines: string[];
}

export interface AccessibilityOptions {
  wheelchairAccessibleEntrance?: boolean;
  [key: string]: any;
}

export interface CompanyDataProps {
  name: string;
  id: string;
  types: string[];
  nationalPhoneNumber?: string;
  internationalPhoneNumber?: string;
  formattedAddress?: string;
  addressComponents?: AddressComponent[];
  plusCode?: PlusCode;
  location?: Location;
  viewport?: Viewport;
  rating?: number;
  googleMapsUri?: string;
  regularOpeningHours?: OpeningHours;
  currentOpeningHours?: OpeningHours;
  utcOffsetMinutes?: number;
  adrFormatAddress?: string;
  businessStatus?: string;
  userRatingCount?: number;
  iconMaskBaseUri?: string;
  iconBackgroundColor?: string;
  displayName: DisplayName;
  primaryTypeDisplayName?: DisplayName;
  primaryType?: string;
  shortFormattedAddress?: string;
  photos?: Photo[];
  accessibilityOptions?: AccessibilityOptions;
  containingPlaces?: ContainingPlace[];
  pureServiceAreaBusiness?: boolean;
  addressDescriptor?: AddressDescriptor;
  googleMapsLinks?: GoogleMapsLinks;
  postalAddress?: PostalAddress;
  websiteUri?: string;
}
