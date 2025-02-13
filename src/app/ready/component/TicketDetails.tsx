"use client";

import React from "react";
import TicketBackground from "@/assets/ticketbackground.svg"; // ✅ Import background SVG

export const TicketDetails: React.FC = () => {
  // ✅ Function to generate random barcode pattern
  const generateBarcode = () => {
    const barWidths = [2, 4, 6, 8, 9]; // ✅ Possible bar widths
    const barHeights = [50, 52, 54, 56]; // ✅ Possible bar heights
    const spacings = [2, 6, 9, 13]; // ✅ Possible spacings

    return Array.from({ length: 20 }, (_, index) => {
      const width = barWidths[Math.floor(Math.random() * barWidths.length)];
      const height = barHeights[Math.floor(Math.random() * barHeights.length)];
      const marginRight = spacings[Math.floor(Math.random() * spacings.length)];

      return (
        <div
          key={index}
          className="bg-white inline-block"
          style={{ width: `${width}px`, height: `${height}px`, marginRight: `${marginRight}px` }}
        />
      );
    });
  };

  // ✅ Function to generate a unique serial number
  const generateSerialNumber = () => {
    const randomDigit = () => Math.floor(Math.random() * 10); // Generates a single digit (0-9)
    return `${randomDigit()} ${randomDigit()}${randomDigit()}${randomDigit()}${randomDigit()}${randomDigit()}   ${randomDigit()}${randomDigit()}${randomDigit()}${randomDigit()}${randomDigit()}`;
  };

  return (
    <div className="flex justify-center items-center h-full w-full relative">
      {/* Centered Logo SVG */}
      <TicketBackground className="w-auto h-auto max-w-full max-h-full" />

      {/* Overlayed Positioned Box - Now 20px from the Top, With Content */}
      <div className="absolute w-[260px] h-[446px] bg-[rgba(3,30,33,0.1)] border border-[#24A0B5] backdrop-blur-[2px] left-1/2 -translate-x-1/2 top-[20px] p-[14px] rounded-[16px] flex flex-col justify-between items-center text-white text-center">
        {/* Event Title */}
        <h2 className="text-lg font-semibold">Techember Fest &lsquo;25</h2>

        {/* Event Details - Smaller Text */}
        <div className="mt-2 text-xs opacity-80">
          <span className="block">📍 Location: Lagos, Nigeria</span>
          <span className="block mt-1">📅 Date & Time: Dec 10, 2025 | 5:00 PM</span>
        </div>

        {/* Image Placeholder (140x140) */}
        <div className="w-[140px] h-[140px] bg-gray-700 rounded-lg flex items-center justify-center opacity-40 mt-3">
          <span className="text-xs opacity-80">Image Placeholder</span>
        </div>

        {/* Ticket Info Table with Cell Borders */}
        <div className="w-full mt-3 bg-[#08343C] border border-[#133D44] rounded-[8px] text-left text-xs">
          <div className="grid grid-cols-2 divide-x divide-[#12464E]">
            {/* First Row */}
            <div className="p-2 border-b border-[#12464E]">
              <p className="opacity-70">Enter your name</p>
              <p className="text-white">John Doe</p>
            </div>
            <div className="p-2 border-b border-[#12464E]">
              <p className="opacity-70">Enter your email*</p>
              <p className="text-white">john.doe@example.com</p>
            </div>

            {/* Second Row */}
            <div className="p-2 border-b border-[#12464E]">
              <p className="opacity-70">Ticket Type</p>
              <p className="text-white">VIP</p>
            </div>
            <div className="p-2 border-b border-[#12464E]">
              <p className="opacity-70">Ticket For</p>
              <p className="text-white">Self</p>
            </div>
          </div>

          {/* Special Request (Spans full width) */}
          <div className="p-2">
            <p className="opacity-70">Special Request</p>
            <p className="text-white">No special requests</p>
          </div>
        </div>
      </div>

      {/* Barcode Section - Positioned 34px from the Bottom */}
      <div className="absolute bottom-[34px] left-1/2 -translate-x-1/2 flex flex-col items-center" style={{ maxWidth: "234px" }}>
        {/* Barcode */}
        <div className="flex">{generateBarcode()}</div>
      </div>

      {/* Serial Number - Positioned 28px from Bottom of the Logo */}
      <div className="absolute bottom-[20px] left-1/2 -translate-x-1/2">
        <p className="text-white text-xs tracking-widest">
          {generateSerialNumber()}
        </p>
      </div>
    </div>
  );
};
