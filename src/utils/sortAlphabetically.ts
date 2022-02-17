export default function sortAlphabetically(list: string[]): string[] {
  if (!list || list.length === 0) {
    return [];
  }

  list.sort((a: string, b: string) => {
    if (a < b) return -1;
    if (a > b) return 1;

    return 0;
  });

  return list;
}
