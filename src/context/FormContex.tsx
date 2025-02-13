"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface FormData {
  fullName: string;
  email: string;
  avatarUrl: string;
}

interface FormContextType {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

const defaultState: FormContextType = {
  formData: { fullName: "", email: "", avatarUrl: "" },
  setFormData: () => {},
};

const FormContext = createContext<FormContextType>(defaultState);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>(defaultState.formData);

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
