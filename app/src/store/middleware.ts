import { ActionTree } from 'src/types/actions/core/ActionTree';
import { ActionEnum } from 'src/types/actions/core/ActionsEnum';

import { uploadFile, deleteFile } from 'src/services/file';
import { getPods, deletePod, openPod } from 'src/services/pod';
import { getDirectory, deleteDirectory } from 'src/services/directory';
import { createAccount } from 'src/services/account';
import { generateSeedPhrase } from 'src/services/seedPhrase';
import { loginUser, logoutUser } from 'src/services/auth';
import { statsUser } from 'src/services/user';
import toast from 'react-hot-toast';

export const applyMiddleware =
  (dispatch: React.Dispatch<ActionTree>) => (action: ActionTree) => {
    switch (action.type) {
      case ActionEnum.USER_LOGIN_REQUEST:
        return loginUser(action.payload)
          .then((res) => {
            dispatch({
              type: ActionEnum.USER_LOGGED_SUCCESS,
              payload: {
                password: action.payload.password,
                username: action.payload.username,
                res: res.res,
              },
            });

            dispatch({
              type: ActionEnum.SET_SYSTEM,
              payload: action.payload,
            });
          })
          .catch((err) =>
            dispatch({
              type: ActionEnum.USER_LOGGED_FAILED,
              payload: err.response,
            })
          );
      case ActionEnum.GET_USER_STATS_REQUEST:
        return statsUser()
          .then((res) => {
            dispatch({
              type: ActionEnum.GET_USER_STATS_SUCCESS,
              payload: res,
            });
          })
          .catch((err) =>
            dispatch({
              type: ActionEnum.GET_USER_STATS_FAILED,
              payload: err.response,
            })
          );
      case ActionEnum.CREATE_USER_REQUEST:
        return createAccount(action.payload)
          .then((res) => {
            dispatch({
              type: ActionEnum.CREATE_USER_SUCCESS,
              payload: res,
            });
          })
          .catch((err) =>
            dispatch({
              type: ActionEnum.CREATE_USER_FAILED,
              payload: err.response,
            })
          );
      case ActionEnum.USER_LOG_OUT_REQUEST:
        return logoutUser()
          .then((res) => {
            dispatch({
              type: ActionEnum.USER_LOGGED_OUT_SUCCESS,
              payload: res,
            });
          })
          .catch((err) =>
            dispatch({
              type: ActionEnum.USER_LOGGED_OUT_FAILED,
              payload: err.response,
            })
          );
      case ActionEnum.DELETE_FILE_REQUEST:
        return deleteFile(action.payload)
          .then((res) => {
            dispatch({
              type: ActionEnum.DELETE_FILE_FILE_DELETE_SUCCESS,
              payload: res,
            });
          })
          .catch((err) => {
            dispatch({
              type: ActionEnum.DELETE_FILE_DELETE_FILE_FAILED,
              payload: err.response,
            });
          });
      case ActionEnum.DELETE_FOLDER_REQUEST:
        return deleteDirectory(action.payload)
          .then((res) => {
            dispatch({
              type: ActionEnum.DELETE_FOLDER_FOLDER_DELETE_SUCCESS,
              payload: res,
            });
          })
          .catch((err) => {
            dispatch({
              type: ActionEnum.DELETE_FOLDER_FAILED,
              payload: err.response,
            });
          });
      case ActionEnum.DELETE_POD_REQUEST:
        return deletePod(action.payload)
          .then((res) => {
            dispatch({
              type: ActionEnum.POD_DELETE_SUCCESS,
              payload: res,
            });
          })
          .catch((err) => {
            dispatch({
              type: ActionEnum.DELETE_POD_FAILED,
              payload: err.response,
            });
          });

      case ActionEnum.SEND_FILE_REQUEST: {
        (async () => {
          const { uploadRequest, requestId } = await uploadFile(
            action.payload,
            (requestId, progressEvent, cancelFn) => {
              dispatch({
                type: ActionEnum.SEND_FILE_PATCH_FILE_UPLOAD_REQUEST,
                payload: {
                  progressEvent,
                  requestId,
                  cancelFn,
                  filename: action.payload.files[0]?.name,
                },
              });
            }
          );

          await uploadRequest
            .then((res) => {
              dispatch({
                type: ActionEnum.SEND_FILE_FILE_SENT_SUCCESS,
                payload: res,
              });

              setTimeout(() => {
                dispatch({
                  type: ActionEnum.SEND_FILE_REMOVE_FILE_UPLOAD_PROGRESS,
                  payload: requestId,
                });
              }, 2500);
            })
            .catch((err) => {
              toast.error('Something went wrong with uploading');
              dispatch({
                type: ActionEnum.SEND_FILE_SENDING_FILE_FAILED,
                payload: err.response,
              });
            });
        })();

        break;
      }
      case ActionEnum.GET_DIRECTORY_REQUEST:
        return getDirectory(action.payload).then((res) => {
          dispatch({
            type: ActionEnum.GET_DIRECTORY_SUCCESS,
            payload: res,
          });
        });
      case ActionEnum.SEED_PHRASE_REQUEST:
        return generateSeedPhrase()
          .then((res) => {
            dispatch({
              type: ActionEnum.SEED_PHRASE_SUCCESS,
              payload: res,
            });
          })
          .catch((err) =>
            dispatch({
              type: ActionEnum.SEED_PHRASE_FAILED,
              payload: err.response,
            })
          );
      case ActionEnum.GET_PODS_REQUEST:
        return getPods()
          .then((res) => {
            dispatch({
              type: ActionEnum.GET_PODS_SUCCESS,
              payload: res,
            });
          })
          .catch((err) =>
            dispatch({
              type: ActionEnum.GET_PODS_FAIL,
              payload: err.response,
            })
          );
      case ActionEnum.OPEN_POD_REQUEST:
        return openPod(action.payload)
          .then((res) => {
            dispatch({
              type: ActionEnum.OPEN_POD_SUCCESS,
              payload: res,
            });
          })
          .catch((err) =>
            dispatch({
              type: ActionEnum.OPEN_POD_FAIL,
              payload: err.response,
            })
          );
      default:
        dispatch(action);
    }
  };
