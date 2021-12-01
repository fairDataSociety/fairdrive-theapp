import { ROOT_DIRECTORY } from 'src/constants/constants';
import urlPath from './urlPath';

export default function writePath(directory: string): string {
  let writePath = '';
  if (directory === ROOT_DIRECTORY) {
    writePath = '/';
  } else {
    writePath = '/' + urlPath(directory) + '/';
  }
  return writePath;
}
