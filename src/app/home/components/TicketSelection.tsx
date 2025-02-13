"use client";

import React, { useState } from "react";
import IconDropdown from "@/assets/icondropdown.svg"; // ✅ Import SVG dropdown icon

export const TicketSelection: React.FC = () => {
  const [ticketCount, setTicketCount] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);

  const handleSelect = (value: string) => {
    setTicketCount(value);
    setIsDropdownOpen(false);
  };

  const handleTicketClick = (ticketType: string) => {
    setSelectedTicket(ticketType); // ✅ Ensures only one is selected at a time
  };

  return (
    <div className="mt-6 text-left">
      <label className="block text-white text-lg font-semibold mb-2">
        Select Ticket Type:
      </label>

      {/* Ticket Type Container */}
      <div className="bg-[#052228] border border-[#07373F] rounded-[24px] p-4 sm:flex-col md:flex-row lg:flex-row flex justify-between items-center sm:gap-4 md:gap-3 lg:gap-3">
        {/* Ticket Options */}
        {["Free", "VIP", "Premium"].map((ticket) => (
          <div
            key={ticket}
            className={`flex-1 text-left p-4 rounded-[12px] border-2 border-[#197686] sm:w-full cursor-pointer transition ${
              selectedTicket === ticket ? "bg-[#07373F]" : "bg-transparent"
            }`}
            onClick={() => handleTicketClick(ticket)}
          >
            <h2 className="text-white text-lg font-semibold">{ticket}</h2>
            <p className="text-gray-300">Regular Access</p>
            <p className="text-gray-400">20/52</p>
          </div>
        ))}
      </div>

      {/* Number of Tickets */}
      <label className="block text-white text-lg font-semibold mt-4">
        Number of Tickets:
      </label>
      <div className="relative mt-2">
        <input
          type="text"
          value={ticketCount}
          onChange={(e) => setTicketCount(e.target.value)}
          className="w-full p-2 bg-[#052228] border border-[#07373F] rounded-md text-white focus:ring focus:ring-[#24A0B5] outline-none pr-8"
          placeholder="Enter number of tickets"
        />
        {/* Dropdown Indicator (Using SVG) */}
        <button
          className="absolute inset-y-0 right-2 flex items-center text-white"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <IconDropdown className="h-5 w-5" /> {/* ✅ Using SVG icon */}
        </button>

        {/* Dropdown Menu (Now Opens Upward) */}
        {isDropdownOpen && (
          <div className="absolute bottom-full mb-1 z-10 w-full bg-[#052228] border border-[#07373F] rounded-md shadow-md">
            {[1, 2, 3, 4, 5].map((num) => (
              <div
                key={num}
                className="px-4 py-2 text-white cursor-pointer hover:bg-[#07373F]"
                onClick={() => handleSelect(num.toString())}
              >
                {num}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex sm:flex-col md:flex-row lg:flex-row justify-between sm:gap-4 md:gap-3 lg:gap-3 mt-4">
        <button className="w-full px-6 py-2 text-white border border-[#24A0B5] rounded-[8px] transition hover:bg-[#24A0B5] focus:bg-[#24A0B5]">
          Cancel
        </button>
        <button className="w-full px-6 py-2 text-white border border-[#24A0B5] rounded-[8px] transition hover:bg-[#24A0B5] focus:bg-[#24A0B5]">
          Next
        </button>
      </div>
    </div>
  );
};
