"use client";

import React from "react";
import { HeaderSection } from "./HeaderSection"; // ✅ Import Header Section
import { TicketDetails } from "./TicketDetails"; // ✅ Import Event Details
import { TicketSelection } from "./TicketSelection"; // ✅ Import Ticket Selection

export const TicketArea: React.FC = () => {
  return (
    <div className="bg-[#041E23] border border-[#0E464F] rounded-[40px] w-full max-w-[700px] sm:mx-[20px] mx-auto sm:p-[20px] md:p-[48px] lg:p-[48px]">
      {/* Header Section (Imported) */}
      <HeaderSection />

      {/* Content Box */}
      <div className="p-[24px] rounded-[32px] text-white text-center">
        {/* Booking Confirmation Message */}
        <h2 className="text-xl font-semibold">Your Ticket is Booked!</h2>
        <p className="text-sm opacity-80 mt-1 mb-10">
          Check your email for a copy or you can download.
        </p>

        {/* Event Details Component (Imported) */}
        <TicketDetails />

        {/* Ticket Selection Component (Imported) */}
        <TicketSelection />
      </div>
    </div>
  );
};
