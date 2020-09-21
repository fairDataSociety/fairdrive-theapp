import {call, put, select, fork} from "redux-saga/effects";
import EthCrypto from "eth-crypto";
import {getAccount} from "../../account/selectors";
import axios from "axios";
import qs from "querystring";

const axi = axios.create({baseURL: "http://localhost:9090/v0/", timeout: 5000});

function delay(duration) {
  const promise = new Promise(resolve => {
    setTimeout(() => resolve(true), duration);
  });
  return promise;
}

export default function* getDriveContentSaga(action) {
  console.log("getDriveContent saga started");
  try {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

    // const userLogin = yield axi({
    //   method: "POST",
    //   url: "user/login",
    //   data: qs.stringify({user: "Michelle1", password: "1234"}),
    //   config: config,
    //   withCredentials: true
    // });

    const openPod = yield axi({
      method: "POST",
      url: "pod/open",
      data: qs.stringify({password: "1234", pod: "Fairdrive"}),
      config: config,
      withCredentials: true
    });

    console.log(openPod);

    const response = yield axi({
      method: "POST",
      url: "dir/ls",
      data: qs.stringify({dir: "/"}),
      config: config,
      withCredentials: true
    });
    //const response = yield axi.post("http://127.0.0.1:9090/v0/user/signup", requestBody);

    console.log(response);
    yield put({
      type: "SET_DRIVE",
      data: {
        fairdrive: response.data
      }
    });
  } catch (e) {
    console.log("error on timeout", e);
  }
}