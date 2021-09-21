import React, { createContext, useContext, useEffect } from 'react';
import { State } from 'xstate';
import { useMachine } from '@xstate/react';
import createPodMachine, {
  PodContext,
  PodEvents,
} from 'src/machines/pod/machine';
import EVENTS from 'src/machines/pod/events';

// AuthMachine Context
import { AuthProviderContext } from 'src/machines/auth';
import AuthStates from 'src/machines/auth/states';

interface PodProviderContext {
  PodMachineStore: State<PodContext, PodEvents, any>;
  PodMachineActions: {
    onFetchPods: () => void;
    onOpenPod: (podName: string) => void;
    onOpenDirectory: (directoryName: string) => void;
    onImportPod: (podReference: string) => void;
  };
}

interface PodProvider {
  children: React.ReactNode | React.ReactNode[];
}

export const PodProviderContext = createContext({} as PodProviderContext);

const PodProvider = ({ children }: PodProvider): JSX.Element => {
  const { AuthMachineStore } = useContext(AuthProviderContext);

  const [state, send] = useMachine(createPodMachine, { devTools: true });

  const handleFetchPods = () => {
    send({ type: EVENTS.GET_PODS });
  };

  const handleOpenPod = (podName: string) => {
    send({ type: EVENTS.OPEN_POD, payload: { podName } });
  };

  const handleOpenDirectory = (directoryName: string) => {
    send({
      type: EVENTS.OPEN_DIRECTORY,
      payload: {
        directoryName,
      },
    });
  };

  const handleImportPod = (podReference: string): void => {
    send({
      type: EVENTS.IMPORT_POD,
      payload: {
        podName: Math.random()
          .toString(36)
          .replace(/[^a-z]+/g, '')
          .substr(0, 5),
        podReference,
      },
    });
  };

  const value: PodProviderContext = {
    PodMachineStore: state,
    PodMachineActions: {
      onFetchPods: handleFetchPods,
      onOpenPod: handleOpenPod,
      onOpenDirectory: handleOpenDirectory,
      onImportPod: handleImportPod,
    },
  };

  // After successfull login in and fetching user's stats let's fetch available pods
  useEffect(() => {
    if (
      [
        {
          [AuthStates.LOGIN]: AuthStates.LOGIN_SUCCESS,
        },
        {
          [AuthStates.FETCH_USER_STATS]: AuthStates.FETCH_USER_STATS_SUCCESS,
        },
      ].some(AuthMachineStore.matches)
    ) {
      console.log('ok now fetch pods list');
      handleFetchPods();
    }
  }, [AuthMachineStore]);

  useEffect(() => {
    console.log(
      'PodMachine state:',
      state,
      'next events',
      state.nextEvents,
      'context',
      state.context
    );
  }, [state, send]);

  return (
    <PodProviderContext.Provider value={value}>
      {children}
    </PodProviderContext.Provider>
  );
};
export default PodProvider;
