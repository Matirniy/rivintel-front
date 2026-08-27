export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer flex items-center justify-center py-3 sm:py-5 border-t border-base-300 bg-base-100 text-base-content">
      <div className="w-full max-w-(--breakpoint-xl) px-3 sm:px-4 flex flex-col sm:flex-row gap-1 sm:gap-0 justify-center sm:justify-between items-center text-sm text-center">
        <p className="text-xs">© {year} Rivintel. All rights reserved.</p>
        <a
          href="mailto:rivintel.contact@gmail.com"
          className="text-xs text-primary hover:underline"
        >
          rivintel.contact@gmail.com
        </a>
      </div>
    </footer>
  );
}
