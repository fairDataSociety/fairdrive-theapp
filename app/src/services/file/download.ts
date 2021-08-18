import HTTPClient from 'src/http';
import urlPath from 'src/helpers/urlPath';
import FileSaver from 'file-saver';

export async function downloadFile(
  filename: string,
  directory: string,
  podName: string
) {
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

    const downloadFile = await HTTPClient().post(
      'file/download',
      { formData },
      {
        responseType: 'blob',
      }
    );

    FileSaver.saveAs(downloadFile.data, filename);

    //const blob = new Blob(downloadFile.data)
    return downloadFile;
  } catch (error) {
    return Promise.reject(error);
  }
}
