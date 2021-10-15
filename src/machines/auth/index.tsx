import React, { createContext, useCallback } from 'react';
import { State } from 'xstate';
import { useMachine } from '@xstate/react';
import createAuthMachine, {
  AuthContext,
  AuthEvents,
} from 'src/machines/auth/machine';
import EVENTS from 'src/machines/auth/events';
import STATES from 'src/machines/auth/states';

interface AuthProviderContext {
  AuthMachineStore: State<AuthContext, AuthEvents, any>;
  AuthMachineActions: {
    onRegisterSetUsernameAndPassword: (data: {
      username: string;
      password: string;
    }) => void;
    onRegisterValidUserProvidedMnemonic: () => void;
    onLogin: (email: string, password: string) => void;
    onLogout: () => void;
    onFetchUserStats: () => void;
  };
}

interface AuthProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

export const AuthProviderContext = createContext({} as AuthProviderContext);

const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [state, send] = useMachine(createAuthMachine, { devTools: true });

  const handleRegisterSetUsernameAndPassword = useCallback(
    (data: { username: string; password: string }): void => {
      send({ type: EVENTS.REGISTER_SET_USERNAME_AND_PASSWORDS, payload: data });
    },
    [send]
  );

  const handleRegisterValidUserProvidedMnemonic = (): void => {
    if (state.can(EVENTS.REGISTER_VALID_USER_PROVIDED_MNEMONIC)) {
      send({ type: EVENTS.REGISTER_VALID_USER_PROVIDED_MNEMONIC });
    } else {
      console.warn(
        `${EVENTS.REGISTER_VALID_USER_PROVIDED_MNEMONIC} not allowed in current state`
      );
    }
  };

  const handleLogin = useCallback(
    (username: string, password: string): void => {
      send({ type: EVENTS.LOGIN, payload: { username, password } });
    },
    [send]
  );

  const handleFetchUserStats = () => {
    if (
      state.matches({
        [STATES.LOGIN]: STATES.LOGIN_SUCCESS,
      })
    ) {
      send({ type: EVENTS.FETCH_USER_STATS });
    } else {
      console.warn('Fetching user stats available after login');
    }
  };

  const handleLogout = useCallback((): void => {
    send({ type: EVENTS.LOGOUT });
  }, [send]);

  const value = {
    AuthMachineStore: state,
    AuthMachineActions: {
      onRegisterSetUsernameAndPassword: handleRegisterSetUsernameAndPassword,
      onRegisterValidUserProvidedMnemonic:
        handleRegisterValidUserProvidedMnemonic,
      onLogin: handleLogin,
      onLogout: handleLogout,
      onFetchUserStats: handleFetchUserStats,
    },
  };

  // useEffect(() => {
  //   console.log('AuthMachine state:', state.toStrings());
  //   console.log('next events', state.nextEvents);
  //   console.log('context', state.context);
  // }, [state, send]);

  return (
    <AuthProviderContext.Provider value={value}>
      {children}
    </AuthProviderContext.Provider>
  );
};

export default AuthProvider;
