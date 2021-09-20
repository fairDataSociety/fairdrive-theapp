import { createMachine, assign } from 'xstate';
import EVENTS from './events';
import STATES from './states';
import GUARDS from './guards';
import { UserStats } from 'src/types/responses';
import { CreateAccount } from 'src/types/models/CreateAccount';

import * as LoginService from 'src/services/auth';
import * as RegisterService from 'src/services/account';
import { statsUser } from 'src/services/user';

interface LoginData {
  username: string;
  password: string;
}

export interface AuthContext {
  isLoggedIn: boolean;
  isRegistered: boolean;
  isUserStatsFetched: boolean;
  userData: UserStats | null;
  errorMessage: string | null;
  loginData: LoginData | null;
  registrationData: CreateAccount | null;
}

export type AuthEvents =
  | {
      type: EVENTS.LOGIN;
      payload: LoginData;
    }
  | { type: EVENTS.REGISTER; payload: CreateAccount }
  | { type: EVENTS.LOGOUT }
  | { type: EVENTS.FETCH_USER_STATS }
  | { type: EVENTS.RETRY_FETCH_USER_STATS };

const initialState: AuthContext = {
  // TODO: Below it could by as services/user/isUserLoggedIn() ? 'login' : 'idle'
  // but currently we don't have properly working session refresh tool
  isLoggedIn: false,
  isRegistered: false,
  isUserStatsFetched: false,
  userData: null,
  errorMessage: null,
  loginData: null,
  registrationData: null,
};

const createAuthMachine = createMachine<AuthContext, AuthEvents>(
  {
    id: STATES.STATE_ROOT,
    initial: STATES.IDLE,
    context: initialState,
    states: {
      [STATES.IDLE]: {
        on: {
          [EVENTS.LOGIN]: {
            target: STATES.LOGIN,
            actions: assign({
              loginData: (_, { payload }) => payload,
            }),
          },
          [EVENTS.REGISTER]: {
            target: STATES.REGISTER,
            actions: assign({
              registrationData: (_, { payload }) => payload,
            }),
          },
        },
      },
      [STATES.REGISTER]: {
        initial: STATES.REGISTER_LOADING,
        states: {
          [STATES.REGISTER_LOADING]: {
            invoke: {
              id: 'registerService',
              src: (context) =>
                RegisterService.createAccount(context.registrationData),
              onDone: {
                target: STATES.REGISTER_SUCCESS,
                actions: () => console.log('registerService done'),
              },
              onError: {
                target: STATES.REGISTER_FAILED,
                actions: () => console.log('registerService error'),
              },
            },
          },
          [STATES.REGISTER_SUCCESS]: {
            on: {
              // After register let's allow for login in
              [EVENTS.LOGIN]: {
                target: `#${STATES.STATE_ROOT}.${STATES.LOGIN}.${STATES.LOGIN_LOADING}`,
                actions: assign({
                  loginData: (_, { payload }) => payload,
                }),
              },
            },
          },
          [STATES.REGISTER_FAILED]: {
            // On register failed let's allow for re try
            on: {
              // After register let's allow for login in
              [EVENTS.REGISTER]: {
                target: `#${STATES.STATE_ROOT}.${STATES.REGISTER}.${STATES.REGISTER_LOADING}`,
                actions: assign({
                  registrationData: (_, { payload }) => payload,
                }),
              },
            },
          },
        },
      },
      [STATES.LOGIN]: {
        initial: STATES.LOGIN_LOADING,
        states: {
          [STATES.LOGIN_LOADING]: {
            invoke: {
              id: 'loginService',
              src: (context) => LoginService.loginUser(context.loginData),
              onDone: {
                target: STATES.LOGIN_SUCCESS,
                actions: assign({
                  isLoggedIn: (_) => true,
                }),
              },
              onError: {
                target: STATES.LOGIN_FAILED,
                actions: assign({
                  isLoggedIn: (_) => false,
                }),
              },
            },
          },
          [STATES.LOGIN_SUCCESS]: {
            initial: STATES.FETCH_USER_STATS,
            states: {
              idle: {
                on: {
                  [EVENTS.FETCH_USER_STATS]: {
                    target: STATES.FETCH_USER_STATS,
                    // Prevent fetching user stats when user not logged in
                    cond: GUARDS.IS_USER_LOGGED,
                  },
                },
              },
              [STATES.FETCH_USER_STATS]: {
                // Below probably should be full reference
                initial: STATES.FETCH_USER_STATS_LOADING,
                states: {
                  [STATES.FETCH_USER_STATS_LOADING]: {
                    invoke: {
                      id: 'fetchUserStatsService',
                      src: (_) => statsUser(),
                      onDone: {
                        target: STATES.FETCH_USER_STATS_SUCCESS,
                        actions: assign((_, event) => {
                          return {
                            isUserStatsFetched: true,
                            userData: event.data.data,
                          };
                        }),
                      },
                      onError: {
                        target: STATES.FETCH_USER_STATS_FAILED,
                        actions: assign((_) => {
                          return {
                            isUserStatsFetched: false,
                            userData: null,
                          };
                        }),
                      },
                    },
                  },
                  // End of path
                  [STATES.FETCH_USER_STATS_SUCCESS]: {},
                  [STATES.FETCH_USER_STATS_FAILED]: {
                    on: {
                      [EVENTS.RETRY_FETCH_USER_STATS]: {
                        target: STATES.FETCH_USER_STATS_LOADING,
                      },
                    },
                  },
                },
                on: {
                  // On fetching user stats success let's allow for log out
                  [EVENTS.LOGOUT]: {
                    target: `#${STATES.STATE_ROOT}.${STATES.LOGOUT}`,
                  },
                },
              },
            },

            on: {
              // On login success let's allow for log out
              [EVENTS.LOGOUT]: {
                target: `#${STATES.STATE_ROOT}.${STATES.LOGOUT}`,
              },
            },
          },
          [STATES.LOGIN_FAILED]: {
            // When login fails let's allow for try once again
            on: {
              [EVENTS.LOGIN]: `#${STATES.STATE_ROOT}.${STATES.LOGIN}.${STATES.LOGIN_LOADING}`,
            },
          },
        },
      },

      [STATES.LOGOUT]: {
        invoke: {
          id: 'logoutService',
          src: () => LoginService.logoutUser(),
          onDone: {
            // On logout move to initial state and context
            target: `#${STATES.STATE_ROOT}.${STATES.IDLE}`,
            actions: assign(initialState),
          },
          onError: {
            // On logout move to initial state and context
            target: `#${STATES.STATE_ROOT}.${STATES.IDLE}`,
            actions: assign(initialState),
          },
        },
      },
    },
  },
  {
    guards: {
      [GUARDS.IS_USER_LOGGED]: ({ isLoggedIn }) => isLoggedIn,
    },
  }
);

export default createAuthMachine;
