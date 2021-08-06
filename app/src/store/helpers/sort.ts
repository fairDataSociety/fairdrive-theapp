export default function sortByProp<
  A extends [],
  B extends number,
  C extends string
>(prop: B, up: C): (a: A, b: A) => 1 | -1 {
  if (up === 'asc') {
    return (a: A, b: A) => (a[prop] > b[prop] ? 1 : -1);
  } else {
    return (b: A, a: A) => (a[prop] > b[prop] ? 1 : -1);
  }
}
