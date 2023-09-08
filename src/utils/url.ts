export function formatUrl(path: string): string {
  return path.replace(/&/g, '/');
}

/**
 * Extracts an url ready for using in deeplink
 *
 * @param url URL
 */
export function extractDeeplinkURL(url: string): string {
  const parsedURL = new URL(url);

  return parsedURL.host + parsedURL.pathname + parsedURL.search;
}
