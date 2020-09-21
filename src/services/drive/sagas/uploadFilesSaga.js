import {call, put, select, fork} from "redux-saga/effects";
import axios from "axios";
import qs from "querystring";

const axi = axios.create({baseURL: "http://localhost:9090/v0/", timeout: 5000});

export default function* uploadFilesSaga(action) {
  console.log("uploadFilesSaga saga started");
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };

    const formData = new FormData();
    var ins = action.data.length;
    for (var x = 0; x < ins; x++) {
      formData.append("files", action.data[x]);
    }
    formData.append("pod_dir", "/Pictures");
    formData.append("block_size", "64Mb");

    const uploadFiles = yield axi({method: "POST", url: "file/upload", data: formData, config: config, withCredentials: true});

    console.log(uploadFiles);
  } catch (e) {
    console.log("error on timeout", e);
  }
}