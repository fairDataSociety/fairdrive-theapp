import { Cookie } from 'src/types/models/Cookie';
import { CookieFile } from 'src/types/models/CookiesFile';
import { IDirectory } from 'src/types/models/Directory';
import { previewFile } from '../file';

const MAX_PARALLEL_DOWNLOADS = 3;

export async function getCookiePage(
  dirs: IDirectory[],
  index: number,
  size: number
): Promise<Cookie[]> {
  const downloadPromises: Promise<Blob>[] = [];

  for (let i = index; i < dirs.length && i < index + size; i++) {
    const dirName = dirs[i].name;

    // TODO Extract constants
    downloadPromises.push(previewFile('Cookies.json', dirName, 'Consents'));

    if (downloadPromises.length >= MAX_PARALLEL_DOWNLOADS) {
      await Promise.any(downloadPromises);
    }
  }

  const blobs = await Promise.all(downloadPromises);

  const cookieContent: CookieFile[] = await Promise.all(
    blobs.map(async (blob) => {
      try {
        return JSON.parse(await blob.text());
      } catch (error) {
        return { cookies: [] };
      }
    })
  );

  return cookieContent.reduce(
    (result, content) => result.concat(content.cookies),
    []
  );
}
