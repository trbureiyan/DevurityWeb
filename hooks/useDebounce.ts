import { useState, useEffect } from "react";

/**
 * Retrasa la actualizacion de un valor durante un periodo determinado.
 * Util para evitar peticiones excesivas durante la escritura rapida en campos de busqueda.
 *
 * @param value - El valor a debounce (string, numero, etc.).
 * @param delay - Milisegundos de espera antes de propagar el valor. Por defecto 500ms.
 * @returns El valor debounced que solo se actualiza tras `delay` ms de inactividad.
 *
 * @example
 * ```ts
 * const [search, setSearch] = useState("");
 * const debouncedSearch = useDebounce(search, 300);
 *
 * useEffect(() => {
 *   if (debouncedSearch) fetchResults(debouncedSearch);
 * }, [debouncedSearch]);
 * ```
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
