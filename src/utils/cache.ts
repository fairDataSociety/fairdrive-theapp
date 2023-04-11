export const CACHE_KEY = 'fdp_cache';

let memoryCache = '';

/**
 * Checks that `localStorage` is available
 */
export function isLocalStorageAvailable(): boolean {
  return typeof window.localStorage !== 'undefined';
}

/**
 * Saves cache to `localStorage` or memory
 */
export function saveCache(cache: string): void {
  if (isLocalStorageAvailable()) {
    window.localStorage.setItem(CACHE_KEY, cache);
  } else {
    memoryCache = cache;
  }
}

/**
 * Gets cache from `localStorage` or memory
 */
export function getCache(): string {
  let cache;
  if (isLocalStorageAvailable()) {
    cache = window.localStorage.getItem(CACHE_KEY);
  } else {
    cache = memoryCache;
  }

  return cache || '{}';
}
