import axios from "axios";
import qs from "querystring";
import { Avatar } from "@material-ui/core";
import FileSaver from "file-saver";

const host = process.env.REACT_APP_FAIROSHOST + "/v0/"
const axi = axios.create({ baseURL: host, timeout: 120000 });

export async function logIn(username, password) {
  try {
    const requestBody = {
      user: username,
      password: password
    };

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

    const response = await axi({ method: "POST", url: "user/login", config: config, data: qs.stringify(requestBody), withCredentials: true });

    const openPod = await axi({
      method: "POST",
      url: "pod/open",
      data: qs.stringify({ password: password, pod: "Fairdrive" }),
      config: config,
      withCredentials: true
    });

    const avatar = await getAvatar(username);

    return { res: response, avatar: avatar };
  } catch (error) {
    throw error;
  }
}

export async function logOut() {
  try {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

    const response = await axi({ method: "POST", url: "user/logout", config: config, withCredentials: true });

    return response;
  } catch (error) {
    throw error;
  }
}

export async function restoreAccount() {
  return true
}

export async function isLoggedIn(username) {
  try {
    const requestBody = {
      user: username
    };

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      paramsSerializer: function (params) {
        return qs.stringify(params, { arrayFormat: "brackets" });
      }
    };

    const response = await axi({ method: "GET", url: "user/isloggedin", config: config, params: requestBody, withCredentials: true });

    return response;
  } catch (error) {
    throw error;
  }
}

export async function isUsernamePresent(username) {
  try {
    const requestBody = {
      user: username
    };

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      paramsSerializer: function (params) {
        return qs.stringify(params, { arrayFormat: "brackets" });
      }
    };

    const response = await axi({ method: "GET", url: "user/present", config: config, params: requestBody, withCredentials: true });

    return response;
  } catch (error) {
    throw error;
  }
}

export async function fileUpload(files, directory, onUploadProgress) {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  };

  const formData = new FormData();
  for (const file of files) {
    formData.append("files", file);
  }
  formData.append("pod_dir", "/" + directory);
  formData.append("block_size", "64Mb");

  const uploadFiles = await axi({
    method: "POST",
    url: "file/upload",
    data: formData,
    config: config,
    withCredentials: true,
    onUploadProgress: function (event) {
      onUploadProgress(event.loaded, event.total);
    }
  });

  console.log(uploadFiles);
  return true;
}

export async function fileDownload(file, filename) {
  try {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

    const downloadFile = await axi({
      method: "POST",
      url: "file/download",
      data: qs.stringify({ file: file }),
      config: config,
      responseType: "blob",
      withCredentials: true
    });

    console.log(downloadFile)
    FileSaver.saveAs(downloadFile.data, filename)

    //const blob = new Blob(downloadFile.data)
    return downloadFile;
  } catch (error) {
    throw error;
  }
}

export async function getDirectory(directory, password) {
  try {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

    const openPod = await axi({
      method: "POST",
      url: "pod/open",
      data: qs.stringify({ password: password, pod: "Fairdrive" }),
      config: config,
      withCredentials: true
    });

    let data = "/";

    if (directory == "root") {
      data = {
        dir: "/"
      };
    } else {
      data = {
        dir: "/" + directory
      };
    }

    const response = await axi({ method: "GET", url: "dir/ls", params: data, config: config, withCredentials: true });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function createAccount(username, password, mnemonic) {
  try {
    const requestBody = {
      user: username,
      password: password,
      mnemonic: mnemonic
    };

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

    const response = await axi({ method: "POST", url: "user/signup", config: config, data: qs.stringify(requestBody), withCredentials: true });
    return response.data;
  } catch (e) {
    console.log("error on timeout", e);
  }
}

function dataURLtoFile(dataurl, filename) {
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

export async function storeAvatar(avatar) {
  try {
    //Usage example:
    var file = dataURLtoFile(avatar, "avatar.jpg");

    const formData = new FormData();
    formData.append("avatar", file);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };

    const response = await axi({ method: "POST", url: "user/avatar", config: config, data: formData, withCredentials: true });
    return response.data;
  } catch (e) {
    console.log("error on timeout", e);
  }
}

async function readAsbase64(blob) {
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

export async function getAvatar(username) {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const data = {
      username: username
    };

    const response = await axi({
      method: "GET",
      url: "user/avatar",
      responseType: "blob",
      config: config,
      params: data,
      withCredentials: true
    });
    console.log(response);
    return await readAsbase64(response.data);
  } catch (e) {
    console.log("error on timeout", e);
  }
}

export async function createPod(passWord, podName) {
  try {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    const podRequest = {
      password: passWord,
      pod: podName
    };

    const createPod = await axi({ method: "POST", url: "pod/new", config: config, data: qs.stringify(podRequest), withCredentials: true });
  } catch (error) { }
}

export async function createDirectory(directoryName) {
  // Dir = "/" + path + "/"
  try {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

    const createPictursDirectory = await axi({
      method: "POST",
      url: "dir/mkdir",
      config: config,
      data: qs.stringify({ dir: directoryName }),
      withCredentials: true
    });

    return true;
  } catch (error) { }
}

export async function deleteDirectory(directoryName) {
  // Dir = "/" + path + "/"
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const deleteDirectory = await axi({
      method: "DELETE",
      url: "dir/rmdir",
      config: config,
      params: {
        dir: directoryName
      },
      withCredentials: true
    });

    return true;
  } catch (error) { }
}

export async function renameDirectory(newDirectoryName) {
  console.log(newDirectoryName);
  return true;
}

export async function deleteFile(fileName) {
  try {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

    const deletePictursDirectory = await axi({
      method: "DELETE",
      url: "file/delete",
      config: config,
      params: {
        file: fileName
      },
      withCredentials: true
    });

    return true;
  } catch (error) { }
}

export async function shareFile(fileName, userName) {
  try {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

    const shareFileResult = await axi({
      method: "POST",
      url: "file/share",
      config: config,
      params: {
        file: fileName,
        to: "anon"
      },
      withCredentials: true
    });

    return shareFileResult.data.sharing_reference;
  } catch (error) { }
}

export async function receiveFile(reference) {
  return true
}

export async function receiveFileInfo(reference) {
  try {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

    const shareFileInfoResult = await axi({
      method: "POST",
      url: "file/receiveinfo",
      config: config,
      params: {
        ref: reference,
      },
      withCredentials: true
    });

    return shareFileInfoResult.data;
  } catch (error) { }

}