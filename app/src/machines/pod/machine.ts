import { createMachine, assign } from 'xstate';

import { IFile } from 'src/types/models/File';
import { IDirectory } from 'src/types/models/Directory';

import EVENTS from './events';
import STATES from './states';

// { getPods, deletePod, openPod }
import * as PodService from 'src/services/pod';
import { GetAvailablePods } from 'src/services/pod/getPods';
// { getDirectory, deleteDirectory }
import * as DirectoryService from 'src/services/directory';

interface PodData {
  name: string;
  directories: string[];
  files: string[];
}

type DirectoryData = IDirectory & {
  files: IFile[] | null;
};

export interface PodContext {
  // Results
  isPodsListFetched: boolean;
  availablePodsList: GetAvailablePods | null;
  isPodLoaded: boolean;
  isDirectoryLoaded: boolean;
  podData: PodData | null;
  directoryData: DirectoryData | null;
  errorMessage: string | null;

  // Data for requests
  podNameToOpen: string | null;
  directoryNameToOpen: string | null;
}

export type PodEvents =
  | {
      type: EVENTS.GET_PODS;
    }
  | {
      type: EVENTS.RETRY_GET_PODS;
    }
  | {
      type: EVENTS.OPEN_POD;
      payload: {
        podName: string;
      };
    }
  | {
      type: EVENTS.OPEN_DIRECTORY;
      payload: {
        podName: string;
        directoryName: string;
      };
    };

const initialState: PodContext = {
  // Results
  isPodsListFetched: false,
  isPodLoaded: false,
  isDirectoryLoaded: false,
  availablePodsList: null,
  podData: null,
  directoryData: null,
  errorMessage: null,
  // Data for requests
  podNameToOpen: null,
  directoryNameToOpen: 'root',
};

const createPodMachine = createMachine<PodContext, PodEvents>({
  id: STATES.STATE_ROOT,
  initial: STATES.IDLE,
  context: initialState,
  states: {
    [STATES.IDLE]: {
      on: {
        [EVENTS.GET_PODS]: {
          target: STATES.DIRECTORY,
        },
      },
    },
    [STATES.FETCH_PODS]: {
      initial: STATES.FETCH_PODS_LOADING,
      states: {
        [STATES.FETCH_PODS_LOADING]: {
          invoke: {
            id: 'fetchPodsService',
            src: (_) => PodService.getPods(),
            onDone: {
              target: STATES.FETCH_PODS_SUCCESS,
              actions: assign((_, event) => {
                return {
                  isPodsListFetched: true,
                  availablePodsList: event.data,
                };
              }),
            },
            onError: {
              target: STATES.FETCH_PODS_FAILED,
              actions: assign((_) => {
                return {
                  isPodsListFetched: false,
                  availablePodsList: null,
                };
              }),
            },
          },
        },
        [STATES.FETCH_PODS_SUCCESS]: {
          initial: 'idle',
          states: {
            idle: {
              on: {
                [EVENTS.OPEN_POD]: {
                  target: STATES.OPEN_POD,
                  actions: assign({
                    podNameToOpen: (_, { payload }) => payload.podName,
                  }),
                },
              },
            },
            [STATES.OPEN_POD]: {
              initial: STATES.OPEN_POD_LOADING,
              states: {
                [STATES.OPEN_POD_LOADING]: {
                  invoke: {
                    id: 'openPodService',
                    src: (context) =>
                      PodService.openPod({
                        password: 'T@jne!23.',
                        podName: context.podNameToOpen,
                      }),
                    onDone: {
                      target: STATES.OPEN_POD_SUCCESS,
                      actions: assign((_, event) => {
                        return {
                          isPodLoaded: true,
                          podData: event.data,
                          directoryNameToOpen: 'root',
                        };
                      }),
                    },
                    onError: {
                      target: STATES.OPEN_POD_FAILED,
                      actions: assign((_) => {
                        return {
                          isPodLoaded: false,
                          podData: null,
                        };
                      }),
                    },
                  },
                },
                [STATES.OPEN_POD_FAILED]: {
                  on: {
                    [EVENTS.OPEN_POD]: {
                      target: STATES.OPEN_POD_LOADING,
                      actions: assign({
                        podNameToOpen: (_, { payload }) => payload.podName,
                      }),
                    },
                  },
                },
                [STATES.OPEN_POD_SUCCESS]: {
                  initial: STATES.DIRECTORY,
                  states: {
                    [STATES.DIRECTORY]: {
                      initial: STATES.DIRECTORY_LOADING,
                      states: {
                        [STATES.DIRECTORY_LOADING]: {
                          invoke: {
                            id: 'openDirectoryService',
                            src: (context) =>
                              DirectoryService.getDirectory({
                                podName: context.podData.name,
                                directory: context.directoryNameToOpen,
                              }),
                            onDone: {
                              actions: assign((_) => {
                                return {
                                  isDirectoryLoaded: true,
                                };
                              }),
                            },
                            onError: {
                              actions: assign((_) => {
                                return {
                                  isDirectoryLoaded: false,
                                };
                              }),
                            },
                          },
                        },
                        [STATES.DIRECTORY_SUCCESS]: {
                          on: {
                            [EVENTS.OPEN_DIRECTORY]: {
                              target: STATES.DIRECTORY_LOADING,
                              actions: assign((_, { payload }) => {
                                return {
                                  directoryNameToOpen: payload.directoryName,
                                };
                              }),
                            },
                          },
                        },
                        [STATES.DIRECTORY_FAILED]: {
                          on: {
                            [EVENTS.OPEN_DIRECTORY]: {
                              target: STATES.DIRECTORY_LOADING,
                              actions: assign((_, { payload }) => {
                                return {
                                  directoryNameToOpen: payload.directoryName,
                                };
                              }),
                            },
                          },
                        },
                      },
                    },
                  },
                  on: {
                    [EVENTS.OPEN_POD]: {
                      target: STATES.OPEN_POD_LOADING,
                      actions: assign({
                        podNameToOpen: (_, { payload }) => payload.podName,
                      }),
                    },
                  },
                },
              },
            },
          },
        },
        [STATES.FETCH_PODS_FAILED]: {
          on: {
            [EVENTS.RETRY_GET_PODS]: {
              target: STATES.FETCH_PODS_LOADING,
            },
          },
        },
      },
    },
  },
});

export default createPodMachine;
