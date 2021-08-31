import { ActionEnum } from 'src/types/actions/core/ActionsEnum';
import { ActionTree } from 'src/types/actions/core/ActionTree';
import { State } from 'src/types/actions/core/State';

const initialState: State = {
  token: '',
  sessionCookie: '',
  username: '',
  userData: null,
  fileUploaded: false,
  fileDeleted: {},
  folderDeleted: {},
  podDeleted: {},
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
  userStats: null,
  flags: {
    loginStatus: '',
  },
  fileUploadProgress: [],
};

const reducer = (state: State = initialState, action: ActionTree) => {
  switch (action.type) {
    case ActionEnum.SEND_FILE_PATCH_FILE_UPLOAD_REQUEST: {
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
    }
    case ActionEnum.SEND_FILE_REMOVE_FILE_UPLOAD_PROGRESS:
      return {
        ...state,
        fileUploadProgress: state.fileUploadProgress.filter(
          (progressItem) => progressItem.requestId !== action.payload
        ),
      };

    case ActionEnum.USER_LOGGED_SUCCESS:
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
    case ActionEnum.USER_LOGGED_FAILED:
      return {
        ...state,
        unlocked: false,
        errMsg: action?.payload,
        flags: {
          ...state.flags,
          loginStatus: 'fail',
        },
      };
    case ActionEnum.USER_LOGIN_PENDING:
      return {
        ...state,
        flags: {
          ...state.flags,
          loginStatus: 'loading',
        },
      };
    case ActionEnum.USER_LOGGED_OUT_SUCCESS:
      return {
        ...state,
        token: '',
        sessionCookie: '',
        username: '',
        userData: null,
        fileUploaded: {},
        fileDeleted: {},
        folderDeleted: {},
        podDeleted: {},
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
    case ActionEnum.USER_LOGGED_OUT_FAILED:
      return {
        ...state,
        userData: null,
        unlocked: false,
        password: null,
        username: null,
      };
    case ActionEnum.CREATE_USER_SUCCESS:
      return {
        ...state,
        address: action.payload.data,
        unlocked: true,
        errMsg: '',
      };
    case ActionEnum.CREATE_USER_FAILED:
      return { ...state, unlocked: false, errMsg: action.payload };
    case ActionEnum.SET_PRIVATE_POD:
      return { ...state, isPrivatePod: action.payload };
    case ActionEnum.SEND_FILE_FILE_SENT_SUCCESS:
      return { ...state, fileUploaded: action.payload };
    case ActionEnum.DELETE_FILE_FILE_DELETE_SUCCESS:
      return { ...state, fileDeleted: action.payload };
    case ActionEnum.DELETE_FOLDER_FOLDER_DELETE_SUCCESS:
      return { ...state, folderDeleted: action.payload };
    case ActionEnum.POD_DELETE_SUCCESS:
      return { ...state, podDeleted: action.payload };
    case ActionEnum.SET_SYSTEM:
      return {
        ...state,
        password: action.payload.password,
        unlocked: true,
        username: action.payload.username,
      };
    case ActionEnum.GET_DIRECTORY_SUCCESS:
      return {
        ...state,
        entries: action.payload.files,
        dirs: action.payload.dirs,
      };
    case ActionEnum.STORE_USER_REGISTRATION_INFO:
      return {
        ...state,
        username: action.payload.username,
        password: action.payload.password,
        inviteCode: action.payload.inviteCode,
      };
    case ActionEnum.SEED_PHRASE_SUCCESS:
      return {
        ...state,
        mnemonic: action.payload,
      };
    case ActionEnum.SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload,
      };
    case ActionEnum.SET_DIRECTORY:
      return {
        ...state,
        directory: action.payload,
      };
    case ActionEnum.GET_PODS_SUCCESS:
      return {
        ...state,
        pods: action.payload.data.pod_name,
      };
    case ActionEnum.GET_USER_STATS_SUCCESS:
      return {
        ...state,
        userStats: action.payload.data,
      };
    case ActionEnum.GET_USER_STATS_FAILED:
      return {
        ...state,
        podMSg: action.payload,
      };
    case ActionEnum.OPEN_POD_SUCCESS:
      return {
        ...state,
        podsOpened: [...state.podsOpened, state.podName],
      };
    case ActionEnum.OPEN_POD_FAIL:
      return {
        ...state,
        podMsg: action.payload,
      };
    case ActionEnum.SET_POD_NAME:
      return {
        ...state,
        podName: action.payload,
      };
    default:
      return state;
  }
};

export { initialState, reducer };
