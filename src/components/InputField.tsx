import React from "react";
import { focusNextElement } from "@/utils/accessibility";

interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (name: string, value: string) => void;
  error?: string;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void; // ✅ Add onKeyDown prop
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  error,
  onKeyDown = focusNextElement, // ✅ Default to focusNextElement if not provided
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        onKeyDown={onKeyDown} // ✅ Allows navigating using Enter/Space
        className={`mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-white ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 dark:border-gray-600"
        }`}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${name}-error` : undefined}
        aria-required="true"
        aria-label={label}
        tabIndex={0} // ✅ Makes sure it's focusable
      />
      {error && (
        <p
          id={`${name}-error`}
          className="text-red-500 text-sm mt-1"
          aria-live="assertive"
        >
          {error}
        </p>
      )}
    </div>
  );
};
