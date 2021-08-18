import HTTPClient from 'src/http';

export const deleteDirectory = async (payload: {
  podName: string;
  path: string;
}) => {
  try {
    const { podName, path } = payload;

    await HTTPClient().delete('dir/rmdir', {
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
