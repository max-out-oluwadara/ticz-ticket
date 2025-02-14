"use client";

import React, { useState } from "react";
import Image from "next/image"; // ✅ Use Next.js Image for Optimization
import UploadIcon from "@/assets/upload-icon.svg";
import { useForm } from "@/context/FormContext"; // ✅ Import Global State

export const UploadSection: React.FC = () => {
  const { state, dispatch } = useForm(); // ✅ Access global state
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const allowedFormats = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/svg+xml",
    "image/webp",
  ];

  // ✅ Handle Drag & Drop Upload
  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);

    const file = event.dataTransfer.files[0];
    if (file) {
      console.log("📂 File Dropped:", file);
      await handleFileUpload(file);
    }
  };

  // ✅ Handle File Input Click Upload
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("📂 File Selected:", file);
      await handleFileUpload(file);
    }
  };

  // ✅ Upload File to Cloudinary and Update Global State
  const handleFileUpload = async (file: File) => {
    if (!allowedFormats.includes(file.type)) {
      setError(
        "❌ Invalid file type. Only JPEG, PNG, GIF, SVG, and WEBP are allowed."
      );
      return;
    }

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      console.log("⏳ Uploading file to Cloudinary...");
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`❌ Upload failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ Cloudinary Response:", data); // ✅ Log Cloudinary response

      if (data.url) {
        dispatch({ type: "SET_PROFILE_PICTURE", payload: data.url }); // ✅ Store URL in global state
        console.log("✅ Updated State Profile Picture:", data.url); // ✅ Log updated state
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

  return (
    <div className="p-[24px] pb-[48px] rounded-[24px] border border-[#07373F] backdrop-blur-[7px] flex flex-col bg-[#052228]">
      <h2 className="text-white text-lg font-semibold mt-[24px] mb-[32px] text-left">
        Upload Profile Picture
      </h2>

      {/* Container that changes layout based on screen size */}
      <div className="flex justify-center">
        {/* Display Uploaded Image from Cloudinary on md/lg Screens */}
        {state.profilePicture ? (
          <Image
            src={state.profilePicture} // ✅ Load from Cloudinary
            alt="Uploaded"
            width={508}
            height={200}
            className="object-cover w-full h-full sm:hidden md:block lg:block rounded-[16px] border border-[#07373F]"
          />
        ) : (
          <div
            className={`relative w-[508px] h-[200px] bg-[rgba(0,0,0,0.2)] sm:hidden md:block lg:block ${
              dragging ? "border-2 border-dashed border-[#24A0B5]" : ""
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
          >
            <div className="absolute inset-0 flex justify-center items-center">
              <div
                className="w-[240px] h-[240px] p-[24px] bg-[#0E464F] border-[4px] border-[rgba(36,160,181,0.5)] rounded-[32px] flex flex-col items-center justify-center gap-[16px] cursor-pointer"
                onClick={() => document.getElementById("fileInput")?.click()}
              >
                <UploadIcon className="h-10 w-10 text-white" />
                <p className="text-white text-center text-sm">
                  {uploading ? "Uploading..." : "Drag & Drop or Click to Upload"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Upload box only visible on small screens */}
        <div className="block md:hidden lg:hidden mt-6">
          {state.profilePicture ? (
            <Image
              src={state.profilePicture} // ✅ Load from Cloudinary
              alt="Uploaded"
              width={240}
              height={240}
              className="object-cover w-[240px] h-[240px] rounded-[16px] border border-[#07373F]"
            />
          ) : (
            <div
              className="w-[240px] h-[240px] p-[24px] bg-[#0E464F] border-[4px] border-[rgba(36,160,181,0.5)] rounded-[32px] flex flex-col items-center justify-center gap-[16px] cursor-pointer"
              onClick={() => document.getElementById("fileInput")?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setDragging(true);
              }}
              onDrop={handleDrop}
            >
              <UploadIcon className="h-10 w-10 text-white" />
              <p className="text-white text-center text-sm">
                {uploading ? "Uploading..." : "Drag & Drop or Click to Upload"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        id="fileInput"
        type="file"
        accept="image/jpeg, image/png, image/gif, image/svg+xml, image/webp"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
    </div>
  );
};

export default UploadSection;
