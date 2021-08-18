import HTTPClient from 'src/http';

export const receiveFileInfo = async (
  reference: string,
  podName: string,
  directory: string
) => {
  try {
    let data = { dir_path: '', pod_name: podName, sharing_ref: reference };
    if (directory === 'root') {
      data = {
        dir_path: '/',
        pod_name: podName,
        sharing_ref: reference,
      };
    } else {
      data = {
        dir_path: '/' + directory,
        pod_name: podName,
        sharing_ref: reference,
      };
    }
    const shareFileInfoResult = await HTTPClient().get('file/receive', {
      params: data,
      data: data,
    });

    return shareFileInfoResult.data;
  } catch (error) {
    return error;
  }
};
