import axios, { AxiosResponse } from 'axios';
import qs from 'querystring';
import FileSaver from 'file-saver';
import generateMnemonic from '../helpers/utils';
import urlPath from '../helpers/urlPath';
import makeBlockie from 'ethereum-blockies-base64';
import { AxiosPromise, CancelTokenSource } from 'axios';
interface Payload {
  username?: string;
  password?: string;
  address?: string;
  mnemonic?: string;
  podName?: string;
  podReference?: string;
  file?: FileList;
  directory?: string;
  files?: FileList;
  path?: string
}

// const host = "https://fairos.fairdatasociety.org/v1/"
const host = process.env.REACT_APP_FAIROSHOST;
// const host = "https://fairos.testeron.pro/v1/";
// const host = "http://localhost:9090";
// const host ="https://api.fairos.io/v0/";
const podNameDefault = 'Home';

interface IRegularAPIResponse {
  code: number;
  message: string;
}

export async function createAccount(
  payload: Payload
): Promise<AxiosResponse<IRegularAPIResponse>> {
  //const {username, password, mnemonic} = payload
  try {
    const response = await axios({
      baseURL: host,
      method: 'POST',
      url: 'user/signup',
      data: JSON.stringify({
        user_name: payload.username,
        password: payload.password,
        mnemonic: payload.mnemonic,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    await createPod({ password: payload.password, podName: 'Home' });
    // await createPod({ password: payload.password, podName: "Photos" });

    return response;
  } catch (e) {
    console.log('error on timeout', e);
  }
}

export const login = async (
  payload: Payload
): Promise<{ res: AxiosResponse<IRegularAPIResponse> }> => {
  try {
    const { username, password } = payload;
    const response = await axios({
      baseURL: host,
      url: 'user/login',
      method: 'POST',
      data: {
        user_name: username,
        password: password,
      },
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    localStorage.setItem('username', username);

    return { res: response };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const importUser = async (
  payload: Payload
) => {
  const response = await axios({
    baseURL: host,
    method: 'POST',
    url: 'user/import',
    data: {
      user_name: payload.username,
      password: payload.password,
      address: payload.address,
    },
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
  return response;
};
export const generateSeedPhrase = async (): Promise<string> => {
  // TODO get seed phrase
  console.log('Creating seed phrase...');
  const res = await generateMnemonic();
  return res;
};

export const logOut = async () => {
  try {
    const response = await axios({
      baseURL: host,
      method: 'POST',
      url: 'user/logout',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const userLoggedIn = async (
  username: string
) => {
  try {
    const requestBody = {
      user_name: username,
    };

    const response = await axios({
      baseURL: host,
      method: 'GET',
      url: 'user/isloggedin',
      data: requestBody,
      params: qs.stringify({ user_name: username }, 'brackets'),
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const isUsernamePresent = async (
  username: string
) => {
  try {
    const requestBody = {
      user_name: username,
    };

    const response = await axios({
      baseURL: host,
      method: 'GET',
      url: 'user/present',
      params: qs.stringify(requestBody, 'brackets'),
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const exportUser = async () => {
  try {
    const response = await axios({
      baseURL: host,
      method: 'POST',
      url: 'user/export',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteUser = async (
  payload: Payload
) => {
  try {
    const response = await axios({
      baseURL: host,
      method: 'DELETE',
      url: 'user/delete',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        password: payload.password,
      },
      withCredentials: true,
    });
    
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const userStats = async () => {
  try {
    const response = await axios({
      baseURL: host,
      method: 'GET',
      url: 'user/stat',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    const imageSrc = makeBlockie(response.data.reference);
    response.data.avatar = imageSrc;
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createPod = async (payload: {
  password: string;
  podName: string;
}): Promise<boolean> => {
  try {
    const { password, podName } = payload;
    await axios({
      baseURL: host,
      method: 'POST',
      url: 'pod/new',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { password: password, pod_name: podName },
      withCredentials: true,
    });
    return true;
  } catch (err) {
    return false;
  }
};

export const closePod = async (payload: {
  password: string;
  podName: string;
}) => {
  try {
    const { password, podName } = payload;
    const closePod = await axios({
      baseURL: host,
      method: 'POST',
      url: 'pod/close',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { pod_name: podName, password: password },
      withCredentials: true,
    });
    return closePod;
  } catch (err) {
    return err;
  }
};

export const openPod = async (payload: {
  password: string;
  podName: string;
}): Promise<AxiosResponse<IRegularAPIResponse>> => {
  try {
    const { password, podName } = payload;
    const openPod = await axios({
      baseURL: host,
      method: 'POST',
      url: 'pod/open',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        pod_name:
          podName === undefined || podName === null ? podNameDefault : podName,
        password: password,
      },
      withCredentials: true,
    });
    return openPod;
  } catch (err) {
    return err;
  }
};

export const syncPod = async () => {
  try {
    const syncPodRes = await axios({
      baseURL: host,
      method: 'POST',
      url: 'pod/sync',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return syncPodRes;
  } catch (err) {
    return err;
  }
};
export const sharePod = async (
  password: string,
  podName: string
) => {
  try {
    const sharePodRes = await axios({
      baseURL: host,
      method: 'POST',
      url: 'pod/share',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { pod_name: podName, password: password },
      withCredentials: true,
    });
    return sharePodRes?.data?.pod_sharing_reference;
  } catch (err) {
    return err;
  }
};
// eslint-disable-next-line
export const deletePod = async (podName: string) => {
  try {
    const deletePodRes = await axios({
      baseURL: host,
      method: 'DELETE',
      url: 'pod/delete',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { pod_name: podName },
      withCredentials: true,
    });
    return deletePodRes;
  } catch (err) {
    return err;
  }
};

interface IGetPods {
  pod_name: string[];
  shared_pod_name: string[];
}

export const getPods = async (): Promise<AxiosResponse<IGetPods>> => {
  const podResult = await axios({
    baseURL: host,
    method: 'GET',
    url: 'pod/ls',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
  return podResult;
};

export const getPodStats = async (
  payload: Payload
) => {
  try {
    const deletePodRes = await axios({
      baseURL: host,
      method: 'GET',
      url: 'pod/stat',
      params: qs.stringify({ pod_name: payload.podName }, 'brackets'),
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return deletePodRes;
  } catch (err) {
    return err;
  }
};
export const showReceivedPodInfo = async (
  payload: Payload
) => {
  const podResult = await axios({
    baseURL: host,
    method: 'GET',
    url: 'pod/receiveinfo',
    params: qs.stringify({ reference: payload.podReference }, 'brackets'),
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
  return podResult;
};

interface ReceivePayload {
  podReference: string;
  pod_name: string;
}
export const receivePod = async (
  payload: ReceivePayload
) => {
  const podResult = await axios({
    baseURL: host,
    method: 'GET',
    url: 'pod/receive',
    params: { reference: payload.podReference, pod_name: payload.pod_name },
    data: { reference: payload.podReference, pod_name: payload.pod_name },
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return podResult;
};

function makeid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const fileUpload = (
  payload: Payload,
  onUploadProgress: (request: string, progressEvent, cancelFn) => void
): {
  uploadRequest: AxiosPromise;
  cancelFn: CancelTokenSource;
  requestId: string;
} => {
  const requestId = makeid(6);

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
    formData.append("files", file);
  });

  formData.append("dir_path", writePath);
  formData.append("block_size", "64Mb");
  formData.append("pod_name", podName);

  const cancelFn = axios.CancelToken.source();

  const uploadRequest = axios({
    baseURL: host,

    method: "POST",
    url: "file/upload",
    onUploadProgress: (progressEvent) => {
      onUploadProgress(requestId, progressEvent, cancelFn);
    },
    data: formData,
    cancelToken: cancelFn.token,
    headers: {
      'Content-type': 'multiple/form-data',
    },
    withCredentials: true,
  });
  return {
    uploadRequest,
    cancelFn,
    requestId,
  };
};

export const fileDownload = async (
  filename: string,
  directory: string,
  podName: string
) => {
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

    const downloadFile = await axios({
      baseURL: host,
      method: 'POST',
      url: 'file/download',
      data: formData,
      responseType: 'blob',
      withCredentials: true,
    });

    FileSaver.saveAs(downloadFile.data, filename);
    //const blob = new Blob(downloadFile.data)
    return downloadFile;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const filePreview = async (
  file: string,
  directory: string,
  podName: string
): Promise<Blob> => {
  try {
    console.log(directory);
    let writePath = '';
    if (directory === 'root') {
      writePath = '/';
    } else {
      writePath = '/' + urlPath(directory) + '/';
    }

    const formData = new FormData();
    formData.append('file_path', writePath + file);
    formData.append('pod_name', podName);

    const downloadFile = await axios({
      baseURL: host,
      method: 'POST',
      url: 'file/download',
      data: formData,
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'blob',
      withCredentials: true,
    });
    return downloadFile.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getDirectory = async (
  payload: Payload
): Promise<AxiosResponse<Record<string, never>>> => {
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
    const response = await axios({
      baseURL: host,
      method: 'GET',
      url: 'dir/ls',
      params: data,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

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
    await axios({
      baseURL: host,
      method: 'POST',
      url: 'dir/mkdir',
      data: JSON.stringify({
        dir_path: data.dir_path,
        dir_name: directoryName,
        pod_name: podName,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    return true;
  } catch (error) {
    return error;
  }
}

export const deleteFile = async (payload: {
  file_name: string;
  podName: string;
  path: string;
}) => {
  try {
    const { file_name, podName, path } = payload;

    await axios({
      baseURL: host,
      method: 'DELETE',
      url: 'file/delete',
      data: {
        pod_name: podName,
        file_path:`${path}${file_name}`
      },
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return true;
  } catch (error) {
    return error;
  }
};

export const deleteFolder = async (payload: Payload) => {
  try {
    // eslint-disable-next-line
    const {podName, path} = payload
 
    await axios({
      baseURL: host,
      method: "DELETE",
      url: "dir/rmdir",
      data: {
        pod_name: podName,
        dir_path: path
      },
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return true;
  } catch (error) {
    return error;
  }
};

export const shareFile = async (
  fileName: string,
  path_file: string,
  podName: string
) => {
  try {
    const shareFileResult = await axios({
      baseURL: host,
      method: 'POST',
      url: 'file/share',
      data: {
        file: fileName,
        dest_user: 'anon',
        file_path: path_file + fileName,
        pod_name: podName,
      },
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    return shareFileResult?.data?.file_sharing_reference;
  } catch (error) {
    return error;
  }
};

export const receiveFileInfo = async (
  reference: string,
  podName: string,
  directory: string
) => {
  try {
    let data = { dir_path: '', pod_name: podName, sharing_ref: reference };
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
    const shareFileInfoResult = await axios({
      baseURL: host,
      method: 'GET',
      url: 'file/receive',
      params: data,
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return shareFileInfoResult.data;
  } catch (error) {
    return error;
  }
};
