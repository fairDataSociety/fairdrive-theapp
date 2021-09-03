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
}

export interface DirectoryData {
  podName: string;
  directoryName: string;
  status: DIRECTORY_STATUS;
}

export type DirectoryState = TaggedState<STATES_NAMES.DIRECTORY_STATE> &
  DirectoryData;

export type State = Initial | UserLogged | PodState | DirectoryState;
