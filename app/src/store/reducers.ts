import types from './actionTypes';

type Status = string | 'loading' | 'success' | 'fail';

interface Flags {
  loginStatus: Status;
}
export interface State {
  token: string;
  sessionCookie: string;
  username: string;
  userData: any;
  fileUploaded: any;
  showPasswordUnlock: boolean;
  hasUser: boolean;
  password: string;
  mnemonic: string;
  unlocked: boolean;
  searchQuery: string;
  entries: any;
  dirs: any;
  inviteCode: string;
  address: string;
  errMsg: string;
  directory: string;
  pods: any;
  podMsg: any;
  podName: string;
  podsOpened: any;
  isPrivatePod: boolean;
  flags: Flags;
}

const initialState: State = {
  token: '',
  sessionCookie: '',
  username: '',
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
  inviteCode: '',
  address: '',
  errMsg: '',
  directory: 'root',
  pods: [],
  podMsg: null,
  podName: '',
  podsOpened: [],
  flags: {
    loginStatus: '',
  },
};

const reducer = (state: State = initialState, action: any) => {
  switch (action.type) {
    case types.LOGIN_USER.USER_LOGGED_SUCCESS:
      return {
        ...state,
        userData: action.payload.res.data,
        unlocked: true,
        password: action.payload.password,
        username: action.payload.username,
        flags: {
          ...state.flags,
          loginStatus: 'success',
        },
      };
    case types.LOGIN_USER.USER_LOGGED_FAILED:
      return {
        ...state,
        unlocked: false,
        errMsg: action?.payload?.res,
        flags: {
          ...state.flags,
          loginStatus: 'fail',
        },
      };
    case types.LOGIN_USER.USER_LOGIN_PENDING:
      return {
        ...state,
        flags: {
          ...state.flags,
          loginStatus: 'loading',
        },
      };
    case types.LOG_OUT_USER.USER_LOGGED_OUT_SUCCESS:
      return {
        ...state,
        token: '',
        sessionCookie: '',
        username: '',
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
        inviteCode: '',
        address: '',
        errMsg: '',
        directory: 'root',
        pods: [],
        podMsg: null,
        podName: '',
        podsOpened: [],
        flags: {
          loginStatus: '',
        },
      };
    case types.LOG_OUT_USER.USER_LOGGED_OUT_FAILED:
      return {
        ...state,
        userData: null,
        unlocked: false,
        password: null,
        username: null,
      };
    case types.CREATE_USER.CREATE_USER_SUCCESS:
      return {
        ...state,
        address: action.payload.data,
        unlocked: true,
        errMsg: '',
      };
    case types.CREATE_USER.CREATE_USER_FAILED:
      return { ...state, unlocked: false, errMsg: action.payload.res };
    case types.SET_PRIVATE_POD:
      return { ...state, isPrivatePod: action.payload };
    case types.SEND_FILE.FILE_SENT_SUCCESS:
      return { ...state, fileUploaded: action.payload };
    case types.SET_SYSTEM:
      return {
        ...state,
        password: action.payload.password,
        unlocked: true,
        username: action.payload.username,
      };
    case types.GET_DIRECTORY.GET_DIRECTORY_SUCCESS:
      return {
        ...state,
        entries: action.payload.files,
        dirs: action.payload.dirs,
      };
    case types.STORE_USER_REGISTRATION_INFO:
      return {
        ...state,
        username: action.payload.username,
        password: action.payload.password,
        inviteCode: action.payload.inviteCode,
      };
    case types.SEED_PHRASE.SEED_PHRASE_SUCCESS:
      return {
        ...state,
        mnemonic: action.payload,
      };
    case types.SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload,
      };
    case types.SET_DIRECTORY:
      return {
        ...state,
        directory: action.payload,
      };
    case types.GET_PODS.GET_PODS_SUCCESS:
      return {
        ...state,
        pods: action.payload.data.pod_name,
      };
    case types.OPEN_POD.OPEN_POD_SUCCESS:
      return {
        ...state,
        podsOpened: [...state.podsOpened, state.podName],
      };
    case types.OPEN_POD.OPEN_POD_FAIL:
      return {
        ...state,
        podMSg: action.payload,
      };
    case types.SET_POD_NAME:
      return {
        ...state,
        podName: action.payload,
      };
    default:
      return state;
  }
};

export { initialState, reducer };
