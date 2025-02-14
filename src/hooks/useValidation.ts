"use client";

import { useState } from "react";
import { FormState } from "@/context/FormReducer";

type Errors = { ticketType?: string; ticketCount?: string };

export const useValidation = (state: FormState) => {
  const [errors, setErrors] = useState<Errors>({});

  const validateTicketSelection = () => {
    const newErrors: Errors = {};

    if (!state.ticketType) {
      newErrors.ticketType = "Select a ticket type.";
    }
    if (!state.ticketCount) {
      newErrors.ticketCount = "Select the number of tickets.";
    }

    setErrors(newErrors);

    // ✅ Automatically clear errors after 3 seconds
    if (Object.keys(newErrors).length > 0) {
      setTimeout(() => setErrors({}), 3000);
    }

    return Object.keys(newErrors).length === 0;
  };

  const clearError = (field: keyof Errors) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return { errors, validateTicketSelection, clearError };
};
