"use client";

import React, { useState } from "react";
import { useForm } from "@/context/FormContext";
import { FormAction } from "@/context/FormReducer"; // ✅ Import FormAction type

export const AttendeeDetails: React.FC = () => {
  const { state, dispatch } = useForm();

  // ✅ Define error state with proper typing
  const [errors, setErrors] = useState<Record<"name" | "email" | "specialRequest", string>>({
    name: "",
    email: "",
    specialRequest: "",
  });

  // ✅ Handle input change and update global state
  const handleInputChange = (field: "name" | "email" | "specialRequest", value: string) => {
    let actionType: FormAction["type"];

    switch (field) {
      case "name":
        actionType = "SET_NAME";
        break;
      case "email":
        actionType = "SET_EMAIL";
        break;
      case "specialRequest":
        actionType = "SET_SPECIAL_REQUEST";
        break;
      default:
        return;
    }

    dispatch({ type: actionType, payload: value });

    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" })); // ✅ Clear error when user types
  };

  // ✅ Validate form before submission
  const validateForm = () => {
    const validationErrors: Record<"name" | "email" | "specialRequest", string> = {
      name: "",
      email: "",
      specialRequest: "",
    };

    if (!state.name.trim()) validationErrors.name = "Name is required.";
    if (!state.email.trim()) validationErrors.email = "Email is required.";
    if (!state.specialRequest.trim()) validationErrors.specialRequest = "Special request is required.";

    setErrors(validationErrors);

    return !Object.values(validationErrors).some((error) => error); // ✅ If any error exists, return false
  };

  // ✅ Save to localStorage and navigate to "tickets"
  const handleSubmit = () => {
    if (validateForm()) {
      // ✅ Save the current state to localStorage
      localStorage.setItem("ticketData", JSON.stringify(state));

      // ✅ Navigate to "tickets"
      dispatch({ type: "SET_ACTIVE_PAGE", payload: "tickets" });
    }
  };

  return (
    <div className="mt-6 text-left">
      {/* Input Fields */}
      {[
        { label: "Enter your name", name: "name", type: "input" },
        { label: "Enter your email *", name: "email", type: "input" },
        { label: "Special request?", name: "specialRequest", type: "textarea" },
      ].map((field, index) => (
        <div key={index} className="mt-4">
          <label className="block text-white text-lg font-semibold mb-2">
            {field.label}
          </label>
          {errors[field.name as keyof typeof errors] && (
            <p className="text-red-500 text-sm">{errors[field.name as keyof typeof errors]}</p>
          )}
          {field.type === "textarea" ? (
            <textarea
              className="w-full p-2 bg-[#052228] border border-[#07373F] rounded-md text-white focus:ring focus:ring-[#24A0B5] outline-none pr-8 h-[100px] resize-none"
              placeholder="Enter your special request"
              value={state.specialRequest}
              onChange={(e) => handleInputChange("specialRequest", e.target.value)}
            ></textarea>
          ) : (
            <input
              type="text"
              className="w-full p-2 bg-[#052228] border border-[#07373F] rounded-md text-white focus:ring focus:ring-[#24A0B5] outline-none pr-8"
              placeholder={field.label}
              value={state[field.name as "name" | "email"]}
              onChange={(e) => handleInputChange(field.name as "name" | "email", e.target.value)}
            />
          )}
        </div>
      ))}

      {/* Action Buttons */}
      <div className="flex sm:flex-col md:flex-row lg:flex-row justify-between sm:gap-4 md:gap-3 lg:gap-3 mt-6">
        <button
          className="w-full px-6 py-2 text-white border border-[#24A0B5] rounded-[8px] transition hover:bg-[#24A0B5] focus:bg-[#24A0B5]"
          onClick={() => dispatch({ type: "SET_ACTIVE_PAGE", payload: "home" })} // ✅ Navigate back to "home"
        >
          Back
        </button>
        <button
          className="w-full px-6 py-2 text-white border border-[#24A0B5] rounded-[8px] transition hover:bg-[#24A0B5] focus:bg-[#24A0B5]"
          onClick={handleSubmit} // ✅ Save to localStorage and navigate to "tickets"
        >
          Get My Free Ticket
        </button>
      </div>
    </div>
  );
};
