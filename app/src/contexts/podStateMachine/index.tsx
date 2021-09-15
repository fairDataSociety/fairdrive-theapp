import React, { createContext, useContext, useEffect, useState } from 'react';
import { STATES_NAMES, State } from 'src/types/pod-state';

interface Context {
  podStateMachine: State;
  changePodState: (nextState: State) => void;
}

export const PodStateMachineContext = createContext({} as Context);

interface PodStateProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

export function PodStateMachineProvider({
  children,
}: PodStateProviderProps): JSX.Element {
  const [podStateMachine, setPodStateMachine] = useState<State>({
    tag: STATES_NAMES.INITIAL,
  });

  const changePodState: Context['changePodState'] = (
    nextState: State
  ): void => {
    switch (nextState.tag) {
      case STATES_NAMES.INITIAL:
        setPodStateMachine({
          tag: STATES_NAMES.INITIAL,
        });
        break;
      case STATES_NAMES.USER_LOGGED:
        setPodStateMachine({
          tag: STATES_NAMES.USER_LOGGED,
        });
        break;
      case STATES_NAMES.POD_STATE:
        setPodStateMachine({
          tag: STATES_NAMES.POD_STATE,
          podName: nextState.podName,
          status: nextState.status,
        });
        break;
      case STATES_NAMES.DIRECTORY_STATE:
        setPodStateMachine({
          tag: STATES_NAMES.DIRECTORY_STATE,
          podName: nextState.podName,
          directoryName: nextState.directoryName,
          context: nextState.context,
          status: nextState.status,
        });
        break;
      default:
        console.warn(`PodStateMachineContext: Provided nextState is not valid`);
        break;
    }
  };

  useEffect(() => {
    console.log('state change: ', podStateMachine);
  }, [podStateMachine]);

  const value: Context = { podStateMachine, changePodState };

  return (
    <PodStateMachineContext.Provider value={value}>
      {children}
    </PodStateMachineContext.Provider>
  );
}

export const usePodStateMachine = (): Context =>
  useContext(PodStateMachineContext);
