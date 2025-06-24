export interface Traveler {
  id: string;
  fullName: string;
  dateOfBirth: string;
  documentType: string;
  documentNumber: string;
  hasPets?: boolean;
  petCount?: number;
  hasExtraLuggage?: boolean;
  extraLuggageCount?: number;
}

export interface TripDetails {
  destination: string;
  departureDate: string;
  returnDate: string;
  flightClass: string;
}

export interface AdditionalServices {
  travelInsurance: boolean;
  preferredSeats: boolean;
  specialAssistance: boolean;
  specialAssistanceNote: string;
}

export interface ReservationData {
  travelers: Traveler[];
  tripDetails: TripDetails;
  additionalServices: AdditionalServices;
}