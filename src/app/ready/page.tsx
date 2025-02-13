"use client";

import { Navbar } from "@/app/home/components/Navbar";
import { TicketArea } from "@/app/ready/component/TicketArea";

export default function TicketPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center"
      style={{
        background:
          "radial-gradient(52.52% 32.71% at 50% 97.66%, rgba(36, 160, 181, 0.2) 0%, rgba(36, 160, 181, 0) 100%), #02191D",
      }}
    >
      <Navbar />
      <div className="mt-[124px] w-full flex justify-center">
        <TicketArea />
      </div>
    </div>
  );
}
