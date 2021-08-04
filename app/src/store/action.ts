import types from './actionTypes';

export const useActions = (state, dispatch) => ({
  userLogin: (data) => {
    dispatch({
      type: types.LOGIN_USER.USER_LOGIN_REQUEST,
      payload: data,
    });
    dispatch({
      type: types.LOGIN_USER.USER_LOGIN_PENDING,
    });
  },
  userLogout: () => {
    dispatch({
      type: types.LOG_OUT_USER.USER_LOG_OUT_REQUEST,
      payload: '',
    });
  },
  uploadFile: (data) => {
    dispatch({
      type: types.SEND_FILE.SEND_FILE_REQUEST,
      payload: data,
    });
  },
  getDirectory: (data) => {
    dispatch({
      type: types.GET_DIRECTORY.GET_DIRECTORY_REQUEST,
      payload: data,
    });
  },
  setPrivatePod: (data) => {
    dispatch({
      type: types.SET_PRIVATE_POD,
      payload: data,
    });
  },
  storeUserRegistrationInfo: (data) => {
    dispatch({
      type: types.STORE_USER_REGISTRATION_INFO,
      payload: data,
    });
  },
  getSeedPhrase: (data) => {
    dispatch({
      type: types.SEED_PHRASE.SEED_PHRASE_REQUEST,
      payload: data,
    });
  },
  createUser: (data) => {
    dispatch({
      type: types.CREATE_USER.CREATE_USER_REQUEST,
      payload: data,
    });
  },
  setSearchQuery: (data) => {
    dispatch({
      type: types.SET_SEARCH_QUERY,
      payload: data,
    });
  },
  setDirectory: (data) => {
    dispatch({
      type: types.SET_DIRECTORY,
      payload: data,
    });
  },
  getPods: () => {
    dispatch({
      type: types.GET_PODS.GET_PODS_REQUEST,
    });
  },
  getUserStats: () =>{
    dispatch({
      type: types.GET_USER_STATS.GET_USER_STATS_REQUEST,
    });
  },
   openPod: (data) => {
    dispatch({
      type: types.OPEN_POD.OPEN_POD_REQUEST,
      payload: data,
    });
  },
  setPodName: (data) => {
    dispatch({
      type: types.SET_POD_NAME,
      payload: data,
    });
  },
});

export interface Actions {
  userLogin: (data: any) => void;
  userLogout: () => void;
  uploadFile: (data: any) => void;
  getDirectory: (data: any) => void;
  storeUserRegistrationInfo: (data: any) => void;
  getSeedPhrase: (data: any) => void;
  createUser: (data: any) => void;
  setSearchQuery: (data: any) => void;
  setDirectory: (data: any) => void;
  getPods: () => void;
  getUserStats: () => void;
  openPod: (data: any) => void;
  setPodName: (data: any) => void;
  setPrivatePod: (data: any) => void;
}
