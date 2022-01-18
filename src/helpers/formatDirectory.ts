import formatURL from '@helpers/formatURL';

export default function writePath(directory: string): string {
  return directory === 'root' ? '/' : '/' + formatURL(directory) + '/';
}
