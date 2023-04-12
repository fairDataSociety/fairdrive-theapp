import { FdpStorage } from '@fairdatasociety/fdp-storage';
import { DirectoryItem } from '@fairdatasociety/fdp-storage/dist/content-items/types';
import { getUnixTimestamp } from '@utils/formatDate';

export async function createDirectory(
  fdp: FdpStorage,
  podName: string,
  directory: string,
  directoryName: string
): Promise<DirectoryItem> {
  if (directory === 'root') {
    directory = '';
  }

  await fdp.directory.create(podName, `${directory}${directoryName}`);
  const time = getUnixTimestamp();
  return {
    name: directoryName,
    directories: [],
    files: [],
    // todo: return correct metadata after implementation https://github.com/fairDataSociety/fdp-storage/issues/229
    raw: {
      fileOrDirNames: [],
      meta: {
        creationTime: time,
        version: 0,
        path: '',
        name: '',
        modificationTime: time,
        accessTime: time,
        mode: 0,
      },
    },
  };
}

export const deleteDirectory = async (
  fdp: FdpStorage,
  payload: {
    podName: string;
    path: string;
  }
) => {
  try {
    const { podName, path } = payload;

    await fdp.directory.delete(podName, path);

    return true;
  } catch (error) {
    return Promise.reject(error);
  }
};
