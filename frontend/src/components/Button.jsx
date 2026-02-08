import { Loader2 } from "lucide-react";

const Button = ({
  children,
  onClick,
  disabled = false,
  loading = false,
  variant = "primary",
  fullWidth = false,
}) => {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200";

  const variants = {
    primary:
      "bg-primary-600 text-white hover:bg-primary-700 shadow-soft active:scale-95",
    secondary:
      "bg-surfaceSoft text-text-primary border border-border hover:bg-surface",
    outline:
      "border border-border text-text-secondary hover:text-text-primary hover:border-primary-600",
    ghost:
      "bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface",
  };

  const disabledStyles =
    "opacity-60 cursor-not-allowed active:scale-100";

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${base}
        ${variants[variant]}
        ${fullWidth ? "w-full" : "px-6"}
        py-3
        ${disabled || loading ? disabledStyles : ""}
      `}
    >
      {loading && <Loader2 size={18} className="animate-spin" />}
      <span>{children}</span>
    </button>
  );
};

export default Button;
