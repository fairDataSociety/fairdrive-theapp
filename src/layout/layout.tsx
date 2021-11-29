import React, { useState } from 'react';

// Hooks
import useStyles from './layoutStyles';
import { useTheme } from 'src/contexts/themeContext/themeContext';

import { MachinesHelpers } from 'src/hooks/machines';

// Components
import Navbar from './partials/navbar/navbar';
import Footer from './partials/footer/footer';
import Main from './partials/main/main';
import TermsAndConditions from 'src/pages/termsAndConditions/termsAndConditions';
import AlertBanner from 'src/components/alertBanner/alertBanner';

export default function Layout(): JSX.Element {
  const { theme } = useTheme();
  const classes = useStyles(theme);

  const [showTerms, setShowTerms] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [appSearch, setAppSearch] = useState('');

  const { isUserLoggedInAndUserStatsFetched } = MachinesHelpers();

  return (
    <div className={classes.App}>
      <Navbar
        isAfterAuth={isUserLoggedInAndUserStatsFetched()}
        showTerms={showTerms}
        setShowTerms={setShowTerms}
        activeTab={activeTab}
        appSearch={appSearch}
        setAppSearch={setAppSearch}
      />
      <AlertBanner />
      {!showTerms && (
        <Main
          isAfterAuth={isUserLoggedInAndUserStatsFetched()}
          setActiveTab={setActiveTab}
          appSearch={appSearch}
        />
      )}

      {showTerms && <TermsAndConditions />}
      <Footer showTerms={showTerms} setShowTerms={setShowTerms} />
    </div>
  );
}
