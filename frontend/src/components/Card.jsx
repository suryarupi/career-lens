import React from "react";

const Card = ({
  children,
  title,
  icon: Icon,
  className = "",
  variant = "default",
}) => {
  const base =
    "rounded-3xl border border-border overflow-hidden transition-all";

  const variants = {
    default: "bg-surface shadow-card",
    glass: "bg-surface/70 backdrop-blur-glass shadow-soft",
  };

  return (
    <div className={`${base} ${variants[variant]} ${className}`}>
      {title && (
        <div className="flex items-center gap-3 px-6 py-4 border-b border-border bg-surfaceSoft">
          {Icon && (
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary-600/10 text-primary-400">
              <Icon size={18} />
            </div>
          )}
          <h3 className="text-lg font-semibold text-text-primary tracking-tight">
            {title}
          </h3>
        </div>
      )}

      <div className="p-6">{children}</div>
    </div>
  );
};

export default Card;
