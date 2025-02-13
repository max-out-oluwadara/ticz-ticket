"use client";

import React from "react";
import UploadIcon from "@/assets/upload-icon.svg"; // ✅ Import Upload SVG Icon

export const UploadSection: React.FC = () => {
  return (
    <div
      className="p-[24px] pb-[48px] rounded-[24px] border border-[#07373F] backdrop-blur-[7px] flex flex-col"
      style={{
        background: "#052228", // ✅ Updated background
      }}
    >
      {/* Upload Profile Picture Text (Left-Aligned) */}
      <h2 className="text-white text-lg font-semibold mt-[24px] mb-[32px] text-left">
        Upload Profile Picture
      </h2>

      {/* Centered Black Box (Only Visible on md & lg) */}
      <div className="relative md:w-[508px] md:h-[200px] lg:w-[508px] lg:h-[200px] bg-[rgba(0,0,0,0.2)] hidden md:block lg:block">
        {/* Absolute Positioned Upload Box (Visible on All Screens) */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-[240px] h-[240px] p-[24px] bg-[#0E464F] border-[4px] border-[rgba(36,160,181,0.5)] rounded-[32px] flex flex-col items-center justify-center gap-[16px]">
            {/* Upload Icon */}
            <UploadIcon className="h-10 w-10 text-white" /> {/* ✅ Upload SVG Icon */}

            {/* Upload Text */}
            <p className="text-white text-center text-sm">
              Drag & Drop or Click to Upload
            </p>
          </div>
        </div>
      </div>

      {/* Absolute Positioned Upload Box for sm Screens (Ensures Visibility) */}
      <div className="flex justify-center items-center md:hidden lg:hidden mt-6">
        <div className="w-[240px] h-[240px] p-[24px] bg-[#0E464F] border-[4px] border-[rgba(36,160,181,0.5)] rounded-[32px] flex flex-col items-center justify-center gap-[16px]">
          {/* Upload Icon */}
          <UploadIcon className="h-10 w-10 text-white" /> {/* ✅ Upload SVG Icon */}

          {/* Upload Text */}
          <p className="text-white text-center text-sm">
            Drag & Drop or Click to Upload
          </p>
        </div>
      </div>
    </div>
  );
};
