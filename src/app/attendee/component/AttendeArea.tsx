"use client";

import React from "react";
import { HeaderSection } from "./HeaderSection"; // ✅ Import Header Section
import { UploadSection } from "./UploadSection"; // ✅ Import Event Details
import { AttendeeDetails } from "./AttendeeDetails"; // ✅ Import Ticket Selection

export const AttendeArea: React.FC = () => {
  return (
    <div className="bg-[#041E23] border border-[#0E464F] rounded-[40px] w-full max-w-[700px] sm:mx-[20px] mx-auto sm:p-[20px] md:p-[48px] lg:p-[48px]">
      {/* Header Section (Imported) */}
      <HeaderSection />

      {/* Content Box */}
      <div className="bg-[#08252B] sm:bg-[#041E23] p-[24px] rounded-[32px] border border-[#0E464F] sm:border-none shadow-md sm:shadow-none text-white text-center">
        {/* Event Details Component (Imported) */}
        <UploadSection />

        {/* New Progress Bar (Only Has `#0E464F`) */}
        <div className="w-full h-[4px] bg-[#0E464F] rounded-[5px] mt-6"></div>

        {/* Ticket Selection Component (Imported) */}
        <AttendeeDetails/>
      </div>
    </div>
  );
};
