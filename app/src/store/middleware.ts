import { ACTION_TYPES } from "./actionTypes";
import {
  login,
  fileUpload,
  getDirectory,
  generateSeedPhrase,
  createAccount,
  getPods,
  openPod,
  logOut,
  deleteFile,
  deleteFolder,
  deletePod,
  userStats,
} from "../store/services/fairOS";

export const applyMiddleware = (dispatch) => (action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_USER.USER_LOGIN_REQUEST:
      return login(action.payload)
        .then((res) => {
          dispatch({
            type: ACTION_TYPES.LOGIN_USER.USER_LOGGED_SUCCESS,
            payload: res,
          });
          dispatch({
            type: ACTION_TYPES.SET_SYSTEM,
            payload: action.payload,
          });
        })
        .catch((err) =>
          dispatch({
            type: ACTION_TYPES.LOGIN_USER.USER_LOGGED_FAILED,
            payload: err.response,
          })
        );
    case ACTION_TYPES.GET_USER_STATS.GET_USER_STATS_REQUEST:
      return userStats()
        .then((res) => {
          dispatch({
            type: ACTION_TYPES.GET_USER_STATS.GET_USER_STATS_SUCCESS,
            payload: res,
          });
        })
        .catch((err) =>
          dispatch({
            type: ACTION_TYPES.GET_USER_STATS.GET_USER_STATS_FAILED,
            payload: err.response,
          })
        );
    case ACTION_TYPES.CREATE_USER.CREATE_USER_REQUEST:
      return createAccount(action.payload)
        .then((res) => {
          dispatch({
            type: ACTION_TYPES.CREATE_USER.CREATE_USER_SUCCESS,
            payload: res,
          });
        })
        .catch((err) =>
          dispatch({
            type: ACTION_TYPES.CREATE_USER.CREATE_USER_FAILED,
            payload: err.response,
          })
        );
    case ACTION_TYPES.LOG_OUT_USER.USER_LOG_OUT_REQUEST:
      return logOut()
        .then((res) => {
          dispatch({
            type: ACTION_TYPES.LOG_OUT_USER.USER_LOGGED_OUT_SUCCESS,
            payload: res,
          });
        })
        .catch((err) =>
          dispatch({
            type: ACTION_TYPES.LOG_OUT_USER.USER_LOGGED_OUT_FAILED,
            payload: err.response,
          })
        );
    case ACTION_TYPES.DELETE_FILE.DELETE_FILE_REQUEST:
      return deleteFile(action.payload)
        .then((res) => {
          dispatch({
            type: ACTION_TYPES.DELETE_FILE.FILE_DELETE_SUCCESS,
            payload: res,
          });
        })
        .catch((err) => {
          dispatch({
            type: ACTION_TYPES.DELETE_FILE.DELETE_FILE_FAILED,
            payload: err.response,
          });
        });
    case ACTION_TYPES.DELETE_FOLDER.DELETE_FOLDER_REQUEST:
      return deleteFolder(action.payload)
        .then((res) => {
          dispatch({
            type: ACTION_TYPES.DELETE_FOLDER.FOLDER_DELETE_SUCCESS,
            payload: res,
          });
        })
        .catch((err) => {
          dispatch({
            type: ACTION_TYPES.DELETE_FILE.DELETE_FILE_FAILED,
            payload: err.response,
          });
        });
    case ACTION_TYPES.DELETE_POD.DELETE_POD_REQUEST:
      return deletePod(action.payload)
        .then((res) => {
          dispatch({
            type: ACTION_TYPES.DELETE_POD.POD_DELETE_SUCCESS,
            payload: res,
          });
        })
        .catch((err) => {
          dispatch({
            type: ACTION_TYPES.DELETE_FILE.DELETE_FILE_FAILED,
            payload: err.response,
          });
        });
    case ACTION_TYPES.SEND_FILE.SEND_FILE_REQUEST: {
      const { uploadRequest, requestId } = fileUpload(
        action.payload,
        (requestId, progressEvent, cancelFn) => {
          dispatch({
            type: ACTION_TYPES.SEND_FILE.PATCH_FILE_UPLOAD_REQUEST,
            payload: { progressEvent, requestId, cancelFn },
          });
        }
      );

      uploadRequest
        .then((res) => {
          dispatch({
            type: ACTION_TYPES.SEND_FILE.FILE_SENT_SUCCESS,
            payload: res,
          });

          setTimeout(() => {
            dispatch({
              type: ACTION_TYPES.SEND_FILE.REMOVE_FILE_UPLOAD_PROGRESS,
              payload: requestId,
            });
          }, 2500);
        })
        .catch((err) =>
          dispatch({
            type: ACTION_TYPES.SEND_FILE.SENDING_FILE_FAILED,
            payload: err.response,
          })
        );

      break;
    }
    case ACTION_TYPES.GET_DIRECTORY.GET_DIRECTORY_REQUEST:
      return getDirectory(action.payload).then((res) => {
        dispatch({
          type: ACTION_TYPES.GET_DIRECTORY.GET_DIRECTORY_SUCCESS,
          payload: res,
        });
      });
    case ACTION_TYPES.SEED_PHRASE.SEED_PHRASE_REQUEST:
      return generateSeedPhrase()
        .then((res) => {
          dispatch({
            type: ACTION_TYPES.SEED_PHRASE.SEED_PHRASE_SUCCESS,
            payload: res,
          });
        })
        .catch((err) =>
          dispatch({
            type: ACTION_TYPES.SEED_PHRASE.SEED_PHRASE_FAILED,
            payload: err.response,
          })
        );
    case ACTION_TYPES.GET_PODS.GET_PODS_REQUEST:
      return getPods()
        .then((res) => {
          dispatch({
            type: ACTION_TYPES.GET_PODS.GET_PODS_SUCCESS,
            payload: res,
          });
        })
        .catch((err) =>
          dispatch({
            type: ACTION_TYPES.GET_PODS.GET_PODS_FAIL,
            payload: err.response,
          })
        );
    case ACTION_TYPES.OPEN_POD.OPEN_POD_REQUEST:
      return openPod(action.payload)
        .then((res) => {
          dispatch({
            type: ACTION_TYPES.OPEN_POD.OPEN_POD_SUCCESS,
            payload: res,
          });
        })
        .catch((err) =>
          dispatch({
            type: ACTION_TYPES.OPEN_POD.OPEN_POD_FAIL,
            payload: err.response,
          })
        );
    default:
      dispatch(action);
  }
};
