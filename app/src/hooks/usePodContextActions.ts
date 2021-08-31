import React, { useContext } from 'react';

// Context
import { StoreContext } from 'src/store/store';

// Services
import { createPod, receivePod } from 'src/services/pod';

export type AllowedPodActions = 'open' | 'create' | 'import' | 'overview';

export function usePodContextActions() {
  const { state, actions } = useContext(StoreContext);

  const handleOpenPod = async (podName: string) => {
    try {
      actions.setPodName(podName);
      actions.setDirectory('root');
      if (!state.podsOpened.includes(podName)) {
        actions.openPod({ password: state.password, podName: podName });
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
      await actions.setPodName(podName);
      if (!state.podsOpened.includes(podName))
        await actions.openPod({ password: state.password, podName: podName });
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return { handleImportPod, handleOpenPod, handleCreatePod, handleOverview };
}
