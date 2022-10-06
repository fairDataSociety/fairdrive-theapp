import { FdpStorage } from '@fairdatasociety/fdp-storage';

export async function createDirectory(
  fdp: FdpStorage,
  podName: string,
  directory: string,
  directoryName: string
) {
  // Dir = "/" + path + "/"
  // TODO write helper for this piece of code

  let data = { dir_path: '' };

  if (directory === 'root') {
    data = {
      dir_path: '/' + directoryName,
    };
  } else {
    data = {
      dir_path: '/' + directory + '/' + directoryName,
    };
  }
  try {
    await fdp.directory.create(podName, data.dir_path);

    return true;
  } catch (error) {
    return error;
  }
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
