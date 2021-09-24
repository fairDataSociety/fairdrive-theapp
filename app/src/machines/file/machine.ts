import { CancelTokenSource } from 'axios';
import { createMachine, assign, send, DoneInvokeEvent } from 'xstate';
import { writePath } from 'src/helpers';
import EVENTS from './events';
import STATES from './states';
import GUARDS from './guards';

import * as FileService from 'src/services/file';

import { UploadSingleFileReturn } from 'src/services/file/uploadNew';

export interface FileUploadProgress {
  progressEvent: ProgressEvent;
  requestId: string;
  filename: string;
}

export interface CancelRequestReferences {
  requestId: string;
  cancelFn: CancelTokenSource;
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
  cancelRequestReferences: CancelRequestReferences[];
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
    }
  | {
      type: EVENTS.ADD_FILE_CANCEL_REFERENCE;
      payload: CancelRequestReferences;
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
      cancelRequestReferences: [],
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
              console.log('EVENT.UPLOAD', event);
              return {
                uploadingQueue: [...event.uploadingQueue],
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
                  ctx.fileNameToPreview,
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
            after: {
              100: { target: `#${STATES.STATE_ROOT}.${STATES.IDLE}` },
            },
          },
          [STATES.PREVIEW_ERROR]: {
            after: {
              100: { target: `#${STATES.STATE_ROOT}.${STATES.IDLE}` },
            },
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
              src: (ctx) => {
                return FileService.deleteFile({
                  file_name: ctx.fileToDelete,
                  podName: ctx.currentPodName,
                  path: writePath(ctx.currentDirectory),
                });
              },
              onDone: {
                target: STATES.REMOVING_SUCCESS,
                actions: assign((_) => {
                  return {
                    fileToDelete: null,
                  };
                }),
              },
              onError: {
                target: STATES.REMOVING_ERROR,
                actions: assign((_) => {
                  return {
                    fileToDelete: null,
                  };
                }),
              },
            },
          },
          [STATES.REMOVING_SUCCESS]: {
            after: {
              100: { target: `#${STATES.STATE_ROOT}.${STATES.IDLE}` },
            },
          },
          [STATES.REMOVING_ERROR]: {
            after: {
              100: { target: `#${STATES.STATE_ROOT}.${STATES.IDLE}` },
            },
          },
        },
      },
      [STATES.UPLOADING_NODE]: {
        initial: STATES.UPLOADING_LOADING,
        states: {
          [STATES.UPLOADING_LOADING]: {
            invoke: {
              id: 'uploadingFilesService',
              src: (context) => (callback) => {
                if (context.uploadingQueue.length > 0) {
                  return FileService.uploadSingleFile(
                    {
                      file: context.uploadingQueue[0],
                      podName: context.currentPodName,
                      directoryName: context.currentDirectory,
                    },
                    (requestId, cancelFn) =>
                      callback({
                        type: EVENTS.ADD_FILE_CANCEL_REFERENCE,
                        payload: {
                          requestId,
                          cancelFn,
                        },
                      }),
                    (requestId, progressEvent) =>
                      callback({
                        type: EVENTS.ADD_FILE_PROGRESS,
                        payload: {
                          progressEvent,
                          requestId,
                          filename: context.uploadingQueue[0].name,
                        },
                      })
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
              [EVENTS.ADD_FILE_CANCEL_REFERENCE]: {
                actions: assign((ctx, event) => {
                  console.log('add_file_cancel_ref', event.payload);
                  return {
                    cancelRequestReferences: [
                      ...ctx.cancelRequestReferences,
                      event.payload,
                    ],
                  };
                }),
              },
              [EVENTS.ADD_FILE_PROGRESS]: {
                actions: assign((ctx, event) => {
                  console.log('add_file_progress', event.payload);

                  const findIndexOfProgress = ctx.uploadingProgress.findIndex(
                    (progress) => progress.requestId === event.payload.requestId
                  );

                  const uploadingProgressCopy = [...ctx.uploadingProgress];

                  if (findIndexOfProgress !== -1) {
                    uploadingProgressCopy.splice(
                      findIndexOfProgress,
                      1,
                      event.payload
                    );
                  } else {
                    uploadingProgressCopy.push(event.payload);
                  }

                  return {
                    uploadingProgress: uploadingProgressCopy,
                  };
                }),
              },
              [EVENTS.CANCEL_UPLOAD]: {
                actions: assign((ctx, event) => {
                  console.log('EVENT.CANCEL_UPLOAD', event.requestIdToCancel);
                  const findCancelRequestReference =
                    ctx.cancelRequestReferences.find(
                      (reference) =>
                        reference.requestId === event.requestIdToCancel
                    );

                  if (findCancelRequestReference) {
                    findCancelRequestReference.cancelFn.cancel();
                  }

                  return {
                    uploadingProgress: ctx.uploadingProgress.filter(
                      (progress) =>
                        progress.requestId !== event.requestIdToCancel
                    ),
                    cancelRequestReferences: ctx.cancelRequestReferences.filter(
                      (reference) =>
                        reference.requestId !== event.requestIdToCancel
                    ),
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
            after: {
              100: {
                target: `#${STATES.STATE_ROOT}.${STATES.IDLE}`,
              },
            },
          },
          [STATES.SHARING_ERROR]: {
            after: {
              100: {
                target: `#${STATES.STATE_ROOT}.${STATES.IDLE}`,
              },
            },
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
