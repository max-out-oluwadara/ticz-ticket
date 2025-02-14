"use client";

import React, { useState } from "react";
import IconDropdown from "@/assets/icondropdown.svg"; // ✅ Import SVG dropdown icon
import { useForm } from "@/context/FormContext"; // ✅ Import Global State
import { useValidation } from "@/hooks/useValidation"; // ✅ Import Validation Hook

export const TicketSelection: React.FC = () => {
  const { state, dispatch } = useForm(); // ✅ Access global state
  const { errors, validateTicketSelection, clearError } = useValidation(state); // ✅ Use validation hook

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [clickedButton, setClickedButton] = useState<string | null>(null);

  const handleSelectTicketType = (ticketType: string) => {
    dispatch({ type: "SET_TICKET_TYPE", payload: ticketType });
    clearError("ticketType"); // ✅ Remove error when selected
  };

  const handleSelectTicketCount = (value: string) => {
    dispatch({ type: "SET_TICKET_COUNT", payload: value });
    clearError("ticketCount"); // ✅ Remove error when selected
    setIsDropdownOpen(false);
  };

  const handleNext = () => {
    if (!validateTicketSelection()) return; // ✅ Validate before proceeding
    dispatch({ type: "SET_ACTIVE_PAGE", payload: "attendee" }); // ✅ Move to next step

    // ✅ Remove hover effect immediately
    setClickedButton("next");
    setTimeout(() => setClickedButton(null), 200);
  };

  const handleCancel = () => {
    dispatch({ type: "RESET_FORM" }); // ✅ Clears selected ticket and ticket count

    // ✅ Remove hover effect immediately
    setClickedButton("cancel");
    setTimeout(() => setClickedButton(null), 200);
  };

  return (
    <div className="mt-6 text-left">
      {/* Select Ticket Type */}
      <label className="block text-white text-lg font-semibold mb-2">
        Select Ticket Type: {errors.ticketType && <span className="text-red-500 text-sm">{errors.ticketType}</span>}
      </label>

      <div className="bg-[#052228] border border-[#07373F] rounded-[24px] p-4 sm:flex-col md:flex-row lg:flex-row flex justify-between items-center sm:gap-4 md:gap-3 lg:gap-3">
        {[
          { type: "Free", access: "Regular Access" },
          { type: "$150", access: "VIP Access" },
          { type: "$150 ", access: "VVIP Access" },
        ].map((ticket) => (
          <div
            key={ticket.type}
            className={`flex-1 text-left p-4 rounded-[12px] border-2 border-[#197686] sm:w-full cursor-pointer transition ${
              state.ticketType === ticket.type ? "bg-[#07373F]" : "bg-transparent"
            }`}
            onClick={() => handleSelectTicketType(ticket.type)}
          >
            <h2 className="text-white text-lg font-semibold">{ticket.type}</h2>
            <p className="text-gray-300">{ticket.access}</p>
            <p className="text-gray-400">20/52</p>
          </div>
        ))}
      </div>

      {/* Number of Tickets */}
      <label className="block text-white text-lg font-semibold mt-4">
        Number of Tickets: {errors.ticketCount && <span className="text-red-500 text-sm">{errors.ticketCount}</span>}
      </label>

      <div className="relative mt-2">
        <input
          type="text"
          value={state.ticketCount}
          onChange={(e) => dispatch({ type: "SET_TICKET_COUNT", payload: e.target.value })}
          className="w-full p-2 bg-[#052228] border border-[#07373F] rounded-md text-white focus:ring focus:ring-[#24A0B5] outline-none pr-8"
          placeholder="Enter number of tickets"
        />
        <button
          className="absolute inset-y-0 right-2 flex items-center text-white"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <IconDropdown className="h-5 w-5" />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute bottom-full mb-1 z-10 w-full bg-[#052228] border border-[#07373F] rounded-md shadow-md">
            {[1, 2, 3, 4, 5].map((num) => (
              <div
                key={num}
                className="px-4 py-2 text-white cursor-pointer hover:bg-[#07373F]"
                onClick={() => handleSelectTicketCount(num.toString())}
              >
                {num}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex sm:flex-col md:flex-row lg:flex-row justify-between sm:gap-4 md:gap-3 lg:gap-3 mt-4">
        <button
          className={`w-full px-6 py-2 text-white border border-[#24A0B5] rounded-[8px] transition ${
            clickedButton === "cancel" ? "bg-transparent" : "hover:bg-[#24A0B5]"
          }`}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className={`w-full px-6 py-2 text-white border border-[#24A0B5] rounded-[8px] transition ${
            clickedButton === "next" ? "bg-transparent" : "hover:bg-[#24A0B5]"
          }`}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};
