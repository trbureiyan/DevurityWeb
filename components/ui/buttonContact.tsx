"use client";

import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;

  /* Estilos configurables */
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  borderWidth?: string;
  rounded?: string;
  padding?: string;
  fontSize?: string;
  fontWeight?: string;

  /* Animaciones */
  hoverBorderColor?: string;
  hoverTextColor?: string;
  glow?: boolean;

  className?: string;
}

export default function Button({
  children,
  type = "button",
  disabled = false,
  loading = false,
  onClick,

  bgColor = "bg-transparent",
  textColor = "text-white",
  borderColor = "border-[#3d3d3d]",
  borderWidth = "border-[3px]",
  rounded = "rounded-lg",
  padding = "px-5 py-2",
  fontSize = "text-base",
  fontWeight = "font-bold",

  hoverBorderColor = "hover:border-variable-collection-link",
  hoverTextColor = "group-hover:text-variable-collection-link",
  glow = false,

  className = "",
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        group
        ${bgColor}
        ${textColor}
        ${borderWidth}
        ${borderColor}
        ${rounded}
        ${padding}
        ${fontSize}
        ${fontWeight}
        transition-all duration-300
        ${hoverBorderColor}
        disabled:opacity-50 disabled:cursor-not-allowed
        ${glow ? "hover:shadow-[0_0_15px_#ff0000]" : ""}
        ${className}
      `}
    >
      <span className={`${hoverTextColor} transition-colors`}>
        {loading ? "Enviando..." : children}
      </span>
    </button>
  );
}
