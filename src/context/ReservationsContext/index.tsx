"use client";

import { createContext, FC, useContext, useState } from "react";
import {
  ReservationData,
  Traveler,
  TripDetails,
  AdditionalServices,
} from "@/types";

interface ReservationContextType {
  reservationData: ReservationData;
  updateTripDetails: (tripDetails: TripDetails) => void;
  updateTravelers: (travelers: Traveler[]) => void;
  updateAdditionalServices: (additionalServices: AdditionalServices) => void;
  resetReservation: () => void;
}

const ReservationContext = createContext<ReservationContextType | undefined>(
  undefined
);

export const ReservationProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [reservationData, setReservationData] = useState<ReservationData>({
    travelers: [],
    tripDetails: {
      destination: "",
      departureDate: "",
      returnDate: "",
      flightClass: "economy",
    },
    additionalServices: {
      travelInsurance: false,
      preferredSeats: false,
      specialAssistance: false,
      specialAssistanceNote: "",
    },
  });

  const updateTripDetails = (tripDetails: TripDetails) => {
    setReservationData(prev => ({ ...prev, tripDetails }));
  };

  const updateTravelers = (travelers: Traveler[]) => {
    setReservationData(prev => ({ ...prev, travelers }));
  };

  const updateAdditionalServices = (additionalServices: AdditionalServices) => {
    setReservationData(prev => ({ ...prev, additionalServices }));
  };

  const resetReservation = () => {
    setReservationData({
      travelers: [],
      tripDetails: {
        destination: "",
        departureDate: "",
        returnDate: "",
        flightClass: "economy",
      },
      additionalServices: {
        travelInsurance: false,
        preferredSeats: false,
        specialAssistance: false,
        specialAssistanceNote: "",
      },
    });
  };

  return (
    <ReservationContext.Provider
      value={{
        reservationData,
        updateTripDetails,
        updateTravelers,
        updateAdditionalServices,
        resetReservation,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservation = () => {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error(
      "useReservation debe usarse dentro de un ReservationProvider"
    );
  }
  return context;
};
