import React, { useState } from 'react';

// Hooks
import useStyles from './layoutStyles';
import { useTheme } from 'src/contexts/themeContext/themeContext';

// Components
import Navbar from './partials/navbar/navbar';
import Footer from './partials/footer/footer';
import Main from './partials/main/main';
import TermsAndConditions from 'src/components/termsAndConditions/termsAndConditions';
import AlertBanner from 'src/components/alertBanner/alertBanner';

export default function Layout(): JSX.Element {
  const { theme } = useTheme();
  const classes = useStyles(theme);
  const [showTerms, setShowTerms] = useState(false);

  const renderComponentsConditionaly = [
    {
      isVisible: () => true,
      component: AlertBanner,
    },
    {
      isVisible: () => !showTerms,
      component: Main,
    },
    {
      isVisible: () => showTerms,
      component: TermsAndConditions,
    },
  ];

  return (
    <div className={classes.App}>
      <Navbar showTerms={showTerms} setShowTerms={setShowTerms} />
      {renderComponentsConditionaly.map(
        (element, index) =>
          element.isVisible() && <element.component key={index} />
      )}
      <Footer showTerms={showTerms} setShowTerms={setShowTerms} />
    </div>
  );
}
