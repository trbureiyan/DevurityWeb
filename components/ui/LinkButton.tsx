"use client";

import React from "react";
import clsx from "clsx";

type ButtonSize = "sm" | "md" | "lg";
type ButtonVariant = "solid" | "outline";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  size?: ButtonSize;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

const sizeMap: Record<ButtonSize, string> = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

const variantMap: Record<ButtonVariant, string> = {
  solid:
    "bg-blue-600 text-white border-transparent hover:bg-blue-700 active:scale-95",
  outline:
    "bg-transparent text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white active:scale-95",
};

export default function LinkButton({
  children,
  onClick,
  size = "md",
  variant = "outline",
  disabled = false,
  loading = false,
  className = "",
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      onClick={onClick}
      className={clsx(
        "border rounded-md font-medium transition-all duration-200",
        sizeMap[size],
        variantMap[variant],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {loading ? "Cargando..." : children}
    </button>
  );
}