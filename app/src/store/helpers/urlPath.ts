export default function urlPath(path: string): string {
  return path.replace(/&/g, '/');
}
