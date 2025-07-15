import Link from "next/link";
import { FaTelegram } from "react-icons/fa6";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer flex items-center p-4 bg-base-300 text-base-content">
      <div className="w-full max-w-screen-xl mx-auto flex justify-between items-center text-sm">
        <p className="text-xs">© {year} Rivintel. All rights reserved.</p>
        <Link
          href="https://t.me/rivintel"
          target="_blank"
          className="text-primary"
        >
          <FaTelegram className="text-xl" />
        </Link>
      </div>
    </footer>
  );
}
