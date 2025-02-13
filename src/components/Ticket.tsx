"use client";

import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loadAllTickets, loadLatestTicket, deleteTicket } from "@/utils/storage";
import html2canvas from "html2canvas";
import Image from "next/image";
import { enableKeyboardNavigation, moveFocus, setAriaLive } from "@/utils/accessibility";

// Define the types for the ticket data
interface Ticket {
  ticketId: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
}

export const Ticket = () => {
  const router = useRouter();
  const ticketRef = useRef<HTMLDivElement>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]); // Use specific Ticket type
  const [currentTicket, setCurrentTicket] = useState<Ticket | null>(null); // Use Ticket or null type
  const [showAllTickets, setShowAllTickets] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    enableKeyboardNavigation(); // Ensures better keyboard support

    const latestTicket = loadLatestTicket();
    const allTickets = loadAllTickets();

    if (!latestTicket) {
      router.push("/"); // Redirect if no latest ticket is available
    } else {
      setCurrentTicket(latestTicket);
      setTickets(allTickets);
    }
    setLoading(false);
  }, [router]);

  const handleDownload = async () => {
    if (!ticketRef.current) return;
    const canvas = await html2canvas(ticketRef.current);
    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = image;
    link.download = `Ticket_${currentTicket?.ticketId || "unknown"}.png`;
    link.click();
    setAriaLive("Ticket has been downloaded successfully.");
  };

  const handleDelete = (ticketId: string) => {
    deleteTicket(ticketId);
    const updatedTickets = loadAllTickets();
    setTickets(updatedTickets);

    if (currentTicket?.ticketId === ticketId) {
      setCurrentTicket(updatedTickets.length > 0 ? updatedTickets[updatedTickets.length - 1] : null);
    }

    if (updatedTickets.length === 0) {
      setAriaLive("All tickets have been deleted. Redirecting to home.");
      setTimeout(() => {
        router.push("/");
        moveFocus(document.getElementById("homepage-button"));
      }, 500);
    } else {
      setAriaLive("Ticket deleted successfully.");
    }
  };

  if (loading) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div id="aria-live-region" className="sr-only" aria-live="polite"></div>

      {!showAllTickets && currentTicket && (
        <h2 className="text-2xl font-semibold text-green-500 mb-4 text-center" tabIndex={0}>
          🎉 Congratulations! You have successfully booked your ticket.
        </h2>
      )}

      {!showAllTickets ? (
        currentTicket ? (
          <>
            <div
              ref={ticketRef}
              className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center"
              role="region"
              aria-labelledby="ticket-heading"
            >
              <h2 id="ticket-heading" className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                🎟 Conference Ticket
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Ticket ID: {currentTicket.ticketId}
              </p>

              {currentTicket.avatarUrl ? (
                <Image
                  src={currentTicket.avatarUrl}
                  alt={`Avatar of ${currentTicket.fullName}`}
                  width={96}
                  height={96}
                  className="rounded-full mx-auto border"
                />
              ) : (
                <div className="h-24 w-24 mx-auto rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-500 dark:text-gray-400">No Image</span>
                </div>
              )}

              <p className="text-lg font-medium mt-4 text-gray-900 dark:text-gray-200">
                {currentTicket.fullName}
              </p>
              <p className="text-gray-700 dark:text-gray-300">{currentTicket.email}</p>
            </div>

            <button
              onClick={handleDownload}
              className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Download Ticket"
            >
              Download Ticket
            </button>

            <button
              onClick={() => {
                setShowAllTickets(true);
                setTimeout(() => moveFocus(document.getElementById("all-tickets-heading")), 100);
              }}
              className="mt-3 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              aria-label="Show All Tickets"
            >
              Show All Tickets
            </button>

            <button
              id="homepage-button"
              onClick={() => router.push("/")}
              className="mt-3 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              aria-label="Book Another Ticket"
            >
              Book Another Ticket
            </button>
          </>
        ) : null
      ) : (
        <div className="w-full max-w-lg bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2
            id="all-tickets-heading"
            className="text-xl font-semibold text-gray-800 dark:text-white mb-4"
            tabIndex={-1}
          >
            📋 All Generated Tickets
          </h2>
          {tickets.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center">No tickets found.</p>
          ) : (
            <ul className="divide-y divide-gray-300 dark:divide-gray-700">
              {tickets.map((ticket) => (
                <li key={ticket.ticketId} className="py-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      ID: {ticket.ticketId}
                    </p>
                    <p className="text-lg font-medium text-gray-900 dark:text-gray-200">
                      {ticket.fullName}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">{ticket.email}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                      onClick={() => handleDelete(ticket.ticketId)}
                      aria-label={`Delete ticket for ${ticket.fullName}`}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <button
            id="homepage-button"
            onClick={() => router.push("/")}
            className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            aria-label="Book Another Ticket"
          >
            Book Another Ticket
          </button>
        </div>
      )}
    </div>
  );
};
