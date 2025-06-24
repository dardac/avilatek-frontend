"use client";

import { Check } from "lucide-react";
import { FC } from "react";

interface StepIndicatorProps {
  currentStep: number;
  steps?: Array<{ label: string, description: string}>;
}

const defaultSteps = [
  { label: "Detalles", description: "Información del viaje" },
  { label: "Viajeros", description: "Datos de los viajeros" },
  { label: "Servicios", description: "Servicios adicionales" },
  { label: "Confirmar", description: "Revisar y confirmar" },
];

export const StepIndicator: FC<StepIndicatorProps> = ({
  currentStep,
  steps = defaultSteps,
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-4 md:gap-6">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;

        return (
          <div
            key={step.label}
            className="flex w-full flex-col items-center text-center sm:w-auto"
          >
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full border-2 sm:h-10 sm:w-10 ${
                isCompleted
                  ? "border-blue-600 bg-gradient-to-br from-blue-600 to-blue-400 text-white"
                  : isCurrent
                    ? "border-blue-600 bg-blue-50 text-blue-600"
                    : "border-gray-300 bg-white text-gray-400"
              } transition-colors`}
            >
              {isCompleted ? (
                <Check className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                stepNumber
              )}
            </div>
            <div className="mt-2">
              <p
                className={`mt-2 text-center text-sm font-medium ${
                  isCompleted || isCurrent ? "text-gray-900" : "text-gray-400"
                } `}
              >
                {step.label}
              </p>
              <p className="hidden text-xs text-gray-400 sm:block">
                {step.description}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`mx-4 h-0.5 flex-1 transition-all duration-300 ${
                  isCompleted
                    ? "bg-gradient-to-r from-blue-600 to-blue-400"
                    : "bg-gray-200"
                } `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
