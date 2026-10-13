export interface NearbyFacility {
  name: string;
  address: string;
  type: string;
  status: string;
}

export interface Attraction {
  id: string;
  name: string;
  image: string;
  category: string;
  subcategory: string;
  shortDescription: string;
  address: string;
  locationStatus: string;
  timings: { value: string | null; display: string; status: string };
  ticket: { value: string | null; display: string; status: string };
  bookingUrl: string | null;
  bookingDisplay: string;
  directionsUrl: string;
  nearbyFacilities: NearbyFacility[];
  facilitiesStatus: string;
  sources: string[];
  lastChecked: string;
  verificationStatus: string;
}
