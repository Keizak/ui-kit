import { useEffect, useState } from 'react';

export const useDebounce = <T>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Выставить debouncedValue равным value (переданное значение)
    // после заданной задержки
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Вернуть функцию очистки, которая будет вызываться каждый раз, когда ...
    // ... useEffect вызван снова. useEffect будет вызван снова, только если ...
    // ... value будет изменено .
    // Так мы избегаем изменений debouncedValue, если значение value ...
    // ... поменялось в рамках интервала задержки.
    // Таймаут очищается и стартует снова.
    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
};
