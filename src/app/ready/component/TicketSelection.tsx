"use client";

import React from "react";


export const TicketSelection: React.FC = () => {


  return (
    <div className="mt-6 text-left">
     

      {/* Action Buttons */}
      <div className="flex sm:flex-col md:flex-row lg:flex-row justify-between sm:gap-4 md:gap-3 lg:gap-3 mt-4">
        <button className="w-full px-6 py-2 text-white border border-[#24A0B5] rounded-[8px] transition hover:bg-[#24A0B5] focus:bg-[#24A0B5]">
          Book Another Ticket
        </button>
        <button className="w-full px-6 py-2 text-white border border-[#24A0B5] rounded-[8px] transition hover:bg-[#24A0B5] focus:bg-[#24A0B5]">
          Download Ticket
        </button>
      </div>
    </div>
  );
};
