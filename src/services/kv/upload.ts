import axios, { CancelTokenSource, AxiosResponse } from 'axios';
import HTTPClient from 'src/http';
import { generateID } from 'src/helpers/generateID';

export interface UploadCSVFilePayload {
  file: File;
  tableName: string;
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

export async function uploadCSV(
  payload: UploadCSVFilePayload,
  cancelRequestReferences: (
    requestID: string,
    cancelFn: CancelTokenSource
  ) => void,
  onUploadProgress: (requestID: string, progressEvent: ProgressEvent) => void
): Promise<UploadSingleFileReturn> {
  const formData = new FormData();

  const { file, tableName, podName } = payload;

  const requestId = generateID(6);

  formData.append('csv', file);
  formData.set('pod_name', podName);
  formData.set('table_name', tableName);

  const cancelFn = axios.CancelToken.source();
  cancelRequestReferences(requestId, cancelFn);

  const uploadResponse = await HTTPClient().post<UploadFileResponse>(
    'kv/loadcsv',
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
}
