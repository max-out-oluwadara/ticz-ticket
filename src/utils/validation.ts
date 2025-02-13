export interface FormData {
  fullName: string;
  email: string;
  avatarUrl: string;
}

export interface FormErrors {
  fullName?: string;
  email?: string;
  avatarUrl?: string;
}

export const validateForm = (data: FormData): FormErrors => {
  const errors: FormErrors = {};

  // 🔹 Full Name validation
  if (!data.fullName.trim()) {
    errors.fullName = "Full Name is required.";
  }

  // 🔹 Email validation (Ensures correct error messaging)
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!emailPattern.test(data.email)) {
    errors.email = "Not a valid email address."; // ✅ Now explicitly states invalid email
  }

  // 🔹 Avatar URL validation
  const imageUrlPattern = /^https?:\/\/.*\.(jpeg|jpg|png|gif|svg|webp)$/i;
  if (!data.avatarUrl.trim()) {
    errors.avatarUrl = "Avatar upload is required.";
  } else if (!imageUrlPattern.test(data.avatarUrl)) {
    errors.avatarUrl = "Enter a valid image URL (Cloudinary or external hosting).";
  }

  return errors;
};
