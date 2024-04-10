import { useEffect, useState } from 'react';

export const useDebounce = <T>(rawValue: T, duration = 400) => {
  const [value, setValue] = useState(rawValue);

  useEffect(() => {
    const timeout = setTimeout(() => setValue(rawValue), duration);
    return () => clearTimeout(timeout);
  }, [rawValue, duration]);

  return value;
};

export const debounce = (fn: () => unknown, ms: number) => {
  let timer: NodeJS.Timeout | null;
  return (...args: any) => {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, args);
    }, ms);
  };
};
