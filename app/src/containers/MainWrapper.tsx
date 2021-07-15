import React, { useContext, useState } from "react";
import Navbar from "./navbar/navbar";
import Main from "./main/main";
import useStyles from "./MainWrapperStyles";
import { useTheme } from "../store/themeContext/themeContext";
import Footer from "./footer/footer";
import TermsAndConditions from "src/components/termsAndConditions/termsAndConditions";
import AlertBanner from "../components/alertBanner/alertBanner";
import { useEffect } from "react";
import { userLoggedIn } from "src/store/services/fairOS";
import { StoreContext } from "src/store/store";

export default function MainWrapper() {
  const { state } = useContext(StoreContext);

  const { theme } = useTheme();
  const classes = useStyles(theme);
  const [showTerms, setShowTerms] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [isLoggedIn, setIsLoggedin] = useState(false);
  useEffect(() => {
    async function fetchMyAPI() {
      const username = localStorage.getItem("username");
      const res = await userLoggedIn(username);
      setIsLoggedin(res.data);
    }
    fetchMyAPI();
  });

  return (
    <div className={classes.App}>
      {isLoggedIn}
      <Navbar
        showTerms={showTerms}
        isLoggedIn={isLoggedIn}
        setShowTerms={setShowTerms}
      />
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
