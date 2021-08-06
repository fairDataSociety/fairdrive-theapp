/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function sortByProp(
  prop: any,
  up: any
): (a: any, b: any) => 1 | -1 {
  if (up === 'asc') {
    return (a: any, b: any) => (a[prop] > b[prop] ? 1 : -1);
  } else {
    return (b: any, a: any) => (a[prop] > b[prop] ? 1 : -1);
  }
}
