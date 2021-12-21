import axios from 'axios';

export interface FileResponse {
  access_time: string;
  block_size: number;
  content_type: string;
  creation_time: string;
  modification_time: string;
  name: string;
  size: number;
}

export const receiveFile = async (
  reference: string,
  podName: string,
  directory: string
) => {
  try {
    let data = { dir_path: '', pod_name: podName, sharing_ref: reference };
    // TODO Call helper for writePath
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
    // TODO Use custom axios
    const shareFileInfoResult = await axios({
      baseURL: process.env.NEXT_PUBLIC_FAIROSHOST,
      method: 'GET',
      url: 'file/receive',
      params: data,
      data: data,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return shareFileInfoResult.data;
  } catch (error) {
    return error;
  }
};
