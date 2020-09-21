export default function sortByProp(prop, up) {
  if (up === "asc") {
    return(a, b) => (
      a[prop] > b[prop]
      ? 1
      : -1);
  } else {
    return(b, a) => (
      a[prop] > b[prop]
      ? 1
      : -1);
  }
}
