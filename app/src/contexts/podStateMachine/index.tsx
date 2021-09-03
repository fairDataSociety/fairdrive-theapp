import React, { createContext, useContext, useEffect, useState } from 'react';
import { STATES_NAMES, State } from 'src/types/pod-state';

interface Context {
  state: State;
  changePodState: (nextState: State) => void;
}

export const PodStateMachineContext = createContext({} as Context);

interface PodStateProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

export function PodStateMachineProvider({
  children,
}: PodStateProviderProps): JSX.Element {
  const [state, setState] = useState<State>({
    tag: STATES_NAMES.INITIAL,
  });

  const changePodState: Context['changePodState'] = (
    nextState: State
  ): void => {
    switch (nextState.tag) {
      case STATES_NAMES.INITIAL:
        setState({
          tag: STATES_NAMES.INITIAL,
        });
        break;
      case STATES_NAMES.USER_LOGGED:
        setState({
          tag: STATES_NAMES.USER_LOGGED,
        });
        break;
      case STATES_NAMES.POD_STATE:
        setState({
          tag: STATES_NAMES.POD_STATE,
          podName: nextState.podName,
          status: nextState.status,
        });
        break;
      default:
        console.warn(`PodStateMachineContext: Provided nextState is not valid`);
        break;
    }
  };

  useEffect(() => {
    console.log('state change: ', state);
  }, [state]);

  const value: Context = { state, changePodState };

  return (
    <PodStateMachineContext.Provider value={value}>
      {children}
    </PodStateMachineContext.Provider>
  );
}

export const usePodStateMachine = (): Context =>
  useContext(PodStateMachineContext);
