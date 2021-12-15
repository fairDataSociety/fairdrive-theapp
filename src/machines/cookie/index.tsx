import React, { createContext } from 'react';
import { State } from 'xstate';
import { useMachine } from '@xstate/react';
import createCookieMachine, {
  CookieContext,
  CookieEvents,
} from 'src/machines/cookie/machine';
import EVENTS from './events';
import { IDirectory } from 'src/types/models/Directory';
export { default as States } from './states';

interface CookieProviderContext {
  CookieMachineStore: State<CookieContext, CookieEvents, any>;
  CookieMachineActions: {
    loadPage: (dirs: IDirectory[], index: number, size: number) => void;
  };
}

interface CookieProvider {
  children: React.ReactNode | React.ReactNode[];
}

export const CookieProviderContext = createContext({} as CookieProviderContext);

const CookieProvider = ({ children }: CookieProvider): JSX.Element => {
  const [state, send] = useMachine(createCookieMachine, { devTools: true });

  const loadPage = (dirs: IDirectory[], index: number, size: number) => {
    send({ type: EVENTS.GET_PAGE, data: { dirs, index, size } });
  };

  const value: CookieProviderContext = {
    CookieMachineStore: state,
    CookieMachineActions: {
      loadPage,
    },
  };

  return (
    <CookieProviderContext.Provider value={value}>
      {children}
    </CookieProviderContext.Provider>
  );
};
export default CookieProvider;
