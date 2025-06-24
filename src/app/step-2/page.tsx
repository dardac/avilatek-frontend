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
import { Traveler } from "@/types";
import { Switch } from "@headlessui/react";
import { Plus, Trash2, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface TravelerFormValues {
  travelers: Traveler[];
}

const TravelerForm = () => {
  const { reservationData, updateTravelers } = useReservation();

  const [localTravelers, setLocalTravelers] = useState<Traveler[]>(
    reservationData.travelers.length > 0
      ? reservationData.travelers
      : [createEmptyTraveler()]
  );

  const router = useRouter();
  function createEmptyTraveler(): Traveler {
    return {
      id: Math.random().toString(36).substr(2, 9),
      fullName: "",
      dateOfBirth: "",
      documentType: "passport",
      documentNumber: "",
      hasPets: false,
      petCount: 0,
      hasExtraLuggage: false,
      extraLuggageCount: 0,
    };
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm<{
    travelers: Traveler[];
  }>({
    defaultValues: {
      travelers:
        reservationData.travelers.length > 0
          ? reservationData.travelers
          : [createEmptyTraveler()],
    },
    mode: "onChange",
  });

  const travelersData = watch("travelers");

  const updateTraveler = (
    index: number,
    field: keyof Traveler,
    value: string | boolean | number
  ) => {
    const updated = travelersData.map((traveler, i) =>
      i === index ? { ...traveler, [field]: value } : traveler
    );
    setLocalTravelers(updated);
    setValue("travelers", updated, { shouldValidate: true });
  };

  const addTraveler = () => {
    if (isValid && localTravelers.length < 10) {
      const newTraveler = createEmptyTraveler();
      const updated = [...localTravelers, newTraveler];
      setLocalTravelers(updated);
      setValue("travelers", updated, { shouldValidate: true });
    }
  };

  const removeTraveler = (index: number) => {
    if (localTravelers.length > 1) {
      const updated = localTravelers.filter((_, i) => i !== index);
      setLocalTravelers(updated);
      setValue("travelers", updated, { shouldValidate: true });
    }
  };

  const onSubmit = (data: TravelerFormValues) => {
    updateTravelers(data.travelers);
    router.push("/step-3");
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-3xl font-bold text-slate-900">
          Información de Viajeros
        </h2>
        <p className="text-slate-600">
          Por favor, proporciona los detalles de todos los viajeros
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {travelersData.map((traveler, index) => (
          <Card
            key={traveler.id}
            className="border-2 border-slate-100 transition-colors hover:border-blue-200"
          >
            <CardHeader className="bg-gradient-to-r from-blue-50 to-teal-50">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-blue-600" />
                  <span>Viajero {index + 1}</span>
                </div>
                {travelersData.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeTraveler(index)}
                    className="text-red-500 hover:bg-red-50 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <Label htmlFor={`fullName-${index}`}>
                      Nombre Completo *
                    </Label>
                    <Input
                      id={`fullName-${index}`}
                      {...register(`travelers.${index}.fullName`, {
                        required: "El nombre completo es obligatorio",
                      })}
                      onChange={e =>
                        updateTraveler(index, "fullName", e.target.value)
                      }
                      className="mt-1"
                      placeholder="Ingresa el nombre completo"
                    />
                    {errors.travelers?.[index]?.fullName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.travelers[index].fullName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor={`dateOfBirth-${index}`}>
                      Fecha de Nacimiento *
                    </Label>
                    <Input
                      id={`dateOfBirth-${index}`}
                      type="date"
                      {...register(`travelers.${index}.dateOfBirth`, {
                        required: "La fecha de nacimiento es obligatoria",
                        validate: value => {
                          const selectedDate = new Date(value);
                          const today = new Date();
                          return (
                            selectedDate < today || "Debe ser una fecha pasada"
                          );
                        },
                      })}
                      onChange={e =>
                        updateTraveler(index, "dateOfBirth", e.target.value)
                      }
                      className="mt-1"
                    />
                    {errors.travelers?.[index]?.dateOfBirth && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.travelers[index].dateOfBirth.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor={`documentType-${index}`}>
                      Tipo de Documento *
                    </Label>
                    <select
                      id={`documentType-${index}`}
                      {...register(`travelers.${index}.documentType`, {
                        required: "El tipo de documento es obligatorio",
                      })}
                      onChange={e =>
                        updateTraveler(index, "documentType", e.target.value)
                      }
                      className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="passport">Pasaporte</option>
                      <option value="idCard">Cédula de Identidad</option>
                      <option value="driverLicense">
                        Licencia de Conducir
                      </option>
                    </select>
                    {errors.travelers?.[index]?.documentType && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.travelers[index].documentType.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor={`documentNumber-${index}`}>
                      Número de Documento *
                    </Label>
                    <Input
                      id={`documentNumber-${index}`}
                      {...register(`travelers.${index}.documentNumber`, {
                        required: "El número de documento es obligatorio",
                      })}
                      onChange={e =>
                        updateTraveler(index, "documentNumber", e.target.value)
                      }
                      className="mt-1"
                      placeholder="Ingresa el número de documento"
                    />
                    {errors.travelers?.[index]?.documentNumber && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.travelers[index].documentNumber.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <Label htmlFor={`hasPets-${index}`}>
                      ¿Viajas con Mascotas?
                    </Label>
                    <Controller
                      name={`travelers.${index}.hasPets`}
                      control={control}
                      defaultValue={false}
                      render={({ field }) => (
                        <Switch
                          id={`hasPets-${index}`}
                          checked={field.value}
                          onChange={value => {
                            field.onChange(value);
                            if (!value) {
                              setValue(`travelers.${index}.petCount`, 0, {
                                shouldValidate: true,
                              });
                            }
                          }}
                          className={`${
                            field.value ? "bg-blue-600" : "bg-gray-200"
                          } relative mt-1 inline-flex h-6 w-11 items-center rounded-full`}
                        >
                          <span
                            className={`${
                              field.value ? "translate-x-6" : "translate-x-1"
                            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                          />
                        </Switch>
                      )}
                    />
                  </div>
                  {traveler.hasPets && (
                    <div>
                      <Label htmlFor={`petCount-${index}`}>
                        Cantidad de Mascotas *
                      </Label>
                      <Input
                        type="number"
                        id={`petCount-${index}`}
                        {...register(`travelers.${index}.petCount`, {
                          required: traveler.hasPets
                            ? "La cantidad de mascotas es obligatoria"
                            : false,
                          min: traveler.hasPets
                            ? { value: 1, message: "Mínimo 1 mascota" }
                            : undefined,
                        })}
                        onChange={e =>
                          updateTraveler(
                            index,
                            "petCount",
                            Number(e.target.value)
                          )
                        }
                        className="mt-1"
                        placeholder="Ingresa la cantidad"
                      />
                    </div>
                  )}
                  <div>
                    <Label htmlFor={`hasExtraLuggage-${index}`}>
                      ¿Necesitas Maletas Extra?
                    </Label>
                    <Controller
                      name={`travelers.${index}.hasExtraLuggage`}
                      control={control}
                      defaultValue={false}
                      render={({ field }) => (
                        <Switch
                          id={`hasExtraLuggage-${index}`}
                          checked={field.value}
                          onChange={value => {
                            field.onChange(value);
                            if (!value) {
                              setValue(
                                `travelers.${index}.extraLuggageCount`,
                                0,
                                {
                                  shouldValidate: true,
                                }
                              );
                            }
                          }}
                          className={`${
                            field.value ? "bg-blue-600" : "bg-gray-200"
                          } relative mt-1 inline-flex h-6 w-11 items-center rounded-full`}
                        >
                          <span
                            className={`${
                              field.value ? "translate-x-6" : "translate-x-1"
                            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                          />
                        </Switch>
                      )}
                    />
                  </div>
                  {traveler.hasExtraLuggage && (
                    <div>
                      <Label htmlFor={`extraLuggageCount-${index}`}>
                        Cantidad de Maletas Extra *
                      </Label>
                      <Input
                        type="number"
                        id={`extraLuggageCount-${index}`}
                        {...register(`travelers.${index}.extraLuggageCount`, {
                          required: traveler.hasExtraLuggage
                            ? "La cantidad de maletas es obligatoria"
                            : false,
                          min: traveler.hasExtraLuggage
                            ? { value: 1, message: "Mínimo 1 maleta" }
                            : undefined,
                        })}
                        onChange={e =>
                          updateTraveler(
                            index,
                            "extraLuggageCount",
                            Number(e.target.value)
                          )
                        }
                        className="mt-1"
                        placeholder="Ingresa la cantidad"
                      />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <Button
            variant="outline"
            onClick={addTraveler}
            disabled={!isValid || localTravelers.length >= 10}
            className="flex items-center space-x-2 border-blue-200 text-blue-600 hover:bg-blue-50"
          >
            <Plus className="h-4 w-4" />
            <span>Añadir Otro Viajero</span>
          </Button>
          <div className="flex gap-4">
            <Button
              type="button"
              onClick={() => router.push("/step-1")}
              variant="outline"
              className="border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              Volver
            </Button>
            <Button
              type="submit"
              disabled={!isValid}
              className="bg-gradient-to-r from-blue-500 to-teal-600 px-8 hover:from-blue-600 hover:to-teal-700"
            >
              Continuar a Servicios Adicionales
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TravelerForm;
