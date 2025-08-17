import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
      },
      boxShadow: {
        "primary-glow":
          "0 0 8px 2px rgba(59, 130, 246, 0.7), 0 0 12px 4px rgba(59, 130, 246, 0.7)",
      },
    },
  },
  plugins: [daisyui],
};

export default config;
