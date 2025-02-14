import { useState } from "react";
import { useForm } from "@/context/FormContext";

const allowedFormats = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/svg+xml", "image/webp"];

const useUploadLogic = (setError: (msg: string) => void) => {
  const { dispatch } = useForm();
  const [uploading, setUploading] = useState(false);

  // ✅ Upload File to Cloudinary and Update State
  const handleFileUpload = async (file: File) => {
    if (!allowedFormats.includes(file.type)) {
      setError("❌ Invalid file type. Only JPEG, PNG, GIF, SVG, and WEBP are allowed.");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`❌ Upload failed with status ${response.status}`);
      }

      const data = await response.json();
      if (data.url) {
        dispatch({ type: "SET_PROFILE_PICTURE", payload: data.url });
      } else {
        setError("❌ Upload failed. Please try again.");
      }
    } catch (error) {
      console.error("❌ Upload Error:", error);
      setError("❌ Error uploading image.");
    } finally {
      setUploading(false);
    }
  };

  // ✅ Handle File Input Click Upload
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) await handleFileUpload(file);
  };

  // ✅ Handle Drag & Drop Upload
  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files[0];
    if (file) await handleFileUpload(file);
  };

  return { handleFileChange, handleDrop, uploading };
};

export default useUploadLogic;
