/**
 * Checks that object is empty
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function isEmpty(obj: object): boolean {
  return Object.keys(obj).length === 0;
}
