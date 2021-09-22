import React, { createContext, useEffect, useCallback } from 'react';
import { State } from 'xstate';
import { useMachine } from '@xstate/react';
import createAuthMachine, {
  AuthContext,
  AuthEvents,
} from 'src/machines/auth/machine';
import EVENTS from 'src/machines/auth/events';
import STATES from 'src/machines/auth/states';
import { CreateAccount } from 'src/types/models/CreateAccount';

interface AuthProviderContext {
  AuthMachineStore: State<AuthContext, AuthEvents, any>;
  AuthMachineActions: {
    onRegister: (data: CreateAccount) => void;
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

  const handleRegister = useCallback(
    (data: CreateAccount): void => {
      send({ type: EVENTS.REGISTER, payload: data });
    },
    [send]
  );

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
      onRegister: handleRegister,
      onLogin: handleLogin,
      onLogout: handleLogout,
      onFetchUserStats: handleFetchUserStats,
    },
  };

  useEffect(() => {
    console.log('AuthMachine state:', state.toStrings());
    console.log('next events', state.nextEvents);
    console.log('context', state.context);
  }, [state, send]);

  return (
    <AuthProviderContext.Provider value={value}>
      {children}
    </AuthProviderContext.Provider>
  );
};

export default AuthProvider;
