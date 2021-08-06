import { IUserLogin } from "../types/requests/UserLogin";
import { IUploadFIle } from "../types/requests/UploadFile";
import { IGetDirectory } from "../types/requests/GetDirectory";
import { IStoreUserRegistrationInfo } from "../types/requests/StoreUserRegistrationInfo";
import { IOpenPod } from "../types/requests/OpenPod";
import { State } from "./reducerTypes";

export const ACTION_TYPES = {
  SEND_FILE: {
    SEND_FILE_REQUEST: "SEND_FILE_REQUEST",
    PATCH_FILE_UPLOAD_REQUEST: "PATCH_FILE_UPLOAD_REQUEST",
    FILE_SENT_SUCCESS: "FILE_SENT_SUCCESS",
    SENDING_FILE_FAILED: "SENDING_FILE_FAILED",
    REMOVE_FILE_UPLOAD_PROGRESS: "REMOVE_FILE_UPLOAD_PROGRESS",
  },
  GET_DIRECTORY: {
    GET_DIRECTORY_REQUEST: "GET_DIRECTORY_REQUEST",
    GET_DIRECTORY_SUCCESS: "GET_DIRECTORY_SUCCESS",
    GET_DIRECTORY_FAILED: "GET_DIRECTORY_FAILED",
  },
  LOGIN_USER: {
    USER_LOGIN_REQUEST: "USER_LOGIN_REQUEST",
    USER_LOGIN_PENDING: "USER_LOGIN_PENDING",
    USER_LOGGED_SUCCESS: "USER_LOGGED_SUCCESS",
    USER_LOGGED_FAILED: "USER_LOGGED_FAILED",
  },
  GET_USER_STATS: {
    GET_USER_STATS_REQUEST: "",
    GET_USER_STATS_PENDING: "GET_USER_STATS_PENDING",
    GET_USER_STATS_SUCCESS: "GET_USER_STATS_SUCCESS",
    GET_USER_STATS_FAILED: "GET_USER_STATS_FAILED",
  },
  LOG_OUT_USER: {
    USER_LOG_OUT_PENDING: "USER_LOG_OUT_PENDING",
    USER_LOG_OUT_REQUEST: "USER_LOG_OUT_REQUEST",
    USER_LOGGED_OUT_SUCCESS: "USER_LOGGED_OUT_SUCCESS",
    USER_LOGGED_OUT_FAILED: "USER_LOGGED_OUT_FAILED",
  },
  SET_SYSTEM: "SET_SYSTEM",
  SET_PRIVATE_POD: "SET_PRIVATE_POD",
  SET_DIRECTORY: "SET_DIRECTORY",
  UNLOCK_SYSTEM: "UNLOCK_SYSTEM",
  STORE_USER_REGISTRATION_INFO: "STORE_USER_REGISTRATION_INFO",
  SEED_PHRASE: {
    SEED_PHRASE_REQUEST: "SEED_PHRASE_REQUEST",
    SEED_PHRASE_PENDING: "SEED_PHRASE_PENDING",
    SEED_PHRASE_SUCCESS: "SEED_PHRASE_SUCCESS",
    SEED_PHRASE_FAILED: "SEED_PHRASE_FAILED",
  },
  CREATE_USER: {
    CREATE_USER_REQUEST: "CREATE_USER_REQUEST",
    CREATE_USER_PENDING: "CREATE_USER_PENDING",
    CREATE_USER_SUCCESS: "CREATE_USER_SUCCESS",
    CREATE_USER_FAILED: "CREATE_USER_FAILED",
  },
  GET_PODS: {
    GET_PODS_REQUEST: "GET_PODS_REQUEST",
    GET_PODS_PENDING: "GET_PODS_PENDING",
    GET_PODS_SUCCESS: "GET_PODS_SUCCESS",
    GET_PODS_FAIL: "GET_PODS_FAIL",
  },
  OPEN_POD: {
    OPEN_POD_REQUEST: "OPEN_POD_REQUEST",
    OPEN_POD_PENDING: "OPEN_POD_PENDING",
    OPEN_POD_SUCCESS: "OPEN_POD_SUCCESS",
    OPEN_POD_FAIL: "OPEN_POD_FAIL",
  },
  SET_POD_NAME: "SET_POD_NAME",
  SET_SEARCH_QUERY: "SET_SEARCH_QUERY",
};

export type TActionTypes = Readonly<typeof ACTION_TYPES>;
export interface Actions {
  userLogin: (data: IUserLogin) => void;
  userLogout: () => void;
  uploadFile: (data: IUploadFIle) => void;
  cancelUpload: (requestId: string) => void;
  getDirectory: (data: IGetDirectory) => void;
  storeUserRegistrationInfo: (data: IStoreUserRegistrationInfo) => void;
  getSeedPhrase: (data: {}) => void;
  createUser: (data: unknown) => void;
  setSearchQuery: (data: string) => void;
  setDirectory: (data: string) => void;
  getPods: () => void;
  getUserStats: () => void;
  openPod: (data: IOpenPod) => void;
  setPodName: (data: string) => void;
  setPrivatePod: (data: boolean) => void;
}

export type TUseActions = (
  state: State,
  dispatch: React.Dispatch<any>
) => Actions;
