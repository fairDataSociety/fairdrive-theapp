import { ActionEnum } from 'src/types/actions/core/ActionsEnum';
import { UseActions } from 'src/types/actions/core/UseActions';

export const useActions: UseActions = (state, dispatch) => ({
  userLogin: (data) => {
    dispatch({
      type: ActionEnum.USER_LOGIN_REQUEST,
      payload: data,
    });
    dispatch({
      type: ActionEnum.USER_LOGIN_PENDING,
      payload: undefined,
    });
  },
  userLogout: () => {
    dispatch({
      type: ActionEnum.USER_LOG_OUT_REQUEST,
      payload: undefined,
    });
  },
  uploadFile: (data) => {
    dispatch({
      type: ActionEnum.SEND_FILE_REQUEST,
      payload: data,
    });
  },
  deleteFile: (data) => {
    dispatch({
      type: ActionEnum.DELETE_FILE_REQUEST,
      payload: data,
    });
  },
  deleteFolder: (data) => {
    dispatch({
      type: ActionEnum.DELETE_FOLDER_REQUEST,
      payload: data,
    });
  },
  deletePod: (data) => {
    dispatch({
      type: ActionEnum.DELETE_POD_REQUEST,
      payload: data,
    });
  },
  cancelUpload: (requestId: string) => {
    dispatch({
      type: ActionEnum.SEND_FILE_REMOVE_FILE_UPLOAD_PROGRESS,
      payload: requestId,
    });
  },
  getDirectory: (data) => {
    dispatch({
      type: ActionEnum.GET_DIRECTORY_REQUEST,
      payload: data,
    });
  },
  setPrivatePod: (data) => {
    dispatch({
      type: ActionEnum.SET_PRIVATE_POD,
      payload: data,
    });
  },
  storeUserRegistrationInfo: (data) => {
    dispatch({
      type: ActionEnum.STORE_USER_REGISTRATION_INFO,
      payload: data,
    });
  },
  getSeedPhrase: () => {
    dispatch({
      type: ActionEnum.SEED_PHRASE_REQUEST,
      payload: undefined,
    });
  },
  createUser: (data) => {
    dispatch({
      type: ActionEnum.CREATE_USER_REQUEST,
      payload: data,
    });
  },
  setSearchQuery: (data) => {
    dispatch({
      type: ActionEnum.SET_SEARCH_QUERY,
      payload: data,
    });
  },
  setDirectory: (data) => {
    dispatch({
      type: ActionEnum.SET_DIRECTORY,
      payload: data,
    });
  },
  getPods: () => {
    dispatch({
      type: ActionEnum.GET_PODS_REQUEST,
      payload: undefined,
    });
  },
  getUserStats: () => {
    dispatch({
      type: ActionEnum.GET_USER_STATS_REQUEST,
      payload: undefined,
    });
  },
  openPod: (data) => {
    dispatch({
      type: ActionEnum.OPEN_POD_REQUEST,
      payload: data,
    });
  },
  setPodName: (data) => {
    dispatch({
      type: ActionEnum.SET_POD_NAME,
      payload: data,
    });
  },
});
