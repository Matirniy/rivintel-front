export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer flex items-center justify-center py-5 bg-base-300 text-base-content">
      <div className="w-full max-w-screen-xl px-2 flex justify-between items-center text-sm">
        <p className="text-xs">© {year} Rivintel. All rights reserved.</p>
        <a
          href="mailto:rivintel.contact@gmail.com"
          className="text-xs text-blue-800 hover:underline"
        >
          rivintel.contact@gmail.com
        </a>
      </div>
    </footer>
  );
}
