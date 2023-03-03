import { useEffect, useRef, useState } from 'react';

export const useDebounceOrThrottle = <A extends any[]>(
  delayMode: 'debouncing' | 'throttling',
  wait: number,
  callback: (...args: A) => void
) => {
  switch (delayMode) {
    case 'debouncing':
      return useDebounce(callback, wait);
    default:
      return useThrottle(callback, wait);
  }
};

export const useThrottle = <A extends any[]>(
  func: (...args: A) => void,
  delay: number
) => {
  const [timeout, saveTimeout] = useState<any | null>(null);

  const throttledFunc = function (...args: A) {
    if (timeout) {
      clearTimeout(timeout);
    }

    const newTimeout = setTimeout(() => {
      func(...args);
      if (newTimeout === timeout) {
        saveTimeout(null);
      }
    }, delay);

    saveTimeout(newTimeout);
  };

  return throttledFunc;
};

export const useDebounce = <A extends any[]>(
  callback: (...args: A) => void,
  wait: number
) => {
  // track args & timeout handle between calls
  const argsRef = useRef<A>();
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  function cleanup() {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  }

  // make sure our timeout gets cleared if
  // our consuming component gets unmounted
  useEffect(() => cleanup, []);

  return function debouncedCallback(...args: A) {
    // capture latest args
    argsRef.current = args;

    // clear debounce timer
    cleanup();

    // start waiting again
    timeout.current = setTimeout(() => {
      if (argsRef.current) {
        callback(...argsRef.current);
      }
    }, wait);
  };
};
