"use client";

import React from "react";

export const EventDetails: React.FC = () => {
  return (
    <div
      className="p-6 rounded-[24px] border-[2px] border-[#07373F] backdrop-blur-[7px]"
      style={{
        background:
          "radial-gradient(103.64% 57.39% at 14.02% 32.06%, rgba(36, 160, 181, 0.2) 0%, rgba(36, 160, 181, 0) 100%), rgba(10, 12, 17, 0.1)",
        borderWidth: "0px 2px 2px 2px",
      }}
    >
      <h2 className="text-2xl font-semibold mb-2">Techember Fest &lsquo;25</h2>

      {/* Two-line text for description */}
      <p className="text-sm opacity-80">
        Join us for an unforgettable experience at <br />
        OluShow. Secure your spot now.
      </p>

      {/* New Location & Date Section */}
      <div className="mt-4 flex sm:flex-col md:flex-row lg:flex-row justify-center items-center text-sm opacity-80">
        <span>📍 Location: Lagos, Nigeria</span>
        <span className="mx-3 hidden md:inline">||</span>
        <span>📅 Date & Time: Dec 10, 2025 | 5:00 PM</span>
      </div>
    </div>
  );
};