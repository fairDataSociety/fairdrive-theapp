import { ACTION_TYPES, TUseActions } from "./actionTypes";

export const useActions: TUseActions = (state, dispatch) => ({
  userLogin: (data) => {
    dispatch({
      type: ACTION_TYPES.LOGIN_USER.USER_LOGIN_REQUEST,
      payload: data,
    });
    dispatch({
      type: ACTION_TYPES.LOGIN_USER.USER_LOGIN_PENDING,
    });
  },
  userLogout: () => {
    dispatch({
      type: ACTION_TYPES.LOG_OUT_USER.USER_LOG_OUT_REQUEST,
      payload: "",
    });
  },
  uploadFile: (data) => {
    dispatch({
      type: ACTION_TYPES.SEND_FILE.SEND_FILE_REQUEST,
      payload: data,
    });
  },
  cancelUpload: (requestId: string) => {
    dispatch({
      type: ACTION_TYPES.SEND_FILE.REMOVE_FILE_UPLOAD_PROGRESS,
      payload: requestId,
    });
  },
  getDirectory: (data) => {
    dispatch({
      type: ACTION_TYPES.GET_DIRECTORY.GET_DIRECTORY_REQUEST,
      payload: data,
    });
  },
  setPrivatePod: (data) => {
    dispatch({
      type: ACTION_TYPES.SET_PRIVATE_POD,
      payload: data,
    });
  },
  storeUserRegistrationInfo: (data) => {
    dispatch({
      type: ACTION_TYPES.STORE_USER_REGISTRATION_INFO,
      payload: data,
    });
  },
  getSeedPhrase: (data) => {
    dispatch({
      type: ACTION_TYPES.SEED_PHRASE.SEED_PHRASE_REQUEST,
      payload: data,
    });
  },
  createUser: (data) => {
    dispatch({
      type: ACTION_TYPES.CREATE_USER.CREATE_USER_REQUEST,
      payload: data,
    });
  },
  setSearchQuery: (data) => {
    dispatch({
      type: ACTION_TYPES.SET_SEARCH_QUERY,
      payload: data,
    });
  },
  setDirectory: (data) => {
    dispatch({
      type: ACTION_TYPES.SET_DIRECTORY,
      payload: data,
    });
  },
  getPods: () => {
    dispatch({
      type: ACTION_TYPES.GET_PODS.GET_PODS_REQUEST,
    });
  },
  getUserStats: () => {
    dispatch({
      type: ACTION_TYPES.GET_USER_STATS.GET_USER_STATS_REQUEST,
    });
  },
  openPod: (data) => {
    dispatch({
      type: ACTION_TYPES.OPEN_POD.OPEN_POD_REQUEST,
      payload: data,
    });
  },
  setPodName: (data) => {
    dispatch({
      type: ACTION_TYPES.SET_POD_NAME,
      payload: data,
    });
  },
});
