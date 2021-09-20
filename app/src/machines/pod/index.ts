import { createMachine } from 'xstate';

import { IFile } from 'src/types/models/File';
import { IDirectory } from 'src/types/models/Directory';

enum STATES {
  STATE_ROOT = 'podMachine',
  IDLE = 'idle',
  DIRECTORY = 'directory',
  DIRECTORY_LOADING = 'directory_loading',
  DIRECTORY_SUCCESS = 'directory_success',
  DIRECTORY_FAILED = 'directory_failed',
  FILE_UPLOADING = 'file_uploading',
  FILE_UPLOAD_SUCCESS = 'file_upload_success',
  FILE_UPLOAD_ERROR = 'file_upload_error',
  FILE_REMOVING = 'file_removing',
  FILE_REMOVING_SUCCESS = 'file_removing_success',
  FILE_REMOVING_ERROR = 'file_removing_error',
}

enum EVENTS {
  GET_PODS = 'get_pods',
  OPEN_POD = 'open_pod',
  OPEN_DIRECTORY = 'open_directory',
  DELETE_DIRECTORY = 'delete_directory',
  OPEN_FILE = 'open_file',
  UPLOAD_FILE = 'upload_file',
  DELETE_FILE = 'delete_file',
}

interface PodData {
  name: string;
  directories: string[];
  files: string[];
}

type DirectoryData = IDirectory & {
  files: IFile[] | null;
};

interface PodContext {
  isPodLoaded: boolean;
  isDirectoryLoaded: boolean;
  podData: PodData | null;
  directoryData: DirectoryData | null;
  errorMessage: string | null;
}

type PodEvents =
  | {
      type: EVENTS.OPEN_DIRECTORY;
      payload: {
        podName: string;
        directoryName: string;
      };
    }
  | {
      type: EVENTS.GET_PODS;
      payload: undefined;
    }
  | {
      type: EVENTS.OPEN_POD;
      payload: {
        podName: string;
      };
    };

const createPodMachine = createMachine<PodContext, PodEvents>({
  id: STATES.STATE_ROOT,
  initial: STATES.IDLE,
  context: {
    // Results
    isPodLoaded: false,
    isDirectoryLoaded: false,
    podData: null,
    directoryData: null,
    errorMessage: null,
    // Data for requests
  },
  states: {
    [STATES.IDLE]: {
      on: {},
    },
  },
});

export default createPodMachine;
