"use client";

import React, { useEffect, useState, useRef } from "react";
import { useForm } from "@/context/FormContext";
import html2canvas from "html2canvas";

export const TicketSelection: React.FC = () => {
  const { dispatch } = useForm();
  const ticketRef = useRef<HTMLDivElement>(null); // ✅ Use a ref instead of getElementById
  const [isMounted, setIsMounted] = useState(false);

  // ✅ Ensure component is mounted before capturing
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ✅ Capture and download the ticket as PNG
  const handleDownloadTicket = async () => {
    if (!isMounted) {
      console.error("Error: Component not mounted yet!");
      return;
    }

    setTimeout(async () => {
      if (!ticketRef.current) {
        console.error("Error: Ticket section not found!");
        return;
      }

      try {
        const canvas = await html2canvas(ticketRef.current, {
          scale: window.devicePixelRatio, // ✅ High-resolution capture
          useCORS: true, // ✅ Fixes cross-origin image issues
          backgroundColor: null, // ✅ Preserves transparent backgrounds
        });

        const dataUrl = canvas.toDataURL("image/png");

        // ✅ Create and trigger a download link
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "ticket.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // ✅ Clean up
      } catch (error) {
        console.error("Error capturing ticket:", error);
      }
    }, 500); // ✅ Allow time for rendering
  };

  return (
    <div className="mt-6 text-left">
      {/* Action Buttons */}
      <div className="flex sm:flex-col md:flex-row lg:flex-row justify-between sm:gap-4 md:gap-3 lg:gap-3 mt-4">
        <button
          className="w-full px-6 py-2 text-white border border-[#24A0B5] rounded-[8px] transition hover:bg-[#24A0B5] focus:bg-[#24A0B5]"
          onClick={() => {
            localStorage.removeItem("ticketData"); // ✅ Clear local storage
            dispatch({ type: "RESET_FORM" }); // ✅ Reset global state
            dispatch({ type: "SET_ACTIVE_PAGE", payload: "home" }); // ✅ Navigate to home
          }}
        >
          Book Another Ticket
        </button>
        <button
          className="w-full px-6 py-2 text-white border border-[#24A0B5] rounded-[8px] transition hover:bg-[#24A0B5] focus:bg-[#24A0B5]"
          onClick={handleDownloadTicket} // ✅ Capture and download the ticket
        >
          Download Ticket
        </button>
      </div>

      {/* Hidden ticket section for reference */}
      <div ref={ticketRef} id="ticket-section" className="hidden" />
    </div>
  );
};
