import { createMachine, assign } from 'xstate';
// import STATES from './states';
// import EVENTS from './events';
import HTTPClient from 'src/http';

import { UserStats } from 'src/types/responses';
import { CreateAccount } from 'src/types/models/CreateAccount';

import * as LoginService from 'src/services/auth';
import * as RegisterService from 'src/services/account';

export enum EVENTS {
  LOGIN = 'login',
  REGISTER = 'register',
  LOGOUT = 'logout',
}

export enum STATES {
  STATE_ROOT = 'authMachine',
  IDLE = 'idle',
  LOGIN = 'login',
  LOGIN_LOADING = 'login_loading',
  LOGIN_SUCCESS = 'login_success',
  LOGIN_FAILED = 'login_failed',
  LOGOUT = 'logout',
  REGISTER = 'register',
  REGISTER_LOADING = 'register_loading',
  REGISTER_SUCCESS = 'register_success',
  REGISTER_FAILED = 'register_failed',
}

interface LoginData {
  username: string;
  password: string;
}

export interface AuthContext {
  isLoggedIn: boolean;
  isRegistered: boolean;
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
  | { type: EVENTS.LOGOUT };

const createAuthMachine = createMachine<AuthContext, AuthEvents>({
  id: STATES.STATE_ROOT,
  initial: STATES.IDLE,
  context: {
    // TODO: Below it could by as services/user/isUserLoggedIn() ? 'login' : 'idle'
    // but currently we don't have properly working session refresh tool
    isLoggedIn: false,
    isRegistered: false,
    userData: null,
    errorMessage: null,
    loginData: null,
    registrationData: null,
  },
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
                isLoggedIn: (_, event) => event.data,
              }),
            },
            onError: {
              target: STATES.LOGIN_FAILED,
              actions: assign({
                isLoggedIn: (_, event) => event.data,
              }),
            },
          },
        },
        [STATES.LOGIN_SUCCESS]: {
          // On login success let' allow for fetching user's object

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
          actions: assign({
            isLoggedIn: false,
            isRegistered: false,
            userData: null,
            errorMessage: null,
            loginData: null,
            registrationData: null,
          }),
        },
        onError: {
          // On logout move to initial state and context
          target: `#${STATES.STATE_ROOT}.${STATES.IDLE}`,
          actions: assign({
            isLoggedIn: false,
            isRegistered: false,
            userData: null,
            errorMessage: null,
            loginData: null,
            registrationData: null,
          }),
        },
      },
    },
  },
});

export default createAuthMachine;
