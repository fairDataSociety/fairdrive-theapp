import urlPath from 'src/helpers/urlPath';
import HTTPClient from 'src/http';

export const previewFile = async (
  file: string,
  directory: string,
  podName: string
) => {
  try {
    let writePath = '';
    if (directory === 'root') {
      writePath = '/';
    } else {
      writePath = '/' + urlPath(directory) + '/';
    }

    const formData = new FormData();
    formData.append('file_path', writePath + file);
    formData.append('pod_name', podName);

    const downloadFile = await HTTPClient().post('file/download', formData, {
      responseType: 'blob',
    });

    debugger;
    return downloadFile.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
