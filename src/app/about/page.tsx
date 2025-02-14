"use client";

import { Navbar } from "@/app/about/component/Navbar";
import { AboutArea } from "@/app/about/component/AboutArea";

export default function TicketPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center bg-[#041E23]" // ✅ Updated background color
    >
      <Navbar />
      <div className="mt-[124px] w-full flex justify-center">
        <AboutArea />
      </div>
    </div>
  );
}
