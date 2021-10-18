import HTTPClient from 'src/http';

export async function createDirectory(
  directory: string,
  directoryName: string,
  podName: string
): Promise<boolean> {
  // Dir = "/" + path + "/"
  let data = { dir_path: '' };

  if (directory === 'root') {
    data = {
      dir_path: '/' + directoryName,
    };
  } else {
    data = {
      dir_path: '/' + directory + '/' + directoryName,
    };
  }
  try {
    await HTTPClient().post('dir/mkdir', {
      dir_path: data.dir_path,
      dir_name: directoryName,
      pod_name: podName,
    });

    return true;
  } catch (error) {
    return error;
  }
}
