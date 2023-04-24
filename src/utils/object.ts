/**
 * Checks that object is empty
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function isEmpty(obj: object): boolean {
  return Object.keys(obj).length === 0;
}

/**
 * Checks that string is valid JSON
 */
export function isJSONValid(jsonString: string): boolean {
  try {
    JSON.parse(jsonString);
  } catch (e) {
    return false;
  }

  return true;
}
