import HTTPClient from 'src/http';
import { IFile } from 'src/types/models/File';
import { IDirectory } from 'src/types/models/Directory';

const podNameDefault = 'Home';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface RegularResponse {
  code: number;
  message: string;
}

interface GetDirectory {
  files: IFile[] | undefined;
  dirs: IDirectory[] | undefined;
}

export const getDirectory = async (payload: {
  directory: string;
  podName: string;
}) => {
  const { directory, podName } = payload;
  try {
    // const openPod = await axios({
    //   baseURL: host,
    //   method: "POST",
    //   url: "pod/open",
    //   // add pod as function parameter
    //   data: qs.stringify({ password: password, pod: "Fairdrive"}),
    //   withCredentials: true,
    // });
    const pod_name =
      podName === undefined || podName === null ? podNameDefault : podName;
    let data = { dir_path: '', pod_name: pod_name };

    if (directory === 'root') {
      data = {
        dir_path: '/',
        pod_name: pod_name,
      };
    } else {
      data = {
        dir_path: '/' + directory,
        pod_name: pod_name,
      };
    }
    // <RegularResponse>
    const response = await HTTPClient().get<GetDirectory>('dir/ls', {
      params: data,
    });

    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
