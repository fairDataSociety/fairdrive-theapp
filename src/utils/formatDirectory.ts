import { formatUrl } from '@utils/url';

export default function writePath(directory: string): string {
  return directory === 'root' ? '/' : '/' + formatUrl(directory) + '/';
}
