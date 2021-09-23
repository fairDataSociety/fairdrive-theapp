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
      PodMachineStore.matches({
        [PodStates.FETCH_PODS]: PodStates.FETCH_PODS_SUCCESS,
      }),
    [AuthMachineStore, PodMachineStore]
  );

  return {
    isUserLoggedInAndUserStatsFetched,
  };
}
