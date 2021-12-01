import { ROOT_DIRECTORY } from 'src/constants/constants';
import urlPath from 'src/helpers/urlPath';
import HTTPClient from 'src/http';

export const previewFile = async (
  file: string,
  directory: string,
  podName: string
): Promise<Blob> => {
  try {
    let writePath = '';
    if (directory === ROOT_DIRECTORY) {
      writePath = '/';
    } else {
      writePath = '/' + urlPath(directory) + '/';
    }

    const formData = new FormData();
    formData.append('file_path', writePath + file);
    formData.append('pod_name', podName);

    const downloadFile = await HTTPClient().post<Blob>(
      'file/download',
      formData,
      {
        responseType: 'blob',
      }
    );

    return downloadFile.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
