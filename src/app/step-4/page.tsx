"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, User, MapPin, Plane } from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components";
import { useReservation } from "@/context/ReservationsContext";

const ConfirmationPage = () => {
  const { reservationData, resetReservation } = useReservation();
  const router = useRouter();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const formatDate = (dateString: string) => {
    if (!dateString) return "No especificado";
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateAge = (dateOfBirth: string): number => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const getSelectedServices = () => {
    const services = [];
    if (reservationData.additionalServices.travelInsurance)
      services.push("Seguro de Viaje");
    if (reservationData.additionalServices.preferredSeats)
      services.push("Asientos Preferenciales");
    if (reservationData.additionalServices.specialAssistance)
      services.push("Asistencia Especial");
    return services;
  };

  const handleConfirm = () => {
    setShowConfirmModal(true);
  };

  const handleCloseModal = () => {
    resetReservation();
    setShowConfirmModal(false);
    router.push("/step-1");
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-3xl font-bold text-slate-900">
          Confirmar Reserva
        </h2>
        <p className="text-slate-600">
          Por favor, revisa todos los detalles antes de confirmar
        </p>
      </div>

      <div className="space-y-6">
        <Card className="border-2 border-slate-100">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-teal-50">
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5 text-blue-600" />
              <span>Viajeros ({reservationData.travelers.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {reservationData.travelers.map(traveler => (
                <div
                  key={traveler.id}
                  className="rounded-lg border border-slate-200 p-4"
                >
                  <h4 className="mb-2 font-semibold text-slate-900">
                    {traveler.fullName}
                  </h4>
                  <div className="grid grid-cols-1 gap-4 text-sm text-slate-600 md:grid-cols-2">
                    <div>Edad: {calculateAge(traveler.dateOfBirth)}</div>
                    <div>
                      Tipo de Documento:{" "}
                      {traveler.documentType === "passport"
                        ? "Pasaporte"
                        : traveler.documentType === "idCard"
                          ? "Cédula de Identidad"
                          : "Licencia de Conducir"}
                    </div>
                    <div>Número de Documento: {traveler.documentNumber}</div>
                    {traveler.petCount ? (
                      <div>
                        Mascotas: {traveler.petCount} (Total: $
                        {traveler.petCount * 100})
                      </div>
                    ) : null}
                    {traveler.extraLuggageCount ? (
                      <div>
                        Maletas Extra: {traveler.extraLuggageCount} (Total: $
                        {traveler.extraLuggageCount * 50})
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-slate-100">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-teal-50">
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              <span>Información del Viaje</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h4 className="mb-2 font-semibold text-slate-900">Destino</h4>
                <p className="text-slate-600">
                  {reservationData.tripDetails.destination}
                </p>
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-slate-900">
                  Clase de Vuelo
                </h4>
                <p className="text-slate-600 capitalize">
                  {reservationData.tripDetails.flightClass.replace("-", " ")}
                </p>
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-slate-900">
                  Fecha de Salida
                </h4>
                <p className="text-slate-600">
                  {formatDate(reservationData.tripDetails.departureDate)}
                </p>
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-slate-900">
                  Fecha de Regreso
                </h4>
                <p className="text-slate-600">
                  {formatDate(reservationData.tripDetails.returnDate)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-slate-100">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-teal-50">
            <CardTitle className="flex items-center space-x-2">
              <Plane className="h-5 w-5 text-blue-600" />
              <span>Servicios Adicionales</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {getSelectedServices().length > 0 ? (
              <div className="space-y-2">
                {getSelectedServices().map(service => (
                  <div key={service} className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-slate-600">{service}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-600">
                No se seleccionaron servicios adicionales
              </p>
            )}
            {reservationData.additionalServices.specialAssistance &&
              reservationData.additionalServices.specialAssistanceNote && (
                <div className="mt-6">
                  <h4 className="mb-2 font-semibold text-slate-900">
                    Notas de Asistencia Especial
                  </h4>
                  <p className="rounded-lg bg-slate-50 p-3 text-slate-600">
                    {reservationData.additionalServices.specialAssistanceNote}
                  </p>
                </div>
              )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <Button
          variant="outline"
          onClick={() => router.push("/step-3")}
          className="border-slate-300 text-slate-600 hover:bg-slate-50"
        >
          Volver a Servicios
        </Button>
        <Button
          onClick={handleConfirm}
          className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 hover:from-green-600 hover:to-emerald-700"
        >
          Confirmar Reserva
        </Button>
      </div>

      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600">
                  <Check className="h-8 w-8 text-white" />
                </div>
                <span className="text-2xl font-bold text-slate-900">
                  ¡Reserva Confirmada!
                </span>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="text-center">
            <p className="mb-6 text-slate-600">
              Gracias por elegirnos. Tu reserva ha sido confirmada exitosamente.
            </p>
            <Button
              onClick={handleCloseModal}
              className="w-full bg-gradient-to-r from-blue-500 to-teal-600 hover:from-blue-600 hover:to-teal-700"
            >
              Cerrar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConfirmationPage;
