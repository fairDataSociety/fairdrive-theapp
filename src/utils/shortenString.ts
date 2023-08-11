export default function shortenString(
  title: string,
  maxLength: number,
  cutX = 10
): string {
  if (title && title.length > maxLength) {
    return `${title.slice(0, cutX)}...${title.slice(title.length - cutX)}`;
  } else {
    return title;
  }
}
