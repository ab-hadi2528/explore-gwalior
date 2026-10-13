export interface NearbyFacility {
  name: string;
  address: string;
  type: string;
  status: string;
}

export interface InfoField {
  value: string | null;
  display: string;
  status: string;
}

export interface Attraction {
  id: string;
  name: string;
  image: string;
  category: string;
  subcategory: string;
  shortDescription: string;
  description: string;
  historicalSignificance: string;
  address: string;
  mapsSearchUrl: string;
  directionsUrl: string;
  coordinates: string | null;
  locationStatus: string;
  timings: InfoField;
  closedDays: InfoField;
  ticket: InfoField;
  officialWebsite: string | null;
  bookingUrl: string | null;
  bookingDisplay: string;
  suggestedDuration: string;
  highlights: string[];
  visitorInterests: string[];
  nearbyRestaurants: { name: string | null; url: string };
  nearbyHotels: { name: string | null; url: string };
  nearbyFacilities: NearbyFacility[];
  parkingUrl: string;
  facilitiesStatus: string;
  sourceUrls: string[];
  lastVerified: string;
  verificationStatus: string;
  verificationNotes: string;
  warning: string | null;
}

export interface ItineraryStop {
  attraction: Attraction;
  reason: string;
  durationLabel: string;
  order: number;
  uncertainty: string | null;
  fitsTimeBudget: boolean;
}

export interface ItineraryResult {
  stops: ItineraryStop[];
  totalTimeLabel: string;
  summary: string;
  warnings: string[];
  confirmedCount: number;
  suggestionCount: number;
}

export const ORIGIN_LOCATION = 'Gwalior Railway Station';

export function buildDirectionsUrl(attraction: Attraction): string {
  const dest = encodeURIComponent(attraction.name + ' Gwalior');
  const origin = encodeURIComponent(ORIGIN_LOCATION);
  return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${dest}`;
}
