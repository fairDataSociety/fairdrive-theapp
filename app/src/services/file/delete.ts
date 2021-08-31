import HTTPClient from 'src/http';

export const deleteFile = async (payload: {
  file_name: string;
  podName: string;
  path: string;
}) => {
  try {
    const { file_name, podName, path } = payload;

    await HTTPClient().delete('file/delete', {
      data: {
        pod_name: podName,
        file_path: `${path}${file_name}`,
      },
    });

    return true;
  } catch (error) {
    return Promise.reject(error);
  }
};
