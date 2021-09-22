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

interface DirectoryResponse {
  files: IFile[] | undefined;
  dirs: IDirectory[] | undefined;
}
export interface PodContext {
  // Results
  isPodsListFetched: boolean;
  availablePodsList: GetAvailablePods | null;
  isPodLoaded: boolean;
  isDirectoryLoaded: boolean;
  openedPods: string[];
  currentlyOpenedPodName: string | null;
  directoryData: DirectoryResponse | null;
  errorMessage: string | null;

  // Data for requests
  podNameToOpen: string | null;
  directoryNameToOpen: string | null;
  createPodName: string | null;
  importedPodData: { podName: string; podReference: string } | null;
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
        directoryName: string;
      };
    }
  | {
      type: EVENTS.CREATE_POD;
      createPodName: string;
    }
  | {
      type: EVENTS.IMPORT_POD;
      payload: {
        podName: string;
        podReference: string;
      };
    };

const initialState: PodContext = {
  // Results
  isPodsListFetched: false,
  isPodLoaded: false,
  isDirectoryLoaded: false,
  availablePodsList: null,
  currentlyOpenedPodName: null,
  openedPods: [],
  directoryData: null,
  errorMessage: null,
  // Data for requests
  podNameToOpen: null,
  directoryNameToOpen: 'root',
  createPodName: null,
  importedPodData: null,
};

const createPodMachine = createMachine<PodContext, PodEvents>({
  id: STATES.STATE_ROOT,
  initial: STATES.IDLE,
  context: initialState,
  states: {
    [STATES.IDLE]: {
      on: {
        [EVENTS.GET_PODS]: {
          target: STATES.FETCH_PODS,
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
                  availablePodsList: event.data.data,
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
                      // TODO: Pass password as argument
                      PodService.openPod({
                        password: 'T@jne!23.',
                        podName: context.podNameToOpen,
                      }),
                    onDone: {
                      target: STATES.OPEN_POD_SUCCESS,
                      actions: assign((context) => {
                        return {
                          isPodLoaded: true,
                          openedPods: [
                            ...context.openedPods,
                            context.podNameToOpen,
                          ],
                          currentlyOpenedPodName: context.podNameToOpen,
                          directoryNameToOpen: 'root',
                        };
                      }),
                    },
                    onError: {
                      target: STATES.OPEN_POD_FAILED,
                      actions: assign(({ openedPods, podNameToOpen }) => {
                        // const possibleResponses = {
                        //   ok: 'pod opened successfully',
                        //   pod_already_open: 'pod open: pod already open',
                        // }
                        const checkIfOpenedPodsContainsCurrentPodName =
                          openedPods.includes(podNameToOpen);

                        // TODO: Add handling edge case when unable to fetch
                        return {
                          isPodLoaded: false,
                          currentlyOpenedPodName: podNameToOpen,
                          openedPods: checkIfOpenedPodsContainsCurrentPodName
                            ? [...openedPods]
                            : [...openedPods, podNameToOpen],
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
                            src: (context, event, _) =>
                              DirectoryService.getDirectory({
                                podName: context.currentlyOpenedPodName,
                                directory: context.directoryNameToOpen,
                              }),
                            onDone: {
                              target: STATES.DIRECTORY_SUCCESS,
                              actions: assign((_, event) => {
                                return {
                                  isDirectoryLoaded: true,
                                  directoryData: event.data,
                                };
                              }),
                            },
                            onError: {
                              target: STATES.DIRECTORY_FAILED,
                              actions: assign((_) => {
                                return {
                                  isDirectoryLoaded: false,
                                  directoryData: null,
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
                    [EVENTS.OPEN_POD]: [
                      {
                        target: STATES.OPEN_POD_LOADING,
                        actions: assign({
                          podNameToOpen: (_, { payload }) => payload.podName,
                        }),
                        // Prevent req that open pod when pod already opened
                        cond: (ctx, { payload }) =>
                          !ctx.openedPods.includes(payload.podName),
                      },
                      {
                        // If pod already opened, just choose it as current one
                        target: STATES.OPEN_POD_SUCCESS,
                        actions: assign({
                          currentlyOpenedPodName: (_, { payload }) =>
                            payload.podName,
                          directoryNameToOpen: 'root',
                        }),
                      },
                    ],
                  },
                },
              },
            },
          },
          on: {
            [EVENTS.CREATE_POD]: {
              target: `#${STATES.STATE_ROOT}.${STATES.CREATE_POD}`,
              actions: assign((_, { createPodName }) => {
                return {
                  createPodName: createPodName,
                };
              }),
            },
            [EVENTS.IMPORT_POD]: {
              target: `#${STATES.STATE_ROOT}.${STATES.IMPORT_POD}`,
              actions: assign({
                importedPodData: (_, { payload }) => payload,
              }),
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
    // TODO: Fix targets below
    [STATES.CREATE_POD]: {
      invoke: {
        id: 'createPodService',
        // TODO: Pass password as argument
        src: (context) =>
          PodService.createPod({
            password: 'T@jne!23.',
            podName: context.createPodName,
          }),
        onDone: {
          target: STATES.FETCH_PODS,
          actions: assign((_) => {
            return {
              createPodName: null,
            };
          }),
        },
        onError: {
          target: STATES.FETCH_PODS,
          actions: assign((_) => {
            return {
              createPodName: null,
            };
          }),
        },
      },
    },
    [STATES.IMPORT_POD]: {
      invoke: {
        id: 'importPodService',
        src: ({ importedPodData }) =>
          PodService.receivePod({
            podReference: importedPodData.podReference,
            pod_name: importedPodData.podName,
          }),
        onDone: {
          target: STATES.FETCH_PODS,
          actions: assign((context) => {
            return {
              importedPodData: null,
              podNameToOpen: context.importedPodData.podName,
              createPodName: null,
            };
          }),
        },
        onError: {
          target: STATES.FETCH_PODS,
          actions: assign((_) => {
            return {
              importedPodData: null,
              podNameToOpen: null,
              createPodName: null,
            };
          }),
        },
      },
    },
  },
});

export default createPodMachine;
