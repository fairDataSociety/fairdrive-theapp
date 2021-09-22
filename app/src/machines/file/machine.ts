import { CancelTokenSource } from 'axios';
import { createMachine, assign, send, DoneInvokeEvent } from 'xstate';
import EVENTS from './events';
import STATES from './states';

import * as FileService from 'src/services/file';

import { UploadSingleFileReturn } from 'src/services/file/uploadNew';
// interface FileUploadStatus {
//     requestId: string;
//     filename: string;
//     status: 'failed' | 'pending' | 'success';
// }

interface FileUploadProgress {
  progressEvent: ProgressEvent;
  cancelFn: CancelTokenSource;
  requestId: string;
  filename: string;
}

export interface FileContext {
  fileResult: null;
  currentDirectory: string | null;
  currentPodName: string | null;

  uploadingQueue: File[];
  uploadingProgress: FileUploadProgress[];
}

export type FileEvents =
  | {
      type: EVENTS.DELETE;
      payload: {
        file_name: string;
        podName: string;
        path: string;
      };
    }
  | {
      type: EVENTS.DOWNLOAD;
      payload: {
        file: string;
        directory: string;
        podName: string;
      };
    }
  | {
      type: EVENTS.PREVIEW;
      payload: {
        file: string;
        directory: string;
        podName: string;
      };
    }
  | {
      type: EVENTS.SHARE;
      payload: {
        fileName: string;
        path_file: string;
        podName: string;
      };
    }
  | {
      type: EVENTS.UPLOAD;
      uploadingQueue: File[];
    }
  | {
      type: EVENTS.ADD_FILE_PROGRESS;
      payload: FileUploadProgress;
    };

const createFileMachine = createMachine<FileContext, FileEvents>({
  id: STATES.STATE_ROOT,
  initial: STATES.IDLE,
  context: {
    fileResult: null,
    currentDirectory: null,
    currentPodName: null,

    uploadingQueue: [],
    uploadingProgress: [],
  },
  states: {
    [STATES.IDLE]: {
      on: {
        [EVENTS.DELETE]: {
          target: STATES.REMOVING_NODE,
        },
        [EVENTS.UPLOAD]: {
          target: STATES.UPLOADING_NODE,
          actions: assign((_, event) => {
            return {
              uploadingQueue: event.uploadingQueue,
            };
          }),
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
              debugger;
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
          always: [{ target: STATES.IDLE }],
        },
        [STATES.REMOVING_ERROR]: {
          always: [{ target: STATES.IDLE }],
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

                const excludeUploadedFileFromQueue = ctx.uploadingQueue.filter(
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
                  uploadingProgress: [...ctx.uploadingProgress, event.payload],
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
            { target: STATES.IDLE },
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
            { target: STATES.IDLE },
          ],
        },
      },
    },
  },
});

export default createFileMachine;
