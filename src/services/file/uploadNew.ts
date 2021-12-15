import axios, { CancelTokenSource, AxiosResponse } from 'axios';
import HTTPClient from 'src/http';

// Helpers
import urlPath from 'src/helpers/urlPath';
import { generateID } from 'src/helpers/generateID';
import { ROOT_DIRECTORY } from 'src/constants/constants';

export interface UploadFilePayload {
  file: File;
  directoryName: string;
  podName: string;
}

export interface UploadFileResponse {
  Responses: { file_name: string; message: string }[];
}

export interface UploadSingleFileReturn {
  uploadResponse: AxiosResponse<UploadFileResponse>;
  cancelFn: CancelTokenSource;
  requestId: string;
}

export async function uploadSingleFile(
  payload: UploadFilePayload,
  cancelRequestReferences: (
    requestID: string,
    cancelFn: CancelTokenSource
  ) => void,
  onUploadProgress: (requestID: string, progressEvent: ProgressEvent) => void
): Promise<UploadSingleFileReturn> {
  try {
    // Generate pseude unique ID
    const requestId = generateID(6);

    const { file, directoryName, podName } = payload;

    // Create directory path
    let writePath = '';
    if (directoryName === ROOT_DIRECTORY) {
      writePath = '/';
    } else {
      writePath = '/' + urlPath(directoryName);
    }

    // Construct request body
    const formData = new FormData();

    formData.append('files', file);
    formData.append('dir_path', writePath);
    formData.append('block_size', '64Mb');
    formData.append('pod_name', podName);

    // Create cancel callback
    const cancelFn = axios.CancelToken.source();
    cancelRequestReferences(requestId, cancelFn);

    const uploadResponse = await HTTPClient().post<UploadFileResponse>(
      'file/upload',
      formData,
      {
        headers: {
          'Content-type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          onUploadProgress(requestId, progressEvent);
        },
        cancelToken: cancelFn.token,
      }
    );

    return {
      uploadResponse,
      cancelFn,
      requestId,
    };
  } catch (error) {
    return Promise.reject(error);
  }
}
