import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#422ad5",
      },
      boxShadow: {
        "primary-glow":
          "0 0 8px 2px rgba(59, 130, 246, 0.7), 0 0 12px 4px rgba(59, 130, 246, 0.7)",
      },
      keyframes: {
        growFade: {
          "0%": { fontSize: "30rem", opacity: "0.8", zIndex: "12" },
          "100%": { fontSize: "18rem", opacity: "0.2", zIndex: "8" },
        },
      },
      animation: {
        growFade: 'growFade 3s ease-in-out forwards',
      },
    },
  },
  plugins: [daisyui],
};

export default config;
