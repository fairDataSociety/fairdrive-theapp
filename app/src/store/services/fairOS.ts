import axios from "axios";
import qs from "querystring";
import FileSaver from "file-saver";
import generateMnemonic from "../helpers/utils";
import urlPath from '../helpers/urlPath';
interface Payload {
  username?: string;
  password?: string;
  address?: string;
  mnemonic?: string;
  podName?: string;
  podReference?: string;
  file?: any;
  directory?: string;
  files?:any;
}

const host = process.env.REACT_APP_FAIROSHOST;
// const host = "https://fairos.testeron.pro/v1/";
// const host = "http://localhost:9090";
// const host ="https://api.fairos.io/v0/";
const podNameDefault = "Fairdrive";

export async function createAccount(payload: Payload) {
  //const {username, password, mnemonic} = payload
  try {

    const response = await axios({
      baseURL: host,
      method: "POST",
      url: "user/signup",
      data: JSON.stringify({
        user_name: payload.username,
        password: payload.password,
        mnemonic: payload.mnemonic,
      }),
      headers:{
        'Content-Type': 'application/json'
      },
      withCredentials: true,
    });

    return response;
  } catch (e) {
    console.log("error on timeout", e);
  }
}



export const login = async (payload: Payload) => {
  try {
   const {username, password} = payload;

    const response = await axios({
      baseURL: host,
      url: "user/login",
      method: "POST",
      data: {
        user_name: username,
        password: password,
      },
      headers:{
        'Content-Type': 'application/json'
      },
      withCredentials: true,
    });

    const podResult = await getPods();
    if(!podResult.data.pod_name.includes(podNameDefault)){
      await createPod({password, podNameDefault});
    };

    //const resPod = await openPod({password,podNameDefault});


    return { res: response };
  } catch (error) {
    throw error;
  }
}

export const importUser = async( payload: Payload) =>{
  const response = await axios({
    baseURL: host,
    method: "POST",
    url: "user/import",
    data: {
      user_name: payload.username,
      password: payload.password,
      address: payload.address
    },
    headers:{
      'Content-Type': 'application/json'
    },
    withCredentials: true,
  });
  return response;
}
export const generateSeedPhrase = async() =>{
  // TODO get seed phrase
  console.log("Creating seed phrase...")
  let res = await generateMnemonic()
  return res
}

export const logOut = async () => {
  try {
    const response = await axios({
      baseURL: host,
      method: "POST",
      url: "user/logout",
      headers:{
        'Content-Type': 'application/json'
      },
      withCredentials: true,
    });

    return response;
  } catch (error) {
    throw error;
  }
}


export const userLoggedIn = async (username: string) => {
  try {
    const requestBody = {
      user: username,
    };

    const response = await axios({
      method: "GET",
      url: "user/isloggedin",
      params: qs.stringify(requestBody, "brackets"),
      headers:{
        'Content-Type': 'application/json'
      },
      withCredentials: true,
    });

    return response;
  } catch (error) {
    throw error;
  }
}

export const isUsernamePresent = async (username: string) => {
  try {
    const requestBody = {
      user_name: username,
    };

    const response = await axios({
      baseURL: host,
      method: "GET",
      url: "user/present",
      params: qs.stringify(requestBody, "brackets"),
      headers:{
        'Content-Type': 'application/json'
      },
      withCredentials: true,
    });

    return response;
  } catch (error) {
    throw error;
  }
}

export const exportUser = async () => {
  try {
    const response = await axios({
      baseURL: host,
      method: "POST",
      url: "user/export",
      headers:{
        'Content-Type': 'application/json'
      },
      withCredentials: true,
    });

    return response;
  } catch (error) {
    throw error;
  }
}


export const deleteUser = async (payload: Payload) => {
  try {
    const response = await axios({
      baseURL: host,
      method: "DELETE",
      url: "user/delete",
      headers:{
        'Content-Type': 'application/json'
      },
      data: {
        password: payload.password
      },
      withCredentials: true,
    });

    return response;
  } catch (error) {
    throw error;
  }
}

export const userStats = async () => {
  try {
    const response = await axios({
      baseURL: host,
      method: "GET",
      url: "user/stat",
      headers:{
        'Content-Type': 'application/json'
      },
      withCredentials: true,
    });

    return response;
  } catch (error) {
    throw error;
  }
}


export const createPod = async(payload: any) =>{
  try{
      const{password, podName} = payload;
      // eslint-disable-next-line
      const newPod = await axios({
      baseURL: host,
      method: "POST",
      url: "pod/new",
      headers:{
        'Content-Type': 'application/json'
      },
      data: {password: password,pod_name: podName },
      withCredentials: true,
    });
    return true;
  } catch(err){
    return false;
  }
}

export const closePod = async(payload: any) =>{
  try{
      const {password, podName} = payload
      const closePod = await axios({
      baseURL: host,
      method: "POST",
      url: "pod/close",
      headers:{
        'Content-Type': 'application/json'
      },
      data: {pod_name: podName, password: password },
      withCredentials: true,
    });
    return closePod;
  } catch(err){
    return err;
  }
}

export const openPod = async(payload: any) =>{
  try{
    const {password, podName } = payload;
      const openPod = await axios({
      baseURL: host,
      method: "POST",
      url: "pod/open",
      headers:{
        'Content-Type': 'application/json'
      },
      data: {pod_name: podName === undefined || podName === null? podNameDefault: podName, password: password },
      withCredentials: true,
    });
    return openPod;
  } catch(err){
    return err;
  }
}

export const syncPod = async(password: string, podName: string) =>{
  try{
      const syncPodRes = await axios({
      baseURL: host,
      method: "POST",
      url: "pod/sync",
      headers:{
        'Content-Type': 'application/json'
      },
      withCredentials: true,
    });
    return syncPodRes;
  } catch(err){
    return err;
  }
}
export const sharePod = async(password: string, podName: string) =>{
  try{
      const sharePodRes = await axios({
      baseURL: host,
      method: "POST",
      url: "pod/share",
      headers:{
        'Content-Type': 'application/json'
      },
      data: {pod_name: podName, password: password },
      withCredentials: true,
    });
    return sharePodRes;
  } catch(err){
    return err;
  }
}
// eslint-disable-next-line
export const deletePod = async(password: string, podName: string) =>{
  try{
      const deletePodRes = await axios({
      baseURL: host,
      method: "DELETE",
      url: "pod/delete",
      headers:{
        'Content-Type': 'application/json'
      },
      data: {pod_name: podName},
      withCredentials: true,
    });
    return deletePodRes;
  } catch(err){
    return err;
  }
}

export const getPods = async() => {
  const podResult = await axios({
    baseURL: host,
    method: "GET",
    url: "pod/ls",
    headers:{
      'Content-Type': 'application/json'
    },
    withCredentials: true,
  });
  return podResult;
}

export const getPodStats = async(payload:Payload) => {
  try{
    const deletePodRes = await axios({
    baseURL: host,
    method: "GET",
    url: "pod/stat",
    params: qs.stringify({pod_name: payload.podName}, "brackets"),
    headers:{
      'Content-Type': 'application/json'
    },
    withCredentials: true,
  });
  return deletePodRes;
} catch(err){
  return err;
}
}
export const showReceivedPodInfo = async(payload: Payload) =>{
  const podResult = await axios({
    baseURL: host,
    method: "GET",
    url: "pod/receiveinfo",
    params:qs.stringify({reference:payload.podReference},"brackets"),
    headers:{
      'Content-Type': 'application/json'
    },
    withCredentials: true,
  });
  return podResult;
}


export const receivePod = async(payload: Payload) =>{
  const podResult = await axios({
    baseURL: host,
    method: "GET",
    url: "pod/receive",
    params:qs.stringify({reference:payload.podReference},"brackets"),
    headers:{
      'Content-Type': 'application/json'
    },
    withCredentials: true,
  });
  return podResult;
}






// export const fileUpload = async (fileData: any) => {
//   let formData = new FormData();
//   var file = new File([fileData.file], fileData.filename);
//   formData.append("files", file);
//   formData.append("pod_dir", "/" );
//   formData.append("block_size", "64Mb");
//   const uploadFiles = await axios({
//     baseURL: host,
//     method: "POST",
//     url: "file/upload",
//     data: formData,
//     withCredentials: true
//   });

//   return true;
// }


export const fileUpload = async (payload:Payload) => {
  const {files, directory, podName} = payload;
  // const newPath = writePath(path);
  let writePath = "";
  if (directory === "root") {
    writePath = "/";
  } else {
    writePath = "/" + urlPath(directory);
  }
  const formData = new FormData();
  for (const file of files) {
    formData.append("files", file);
  }
  formData.append("dir_path", writePath);
  formData.append("block_size", "64Mb");
  formData.append("pod_name", podName)

  // eslint-disable-next-line
  const uploadFiles = await axios({
    baseURL: host,
    method: "POST",
    url: "file/upload",
    data: formData,
    headers:{
      "Content-type":"multiple/form-data"
    },
    withCredentials: true,
  });

  return true;
}

export const fileDownload = async ( filename:any, directory: string, podName: string) => {
  try {
    let writePath = "";
    if (directory === "root") {
      writePath = "/";
    } else {
      writePath = "/" + urlPath(directory)+"/";
    }
    const formData = new FormData();
    formData.append("file_path", writePath+filename);
    formData.append("pod_name", podName)


    const downloadFile = await axios({
      baseURL: host,
      method: "POST",
      url: "file/download",
      data: formData,
      responseType: "blob",
      withCredentials: true,
    });

    FileSaver.saveAs(downloadFile.data, filename);

    //const blob = new Blob(downloadFile.data)
    return downloadFile;
  } catch (error) {
    throw error;
  }
}

export const filePreview = async (file:any, directory: string, podName) => {
  try {
    console.log(directory);
    let writePath = "";
    if (directory === "root") {
      writePath = "/";
    } else {
      writePath = "/" + urlPath(directory) + "/";
    }

    const formData = new FormData();
    formData.append("file_path", writePath + file);
    formData.append("pod_name", podName);

    const downloadFile = await axios({
      baseURL: host,
      method: "POST",
      url: "file/download",
      data: formData,
      headers:{
        'Content-Type': 'application/json'
      },
      responseType: "blob",
      withCredentials: true,
    });
    return downloadFile.data;
  } catch (error) {
    throw error;
  }
}

export const getDirectory = async (payload: Payload) => {
  // eslint-disable-next-line
  const {directory, password, podName} = payload;
  try {
    // const openPod = await axios({
    //   baseURL: host,
    //   method: "POST",
    //   url: "pod/open",
    //   // add pod as function parameter
    //   data: qs.stringify({ password: password, pod: "Fairdrive"}),
    //   withCredentials: true,
    // });
    const pod_name = podName === undefined || podName === null? podNameDefault: podName
    let data = { dir_path: "", pod_name: pod_name};

    if (directory === "root") {
      data = {
        dir_path: "/",
        pod_name: pod_name
      };
    } else {
      data = {
        dir_path: "/" + directory,
        pod_name: pod_name
      };
    }
    const response = await axios({
      baseURL: host,
      method: "GET",
      url: "dir/ls",
      params:data,
      headers:{
        'Content-Type': 'application/json'
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw error;
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

export const storeAvatar = async (avatar:any) => {
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
export async function createDirectory(directory: string,directoryName: string, podName: string) {
  // Dir = "/" + path + "/"
  let data = { dir_path: ""};

  if (directory === "root") {
    data = {
      dir_path: "/"+directoryName,
    };
  } else {
    data = {
      dir_path: "/" + directory + "/"+directoryName,
    };
  }
  try {
    // eslint-disable-next-line
    const createDirectory = await axios({
      baseURL: host,
      method: "POST",
      url: "dir/mkdir",
      data: JSON.stringify({ dir_path:data.dir_path,dir_name: directoryName, pod_name:podName }),
      headers:{
        'Content-Type': 'application/json'
      },
      withCredentials: true,
    });

    return true;
  } catch (error) {}
}

// eslint-disable-next-line
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


export const deleteFile = async (fileName: string) => {
  try {
    // eslint-disable-next-line
    const deletePictursDirectory = await axios({
      baseURL: host,
      method: "DELETE",
      url: "file/delete",
      data: {
        file: fileName,
      },
      headers:{
        'Content-Type': 'application/json'
      },
      withCredentials: true,
    });

    return true;
  } catch (error) {}
}

export const shareFile = async (fileName: string) => {
  try {
    const shareFileResult = await axios({
      baseURL: host,
      method: "POST",
      url: "file/share",
      data: {
        file: fileName,
        to: "anon",
      },
      headers:{
        'Content-Type': 'application/json'
      },
      withCredentials: true,
    });

    return shareFileResult.data.sharing_reference;
  } catch (error) {}
}


export const receiveFileInfo = async (reference: string) => {
  try {
    const shareFileInfoResult = await axios({
      baseURL: host,
      method: "POST",
      url: "file/receiveinfo",
      data: {
        ref: reference,
      },
      headers:{
        'Content-Type': 'application/json'
      },
      withCredentials: true,
    });

    return shareFileInfoResult.data;
  } catch (error) {}
}
