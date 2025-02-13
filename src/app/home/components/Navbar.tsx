import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TicketLogo from "@/assets/ticketlogo.svg"; // ✅ Import Logo
import TicketArrow from "@/assets/tiketarrow.svg"; // ✅ Import Arrow Icon

export const Navbar: React.FC = () => {
  const pathname = usePathname(); // ✅ Get current route

  return (
    <nav className="absolute top-6 left-0 right-0 mx-[27.5px] md:mx-[60px] lg:mx-[120px] h-[76px] flex items-center justify-between px-4 bg-[rgba(5,37,44,0.4)] border border-[#197686] backdrop-blur-sm rounded-[24px] font-jeju">
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <TicketLogo className="h-10 w-auto" /> {/* ✅ Adjust size as needed */}
      </Link>

      {/* Navigation Links (Visible on `md` and `lg`, hidden on `sm`) */}
      <ul className="hidden md:flex lg:flex space-x-6 text-[18px]">
        {[
          { name: "Events", path: "/events" },
          { name: "My Tickets", path: "/my-tickets" },
          { name: "About Project", path: "/about-project" },
        ].map((link) => (
          <li key={link.path}>
            <Link
              href={link.path}
              className={`${
                pathname === link.path ? "text-white" : "text-[#B3B3B3]"
              } hover:text-white transition`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* "MY TICKETS" Button with Centered Arrow */}
      <Link
        href="/my-tickets"
        className="flex items-center justify-center px-4 py-2 mt-3 mb-3 text-black bg-white border border-white rounded-[12px] hover:bg-gray-200 transition text-[16px]"
      >
        <span className="mr-2 flex items-center h-full">MY TICKETS</span> 
        <TicketArrow className="h-5 w-5 flex-shrink-0 translate-y-1" /> {/* ✅ Arrow now centered */}
      </Link>
    </nav>
  );
};
