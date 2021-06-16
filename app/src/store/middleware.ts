import types from "./actionTypes";
import { login, fileUpload, getDirectory, generateSeedPhrase, createAccount, getPods, openPod } from "../store/services/fairOS";

export const applyMiddleware = (dispatch) => (action) => {
  switch (action.type) {
    case types.LOGIN_USER.USER_LOGIN_REQUEST:
      return login(action.payload)
        .then((res) => {
          dispatch({
            type: types.LOGIN_USER.USER_LOGGED_SUCCESS,
            payload: res,
          });
          dispatch({
            type: types.SET_SYSTEM,
            payload: action.payload,
          })
        })
        .catch((err) =>
          dispatch({
            type: types.LOGIN_USER.USER_LOGGED_FAILED,
            payload: err.response,
          })
        );
    case types.CREATE_USER.CREATE_USER_REQUEST:
      return createAccount(action.payload)
        .then((res) => {
          dispatch({
            type: types.CREATE_USER.CREATE_USER_SUCCESS,
            payload: res,
          });
        })
        .catch((err) =>
          dispatch({
            type: types.CREATE_USER.CREATE_USER_FAILED,
            payload: err.response,
          })
        );
    case types.SEND_FILE.SEND_FILE_REQUEST:
      return fileUpload(action.payload).then((res) => {
        dispatch({
          type: types.SEND_FILE.FILE_SENT_SUCCESS,
          payload: res,
        });
      })
        .catch((err) =>
          dispatch({
            type: types.SEND_FILE.SENDING_FILE_FAILED,
            payload: err.response,
          })
        );
    case types.GET_DIRECTORY.GET_DIRECTORY_REQUEST:
      return getDirectory(action.payload).then((res) => {
        dispatch({
          type: types.GET_DIRECTORY.GET_DIRECTORY_SUCCESS,
          payload: res,
        });
      })
    case types.SEED_PHRASE.SEED_PHRASE_REQUEST:
      return generateSeedPhrase().then((res) => {
        dispatch({
          type: types.SEED_PHRASE.SEED_PHRASE_SUCCESS,
          payload: res,
        });
      }).catch((err) =>
        dispatch({
          type: types.SEED_PHRASE.SEED_PHRASE_FAILED,
          payload: err.response,
        })
      );
    case types.GET_PODS.GET_PODS_REQUEST:
      return getPods().then((res) => {
        dispatch({
          type: types.GET_PODS.GET_PODS_SUCCESS,
          payload: res,
        });
      }).catch((err) =>
        dispatch({
          type: types.GET_PODS.GET_PODS_FAIL,
          payload: err.response,
        })
      );
    case types.OPEN_POD.OPEN_POD_REQUEST:
      return openPod(action.payload).then((res) => {
        dispatch({
          type: types.OPEN_POD.OPEN_POD_SUCCESS,
          payload: res,
        });
      }).catch((err) =>
        dispatch({
          type: types.OPEN_POD.OPEN_POD_FAIL,
          payload: err.response,
        })
      );
    default:
      dispatch(action);
  }
};
