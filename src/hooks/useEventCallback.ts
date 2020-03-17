import {useCallback, useEffect, useRef} from 'react';
export default function useEventCallback(fn: () => void, dependencies: any[]) {
  const ref = useRef(() => {
    console.log(new Error('Cannot call an event handler while rendering.'));
  });

  useEffect(() => {
    ref.current = fn;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fn, ...dependencies]);

  return useCallback(() => {
    const fn = ref.current;
    return fn();
  }, [ref]);
}
