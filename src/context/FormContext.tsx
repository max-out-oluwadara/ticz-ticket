"use client";

import React, { createContext, useReducer, useContext, ReactNode } from "react";
import { formReducer, FormState, FormAction } from "./FormReducer";

const initialState: FormState = {
  name: "",
  email: "",
  ticketType: "",
  ticketCount:"",
  specialRequest: "",
  profilePicture:"",
  activePage: "home", // ✅ Default to "home"
};

// Create Context
const FormContext = createContext<{
  state: FormState;
  dispatch: React.Dispatch<FormAction>;
} | undefined>(undefined);

// Provider Component
export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
};

// Custom Hook for Easy Access
export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useForm must be used within a FormProvider");
  }
  return context;
};
