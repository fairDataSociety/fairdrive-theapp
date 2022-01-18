import axios from '@api/customAxios';
import formatURL from '@helpers/formatURL';

export interface FileResponse {
  access_time: string;
  block_size: number;
  content_type: string;
  creation_time: string;
  modification_time: string;
  name: string;
  size: number;
}

interface DownloadFileData {
  filename: string;
  directory: string;
  podName: string;
}

interface ShareFileData {
  fileName: string;
  podName: string;
  path_file: string;
}

interface DeleteFileData {
  file_name: string;
  podName: string;
  path: string;
}

export const receiveFile = async (
  reference: string,
  podName: string,
  directory: string
) => {
  try {
    let data = { dir_path: '', pod_name: podName, sharing_ref: reference };
    // TODO write helper for this piece of code
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
    const shareFileInfoResult = await axios.post('file/receive', data);
    return shareFileInfoResult.data;
  } catch (error) {
    return error;
  }
};

export async function downloadFile(data: DownloadFileData): Promise<Blob> {
  const writePath =
    data.directory === 'root' ? '/' : '/' + formatURL(data.directory) + '/';

  const formData = new FormData();
  formData.append('file_path', writePath + data.filename);
  formData.append('pod_name', data.podName);

  const downloadFile = await axios.post('file/download', formData, {
    responseType: 'blob',
  });

  return downloadFile.data;
}

export async function deleteFile(data: DeleteFileData): Promise<boolean> {
  await axios.delete('file/delete', {
    data: {
      pod_name: data.podName,
      file_path: `${data.path}${data.file_name}`,
    },
  });

  return true;
}

export async function shareFile(data: ShareFileData): Promise<string> {
  const shareFileResult = await axios.post('file/share', {
    file: data.fileName,
    dest_user: 'anon',
    file_path: data.path_file + data.fileName,
    pod_name: data.podName,
  });

  return shareFileResult.data.file_sharing_reference;
}