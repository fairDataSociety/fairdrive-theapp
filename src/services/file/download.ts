import urlPath from 'src/helpers/urlPath';
import HTTPClient from 'src/http';

export async function downloadFile(
  filename: string,
  directory: string,
  podName: string
): Promise<Blob> {
  try {
    const writePath =
      directory === 'root' ? '/' : '/' + urlPath(directory) + '/';

    const formData = new FormData();
    formData.append('file_path', writePath + filename);
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
}
