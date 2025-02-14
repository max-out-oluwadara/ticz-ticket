"use client";

import React from "react";

export const AboutArea: React.FC = () => {
  return (
    <div className="bg-[#041E23] border border-[#0E464F] rounded-[40px] w-full max-w-[700px] sm:mx-[20px] mx-auto sm:p-[20px] md:p-[48px] lg:p-[48px] text-white">
      {/* Header Section */}
      <h2 className="text-2xl font-semibold text-center">
        Event Ticket Booking UI – Open Source Practice Project 🎟️
      </h2>

      {/* Overview */}
      <section className="mt-6">
        <h3 className="text-xl font-semibold">Overview</h3>
        <p className="mt-2 text-gray-300">
          This is a beginner-friendly yet practical Event Ticket Booking UI designed for developers 
          to clone, explore, and build upon. The design focuses on a seamless, login-free ticket 
          reservation flow, allowing users to book event tickets quickly and efficiently.
        </p>
        <p className="mt-2 text-gray-300">
          The project consists of a three-step ticket booking flow, and developers can extend it further 
          by integrating payment solutions, user authentication (optional), and ticket validation systems.
        </p>
      </section>

      {/* Flow & Features */}
      <section className="mt-6">
        <h3 className="text-xl font-semibold">Flow & Features</h3>
        
        <div className="mt-4">
          <h4 className="font-semibold">1️⃣ Ticket Selection</h4>
          <ul className="list-disc list-inside text-gray-300 mt-2">
            <li>Users can browse available tickets (Free & Paid).</li>
            <li>Ticket options are displayed in a list or card view.</li>
            <li>For Free Tickets → Clicking “Get Free Ticket” proceeds to attendee details.</li>
            <li>For Paid Tickets → Clicking “Purchase Ticket” would ideally open a payment modal.</li>
          </ul>
        </div>

        <div className="mt-4">
          <h4 className="font-semibold">2️⃣ Attendee Details Form</h4>
          <ul className="list-disc list-inside text-gray-300 mt-2">
            <li>Users input their Name, Email, and optional Phone Number.</li>
            <li>Profile picture upload option with preview functionality.</li>
            <li>Ticket summary is visible to ensure users review their details before submission.</li>
          </ul>
        </div>

        <div className="mt-4">
          <h4 className="font-semibold">3️⃣ Payment or Success Page</h4>
          <ul className="list-disc list-inside text-gray-300 mt-2">
            <li>If the ticket is free, the user is taken directly to the Ticket Confirmation Page.</li>
            <li>
              If the ticket is paid, developers can integrate Stripe, Paystack, or Flutterwave to 
              process payments before showing the confirmation page.
            </li>
            <li>Upon successful booking, users should receive:</li>
            <ul className="list-disc list-inside text-gray-400 ml-5">
              <li>A visual ticket preview with a unique QR Code.</li>
              <li>An option to download the ticket as PDF or save it to their device.</li>
              <li>An email confirmation containing ticket details.</li>
            </ul>
          </ul>
        </div>
      </section>

      {/* How to Build This */}
      <section className="mt-6">
        <h3 className="text-xl font-semibold">How to Build This 🚀</h3>
        
        <h4 className="font-semibold mt-4">📌 Frontend (Next.js or React)</h4>
        <ul className="list-disc list-inside text-gray-300 mt-2">
          <li>Component Breakdown:</li>
          <ul className="list-disc list-inside text-gray-400 ml-5">
            <li>TicketCard.tsx → Displays ticket details</li>
            <li>AttendeeForm.tsx → Captures user details</li>
            <li>PaymentModal.tsx → Handles payment processing</li>
            <li>SuccessScreen.tsx → Shows the final ticket preview</li>
          </ul>
          <li>State Management: React’s Context API, Zustand, or Redux (if needed).</li>
          <li>File Handling: Users should be able to upload images using Firebase Storage, Cloudinary, or local preview.</li>
        </ul>

        <h4 className="font-semibold mt-4">📌 Backend (Optional)</h4>
        <ul className="list-disc list-inside text-gray-300 mt-2">
          <li>If persistence is required, a backend can be built using:</li>
          <ul className="list-disc list-inside text-gray-400 ml-5">
            <li>Node.js & Express or Firebase Functions</li>
            <li>Database: MongoDB, PostgreSQL, or Firebase Firestore to store ticket records</li>
          </ul>
        </ul>

        <h4 className="font-semibold mt-4">📌 Payment Integration</h4>
        <ul className="list-disc list-inside text-gray-300 mt-2">
          <li>For paid events, developers should integrate:</li>
          <ul className="list-disc list-inside text-gray-400 ml-5">
            <li>Stripe Checkout (for international transactions)</li>
            <li>Paystack or Flutterwave (for African users)</li>
          </ul>
        </ul>
      </section>

      {/* Learning Outcomes */}
      <section className="mt-6">
        <h3 className="text-xl font-semibold">What You’ll Learn 🧑‍💻</h3>
        <ul className="list-disc list-inside text-gray-300 mt-2">
          <li>File handling & validation (profile picture uploads).</li>
          <li>Dynamic UI updates based on ticket selection.</li>
          <li>Persisting bookings using local state or a backend.</li>
          <li>Integrating payment gateways for ticket purchases.</li>
          <li>Generating & validating QR Codes for event check-in (Advanced).</li>
        </ul>
      </section>

      {/* Help Section */}
      <section className="mt-6 text-left">
        <p className="text-gray-400">Need Help? Reach Out! 💬</p>
      </section>

      <div className="flex items-center justify-center text-center mt-12 mb-6">
        <span className="text-[64px] sm:text-[48px] md:text-[64px] lg:text-[80px]">💛</span>
        <h1 className="text-[64px] sm:text-[48px] md:text-[64px] lg:text-[80px] font-bold ml-4">
          Enjoy
        </h1>
      </div>

   {/* Button Section */}
<div className="bg-[#041E23] border border-[#0E464F] rounded-[15px] w-full max-w-[558px] mx-auto p-[20px] md:p-[32px] lg:p-[32px] text-white">
  <div className="flex sm:flex-col md:flex-row lg:flex-row justify-between sm:gap-4 md:gap-3 lg:gap-3 mt-4">
    <button className="w-full px-6 py-2 text-white border border-[#24A0B5] rounded-[8px] transition hover:bg-[#24A0B5] focus:bg-[#24A0B5]">
      Design File
    </button>
    <button className="w-full px-6 py-2 text-white border border-[#24A0B5] rounded-[8px] transition hover:bg-[#24A0B5] focus:bg-[#24A0B5]">
      Github code
    </button>
  </div>
</div>


      
    </div>
  );
};
