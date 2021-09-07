export enum STATES_NAMES {
  INITIAL = 'initial',
  USER_LOGGED = 'user-logged',
  POD_STATE = 'pod-state',
  DIRECTORY_STATE = 'directory-state',
}

type TaggedState<T extends string> = { tag: T };

export type Initial = TaggedState<STATES_NAMES.INITIAL>;

export type UserLogged = TaggedState<STATES_NAMES.USER_LOGGED>;

export enum POD_STATUS {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
  CLOSED = 'closed',
  CHANGE = 'change',
}
export interface PodStateData {
  podName: string;
  status: POD_STATUS;
}

export type PodState = TaggedState<STATES_NAMES.POD_STATE> & PodStateData;

export enum DIRECTORY_STATUS {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
  CLOSED = 'closed',
  CHANGE = 'change',
  FILE_UPLOADING = 'file-uploading',
  FILE_UPLOAD_SUCCESS = 'file-upload-success',
  FILE_UPLOAD_ERROR = 'file-upload-error',
  FILE_REMOVING = 'file-removing',
  FILE_REMOVING_SUCCESS = 'file-remove-success',
  FILE_REMOVING_ERROR = 'file-remove-error',
}

export interface DirectoryData {
  podName: string;
  directoryName: string;
  status: DIRECTORY_STATUS;
}

export type DirectoryState = TaggedState<STATES_NAMES.DIRECTORY_STATE> &
  DirectoryData;

export type State = Initial | UserLogged | PodState | DirectoryState;
