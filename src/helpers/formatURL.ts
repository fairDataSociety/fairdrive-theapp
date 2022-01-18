export default function formatURL(path: string): string {
  return path.replace(/&/g, '/');
}
