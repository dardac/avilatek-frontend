"use client";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "@/components";
import { useReservation } from "@/context/ReservationsContext";
import { TripDetails } from "@/types";
import { Combobox } from "@headlessui/react";
import axios from "axios";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface FlightData {
  destination: string;
  prices: {
    economy: number;
    premiumEconomy: number;
    business: number;
    firstClass: number;
  };
}

const TripForm = () => {
  const { reservationData, updateTripDetails } = useReservation();
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<TripDetails>({
    defaultValues: reservationData.tripDetails,
    mode: "onChange",
  });

  const [destinations, setDestinations] = useState<FlightData[]>([]);
  const [filteredDestinations, setFilteredDestinations] = useState<
    FlightData[]
  >([]);
  const [query, setQuery] = useState("");

  const departureDate = watch("departureDate");
  const today = new Date().toISOString().split("T")[0];

  // Get destinations from JSON
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/Lstanislao/cities-permalink/main/flights.json"
        );
        const uniqueDestinations = Array.from(
          new Map(
            response.data.map((item: FlightData) => [item.destination, item])
          ).values()
        );
        setDestinations(uniqueDestinations as FlightData[]);
        setFilteredDestinations(uniqueDestinations as FlightData[]);
      } catch (error) {
        console.error("Error al obtener datos de vuelos:", error);
      }
    };
    fetchDestinations();
  }, []);

  // Filter based on query
  useEffect(() => {
    setFilteredDestinations(
      destinations.filter(dest =>
        dest.destination.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, destinations]);

  const onSubmit = (data: TripDetails) => {
    updateTripDetails(data);
    router.push("/step-2");
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-3xl font-bold text-slate-900">
          Información del Viaje
        </h2>
        <p className="text-slate-600">
          Por favor, proporciona los detalles del viaje
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <Card className="border-2 border-slate-100 transition-colors hover:border-blue-200">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-teal-50">
            <CardTitle>Detalles del Viaje</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <Label htmlFor="destination">Destino *</Label>
                <Controller
                  name="destination"
                  control={control}
                  rules={{ required: "El destino es obligatorio" }}
                  render={({ field }) => (
                    <Combobox
                      value={field.value || ""}
                      onChange={value => {
                        field.onChange(value);
                        setQuery(value ?? "");
                        setValue("destination", value ?? "");
                      }}
                    >
                      <div className="relative mt-1">
                        <Combobox.Input
                          id="destination"
                          className="w-full rounded-md border border-gray-300 bg-white py-2 pr-10 pl-3 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none sm:text-sm"
                          onChange={e => setQuery(e.target.value)}
                          displayValue={(value: string) => value}
                          placeholder="Busca un destino"
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        </Combobox.Button>
                        <Combobox.Options className="ring-opacity-5 absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black focus:outline-none sm:text-sm">
                          {filteredDestinations.map(dest => (
                            <Combobox.Option
                              key={dest.destination}
                              value={dest.destination}
                              className={({ active }) =>
                                `relative cursor-default py-2 pr-9 pl-3 select-none ${
                                  active
                                    ? "bg-blue-600 text-white"
                                    : "text-gray-900"
                                }`
                              }
                            >
                              {dest.destination}
                            </Combobox.Option>
                          ))}
                        </Combobox.Options>
                      </div>
                    </Combobox>
                  )}
                />
                {errors.destination && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.destination.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="departureDate">Fecha de Salida *</Label>
                <Input
                  id="departureDate"
                  type="date"
                  {...register("departureDate", {
                    required: "La fecha de salida es obligatoria",
                    validate: value =>
                      value >= today ||
                      "La fecha de salida debe ser hoy o posterior",
                  })}
                  className="mt-1"
                  min={today}
                />
                {errors.departureDate && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.departureDate.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="returnDate">Fecha de Regreso *</Label>
                <Input
                  id="returnDate"
                  type="date"
                  {...register("returnDate", {
                    validate: value =>
                      (!value && !departureDate) ||
                      value > departureDate ||
                      "La fecha de regreso debe ser posterior a la de salida",
                  })}
                  className="mt-1"
                  min={
                    departureDate
                      ? new Date(
                          new Date(departureDate).getTime() +
                            24 * 60 * 60 * 1000
                        )
                          .toISOString()
                          .split("T")[0]
                      : undefined
                  }
                />
                {errors.returnDate && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.returnDate.message}
                  </p>
                )}
              </div>

              <div>
                <Label>Clase de Vuelo *</Label>
                <div className="mt-2 flex flex-wrap gap-4">
                  {[
                    "Económica",
                    "Negocios",
                    "Primera Clase",
                  ].map((flightClass, idx) => (
                    <label
                      key={flightClass}
                      className="inline-flex items-center"
                    >
                      <input
                        type="radio"
                        {...register("flightClass", {
                          required: "La clase de vuelo es obligatoria",
                        })}
                        value={
                          [
                            "Económica",
                            "Negocios",
                            "Primera Clase",
                          ][idx]
                        }
                        className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {flightClass}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.flightClass && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.flightClass.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={!isValid}
            className="bg-gradient-to-r from-blue-500 to-teal-600 px-8 hover:from-blue-600 hover:to-teal-700"
          >
            Continuar a Información de Viajeros
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TripForm;
