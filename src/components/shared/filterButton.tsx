import ActionButtonProps from "@/types/actionButton.types";

export default function ActionButton({
  styles,
  icon,
  label,
  count,
  isLoading,
  ...props
}: ActionButtonProps) {
  return (
    <button
      {...props}
      className={`btn btn-outline btn-primary flex w-full items-center justify-center gap-2 relative sm:w-auto ${styles}`}
    >
      {isLoading ? (
        <span className="loading loading-spinner loading-sm mr-2" />
      ) : (
        icon
      )}
      <span className="leading-tight">{label}</span>
      {typeof count === "number" && count > 0 && (
        <span className="badge badge-sm badge-primary absolute -top-2 -right-2">
          {count}
        </span>
      )}
    </button>
  );
}
