import { ROOT_DIRECTORY } from 'src/constants/constants';

export function createDirectoryPath(
  directoryName: string,
  path: string
): string {
  let directoryPath = '';
  if (path !== ROOT_DIRECTORY) {
    directoryPath = path + '/' + directoryName;
  } else {
    directoryPath = directoryName;
  }

  return directoryPath;
}
