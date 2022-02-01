import axios from '@api/customAxios';

export async function createDirectory(
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
    // TODO Use custom axios
    // eslint-disable-next-line
    const createDirectory = await axios({
      baseURL: process.env.NEXT_PUBLIC_FAIROSHOST,
      method: 'POST',
      url: 'dir/mkdir',
      data: JSON.stringify({
        dir_path: data.dir_path,
        dir_name: directoryName,
        pod_name: podName,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    return true;
  } catch (error) {
    return error;
  }
}

export const deleteDirectory = async (payload: {
  podName: string;
  path: string;
}) => {
  try {
    const { podName, path } = payload;

    await axios.delete('dir/rmdir', {
      data: {
        pod_name: podName,
        dir_path: path,
      },
    });

    return true;
  } catch (error) {
    return Promise.reject(error);
  }
};
