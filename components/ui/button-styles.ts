/**
 * Estilos canónicos del sistema de botones de Devurity.
 * Mantiene la coherencia visual entre <Button> (acciones/async) y <LinkButton> (navegación).
 */

export const BUTTON_BASE =
  "inline-flex items-center justify-center gap-2 font-ubuntu rounded-full transition-[background-color,border-color,color,transform,box-shadow,opacity] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-variable-collection-link focus-visible:ring-offset-2 focus-visible:ring-offset-[#171212] disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 disabled:hover:shadow-none";

export const BUTTON_SIZE_CLASSES = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
} as const;

export const BUTTON_VARIANT_CLASSES = {
  primary:
    "bg-variable-collection-botones text-white hover:bg-[#a82320] hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-[0_10px_20px_-10px_rgba(202,43,38,0.5)]",
  secondary: "bg-variable-collection-selected text-white hover:bg-[#666]",
  outline:
    "border border-white/20 text-white/80 hover:border-variable-collection-link/60 hover:text-white hover:bg-red-600/10",
  ghost: "text-white/70 hover:text-white",
} as const;

export type ButtonVariant = keyof typeof BUTTON_VARIANT_CLASSES;
export type ButtonSize = keyof typeof BUTTON_SIZE_CLASSES;
