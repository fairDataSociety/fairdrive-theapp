import { CONSENTS_POD, COOKIES_FILENAME } from 'src/constants/constants';
import { Cookie } from 'src/types/models/Cookie';
import { CookieFile } from 'src/types/models/CookieFile';
import { IDirectory } from 'src/types/models/Directory';
import { previewFile } from '../file';

const MAX_PARALLEL_DOWNLOADS = 3;

const downloadCookieFile = async (directory: string): Promise<CookieFile> => {
  try {
    const blob = await previewFile(COOKIES_FILENAME, directory, CONSENTS_POD);
    return JSON.parse(await blob.text());
  } catch (error) {
    if (error?.status === 404) {
      return { cookies: [] };
    }
    throw error;
  }
};

export async function getCookiePage(
  dirs: IDirectory[],
  index: number,
  size: number
): Promise<Cookie[]> {
  const downloadPromises: Promise<CookieFile>[] = [];

  for (let i = index; i < dirs.length && i < index + size; i++) {
    const dirName = dirs[i].name;

    // TODO Extract constants
    downloadPromises.push(downloadCookieFile(dirName));

    if (downloadPromises.length >= MAX_PARALLEL_DOWNLOADS) {
      await Promise.any(downloadPromises);
    }
  }

  const cookieContent: CookieFile[] = await Promise.all(downloadPromises);

  return cookieContent.reduce(
    (result, content) => result.concat(content.cookies),
    []
  );
}
