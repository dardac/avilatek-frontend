"use client";

import { Header, StepIndicator } from "@/components";
import { ReservationProvider } from "@/context/ReservationsContext";
import { usePathname } from "next/navigation";
import "../styles/global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const currentStep =
    pathname === "/step-1"
      ? 1
      : pathname === "/step-2"
        ? 2
        : pathname === "/step-3"
          ? 3
          : pathname === "/step-4"
            ? 4
            : 1;

  return (
    <html lang="es">
      <body className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <ReservationProvider>
          <Header />
          <div className="container mx-auto px-4 py-8">
            <StepIndicator currentStep={currentStep} />
            <div className="mt-8">{children}</div>
          </div>
        </ReservationProvider>
      </body>
    </html>
  );
}
