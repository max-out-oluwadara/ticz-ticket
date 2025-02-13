export const focusNextElement = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      const formElements = Array.from(
        document.querySelectorAll("input, button, select, textarea, a")
      );
      const index = formElements.indexOf(event.target as HTMLElement);
      if (index > -1 && index < formElements.length - 1) {
        (formElements[index + 1] as HTMLElement).focus();
      }
    }
  };
  
  /**
   * Ensures keyboard users can navigate through the form.
   */
  export const enableKeyboardNavigation = () => {
    document.addEventListener("keydown", (event) => {
      if (event.key === "Tab") {
        document.body.classList.add("user-is-tabbing");
      }
    });
  };
  
  /**
   * Moves focus to a given element for better keyboard navigation.
   */
  export const moveFocus = (element: HTMLElement | null) => {
    if (element) {
      element.focus();
    }
  };
  
  /**
   * Updates the screen reader live region with messages.
   */
  export const setAriaLive = (message: string) => {
    const liveRegion = document.getElementById("aria-live-region");
    if (liveRegion) {
      liveRegion.innerText = message;
    }
  };
  