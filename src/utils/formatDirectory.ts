import formatURL from '@utils/formatURL';

export default function writePath(directory: string): string {
  return directory === 'root' ? '/' : '/' + formatURL(directory) + '/';
}
