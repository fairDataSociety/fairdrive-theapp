export default function urlPath(path: string) {
  return path.replace(/&/g, "/");
}
