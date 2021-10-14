import { createMachine, assign } from 'xstate';

import { IFile } from 'src/types/models/File';
import { IDirectory } from 'src/types/models/Directory';
import { createDirectoryPath } from 'src/helpers/createDirectoryPath';
import EVENTS from './events';
import STATES from './states';
import GUARDS from './guards';
import ACTIONS from './actions';
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

  // Drive Modes
  mode: DRIVE_MODES;

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
  diretoryToCreateName: string | null;
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
    }
  | {
      type: EVENTS.TOGGLE_DRIVE_MODE;
    }
  | {
      type: EVENTS.CREATE_DIRECTORY;
      newDirectoryName: string;
    };

export enum DRIVE_MODES {
  PRIVATE = 'private',
  SHARED = 'shared',
}

const initialState: PodContext = {
  // Credentials
  userPassword: null,

  // Drive mode
  mode: DRIVE_MODES.PRIVATE,

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
  diretoryToCreateName: null,
  createPodName: null,
  importedPodData: null,
};

const createPodMachine = createMachine<PodContext, PodEvents>(
  {
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
                            id: STATES.DIRECTORY_LOADING,
                            invoke: {
                              id: 'openDirectoryService',
                              // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
                                id: 'DIRECTORY_SUCCESS_IDLE',
                                on: {
                                  [EVENTS.CREATE_DIRECTORY]: {
                                    target: STATES.CREATE_DIRECTORY_NODE,
                                    actions: assign({
                                      diretoryToCreateName: (
                                        _,
                                        { newDirectoryName }
                                      ) => newDirectoryName,
                                    }),
                                  },
                                  [EVENTS.SET_SEARCH_QUERY]: {
                                    target: STATES.SEARCH_RESULTS,
                                    actions: ACTIONS.GET_SEARCH_RESULTS,
                                  },
                                  [EVENTS.SHARE_POD]: {
                                    target: STATES.SHARE_POD,
                                  },
                                },
                              },
                              [STATES.SEARCH_RESULTS]: {
                                on: {
                                  [EVENTS.SET_SEARCH_QUERY]: [
                                    {
                                      target: 'idle',
                                      cond: (_, event) =>
                                        event.searchQuery === null ||
                                        event.searchQuery === '',
                                      actions: assign((_) => {
                                        return {
                                          searchQuery: null,
                                        };
                                      }),
                                    },
                                    {
                                      actions: ACTIONS.GET_SEARCH_RESULTS,
                                    },
                                  ],
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
                              [STATES.CREATE_DIRECTORY_NODE]: {
                                initial: STATES.CREATE_DIRECTORY_LOADING,
                                states: {
                                  [STATES.CREATE_DIRECTORY_LOADING]: {
                                    invoke: {
                                      id: 'createDirectoryService',
                                      src: (ctx) =>
                                        DirectoryService.createDirectory(
                                          ctx.directoryNameToOpen,
                                          ctx.diretoryToCreateName,
                                          ctx.currentlyOpenedPodName
                                        ),
                                      onDone: {
                                        target: STATES.CREATE_DIRECTORY_SUCCESS,
                                        actions: assign((ctx) => {
                                          return {
                                            directoryNameToOpen:
                                              createDirectoryPath(
                                                ctx.diretoryToCreateName,
                                                ctx.directoryNameToOpen
                                              ),
                                          };
                                        }),
                                      },
                                      onError: {
                                        target: STATES.CREATE_DIRECTORY_FAILED,
                                      },
                                    },
                                  },
                                  [STATES.CREATE_DIRECTORY_SUCCESS]: {
                                    after: {
                                      100: {
                                        target: `#${STATES.DIRECTORY_LOADING}`,
                                        actions: assign(() => {
                                          return {
                                            diretoryToCreateName: null,
                                          };
                                        }),
                                      },
                                    },
                                  },
                                  [STATES.CREATE_DIRECTORY_FAILED]: {
                                    after: {
                                      100: {
                                        target: '#DIRECTORY_SUCCESS_IDLE',
                                        actions: assign(() => {
                                          return {
                                            diretoryToCreateName: null,
                                          };
                                        }),
                                      },
                                    },
                                  },
                                },
                              },
                            },
                            on: {
                              [EVENTS.OPEN_DIRECTORY]: {
                                target: STATES.DIRECTORY_LOADING,
                                actions: assign((ctx, { payload }) => {
                                  return {
                                    directoryNameToOpen: createDirectoryPath(
                                      payload.directoryName,
                                      ctx.directoryNameToOpen
                                    ),
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
                cond: GUARDS.IS_DRIVE_PRIVATE,
                actions: assign((_, { createPodName }) => {
                  return {
                    createPodName: createPodName,
                  };
                }),
              },
              [EVENTS.IMPORT_POD]: {
                target: `#${STATES.STATE_ROOT}.${STATES.IMPORT_POD}`,
                cond: GUARDS.IS_DRIVE_SHARED,
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
      [EVENTS.TOGGLE_DRIVE_MODE]: {
        actions: assign((ctx) => {
          return {
            mode:
              ctx.mode === DRIVE_MODES.PRIVATE
                ? DRIVE_MODES.SHARED
                : DRIVE_MODES.PRIVATE,
          };
        }),
      },
    },
  },
  {
    actions: {
      [ACTIONS.GET_SEARCH_RESULTS]: assign((ctx, event) => {
        if (event.type === EVENTS.SET_SEARCH_QUERY) {
          const searchResults: DirectoryResponse = {
            dirs: [],
            files: [],
          };

          const filterCondition = (query: string, name: string): boolean =>
            name.toLowerCase().includes(query.toLowerCase());

          if (event.searchQuery) {
            if (ctx.directoryData.files) {
              searchResults.files = ctx.directoryData.files.filter((file) =>
                filterCondition(event.searchQuery, file.name)
              );
            }

            if (ctx.directoryData.dirs) {
              searchResults.dirs = ctx.directoryData.dirs.filter((dir) =>
                filterCondition(event.searchQuery, dir.name)
              );
            }
          }

          return {
            searchQuery: event.searchQuery,
            searchResults: searchResults,
          };
        }
      }),
    },
    guards: {
      [GUARDS.IS_DRIVE_PRIVATE]: ({ mode }) => mode === DRIVE_MODES.PRIVATE,
      [GUARDS.IS_DRIVE_SHARED]: ({ mode }) => mode === DRIVE_MODES.SHARED,
    },
  }
);

export default createPodMachine;
