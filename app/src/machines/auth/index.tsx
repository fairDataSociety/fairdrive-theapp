import React, { useCallback, createContext, useEffect } from 'react';
import { State } from 'xstate';
import { useMachine } from '@xstate/react';
import createAuthMachine, {
  EVENTS,
  AuthContext,
  AuthEvents,
} from 'src/machines/auth/machine';
import { CreateAccount } from 'src/types/models/CreateAccount';

interface AuthProviderContext {
  store: State<AuthContext, AuthEvents, any>;
  actions: {
    onRegister: (data: CreateAccount) => void;
    onLogin: (email: string, password: string) => void;
    onLogout: () => void;
  };
}

interface AuthProvider {
  children: React.ReactNode | React.ReactNode[];
}

export const AuthProviderContext = createContext({} as AuthProviderContext);

const AuthProvider = ({ children }: AuthProvider): JSX.Element => {
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

  const handleLogout = useCallback((): void => {
    send({ type: EVENTS.LOGOUT });
  }, [send]);

  const value = {
    store: state,
    actions: {
      onRegister: handleRegister,
      onLogin: handleLogin,
      onLogout: handleLogout,
    },
  };

  useEffect(() => {
    console.log('AuthMachine state: ', state);
  }, [state, send]);

  return (
    <AuthProviderContext.Provider value={value}>
      {children}
    </AuthProviderContext.Provider>
  );
};

export default AuthProvider;
