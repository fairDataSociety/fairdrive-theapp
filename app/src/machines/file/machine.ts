import { CancelTokenSource } from 'axios';
import { createMachine, assign, send, DoneInvokeEvent } from 'xstate';
import { writePath } from 'src/helpers';
import EVENTS from './events';
import STATES from './states';
import GUARDS from './guards';

import * as FileService from 'src/services/file';

import { UploadSingleFileReturn } from 'src/services/file/uploadNew';

interface FileUploadProgress {
  progressEvent: ProgressEvent;
  cancelFn: CancelTokenSource;
  requestId: string;
  filename: string;
}

export interface FileContext {
  fileResultBlob: Blob | null;
  fileNameToPreview: string | null;
  currentDirectory: string | null;
  currentPodName: string | null;
  fileNameToShare: string | null;
  sharedFileReference: string | null;
  fileNameToDownload: string | null;
  uploadingQueue: File[];
  fileToDelete: string | null;
  uploadingProgress: FileUploadProgress[];
}

export type FileEvents =
  | {
      type: EVENTS.DELETE;
      fileName: string;
    }
  | {
      type: EVENTS.DOWNLOAD;
      fileName: string;
    }
  | {
      type: EVENTS.PREVIEW;
      fileName: string;
    }
  | {
      type: EVENTS.SHARE;
      fileName: string;
    }
  | {
      type: EVENTS.UPLOAD;
      uploadingQueue: File[];
    }
  | {
      type: EVENTS.ADD_FILE_PROGRESS;
      payload: FileUploadProgress;
    }
  | {
      type: EVENTS.UPDATE_CURRENT_PODNAME;
      nextCurrentPodName: string;
    }
  | {
      type: EVENTS.UPDATE_CURRENT_DIRECTORY;
      nextDirectoryName: string;
    }
  | {
      type: EVENTS.CANCEL_UPLOAD;
      requestIdToCancel: string;
    };

const createFileMachine = createMachine<FileContext, FileEvents>(
  {
    id: STATES.STATE_ROOT,
    initial: STATES.IDLE,
    context: {
      // General
      currentDirectory: null,
      currentPodName: null,

      // Preview
      fileNameToPreview: null,
      fileResultBlob: null,

      // Deleting
      fileToDelete: null,

      // Download
      fileNameToDownload: null,

      // Share
      fileNameToShare: null,
      sharedFileReference: null,

      // Upload group
      uploadingQueue: [],
      uploadingProgress: [],
    },
    states: {
      [STATES.IDLE]: {
        on: {
          [EVENTS.DELETE]: {
            target: STATES.REMOVING_NODE,
            actions: assign({
              fileToDelete: (_, { fileName }) => fileName,
            }),
            cond: GUARDS.IS_POD_AND_DIRECTORY_SPECIFIED,
          },
          [EVENTS.SHARE]: {
            target: STATES.SHARING_NODE,
            actions: assign({
              fileNameToShare: (_, { fileName }) => fileName,
            }),
            cond: GUARDS.IS_POD_AND_DIRECTORY_SPECIFIED,
          },
          [EVENTS.PREVIEW]: {
            target: STATES.PREVIEW_NODE,
            actions: assign((_, event) => {
              return {
                fileNameToPreview: event.fileName,
              };
            }),
            cond: GUARDS.IS_POD_AND_DIRECTORY_SPECIFIED,
          },
          [EVENTS.DOWNLOAD]: {
            target: STATES.DOWNLOAD_NODE,
            actions: assign((_, event) => {
              return {
                fileNameToDownload: event.fileName,
              };
            }),
            cond: GUARDS.IS_POD_AND_DIRECTORY_SPECIFIED,
          },
          [EVENTS.UPLOAD]: {
            target: STATES.UPLOADING_NODE,
            actions: assign((_, event) => {
              return {
                uploadingQueue: event.uploadingQueue,
              };
            }),
            cond: GUARDS.IS_POD_AND_DIRECTORY_SPECIFIED,
          },
        },
      },
      [STATES.PREVIEW_NODE]: {
        initial: STATES.PREVIEW_LOADING,
        states: {
          [STATES.PREVIEW_LOADING]: {
            invoke: {
              id: 'previewFileService',
              src: (ctx) =>
                FileService.previewFile(
                  ctx.fileNameToDownload,
                  ctx.currentDirectory,
                  ctx.currentPodName
                ),
              onDone: {
                target: STATES.PREVIEW_SUCCESS,
                actions: assign((ctx, _response) => {
                  const response: DoneInvokeEvent<Blob> = _response;

                  return {
                    fileNameToPreview: null,
                    fileResultBlob: response.data,
                  };
                }),
              },
              onError: {
                target: STATES.PREVIEW_ERROR,
                actions: assign((_) => {
                  return {
                    fileNameToPreview: null,
                    fileResultBlob: null,
                  };
                }),
              },
            },
          },
          [STATES.PREVIEW_SUCCESS]: {
            always: [{ target: `#${STATES.STATE_ROOT}.${STATES.IDLE}` }],
          },
          [STATES.PREVIEW_ERROR]: {
            always: [{ target: `#${STATES.STATE_ROOT}.${STATES.IDLE}` }],
          },
        },
      },
      [STATES.DOWNLOAD_NODE]: {
        initial: STATES.DOWNLOAD_LOADING,
        states: {
          [STATES.DOWNLOAD_LOADING]: {
            invoke: {
              id: 'downloadFileService',
              src: (ctx) =>
                FileService.downloadFile(
                  ctx.fileNameToDownload,
                  ctx.currentDirectory,
                  ctx.currentPodName
                ),
              onDone: {
                target: STATES.DOWNLOAD_SUCCESS,
                actions: assign((_) => {
                  return {
                    fileNameToDownload: null,
                  };
                }),
              },
              onError: {
                target: STATES.DOWNLOAD_ERROR,
                actions: assign((_) => {
                  return {
                    fileNameToDownload: null,
                  };
                }),
              },
            },
          },
          [STATES.DOWNLOAD_SUCCESS]: {
            always: [{ target: `#${STATES.STATE_ROOT}.${STATES.IDLE}` }],
          },
          [STATES.DOWNLOAD_ERROR]: {
            always: [{ target: `#${STATES.STATE_ROOT}.${STATES.IDLE}` }],
          },
        },
      },
      [STATES.REMOVING_NODE]: {
        initial: STATES.REMOVING_LOADING,
        states: {
          [STATES.REMOVING_LOADING]: {
            invoke: {
              id: 'fileRemovingService',
              src: (ctx, event, rest) => {
                return FileService.deleteFile({
                  file_name: 'test',
                  podName: ctx.currentPodName,
                  path: 'test',
                });
              },
              onDone: {
                target: STATES.REMOVING_SUCCESS,
              },
              onError: {
                target: STATES.REMOVING_ERROR,
              },
            },
          },
          [STATES.REMOVING_SUCCESS]: {
            always: [{ target: `#${STATES.STATE_ROOT}.${STATES.IDLE}` }],
          },
          [STATES.REMOVING_ERROR]: {
            always: [{ target: `#${STATES.STATE_ROOT}.${STATES.IDLE}` }],
          },
        },
      },
      [STATES.UPLOADING_NODE]: {
        initial: STATES.UPLOADING_LOADING,
        states: {
          [STATES.UPLOADING_LOADING]: {
            invoke: {
              id: 'uploadingFilesService',
              src: (context) => {
                if (context.uploadingQueue.length > 0) {
                  return FileService.uploadSingleFile(
                    {
                      file: context.uploadingQueue[0],
                      podName: context.currentPodName,
                      directoryName: context.currentDirectory,
                    },
                    (requestId, progressEvent, cancelFn) => {
                      send({
                        type: EVENTS.ADD_FILE_PROGRESS,
                        payload: {
                          progressEvent,
                          requestId,
                          cancelFn,
                          filename: context.uploadingQueue[0].name,
                        },
                      });
                    }
                  );
                } else {
                  return Promise.reject();
                }
              },
              onDone: {
                target: STATES.UPLOADING_SUCCESS,
                actions: assign((ctx, _response) => {
                  const response: DoneInvokeEvent<UploadSingleFileReturn> =
                    _response;

                  const excludeUploadedFileFromQueue =
                    ctx.uploadingQueue.filter(
                      (file) =>
                        file.name !==
                        response.data.uploadResponse.data.Responses[0].file_name
                    );
                  return {
                    uploadingQueue: excludeUploadedFileFromQueue,
                  };
                }),
              },
              onError: {
                target: STATES.UPLOADING_ERROR,
              },
            },
            on: {
              [EVENTS.ADD_FILE_PROGRESS]: {
                actions: assign((ctx, event) => {
                  return {
                    uploadingProgress: [
                      ...ctx.uploadingProgress,
                      event.payload,
                    ],
                  };
                }),
              },
            },
          },
          [STATES.UPLOADING_SUCCESS]: {
            always: [
              // When some files still remain for upload let's back to upload
              {
                target: STATES.UPLOADING_LOADING,
                cond: (ctx) => ctx.uploadingQueue.length > 0,
              },
              // Otherwise back to idle
              { target: `#${STATES.STATE_ROOT}.${STATES.IDLE}` },
            ],
          },
          [STATES.UPLOADING_ERROR]: {
            // When we have uploading error it applies only for one specific file of queue
            // so we should still try to upload next if exist
            always: [
              // When some files still remain for upload let's back to upload
              {
                target: STATES.UPLOADING_LOADING,
                cond: (ctx) => ctx.uploadingQueue.length > 0,
              },
              // Otherwise back to idle
              { target: `#${STATES.STATE_ROOT}.${STATES.IDLE}` },
            ],
          },
        },
        on: {
          [EVENTS.CANCEL_UPLOAD]: {
            actions: assign((ctx, event) => {
              return {
                uploadingProgress: ctx.uploadingProgress.filter(
                  (progress) => progress.requestId !== event.requestIdToCancel
                ),
              };
            }),
          },
        },
      },
      [STATES.SHARING_NODE]: {
        initial: STATES.SHARING_LOADING,
        states: {
          [STATES.SHARING_LOADING]: {
            invoke: {
              id: 'sharingFileService',
              src: (ctx) =>
                FileService.shareFile(
                  ctx.fileNameToShare,
                  writePath(ctx.currentDirectory),
                  ctx.currentPodName
                ),
              onDone: {
                target: STATES.SHARING_SUCCESS,
                actions: assign({
                  sharedFileReference: (_, event) => event.data,
                }),
              },
              onError: {
                target: STATES.SHARING_ERROR,
                actions: assign(() => {
                  return {
                    sharedFileReference: null,
                  };
                }),
              },
            },
          },
          [STATES.SHARING_SUCCESS]: {
            always: [{ target: `#${STATES.STATE_ROOT}.${STATES.IDLE}` }],
          },
          [STATES.SHARING_ERROR]: {
            always: [{ target: `#${STATES.STATE_ROOT}.${STATES.IDLE}` }],
          },
        },
      },
    },
    on: {
      [EVENTS.UPDATE_CURRENT_PODNAME]: {
        actions: assign({
          currentPodName: (_, { nextCurrentPodName }) => nextCurrentPodName,
        }),
      },
      [EVENTS.UPDATE_CURRENT_DIRECTORY]: {
        actions: assign({
          currentDirectory: (_, { nextDirectoryName }) => nextDirectoryName,
        }),
      },
    },
  },
  {
    guards: {
      [GUARDS.IS_POD_AND_DIRECTORY_SPECIFIED]: ({
        currentPodName,
        currentDirectory,
      }) => currentPodName !== null && currentDirectory !== null,
    },
  }
);

export default createFileMachine;
