import React, { useRef, useState } from "react";
import { focusNextElement } from "@/utils/accessibility";

interface AvatarUploadProps {
  value: string;
  onUpload: (url: string) => void;
  error?: string;
}

export const AvatarUpload: React.FC<AvatarUploadProps> = ({ value, onUpload, error }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 🔹 Validate file type & size (Max 5MB)
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setLocalError("Only JPG, PNG, GIF, and WEBP images are allowed.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setLocalError("File size must be under 5MB.");
      return;
    }

    setLocalError(null);
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.url) {
        onUpload(data.url); // ✅ Save Cloudinary URL
      } else {
        setLocalError("Upload failed. Try again.");
        console.error("Upload failed:", data.error);
      }
    } catch (error) {
      setLocalError("Upload request failed. Please check your connection.");
      console.error("Upload request failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Upload Avatar
      </label>
      <div className="mt-2 flex items-center">
        {/* Avatar Display */}
        {value ? (
          <img src={value} alt="Uploaded Avatar" className="h-16 w-16 rounded-full border" />
        ) : (
          <div className="h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-400">No Image</span>
          </div>
        )}

        {/* Upload Button */}
        <button
          type="button"
          className="ml-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm focus:outline-none focus:ring focus:ring-blue-300 disabled:opacity-50"
          onClick={() => fileInputRef.current?.click()}
          disabled={loading}
          aria-disabled={loading}
          onKeyDown={focusNextElement} // ✅ Enables keyboard navigation
        >
          {loading ? (
            <span className="animate-spin h-4 w-4 border-t-2 border-white rounded-full"></span>
          ) : (
            "Upload"
          )}
        </button>
      </div>

      {/* Hidden File Input */}
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />

      {/* Error Messages */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      {localError && <p className="text-red-500 text-sm mt-1">{localError}</p>}
    </div>
  );
};
