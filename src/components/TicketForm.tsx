"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { InputField } from "@/components/InputField";
import { AvatarUpload } from "@/components/AvatarUpload";
import { SubmitButton } from "@/components/SubmitButton";
import { validateForm, FormErrors } from "@/utils/validation";
import { saveFormData, loadFormData, saveTicket, clearFormData, loadLatestTicket } from "@/utils/storage";
import { useFormContext } from "@/context/FormContext";
import { focusNextElement, setAriaLive } from "@/utils/accessibility";
import { ErrorMessage } from "@/components/ErrorMessage";

export const TicketForm = () => {
  const { setFormData } = useFormContext();
  const router = useRouter();

  const [formData, setLocalFormData] = useState({
    fullName: "",
    email: "",
    avatarUrl: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const [hasTicket, setHasTicket] = useState(false); // ✅ Track if a ticket exists

  useEffect(() => {
    const storedData = loadFormData();
    if (storedData) {
      setLocalFormData({
        fullName: storedData.fullName || "",
        email: storedData.email || "",
        avatarUrl: storedData.avatarUrl || "",
      });
    }

    // ✅ Check if a ticket exists
    const latestTicket = loadLatestTicket();
    setHasTicket(!!latestTicket);
  }, []);

  const handleChange = (name: string, value: string) => {
    const updatedData = { ...formData, [name]: value };
    setLocalFormData(updatedData);
    saveFormData(updatedData);

    if (typingTimeout) clearTimeout(typingTimeout);

    const newTimeout = setTimeout(() => {
      const validationErrors = validateForm(updatedData);
      setErrors(validationErrors);
    }, 800);

    setTypingTimeout(newTimeout);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setAriaLive("Form submission failed. Please correct the errors.");
      return;
    }

    // ✅ Save ticket before navigating
    saveTicket(formData);

    // ✅ Clear form data from storage
    clearFormData();

    // ✅ Reset form fields in state
    setLocalFormData({
      fullName: "",
      email: "",
      avatarUrl: "",
    });

    // ✅ Set success message for screen readers
    setAriaLive("Ticket successfully generated. Redirecting to ticket page.");

    setFormData(formData);
    router.push("/ticket");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <div id="aria-live-region" className="sr-only" aria-live="polite"></div>

      <div className="w-full max-w-lg bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2
          className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 text-center"
          tabIndex={0}
        >
          🎟 Conference Ticket Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Full Name"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
            onKeyDown={focusNextElement}
          />
          <InputField
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            onKeyDown={focusNextElement}
          />
          <AvatarUpload
            value={formData.avatarUrl}
            onUpload={(url) => handleChange("avatarUrl", url)}
          />
          <ErrorMessage message={errors.avatarUrl} />

          <SubmitButton text="Generate Ticket" />

          {/* ✅ View Ticket Button */}
          <button
            type="button"
            className={`w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 rounded-md focus:ring focus:ring-gray-400 mt-2 ${
              hasTicket ? "" : "opacity-50 cursor-not-allowed"
            }`}
            onClick={() => router.push("/ticket")}
            disabled={!hasTicket}
            aria-disabled={!hasTicket}
          >
            View Ticket
          </button>
        </form>
      </div>
    </div>
  );
};
