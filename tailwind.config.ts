import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        jeju: ["Jeju Myeongjo", "serif"], // ✅ Custom font
      },
      fontSize: {
        navbar: "18px", // ✅ Navbar font size
        button: "16px", // ✅ Button font size
      },
      screens: {
        sm: { max: "768px" }, // ✅ 768px and below
        md: { min: "769px", max: "1440px" }, // ✅ Between 769px and 1440px
        lg: { min: "1441px" }, // ✅ 1441px and above
      },
    },
  },
  plugins: [],
} satisfies Config;
