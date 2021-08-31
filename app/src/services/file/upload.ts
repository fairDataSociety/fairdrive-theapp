import axios, { CancelTokenSource } from 'axios';
import HTTPClient from 'src/http';

// Helpers
import urlPath from 'src/helpers/urlPath';
import { generateID } from 'src/helpers/generateID';

export interface UploadFilePayload {
  files: FileList;
  directory: string;
  podName: string;
}

export async function uploadFile(
  payload: UploadFilePayload,
  onUploadProgress: (
    request: string,
    progressEvent: ProgressEvent,
    cancelFn: CancelTokenSource
  ) => void
) {
  try {
    const requestId = generateID(6);

    const { files, directory, podName } = payload;

    // const newPath = writePath(path);
    let writePath = '';
    if (directory === 'root') {
      writePath = '/';
    } else {
      writePath = '/' + urlPath(directory);
    }
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append('files', file);
    });

    formData.append('dir_path', writePath);
    formData.append('block_size', '64Mb');
    formData.append('pod_name', podName);

    const cancelFn = axios.CancelToken.source();

    const uploadRequest = HTTPClient().post('file/upload', formData, {
      headers: {
        'Content-type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        onUploadProgress(requestId, progressEvent, cancelFn);
      },
      cancelToken: cancelFn.token,
    });

    return {
      uploadRequest,
      cancelFn,
      requestId,
    };
  } catch (error) {
    return Promise.reject(error);
  }
}
