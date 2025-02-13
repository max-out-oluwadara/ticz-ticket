"use client";

import React from "react";

export const AttendeeDetails: React.FC = () => {
  return (
    <div className="mt-6 text-left">
      {/* Email Fields */}
      {[
        { label: "Enter your name", name: "email", type: "input" },
        { label: "Enter your email *", name: "confirmEmail", type: "input" },
        { label: "Special request?", name: "specialRequest", type: "textarea" },
      ].map((field, index) => (
        <div key={index} className="mt-4">
          <label className="block text-white text-lg font-semibold mb-2">
            {field.label}
          </label>
          {field.type === "textarea" ? (
            <textarea
              className="w-full p-2 bg-[#052228] border border-[#07373F] rounded-md text-white focus:ring focus:ring-[#24A0B5] outline-none pr-8 h-[100px] resize-none"
              placeholder="Enter your special request"
            ></textarea>
          ) : (
            <input
              type="text"
              className="w-full p-2 bg-[#052228] border border-[#07373F] rounded-md text-white focus:ring focus:ring-[#24A0B5] outline-none pr-8"
            />
          )}
        </div>
      ))}

      {/* Action Buttons */}
      <div className="flex sm:flex-col md:flex-row lg:flex-row justify-between sm:gap-4 md:gap-3 lg:gap-3 mt-6">
        <button className="w-full px-6 py-2 text-white border border-[#24A0B5] rounded-[8px] transition hover:bg-[#24A0B5] focus:bg-[#24A0B5]">
          Back
        </button>
        <button className="w-full px-6 py-2 text-white border border-[#24A0B5] rounded-[8px] transition hover:bg-[#24A0B5] focus:bg-[#24A0B5]">
          Get My Free Ticket
        </button>
      </div>
    </div>
  );
};
