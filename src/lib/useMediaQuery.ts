import { useState, useEffect } from 'react';

/**
 * useMediaQuery
 * Reactive wrapper around window.matchMedia.
 * Initializes correctly for SSR by defaulting to false.
 *
 * @param query — A CSS media query string, e.g. mq.mobile
 * @returns boolean — whether the query currently matches
 *
 * Usage:
 *   const isMobile = useMediaQuery(mq.mobile);
 *   const isTablet = useMediaQuery(mq.tablet);
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    setMatches(mediaQueryList.matches);

    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
    mediaQueryList.addEventListener('change', handler);
    return () => mediaQueryList.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

/**
 * useReducedMotion
 * Reactive wrapper for prefers-reduced-motion.
 *
 * Usage:
 *   const reducedMotion = useReducedMotion();
 */
export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
