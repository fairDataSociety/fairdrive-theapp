import { FdpStorage } from '@fairdatasociety/fdp-storage';

export async function createDefaultDirectory(fdp: FdpStorage, podName: string) {
  return createDirectory(fdp, podName, '/', '');
}

export async function createDirectory(
  fdp: FdpStorage,
  podName: string,
  directory: string,
  directoryName: string
) {
  if (directory === 'root') {
    directory = '';
  }

  return fdp.directory.create(podName, `/${directory}/${directoryName}`);
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
