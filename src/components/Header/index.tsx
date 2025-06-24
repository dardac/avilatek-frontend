import React from "react";

export const Header = () => {
  return (
    <header className="border-b border-slate-100 bg-white shadow-sm">
      <div className="mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-3">
          <div>
            <h1 className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-2xl font-bold text-transparent">
              Globetrotter
            </h1>
            <p className="text-sm text-slate-500">Travel Reservations</p>
          </div>
        </div>
      </div>
    </header>
  );
};
