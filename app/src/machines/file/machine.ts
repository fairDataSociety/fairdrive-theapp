import { createMachine, send } from 'xstate';
import EVENTS from './events';
import STATES from './states';

import * as FileService from 'src/services/file';

export interface FileContext {
  fileResult: null;
  currentDirectory: string | null;
  currentPodName: string | null;
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
    };

const createFileMachine = createMachine<FileContext, FileEvents>({
  id: STATES.STATE_ROOT,
  initial: STATES.IDLE,
  context: {
    fileResult: null,
    currentDirectory: null,
    currentPodName: null,
  },
  states: {
    [STATES.IDLE]: {
      on: {
        [EVENTS.DELETE]: {
          target: STATES.REMOVING_NODE,
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
  },
});

export default createFileMachine;
