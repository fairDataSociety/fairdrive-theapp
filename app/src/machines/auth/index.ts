import { createMachine, assign } from 'xstate';
import STATES from './states';
import EVENTS from './events';

import { UserStats } from 'src/types/responses';

import * as LoginService from 'src/services/auth';
import * as RegisterService from 'src/services/account';

interface AuthContext {
  isLoggedIn: boolean;
  isRegistered: boolean;
  userData: UserStats | null;
  errorMessage: string | null;
}

// TODO: Take value as value of STATES
type AuthTypestate = 
    {value: 'idle'; context: AuthContext} | 
    {value: 'login'; context: AuthContext} |
    {value: { login: 'loading' }; context: AuthContext } | 
    {value:  { login: 'success' }; context: AuthContext } | 
    {value:  { login: 'failure' }; context: AuthContext } |
    {value:  { login: 'logout' }; context: AuthContext } |
    {value: 'register'; context: AuthContext } | 
    {value: { register: 'loading' }; context: AuthContext } | 
    {value:  { register: 'success' }; context: AuthContext } | 
    {value:  { register: 'failure' }; context: AuthContext };



const authMachine = createMachine<AuthContext, , AuthTypestate>({
  id: 'authMachine',
  initial: '',
  context: {
    // TODO: Below it could by as services/user/isUserLoggedIn() ? 'login' : 'idle'
    // but currently we don't have properly working session refresh tool
    isLoggedIn: false,
    isRegistered: false,
    userData: null,
    errorMessage: null,
  },
  states: {
    [STATES.IDLE]: {
      on: {
        [EVENTS.REGISTER]: { target: STATES.REGISTER.NODE_NAME },
        [EVENTS.LOGIN]: { target: STATES.LOGIN.NODE_NAME },
      },
    },
    [STATES.REGISTER.NODE_NAME]: {
      initial: STATES.REGISTER.LOADING,
      states: {
        [STATES.REGISTER.LOADING]: {
          invoke: {
            id: 'registerService',
            src: (_, event) => RegisterService.createAccount(event),
            onDone: {
              target: STATES.REGISTER.SUCCESS,
              actions: assign({
                isRegistered: true,
              }),
            },
            onError: {
              target: STATES.REGISTER.FAILURE,
              actions: assign({
                isRegistered: false,
                error: (_, event) => {
                  return event.data.message;
                },
              }),
            },
          },
        },
        [STATES.REGISTER.SUCCESS]: {
          on: {
            [EVENTS.LOGIN]: {
              target: `#authMachine.${STATES.LOGIN.NODE_NAME}.${STATES.LOGIN.LOADING}`,
            },
          },
        },
        [STATES.REGISTER.FAILURE]: {
          on: {
            [EVENTS.REGISTER]: {
              target: `#authMachine.${STATES.REGISTER.NODE_NAME}.${STATES.REGISTER.LOADING}`,
            },
          },
        },
      },
    },
    [STATES.LOGIN.NODE_NAME]: {
      initial: STATES.LOGIN.LOADING,
      states: {
        [STATES.LOGIN.LOADING]: {
          invoke: {
            id: 'loginService',
            src: (_, event) => LoginService.loginUser(event),
            onDone: {
              target: STATES.LOGIN.SUCCESS,
              actions: assign({
                isLoggedIn: true,
              }),
            },
            onError: {
              target: STATES.LOGIN.FAILURE,
              actions: assign({
                isRegistered: false,
                error: (_, event) => {
                  return event.data.message;
                },
              }),
            },
          },
        },
        [STATES.LOGIN.FAILURE]: {
          on: {
            [EVENTS.LOGIN]: {
              target: `#authMachine.${STATES.LOGIN.NODE_NAME}.${STATES.LOGIN.LOADING}`,
            },
          },
        },
        [STATES.LOGIN.LOGOUT]: {
          invoke: {
            id: 'logoutService',
            src: () => LoginService.logoutUser(),
            onDone: {
              target: '#authMachine.idle',
              actions: assign({
                isLoggedIn: false,
                isRegistered: false,
                error: false,
                user: null,
              }),
            },
            onError: {
              target: '#authMachine.idle',
              actions: assign({
                isLoggedIn: false,
                isRegistered: false,
                error: false,
                user: null,
              }),
            },
          },
        },
      },
    },
  },
});
