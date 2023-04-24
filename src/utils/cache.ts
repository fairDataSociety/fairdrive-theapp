import { isJSONValid } from '@utils/object';

/**
 * Cache types
 */
export enum CacheType {
  FDP = 'fdp_cache',
  CONTENT_ITEMS = 'content_items_cache',
}

/**
 * Content types of item
 */
export enum ContentType {
  FILE = 'file',
  DIRECTORY = 'directory',
}

/**
 * Memory caching in case of `localStorage` is not available
 */
let memoryCache = '';

/**
 * Key value type
 */
type AnyObject = {
  [key: string]: any;
};

/**
 * Items like file or directory which has a name
 */
interface NamedItem {
  name: string;
}

interface ContentItemsCache {
  cache: any;
  contentItems: any;
}

function createNestedKeys(keys: string[], obj: AnyObject): AnyObject {
  let currentObj = obj;

  for (const key of keys) {
    if (!Object.prototype.hasOwnProperty.call(currentObj, key)) {
      currentObj[key] = {};
    }
    currentObj = currentObj[key];
  }

  return obj;
}

/**
 * Asserts that value is a valid JSON
 */
function assertJson(value: unknown): asserts value is string {
  const data = value as string;
  if (!isJSONValid(data)) {
    throw new Error('Data is not a valid JSON');
  }
}

/**
 * Removes an item from an array
 */
function removeItem(items: NamedItem[], nameToRemove: string): NamedItem[] {
  return items.filter((item) => item.name !== nameToRemove);
}

/**
 * Clears memory cache
 */
export function clearMemoryCache(): void {
  memoryCache = '';
}

/**
 * Checks that `localStorage` is available
 */
export function isLocalStorageAvailable(): boolean {
  return (
    typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
  );
}

/**
 * Saves cache to `localStorage` or memory
 */
export function saveCache(type: CacheType, cache: string): void {
  assertJson(cache);
  if (isLocalStorageAvailable()) {
    window.localStorage.setItem(type, cache);
  } else {
    memoryCache = cache;
  }
}

/**
 * Gets cache from `localStorage` or memory
 */
export function getCache(type: CacheType): string {
  let cache;
  if (isLocalStorageAvailable()) {
    cache = window.localStorage.getItem(type);
  } else {
    cache = memoryCache;
  }

  return isJSONValid(cache) ? cache : '{}';
}

/**
 * Saves content items cache
 */
export function saveContentItemsCache(
  userAddress: string,
  podName: string,
  path: string,
  contentItems: string
): void {
  let cache = JSON.parse(getCache(CacheType.CONTENT_ITEMS));
  cache = createNestedKeys([userAddress, podName, path], cache);
  cache[userAddress][podName][path] = contentItems;
  saveCache(CacheType.CONTENT_ITEMS, JSON.stringify(cache));
}

/**
 * Gets content items from the cache
 *
 * @returns {ContentItemsCache} parsed cache content
 */
export function getContentItemsCache(
  userAddress: string,
  podName: string,
  path: string
): ContentItemsCache {
  const json = getCache(CacheType.CONTENT_ITEMS);
  assertJson(json);
  const cache = JSON.parse(json);
  const contentItems = JSON.parse(
    cache?.[userAddress]?.[podName]?.[path] ?? '{}'
  );

  return { cache, contentItems };
}

/**
 * Removes a content item from the cache
 */
export function removeItemFromCache(
  userAddress: string,
  podName: string,
  path: string,
  itemName: string,
  type: ContentType
): void {
  const { cache, contentItems } = getContentItemsCache(
    userAddress,
    podName,
    path
  );
  if (type === ContentType.FILE) {
    contentItems.files = removeItem(contentItems.files, itemName);
  } else if (type === ContentType.DIRECTORY) {
    contentItems.directories = removeItem(contentItems.directories, itemName);
  } else {
    throw new Error('Unknown content type');
  }

  cache[userAddress][podName][path] = JSON.stringify(contentItems);
  saveCache(CacheType.CONTENT_ITEMS, JSON.stringify(cache));
}

/**
 * Adds an item to the cache
 */
export function addItemToCache(
  userAddress: string,
  podName: string,
  path: string,
  item: unknown,
  type: ContentType
): void {
  const { cache, contentItems } = getContentItemsCache(
    userAddress,
    podName,
    path
  );
  if (type === ContentType.FILE) {
    contentItems.files.push(item);
  } else if (type === ContentType.DIRECTORY) {
    contentItems.directories.push(item);
  } else {
    throw new Error('Unknown content type');
  }

  cache[userAddress][podName][path] = JSON.stringify(contentItems);
  saveCache(CacheType.CONTENT_ITEMS, JSON.stringify(cache));
}

/**
 * Removes a path from the cache
 */
export function removePathFromCache(
  userAddress: string,
  podName: string,
  path: string
): void {
  const cache = JSON.parse(getCache(CacheType.CONTENT_ITEMS));

  if (cache?.[userAddress]?.[podName]?.[path]) {
    delete cache[userAddress][podName][path];
  }

  saveCache(CacheType.CONTENT_ITEMS, JSON.stringify(cache));
}
