export enum POD_STATUS {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
  CLOSED = 'closed',
  CHANGE = 'change',
}

export enum STATES_NAMES {
  INITIAL = 'initial',
  USER_LOGGED = 'user-logged',
  POD_STATE = 'pod-state',
}

type TaggedState<T extends string> = { tag: T };

export type Initial = TaggedState<STATES_NAMES.INITIAL>;

export type UserLogged = TaggedState<STATES_NAMES.USER_LOGGED>;

export interface PodStateData {
  podName: string;
  status: POD_STATUS;
}

export type PodState = TaggedState<STATES_NAMES.POD_STATE> & PodStateData;

export type State = Initial | UserLogged | PodState;
