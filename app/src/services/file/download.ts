import urlPath from 'src/helpers/urlPath';
import FileSaver from 'file-saver';
import HTTPClient from 'src/http';

export async function downloadFile(
  filename: string,
  directory: string,
  podName: string
): Promise<void> {
  try {
    let writePath = '';
    if (directory === 'root') {
      writePath = '/';
    } else {
      writePath = '/' + urlPath(directory) + '/';
    }
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

    FileSaver.saveAs(downloadFile.data, filename);

    //const blob = new Blob(downloadFile.data)
  } catch (error) {
    return Promise.reject(error);
  }
}
