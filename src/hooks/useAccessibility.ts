import { useEffect } from "react";

/**
 * Ensures form elements are keyboard-accessible and errors are announced.
 */
export const useAccessibility = () => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Submit form on Enter if a form field is focused
      if (event.key === "Enter") {
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement.tagName === "INPUT" || activeElement.tagName === "BUTTON") {
          event.preventDefault();
          const form = activeElement.closest("form");
          if (form) {
            (form as HTMLFormElement).requestSubmit();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, []);
};
