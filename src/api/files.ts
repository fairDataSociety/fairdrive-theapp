import { FdpStorage, FileItem } from '@fairdatasociety/fdp-storage';
import { formatUrl } from '@utils/url';

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

interface UploadFileData {
  file: File;
  directory: string;
  podName: string;
}

export const receiveFile = async (
  fdp: FdpStorage,
  reference: string,
  podName: string,
  directory: string
) => {
  try {
    const writePath = directory === 'root' ? '/' : '/' + formatUrl(directory);

    const shareFileInfoResult = await fdp.file.saveShared(
      podName,
      writePath,
      reference
    );

    return shareFileInfoResult;
  } catch (error) {
    return error;
  }
};

export async function downloadFile(
  fdp: FdpStorage,
  data: DownloadFileData
): Promise<Blob> {
  const writePath =
    data.directory === 'root' ? '/' : '/' + formatUrl(data.directory) + '/';
  const downloadFile = await fdp.file.downloadData(
    data.podName,
    `${writePath}${data.filename}`
  );

  return new Blob([downloadFile]);
}

export async function deleteFile(
  fdp: FdpStorage,
  data: DeleteFileData
): Promise<boolean> {
  await fdp.file.delete(data.podName, `${data.path}${data.file_name}`);

  return true;
}

export async function shareFile(
  fdp: FdpStorage,
  data: ShareFileData
): Promise<string> {
  return fdp.file.share(data.podName, data.path_file + data.fileName);
}

export async function uploadFile(
  fdp: FdpStorage,
  data: UploadFileData
): Promise<FileItem> {
  const writePath =
    data.directory === 'root' ? '' : '/' + formatUrl(data.directory);
  const f = await data.file.arrayBuffer();
  const fileBytes = new Uint8Array(f);
  const fileMetadata = await fdp.file.uploadData(
    data.podName,
    `${writePath}/${data.file.name}`,
    fileBytes
  );

  // todo remove this when fdp-storage implements this https://github.com/fairDataSociety/fdp-storage/issues/229
  return {
    name: fileMetadata.fileName,
    raw: {
      version: fileMetadata.version,
      filePath: fileMetadata.filePath,
      fileName: fileMetadata.fileName,
      fileSize: fileMetadata.fileSize,
      blockSize: fileMetadata.blockSize,
      contentType: fileMetadata.contentType,
      compression: fileMetadata.compression,
      creationTime: fileMetadata.creationTime,
      accessTime: fileMetadata.accessTime,
      modificationTime: fileMetadata.modificationTime,
      fileInodeReference: fileMetadata.blocksReference,
      mode: fileMetadata.mode,
    },
    reference: '',
    size: fileMetadata.fileSize,
  };
}
