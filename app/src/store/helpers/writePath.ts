import urlPath from './urlPath';

export default function writePath(directory) {
  let writePath = '';
  if (directory === 'root') {
    writePath = '/';
  } else {
    writePath = '/' + urlPath(directory) + '/';
  }
  return writePath;
}
