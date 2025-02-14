"use client";

import { Navbar } from "@/components/Navbar";
import { ContentArea } from "@/app/home/components/ContentArea";
import { AboutArea } from "@/app/about/component/AboutArea";
import { TicketArea } from "@/app/ready/component/TicketArea";
import { AttendeArea } from "@/app/attendee/component/AttendeArea";
import { useForm } from "@/context/FormContext"; // ✅ Import Global State

export default function TicketPage() {
  const { state } = useForm(); // ✅ Get activePage from global state

  // ✅ Function to dynamically render content
  const renderContent = () => {
    switch (state.activePage) {
      case "home":
        return <ContentArea />;
      case "about":
        return <AboutArea />;
      case "tickets":
        return <TicketArea />;
      case "attendee":
        return <AttendeArea />;
      default:
        return <ContentArea />;
    }
  };

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
        {renderContent()} {/* ✅ Dynamically render content based on state */}
      </div>
    </div>
  );
}
