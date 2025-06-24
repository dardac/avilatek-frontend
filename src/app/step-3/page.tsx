"use client";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Label,
  Textarea,
} from "@/components";
import { useReservation } from "@/context/ReservationsContext";
import { AdditionalServices } from "@/types";
import { Switch } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

const AdditionalServicesForm = () => {
  const { reservationData, updateAdditionalServices } = useReservation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch,
  } = useForm<AdditionalServices>({
    defaultValues: reservationData.additionalServices,
    mode: "onChange",
  });

  const specialAssistance = watch("specialAssistance");

  const onSubmit = (data: AdditionalServices) => {
    updateAdditionalServices(data);
    router.push("/step-4");
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-3xl font-bold text-slate-900">
          Servicios Adicionales
        </h2>
        <p className="text-slate-600">
          Selecciona los servicios adicionales que deseas incluir
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <Card className="border-2 border-slate-100 transition-colors hover:border-blue-200">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-teal-50">
            <CardTitle>Servicios Adicionales</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <Label htmlFor="travelInsurance">
                    ¿Deseas agregar seguro de viaje?
                  </Label>
                  <Controller
                    name="travelInsurance"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        id="travelInsurance"
                        checked={field.value || false}
                        onChange={value => field.onChange(value)}
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
                <p className="text-sm text-gray-600">Costo: $50 por viajero</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <Label htmlFor="preferredSeats">
                    ¿Deseas seleccionar asientos preferenciales?
                  </Label>
                  <Controller
                    name="preferredSeats"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        id="preferredSeats"
                        checked={field.value || false}
                        onChange={value => field.onChange(value)}
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
                <p className="text-sm text-gray-600">Costo: $30 por asiento</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <Label htmlFor="specialAssistance">
                    ¿Requiere asistencia especial?
                  </Label>
                  <Controller
                    name="specialAssistance"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        id="specialAssistance"
                        checked={field.value || false}
                        onChange={value => field.onChange(value)}
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
              </div>
              {specialAssistance && (
                <div>
                  <Label htmlFor="specialAssistanceNote">
                    Nota de Asistencia Especial *
                  </Label>
                  <Textarea
                    id="specialAssistanceNote"
                    {...register("specialAssistanceNote", {
                      required: specialAssistance
                        ? "La nota de asistencia es obligatoria"
                        : false,
                      maxLength: {
                        value: 200,
                        message: "Máximo 200 caracteres",
                      },
                    })}
                    className="mt-1"
                    placeholder="Describe la asistencia requerida (máx. 200 caracteres)"
                    rows={4}
                  />
                  <p className="mt-1 text-sm text-gray-600">
                    Máximo 200 caracteres
                  </p>
                  {errors.specialAssistanceNote && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.specialAssistanceNote.message}
                    </p>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <Button
            type="button"
            onClick={() => router.push("/step-2")}
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
            Finalizar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdditionalServicesForm;
