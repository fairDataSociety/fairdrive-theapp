export const shortenTitle = (title: string, maxLenght: number): string => {
  if (title.length > maxLenght) {
    return `${title.slice(0, 10)}...${title.slice(title.length - 10)}`;
  } else {
    return title;
  }
};
