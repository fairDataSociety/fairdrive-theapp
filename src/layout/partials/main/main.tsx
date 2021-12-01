import React, { Dispatch, SetStateAction } from 'react';

// Hooks
import useStyles from './mainStyles';

// Contexts

import { useTheme } from 'src/contexts/themeContext/themeContext';

// Pages
import Home from 'src/pages/home/home';
import LoginRegisterPage from 'src/pages/loginRegisterPage/loginRegisterPage';

interface Props {
  isAfterAuth: boolean;
  setActiveTab: Dispatch<SetStateAction<string>>;
  appSearch: string;
}

function Main(props: Props) {
  const { theme } = useTheme();
  const classes = useStyles({ ...theme });

  return (
    <main className={classes.Main}>
      {props.isAfterAuth ? (
        <Home setActiveTab={props.setActiveTab} appSearch={props.appSearch} />
      ) : (
        <LoginRegisterPage />
      )}
    </main>
  );
}
export default React.memo(Main);
