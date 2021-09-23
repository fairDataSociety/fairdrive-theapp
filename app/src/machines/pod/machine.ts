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
  // Credentials
  userPassword: string | null;

  // Results
  isPodsListFetched: boolean;
  availablePodsList: GetAvailablePods | null;
  isPodLoaded: boolean;
  isDirectoryLoaded: boolean;
  openedPods: string[];
  currentlyOpenedPodName: string | null;
  directoryData: DirectoryResponse | null;
  errorMessage: string | null;

  // Searching
  searchQuery: string | null;
  searchResults: DirectoryResponse | null;

  // Share Pod
  sharedPodReference: string | null;

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
      type: EVENTS.SET_SEARCH_QUERY;
      searchQuery: string | null;
    }
  | {
      type: EVENTS.IMPORT_POD;
      payload: {
        podName: string;
        podReference: string;
      };
    }
  | {
      type: EVENTS.CLEAR_SEARCH_QUERY;
    }
  | {
      type: EVENTS.SHARE_POD;
    }
  | {
      type: EVENTS.UPDATE_USER_PASSWORD;
      password: string;
    };

const initialState: PodContext = {
  // Credentials
  userPassword: null,

  // Results
  isPodsListFetched: false,
  isPodLoaded: false,
  isDirectoryLoaded: false,
  availablePodsList: null,
  currentlyOpenedPodName: null,
  openedPods: [],
  directoryData: null,
  errorMessage: null,

  // Searching
  searchQuery: null,
  searchResults: null,

  // Share Pod
  sharedPodReference: null,

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
                      PodService.openPod({
                        password: context.userPassword,
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
                          initial: 'idle',
                          states: {
                            idle: {
                              on: {
                                [EVENTS.SET_SEARCH_QUERY]: {
                                  target: STATES.SEARCH_RESULTS,
                                  actions: assign((ctx, event) => {
                                    const searchResults: DirectoryResponse | null =
                                      null;

                                    const filterCondition = (
                                      query: string,
                                      name: string
                                    ): boolean =>
                                      name
                                        .toLowerCase()
                                        .includes(query.toLowerCase());

                                    if (event.searchQuery) {
                                      if (ctx.directoryData.files) {
                                        searchResults.files =
                                          ctx.directoryData.files.filter(
                                            (file) =>
                                              filterCondition(
                                                event.searchQuery,
                                                file.name
                                              )
                                          );
                                      }

                                      if (ctx.directoryData.dirs) {
                                        searchResults.dirs =
                                          ctx.directoryData.dirs.filter((dir) =>
                                            filterCondition(
                                              event.searchQuery,
                                              dir.name
                                            )
                                          );
                                      }
                                    }

                                    return {
                                      searchQuery: event.searchQuery,
                                      searchResults: searchResults,
                                    };
                                  }),
                                },
                                [EVENTS.SHARE_POD]: {
                                  target: STATES.SHARE_POD,
                                },
                              },
                            },
                            [STATES.SEARCH_RESULTS]: {
                              on: {
                                [EVENTS.CLEAR_SEARCH_QUERY]: {
                                  target: 'idle',
                                  actions: assign((_) => {
                                    return {
                                      searchQuery: null,
                                      searchResults: null,
                                    };
                                  }),
                                },
                              },
                            },
                            [STATES.SHARE_POD]: {
                              invoke: {
                                id: 'sharePodService',
                                src: (ctx) =>
                                  PodService.sharePod(
                                    ctx.userPassword,
                                    ctx.currentlyOpenedPodName
                                  ),
                                onDone: {
                                  target: 'idle',
                                  actions: assign({
                                    sharedPodReference: (_, event) =>
                                      event.data,
                                  }),
                                },
                                onError: {
                                  target: 'idle',
                                  actions: assign((_) => {
                                    return {
                                      sharedPodReference: null,
                                    };
                                  }),
                                },
                              },
                            },
                          },
                          on: {
                            [EVENTS.OPEN_DIRECTORY]: {
                              target: STATES.DIRECTORY_LOADING,
                              actions: assign((_, { payload }) => {
                                return {
                                  directoryNameToOpen: payload.directoryName,
                                  searchQuery: null,
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

        src: (context) =>
          PodService.createPod({
            password: context.userPassword,
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
  on: {
    [EVENTS.UPDATE_USER_PASSWORD]: {
      actions: assign({
        userPassword: (_, event) => event.password,
      }),
    },
  },
});

export default createPodMachine;
