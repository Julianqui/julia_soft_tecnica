import { useRef, useCallback } from "react";

export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Este es un ejemplo de closure - la función retornada mantiene acceso a timeoutRef y callback
  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
}
