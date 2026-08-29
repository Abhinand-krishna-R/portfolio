import { useState, useEffect } from 'react';
import { useReducedMotion } from './useMediaQuery';

export function useVines() {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setShouldAnimate(false);
      setIsReady(true);
      return;
    }
    const played = sessionStorage.getItem('vines-played');
    if (!played) {
      setShouldAnimate(true);
      sessionStorage.setItem('vines-played', 'true');
    } else {
      setShouldAnimate(false);
    }
    setIsReady(true);
  }, [reducedMotion]);

  return { shouldAnimate, isReady };
}
