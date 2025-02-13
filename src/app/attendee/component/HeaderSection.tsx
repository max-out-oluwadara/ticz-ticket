"use client";

import React from "react";

export const HeaderSection: React.FC = () => {
  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="flex sm:flex-col md:flex-row lg:flex-row justify-between sm:items-start md:items-center lg:items-center w-full mb-3">
        <h2 className="text-xl md:text-2xl lg:text-2xl font-semibold text-white">
          Attendee Details
        </h2>
        <p className="text-sm md:text-base lg:text-base text-gray-400 sm:mt-1">
          Step 2/3
        </p>
      </div>

      {/* Progress Bar (Existing One) */}
      <div className="w-full h-[4px] bg-[#0E464F] rounded-[5px] relative overflow-hidden mb-6">
        <div className="h-full bg-[#24A0B5] w-2/3 rounded-l-[5px]"></div>
      </div>
    </div>
  );
};
