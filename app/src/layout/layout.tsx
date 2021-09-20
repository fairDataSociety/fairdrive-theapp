import React, { useState, useContext, useCallback } from 'react';

import STATES from 'src/machines/auth/states';
import { AuthProviderContext } from 'src/machines/auth';

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
  const { theme } = useTheme();
  const classes = useStyles(theme);
  const [showTerms, setShowTerms] = useState(false);

  const isUserLoggedInAndUserStatsFetched = useCallback(
    () =>
      [
        {
          [STATES.LOGIN]: STATES.LOGIN_SUCCESS,
        },
        {
          [STATES.FETCH_USER_STATS]: STATES.FETCH_USER_STATS_SUCCESS,
        },
      ].some(AuthMachineStore.matches),
    [AuthMachineStore]
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
