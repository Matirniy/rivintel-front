"use client";

export default function SearchModal({
  modalType,
  onClose,
  children,
}: {
  modalType: "filters" | "map" | "sort" | null;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!modalType) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-base-100 p-6 rounded shadow-md w-[90%] max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
