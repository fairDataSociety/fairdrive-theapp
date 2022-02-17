export default function shortenString(
  title: string,
  maxLength: number
): string {
  if (title.length > maxLength) {
    return `${title.slice(0, 10)}...${title.slice(title.length - 10)}`;
  } else {
    return title;
  }
}
