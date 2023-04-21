import {
  useEffect,
  useRef,
} from 'react';

export function useEnsuredForwardedRef(
  forwardedRef
) {
  const ensuredRef = useRef(forwardedRef && forwardedRef.current);

  useEffect(() => {
    if (!forwardedRef) {
      return;
    }
    forwardedRef.current = ensuredRef.current;
  }, [forwardedRef]);

  return ensuredRef;
}
