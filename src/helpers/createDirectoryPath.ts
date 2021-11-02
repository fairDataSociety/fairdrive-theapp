export function createDirectoryPath(
  directoryName: string,
  path: string
): string {
  let directoryPath = '';
  if (path !== 'root') {
    directoryPath = path + '/' + directoryName;
  } else {
    directoryPath = directoryName;
  }

  return directoryPath;
}
