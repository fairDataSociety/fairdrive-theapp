import { getCookiePage } from 'src/services/cookies';
import { Cookie } from 'src/types/models/Cookie';
import { IDirectory } from 'src/types/models/Directory';
import { createMachine, assign } from 'xstate';
import EVENTS from './events';
import STATES from './states';

export interface CookieContext {
  cookies: Cookie[];
  index: number;
  size: number;
  error: any;
}

export type CookieEvents = {
  type: EVENTS.GET_PAGE;
  data: {
    dirs: IDirectory[];
    index: number;
    size: number;
  };
};

const initialState: CookieContext = {
  cookies: [],
  index: 0,
  size: 10,
  error: null,
};

const createCookieMachine = createMachine<CookieContext, CookieEvents>(
  {
    id: STATES.STATE_ROOT,
    initial: STATES.IDLE,
    context: initialState,
    states: {
      [STATES.IDLE]: {
        on: {
          [EVENTS.GET_PAGE]: {
            target: STATES.LOADING,
            actions: ['startLoading'],
          },
        },
      },
      [STATES.LOADING]: {
        invoke: {
          id: 'loadPage',
          src: async (context, { data: { dirs, index, size } }) =>
            getCookiePage(dirs, index, size),
          onDone: {
            target: STATES.LOADED_PAGE,
            actions: assign({
              cookies: (context, event) => event.data,
            }),
          },
          onError: {
            target: STATES.ERROR,
            actions: assign({
              error: (context, event) => event.data,
            }),
          },
        },
      },
      [STATES.LOADED_PAGE]: {
        on: {
          [EVENTS.GET_PAGE]: {
            target: STATES.LOADING,
            actions: ['startLoading'],
          },
        },
      },
      [STATES.ERROR]: {
        on: {
          [EVENTS.GET_PAGE]: {
            target: STATES.LOADING,
            actions: ['clearError', 'startLoading'],
          },
        },
      },
    },
  },
  {
    actions: {
      startLoading: assign({
        index: (context, event) => event.data.index,
        size: (context, event) => event.data.size,
      }),
      clearError: assign({
        error: null,
      }),
    },
  }
);

export default createCookieMachine;
