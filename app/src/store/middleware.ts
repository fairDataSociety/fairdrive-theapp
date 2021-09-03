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

import {
  STATES_NAMES,
  POD_STATUS,
  DIRECTORY_STATUS,
  State,
} from 'src/types/pod-state';

export const applyMiddleware =
  (
    dispatch: React.Dispatch<ActionTree>,
    changePodState: (nextState: State) => void
  ) =>
  (action: ActionTree) => {
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

            changePodState({
              tag: STATES_NAMES.USER_LOGGED,
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
            changePodState({
              tag: STATES_NAMES.INITIAL,
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
          try {
            const { files, podName, directory } = action.payload;
            await Promise.all(
              files.map(async (file) => {
                const temporaryPayload: typeof action.payload = {
                  files: [file],
                  podName: podName,
                  directory: directory,
                };

                const { uploadRequest, requestId } = await uploadFile(
                  temporaryPayload,
                  (requestId, progressEvent, cancelFn) => {
                    dispatch({
                      type: ActionEnum.SEND_FILE_PATCH_FILE_UPLOAD_REQUEST,
                      payload: {
                        progressEvent,
                        requestId,
                        cancelFn,
                        filename: temporaryPayload.files[0].name,
                      },
                    });
                  }
                );
                // Check if all files were sent properly
                uploadRequest.data.Responses.forEach((response) => {
                  if (response.message !== 'uploaded successfully') {
                    toast.error(
                      `Something went wrong with uploading ${response.file_name}`
                    );
                    dispatch({
                      type: ActionEnum.SEND_FILE_SENDING_FILE_FAILED,
                      payload: {
                        requestId: requestId,
                        filename: file.name,
                        status: 'failed',
                      },
                    });
                  } else {
                    dispatch({
                      type: ActionEnum.SEND_FILE_FILE_SENT_SUCCESS,
                      payload: {
                        requestId: requestId,
                        filename: file.name,
                        status: 'success',
                      },
                    });
                  }
                });

                setTimeout(() => {
                  dispatch({
                    type: ActionEnum.SEND_FILE_REMOVE_FILE_UPLOAD_PROGRESS,
                    payload: requestId,
                  });
                }, 2500);

                // Reload directory entries after file upload
                dispatch({
                  type: ActionEnum.GET_DIRECTORY_REQUEST,
                  payload: {
                    directory: directory,
                    podName: podName,
                  },
                });
              })
            );
          } catch (error) {
            toast.error('Something went wrong with uploading');
            dispatch({
              type: ActionEnum.SEND_FILE_SENDING_FILE_FAILED,
              payload: error.response,
            });
          }
        })();

        break;
      }
      case ActionEnum.GET_DIRECTORY_REQUEST: {
        changePodState({
          tag: STATES_NAMES.DIRECTORY_STATE,
          podName: action.payload.podName,
          directoryName: action.payload.directory,
          status: DIRECTORY_STATUS.LOADING,
        });
        return getDirectory(action.payload)
          .then((res) => {
            dispatch({
              type: ActionEnum.GET_DIRECTORY_SUCCESS,
              payload: res,
            });
            changePodState({
              tag: STATES_NAMES.DIRECTORY_STATE,
              podName: action.payload.podName,
              directoryName: action.payload.directory,
              status: DIRECTORY_STATUS.SUCCESS,
            });
          })
          .catch((error) => {
            changePodState({
              tag: STATES_NAMES.DIRECTORY_STATE,
              podName: action.payload.podName,
              directoryName: action.payload.directory,
              status: DIRECTORY_STATUS.ERROR,
            });

            return Promise.reject(error);
          });
      }
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
        changePodState({
          tag: STATES_NAMES.POD_STATE,
          podName: action.payload.podName,
          status: POD_STATUS.LOADING,
        });

        return openPod(action.payload)
          .then((res) => {
            dispatch({
              type: ActionEnum.OPEN_POD_SUCCESS,
              payload: res,
            });
            changePodState({
              tag: STATES_NAMES.POD_STATE,
              podName: action.payload.podName,
              status: POD_STATUS.SUCCESS,
            });
          })
          .catch((err) => {
            dispatch({
              type: ActionEnum.OPEN_POD_FAIL,
              payload: err.response,
            });
            changePodState({
              tag: STATES_NAMES.POD_STATE,
              podName: action.payload.podName,
              status: POD_STATUS.ERROR,
            });
          });
      default:
        dispatch(action);
    }
  };
