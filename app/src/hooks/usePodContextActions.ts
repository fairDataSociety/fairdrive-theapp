import { useContext } from 'react';

// Context
import { StoreContext } from 'src/store/store';
import { usePodStateMachine } from 'src/contexts/podStateMachine';
import {
  STATES_NAMES,
  POD_STATUS,
  DIRECTORY_CONTEXTS,
  DIRECTORY_STATUS,
} from 'src/types/pod-state';

// Services
import { createPod, receivePod } from 'src/services/pod';
import { createDirectory } from 'src/services/directory';

export type AllowedPodActions = 'open' | 'create' | 'import' | 'overview';

export function usePodContextActions() {
  const { state, actions } = useContext(StoreContext);
  const { changePodState } = usePodStateMachine();

  const handleOpenPod = async (nextPodName: string) => {
    try {
      const doWeHadOpenedPod = () => state.podName.length > 0;

      if (doWeHadOpenedPod() && state.podName !== nextPodName) {
        changePodState({
          tag: STATES_NAMES.POD_STATE,
          podName: state.podName,
          status: POD_STATUS.CHANGE,
        });
      }

      actions.setPodName(nextPodName);
      actions.setDirectory('root');
      if (!state.podsOpened.includes(nextPodName)) {
        actions.openPod({
          password: state.password,
          podName: nextPodName,
        });
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleCreatePod = async (podName: string) => {
    try {
      await createPod({ password: state.password, podName });
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleImportPod = async (
    podReference: string,
    podName = 'importedpod20'
  ): Promise<void> => {
    try {
      await receivePod({ podReference: podReference, pod_name: podName });
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleOverview = async (podName: string) => {
    try {
      // await actions.setPodName(podName);
      // if (!state.podsOpened.includes(podName))
      //   await actions.openPod({ password: state.password, podName: podName });
      console.log('handleOverview for podName', podName);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleOpenDirectory = async (directoryName?: string): Promise<void> => {
    try {
      if (state.podsOpened.includes(state.podName)) {
        // TODO: Fix problem with opening nested dir inside nested dir
        await actions.getDirectory({
          directory: directoryName ? directoryName : state.directory,
          podName: state.podName,
        });
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleCreateDirectory = async (
    directoryName: string
  ): Promise<void> => {
    try {
      changePodState({
        tag: STATES_NAMES.DIRECTORY_STATE,
        podName: state.podName,
        directoryName: directoryName,
        context: DIRECTORY_CONTEXTS.DIRECTORY_ACTION,
        status: DIRECTORY_STATUS.DIRECTORY_CREATING,
      });
      await createDirectory(state.directory, directoryName, state.podName);
      changePodState({
        tag: STATES_NAMES.DIRECTORY_STATE,
        podName: state.podName,
        directoryName: directoryName,
        context: DIRECTORY_CONTEXTS.DIRECTORY_ACTION,
        status: DIRECTORY_STATUS.DIRECTORY_CREATING_SUCCESS,
      });
    } catch (error) {
      changePodState({
        tag: STATES_NAMES.DIRECTORY_STATE,
        podName: state.podName,
        directoryName: directoryName,
        context: DIRECTORY_CONTEXTS.DIRECTORY_ACTION,
        status: DIRECTORY_STATUS.DIRECTORY_CREATING_ERROR,
      });
      return Promise.reject(error);
    }
  };

  return {
    handleImportPod,
    handleOpenPod,
    handleCreatePod,
    handleOverview,
    handleOpenDirectory,
    handleCreateDirectory,
  };
}
