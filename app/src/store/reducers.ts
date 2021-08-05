import { ACTION_TYPES, TActionTypes } from "./actionTypes";

import { State } from "./reducerTypes";

const initialState: State = {
  token: "",
  sessionCookie: "",
  username: "",
  userData: null,
  fileUploaded: false,
  showPasswordUnlock: false,
  hasUser: false,
  password: null,
  mnemonic: null,
  unlocked: false,
  searchQuery: null,
  isPrivatePod: true,
  entries: null,
  dirs: null,
  inviteCode: "",
  address: "",
  errMsg: "",
  directory: "root",
  pods: [],
  podMsg: null,
  podName: "",
  podsOpened: [],
  userStats: null,
  flags: {
    loginStatus: "",
  },
  fileUploadProgress: [],
};

interface IBaseAction {
  types: [];
}

const reducer = (state: State = initialState, action: any) => {
  switch (action.type) {
    case ACTION_TYPES.SEND_FILE.PATCH_FILE_UPLOAD_REQUEST:
      let patched = false;
      let fileUploadProgress = state.fileUploadProgress.map((progressItem) => {
        if (progressItem.requestId === action.payload.requestId) {
          patched = true;
          return action.payload;
        }
        return progressItem;
      });

      if (!patched) {
        fileUploadProgress = [...state.fileUploadProgress, action.payload];
      }

      return {
        ...state,
        fileUploadProgress,
      };

    case ACTION_TYPES.SEND_FILE.REMOVE_FILE_UPLOAD_PROGRESS:
      return {
        ...state,
        fileUploadProgress: state.fileUploadProgress.filter(
          (progressItem) => progressItem.requestId !== action.payload
        ),
      };

    case ACTION_TYPES.LOGIN_USER.USER_LOGGED_SUCCESS:
      return {
        ...state,
        userData: action.payload.res.data,
        unlocked: true,
        password: action.payload.password,
        username: action.payload.username,
        flags: {
          ...state.flags,
          loginStatus: "success",
        },
      };
    case ACTION_TYPES.LOGIN_USER.USER_LOGGED_FAILED:
      return {
        ...state,
        unlocked: false,
        errMsg: action?.payload?.res,
        flags: {
          ...state.flags,
          loginStatus: "fail",
        },
      };
    case ACTION_TYPES.LOGIN_USER.USER_LOGIN_PENDING:
      return {
        ...state,
        flags: {
          ...state.flags,
          loginStatus: "loading",
        },
      };
    case ACTION_TYPES.LOG_OUT_USER.USER_LOGGED_OUT_SUCCESS:
      return {
        ...state,
        token: "",
        sessionCookie: "",
        username: "",
        userData: null,
        fileUploaded: {},
        showPasswordUnlock: false,
        hasUser: false,
        password: null,
        mnemonic: null,
        unlocked: false,
        searchQuery: null,
        isPrivatePod: true,
        entries: null,
        dirs: null,
        inviteCode: "",
        address: "",
        errMsg: "",
        directory: "root",
        pods: [],
        podMsg: null,
        podName: "",
        podsOpened: [],
        flags: {
          loginStatus: "",
        },
      };
    case ACTION_TYPES.LOG_OUT_USER.USER_LOGGED_OUT_FAILED:
      return {
        ...state,
        userData: null,
        unlocked: false,
        password: null,
        username: null,
      };
    case ACTION_TYPES.CREATE_USER.CREATE_USER_SUCCESS:
      return {
        ...state,
        address: action.payload.data,
        unlocked: true,
        errMsg: "",
      };
    case ACTION_TYPES.CREATE_USER.CREATE_USER_FAILED:
      return { ...state, unlocked: false, errMsg: action.payload.res };
    case ACTION_TYPES.SET_PRIVATE_POD:
      return { ...state, isPrivatePod: action.payload };
    case ACTION_TYPES.SEND_FILE.FILE_SENT_SUCCESS:
      return { ...state, fileUploaded: action.payload };
    case ACTION_TYPES.SET_SYSTEM:
      return {
        ...state,
        password: action.payload.password,
        unlocked: true,
        username: action.payload.username,
      };
    case ACTION_TYPES.GET_DIRECTORY.GET_DIRECTORY_SUCCESS:
      return {
        ...state,
        entries: action.payload.files,
        dirs: action.payload.dirs,
      };
    case ACTION_TYPES.STORE_USER_REGISTRATION_INFO:
      return {
        ...state,
        username: action.payload.username,
        password: action.payload.password,
        inviteCode: action.payload.inviteCode,
      };
    case ACTION_TYPES.SEED_PHRASE.SEED_PHRASE_SUCCESS:
      return {
        ...state,
        mnemonic: action.payload,
      };
    case ACTION_TYPES.SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload,
      };
    case ACTION_TYPES.SET_DIRECTORY:
      return {
        ...state,
        directory: action.payload,
      };
    case ACTION_TYPES.GET_PODS.GET_PODS_SUCCESS:
      return {
        ...state,
        pods: action.payload.data.pod_name,
      };
    case ACTION_TYPES.GET_USER_STATS.GET_USER_STATS_SUCCESS:
      return {
        ...state,
        userStats: action.payload.data,
      };
    case ACTION_TYPES.GET_USER_STATS.GET_USER_STATS_FAILED:
      return {
        ...state,
        podMSg: action.payload,
      };
    case ACTION_TYPES.OPEN_POD.OPEN_POD_SUCCESS:
      return {
        ...state,
        podsOpened: [...state.podsOpened, state.podName],
      };
    case ACTION_TYPES.OPEN_POD.OPEN_POD_FAIL:
      return {
        ...state,
        podMSg: action.payload,
      };
    case ACTION_TYPES.SET_POD_NAME:
      return {
        ...state,
        podName: action.payload,
      };
    default:
      return state;
  }
};

export { initialState, reducer };
