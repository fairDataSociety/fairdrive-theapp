import React, { useEffect } from "react";
import { Route, useHistory, useLocation } from "react-router-dom";
import pages from "pages";
import styles from "styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { green, orange } from "@material-ui/core/colors";
import { logIn, isLoggedIn } from "helpers/apiCalls";

const outerTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#DB7362",
      light: "#F4944D",
      background: "#333333",
    },
    secondary: {
      main: green[500],
    },
  },
});

function getSystem(state) {
  return state.system;
}

function getAccount(state) {
  return state.account;
}

function App() {
  const system = useSelector((state) => getSystem(state));
  const account = useSelector((state) => getAccount(state));

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const loginState = useEffect(() => {
    // define function async
    async function checkAccountStatus() {
      if (account) {
        if (account.status === "noAccount") {
          history.push("/account-create");
        } else {
          // do the api all to see if the user is logged in
          //const fwdUrl = slice(location.pathname);
          const checkIsLoggedIn = await isLoggedIn(account.username)
            .then((result) => {
              if (result.data.loggedin && system.passWord) {
                history.push("/drive/root");
                dispatch({
                  type: "SET_SYSTEM",
                  data: {
                    unlocked: true,
                  },
                });
              } else {
                history.push("/unlock/");
              }
            })
            .catch((e) => {
              return e;
            });
        }
      }
    }
    checkAccountStatus().catch((e) => console.log(e));
  }, [account.status]);

  return (
    <ThemeProvider theme={outerTheme}>
      {" "}
      <div className={styles.swarmcity}>
        {" "}
        {pages.map(({ path, exact, component }) => (
          <Route
            key={path}
            {...{
              path,
              exact,
              component,
            }}
          />
        ))}{" "}
      </div>{" "}
    </ThemeProvider>
  );
}

export default App;
