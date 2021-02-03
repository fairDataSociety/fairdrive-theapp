import axios from "axios";
import qs from "querystring";
import { Avatar } from "@material-ui/core";
import FileSaver from "file-saver";

const host = process.env.REACT_APP_FAIROSHOST + "/v0/";

export async function logIn(username: string, password: string) {
  try {
    const requestBody = {
      user: username,
      password: password,
    };

    const response = await axios({
      baseURL: host,
      url: "user/login",
      method: "POST",
      data: qs.stringify(requestBody),
      withCredentials: true,
    });

    const openPod = await axios({
      baseURL: host,
      method: "POST",
      url: "pod/open",
      data: qs.stringify({ password: password, pod: "Fairdrive" }),
      withCredentials: true,
    });

    const avatar = await getAvatar(username);

    return { res: response, avatar: avatar };
  } catch (error) {
    throw error;
  }
}

export async function logOut() {
  try {
    const response = await axios({
      baseURL: host,
      method: "POST",
      url: "user/logout",
      withCredentials: true,
    });

    return response;
  } catch (error) {
    throw error;
  }
}

export async function restoreAccount() {
  return true;
}

export async function isLoggedIn(username: string) {
  try {
    const requestBody = {
      user: username,
    };

    const response = await axios({
      method: "GET",
      url: "user/isloggedin",
      params: qs.stringify(requestBody, "brackets"),
      withCredentials: true,
    });

    return response;
  } catch (error) {
    throw error;
  }
}

export async function isUsernamePresent(username: string) {
  try {
    const requestBody = {
      user: username,
    };

    const response = await axios({
      baseURL: host,
      method: "GET",
      url: "user/present",
      params: qs.stringify(requestBody, "brackets"),
      withCredentials: true,
    });

    return response;
  } catch (error) {
    throw error;
  }
}

export async function fileUpload(files:any, directory:any, onUploadProgress:any) {
  const formData = new FormData();
  for (const file of files) {
    formData.append("files", file);
  }
  formData.append("pod_dir", "/" + directory);
  formData.append("block_size", "64Mb");

  const uploadFiles = await axios({
    baseURL: host,
    method: "POST",
    url: "file/upload",
    data: formData,
    withCredentials: true,
    onUploadProgress: function (event) {
      onUploadProgress(event.loaded, event.total);
    },
  });

  console.log(uploadFiles);
  return true;
}

export async function fileDownload(file:any, filename:any) {
  try {
    const downloadFile = await axios({
      baseURL: host,
      method: "POST",
      url: "file/download",
      data: qs.stringify({ file: file }),
      responseType: "blob",
      withCredentials: true,
    });

    console.log(downloadFile);
    FileSaver.saveAs(downloadFile.data, filename);

    //const blob = new Blob(downloadFile.data)
    return downloadFile;
  } catch (error) {
    throw error;
  }
}

export async function getDirectory(directory:any, password: string) {
  try {
    const openPod = await axios({
      baseURL: host,
      method: "POST",
      url: "pod/open",
      data: qs.stringify({ password: password, pod: "Fairdrive" }),
      withCredentials: true,
    });

    let data = { dir: "" };

    if (directory == "root") {
      data = {
        dir: "/",
      };
    } else {
      data = {
        dir: "/" + directory,
      };
    }

    const response = await axios({
      baseURL: host,
      method: "GET",
      url: "dir/ls",
      params: data,
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function createAccount(username: string, password: any, mnemonic: string) {
  try {
    const requestBody = {
      user: username,
      password: password,
      mnemonic: mnemonic,
    };


    const response = await axios({
      baseURL: host,
      method: "POST",
      url: "user/signup",
      data: qs.stringify(requestBody),
      withCredentials: true,
    });
    return response.data;
  } catch (e) {
    console.log("error on timeout", e);
  }
}

function dataURLtoFile(dataurl:any, filename: string) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

export async function storeAvatar(avatar:any) {
  try {
    //Usage example:
    var file = dataURLtoFile(avatar, "avatar.jpg");

    const formData = new FormData();
    formData.append("avatar", file);

    const response = await axios({
      baseURL: host,
      method: "POST",
      url: "user/avatar",
      data: formData,
      withCredentials: true,
    });
    return response.data;
  } catch (e) {
    console.log("error on timeout", e);
  }
}

async function readAsbase64(blob:any) {
  const tempFileReader = new FileReader();
  return new Promise((resolve, reject) => {
    tempFileReader.onerror = () => {
      tempFileReader.abort();
      reject(new DOMException("Problem with file"));
    };

    tempFileReader.onload = () => {
      resolve(tempFileReader.result);
    };
    tempFileReader.readAsDataURL(blob);
  });
}

export async function getAvatar(username: string) {
  try {
    const data = {
      username: username,
    };

    const response = await axios({
      baseURL: host,
      method: "GET",
      url: "user/avatar",
      responseType: "blob",
      params: data,
      withCredentials: true,
    });
    console.log(response);
    return await readAsbase64(response.data);
  } catch (e) {
    console.log("error on timeout", e);
  }
}

export async function createPod(passWord: any, podName: string) {
  try {
    const podRequest = {
      password: passWord,
      pod: podName,
    };

    const createPod = await axios({
      baseURL: host,
      method: "POST",
      url: "pod/new",
      data: qs.stringify(podRequest),
      withCredentials: true,
    });
  } catch (error) {}
}

export async function createDirectory(directoryName: string) {
  // Dir = "/" + path + "/"
  try {
    const createPictursDirectory = await axios({
      baseURL: host,
      method: "POST",
      url: "dir/mkdir",
      data: qs.stringify({ dir: directoryName }),
      withCredentials: true,
    });

    return true;
  } catch (error) {}
}

export async function deleteDirectory(directoryName: string) {
  // Dir = "/" + path + "/"
  try {
    const deleteDirectory = await axios({
      baseURL: host,
      method: "DELETE",
      url: "dir/rmdir",
      params: {
        dir: directoryName,
      },
      withCredentials: true,
    });

    return true;
  } catch (error) {}
}

export async function renameDirectory(newDirectoryName: string) {
  console.log(newDirectoryName);
  return true;
}

export async function deleteFile(fileName: string) {
  try {
    const deletePictursDirectory = await axios({
      baseURL: host,
      method: "DELETE",
      url: "file/delete",
      params: {
        file: fileName,
      },
      withCredentials: true,
    });

    return true;
  } catch (error) {}
}

export async function shareFile(fileName: string, userName: string) {
  try {
    const shareFileResult = await axios({
      baseURL: host,
      method: "POST",
      url: "file/share",
      params: {
        file: fileName,
        to: "anon",
      },
      withCredentials: true,
    });

    return shareFileResult.data.sharing_reference;
  } catch (error) {}
}

export async function receiveFile(reference: string) {
  return true;
}

export async function receiveFileInfo(reference: string) {
  try {
    const shareFileInfoResult = await axios({
      baseURL: host,
      method: "POST",
      url: "file/receiveinfo",
      params: {
        ref: reference,
      },
      withCredentials: true,
    });

    return shareFileInfoResult.data;
  } catch (error) {}
}
