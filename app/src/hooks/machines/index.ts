import { useCallback, useContext } from 'react';
import AuthStates from 'src/machines/auth/states';
import { AuthProviderContext } from 'src/machines/auth';

import PodStates from 'src/machines/pod/states';
import { PodProviderContext } from 'src/machines/pod';

export function MachinesHelpers() {
  const { AuthMachineStore } = useContext(AuthProviderContext);
  const { PodMachineStore } = useContext(PodProviderContext);

  const isUserLoggedInAndUserStatsFetched = useCallback(
    () =>
      [
        {
          [AuthStates.LOGIN]: AuthStates.LOGIN_SUCCESS,
        },
        {
          [AuthStates.FETCH_USER_STATS]: AuthStates.FETCH_USER_STATS_SUCCESS,
        },
      ].some(AuthMachineStore.matches) &&
      (PodMachineStore.matches({
        [PodStates.FETCH_PODS]: PodStates.FETCH_PODS_SUCCESS,
      }) ||
        // Below cond prevents app from moving back to login page
        // in case of creating new pod
        PodMachineStore.matches(PodStates.CREATE_POD) ||
        (PodMachineStore._event.origin === 'createPodService' &&
          PodMachineStore.matches({
            [PodStates.FETCH_PODS]: PodStates.FETCH_PODS_LOADING,
          }))),

    [AuthMachineStore, PodMachineStore]
  );

  return {
    isUserLoggedInAndUserStatsFetched,
  };
}
