import ActionButtonProps from "@/types/actionButton.types";

export default function ActionButton({
  icon,
  label,
  count,
  isLoading,
  ...props
}: ActionButtonProps) {
  return (
    <button
      {...props}
      className="btn btn-outline btn-primary flex items-center gap-2 relative"
    >
      {isLoading ? (
        <span className="loading loading-spinner loading-sm mr-2" />
      ) : (
        icon
      )}
      {label}
      {typeof count === "number" && count > 0 && (
        <span className="badge badge-sm badge-primary absolute -top-2 -right-2">
          {count}
        </span>
      )}
    </button>
  );
}
