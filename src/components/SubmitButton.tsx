import React from "react";
import { focusNextElement } from "@/utils/accessibility";

interface SubmitButtonProps {
  text: string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ text }) => {
  return (
    <button
      type="submit"
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md flex justify-center 
        focus:ring focus:ring-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      aria-label={text} // ✅ Screen-reader support
      onKeyDown={focusNextElement} // ✅ Enables keyboard navigation
    >
      {text}
    </button>
  );
};
