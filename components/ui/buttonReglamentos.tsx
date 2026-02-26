"use client";

import React from "react";

type ButtonSize = "sm" | "md" | "lg";
type ButtonVariant = "solid" | "outline";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;

  size?: ButtonSize;
  variant?: ButtonVariant;

  bgColor?: string;
  textColor?: string;
  borderColor?: string;

  rounded?: string;
  fontSize?: string;
  fontWeight?: string;

  hoverBgColor?: string;

  disabled?: boolean;
  loading?: boolean;

  className?: string;
}

const sizeMap: Record<ButtonSize, string> = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

export default function Button({
  children,
  onClick,

  size = "md",
  variant = "outline",

  bgColor = "transparent",
  textColor = "var(--color-variable-collection-botones)",
  borderColor = "var(--color-variable-collection-botones)",

  rounded = "0.375rem",
  fontSize,
  fontWeight = "500",

  hoverBgColor = "rgba(255,255,255,0.08)",

  disabled = false,
  loading = false,

  className = "",
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        ${sizeMap[size]}
        border
        transition-colors duration-300
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
      style={{
        backgroundColor: variant === "solid" ? bgColor : "transparent",
        color: textColor,
        borderColor,
        borderRadius: rounded,
        fontSize,
        fontWeight,
      }}
      onMouseEnter={(e) => {
        if (!disabled) e.currentTarget.style.backgroundColor = hoverBgColor;
      }}
      onMouseLeave={(e) => {
        if (!disabled)
          e.currentTarget.style.backgroundColor =
            variant === "solid" ? bgColor : "transparent";
      }}
    >
      {loading ? "Cargando..." : children}
    </button>
  );
}
