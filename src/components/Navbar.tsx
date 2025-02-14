"use client";

import React from "react";
import TicketLogo from "@/assets/ticketlogo.svg"; // ✅ Import Logo
import TicketArrow from "@/assets/tiketarrow.svg"; // ✅ Import Arrow Icon
import { useForm } from "@/context/FormContext"; // ✅ Import Global State

export const Navbar: React.FC = () => {
  const { state, dispatch } = useForm(); // ✅ Get state and dispatch

  return (
    <nav className="absolute top-6 left-0 right-0 mx-[27.5px] md:mx-[60px] h-[76px] lg:mx-auto flex items-center justify-between px-4 bg-[rgba(5,37,44,0.4)] border border-[#197686] backdrop-blur-sm rounded-[24px] font-jeju max-w-[1200px]">
      {/* Logo */}
      <button
        onClick={() => dispatch({ type: "SET_ACTIVE_PAGE", payload: "home" })}
        className="flex items-center"
      >
        <TicketLogo className="h-10 w-auto" /> {/* ✅ Adjust size as needed */}
      </button>

      {/* Navigation Links (Visible on `md` and `lg`, hidden on `sm`) */}
      <ul className="hidden md:flex lg:flex space-x-6 text-[18px]">
        <li>
          <button
            onClick={() => dispatch({ type: "SET_ACTIVE_PAGE", payload: "home" })}
            className={`${
              state.activePage === "home" ? "text-white" : "text-[#B3B3B3]"
            } hover:text-white transition`}
          >
            Events
          </button>
        </li>
        <li>
          <button
            onClick={() => dispatch({ type: "SET_ACTIVE_PAGE", payload: "tickets" })}
            className={`${
              state.activePage === "tickets" ? "text-white" : "text-[#B3B3B3]"
            } hover:text-white transition`}
          >
            My Tickets
          </button>
        </li>
        <li>
          <button
            onClick={() => dispatch({ type: "SET_ACTIVE_PAGE", payload: "about" })}
            className={`${
              state.activePage === "about" ? "text-white" : "text-[#B3B3B3]"
            } hover:text-white transition`}
          >
            About Project
          </button>
        </li>
      </ul>

      {/* "MY TICKETS" Button with Centered Arrow */}
      <button
        onClick={() => dispatch({ type: "SET_ACTIVE_PAGE", payload: "tickets" })}
        className="flex items-center justify-center px-4 py-2 mt-3 mb-3 text-black bg-white border border-white rounded-[12px] hover:bg-gray-200 transition text-[16px]"
      >
        <span className="mr-2 flex items-center h-full">MY TICKETS</span>
        <TicketArrow className="h-5 w-5 flex-shrink-0 translate-y-1" /> {/* ✅ Arrow now centered */}
      </button>
    </nav>
  );
};
