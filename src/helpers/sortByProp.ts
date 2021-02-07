export default function sortByProp(prop:any, up:any) {
  if (up === "asc") {
    return(a:any, b:any) => (
      a[prop] > b[prop]
      ? 1
      : -1);
  } else {
    return(b:any, a:any) => (
      a[prop] > b[prop]
      ? 1
      : -1);
  }
}
