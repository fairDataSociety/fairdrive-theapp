import React, { useState, useContext, useCallback } from 'react';

import AuthStates from 'src/machines/auth/states';
import { AuthProviderContext } from 'src/machines/auth';

import PodStates from 'src/machines/pod/states';
import { PodProviderContext } from 'src/machines/pod';

// Hooks
import useStyles from './layoutStyles';
import { useTheme } from 'src/contexts/themeContext/themeContext';

// Components
import Navbar from './partials/navbar/navbar';
import Footer from './partials/footer/footer';
import Main from './partials/main/main';
import TermsAndConditions from 'src/pages/termsAndConditions/termsAndConditions';
import AlertBanner from 'src/components/alertBanner/alertBanner';

export default function Layout(): JSX.Element {
  const { AuthMachineStore } = useContext(AuthProviderContext);
  const { PodMachineStore } = useContext(PodProviderContext);
  const { theme } = useTheme();
  const classes = useStyles(theme);
  const [showTerms, setShowTerms] = useState(false);

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

  return (
    <div className={classes.App}>
      <Navbar
        isAfterAuth={isUserLoggedInAndUserStatsFetched()}
        showTerms={showTerms}
        setShowTerms={setShowTerms}
      />
      <AlertBanner />
      {!showTerms && <Main isAfterAuth={isUserLoggedInAndUserStatsFetched()} />}

      {showTerms && <TermsAndConditions />}
      <Footer showTerms={showTerms} setShowTerms={setShowTerms} />
    </div>
  );
}
