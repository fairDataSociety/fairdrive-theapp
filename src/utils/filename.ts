export function extractFileExtension(fileName: string): string {
  return fileName.split('.').pop();
}

/**
 * Join parts to path with removing a certain number of parts from the end
 *
 * @param parts parts of path
 * @param minusParts hom many parts should be removed
 */
export function getPathFromParts(parts: string[], minusParts = 0): string {
  if (parts.length === 0) {
    throw new Error('Parts list is empty');
  }

  if (parts[0] !== '/') {
    throw new Error('Path parts must start with "/"');
  }

  if (parts.length <= minusParts) {
    throw new Error('Incorrect parts count');
  }

  return '/' + parts.slice(1, parts.length - minusParts).join('/');
}

/**
 * Replace all occurrences of a string with another string
 *
 * @param data input string
 * @param search string to search for
 * @param replacement string to replace with
 */
export function replaceAll(
  data: string,
  search: string,
  replacement: string
): string {
  return data.replace(new RegExp(search, 'g'), replacement);
}

/**
 * Combine passed parts of path to full path
 *
 * @param parts path parts to combine
 */
export function combine(...parts: string[]): string {
  // remove empty items
  parts = parts.filter((item) => item !== '');
  // remove slashes if element contains not only slash
  parts = parts.map((part) =>
    part.length > 1 ? replaceAll(part, '/', '') : part
  );

  // add slash to the start of parts if it is not the first element
  if (parts[0] !== '/') {
    parts.unshift('/');
  }

  return getPathFromParts(parts);
}

export function constructPath(path: string, folder: string): string {
  return path?.endsWith('/') ? path + folder : `${path}/${folder}`;
}

export function rootPathToRelative(path: string): string {
  return path.startsWith('/') ? path.substring(1) : path;
}
