import {useCallback, useEffect, useRef} from 'react';

export default function Hooks<A extends any[]>(fn: (...args: A) => void, dependencies: any[]) {
  const ref = useRef((...args: A) => {
    console.log(new Error('Cannot call an event handler while rendering.'));
  });

  useEffect(() => {
    ref.current = fn;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fn, ...dependencies]);

  return useCallback(
    (...args: A) => {
      const fun = ref.current;
      return fun(...args);
    },
    [ref]
  );
}
