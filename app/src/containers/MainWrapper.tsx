import React, { useState } from 'react';
import Navbar from './navbar/navbar';
import Main from './main/main';
import useStyles from './MainWrapperStyles';
import { useTheme } from '../store/themeContext/themeContext';
import Footer from './footer/footer';
import TermsAndConditions from 'src/components/termsAndConditions/termsAndConditions';
import AlertBanner from '../components/alertBanner/alertBanner';

export default function MainWrapper() {
  const { theme } = useTheme();
  const classes = useStyles(theme);
  const [showTerms, setShowTerms] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div className={classes.App}>
      <Navbar showTerms={showTerms} setShowTerms={setShowTerms} />
      {showBanner && <AlertBanner setShowBanner={setShowBanner} />}
      {!showTerms && <Main></Main>}
      {showTerms && <TermsAndConditions></TermsAndConditions>}
      <Footer showTerms={showTerms} setShowTerms={setShowTerms} />
      {/* <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/drive/:path" component={Home} />
          <Route exact path="/explore" />
          <Route exact path="/overview" component={Overview} />
        </Switch> */}
    </div>
  );
}
