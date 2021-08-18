import HTTPClient from 'src/http';

export const shareFile = async (
  fileName: string,
  path_file: string,
  podName: string
) => {
  try {
    const shareFileResult = await HTTPClient().post('file/share', {
      file: fileName,
      dest_user: 'anon',
      file_path: path_file + fileName,
      pod_name: podName,
    });

    return shareFileResult?.data?.file_sharing_reference;
  } catch (error) {
    return error;
  }
};
