import React from 'react';

// Hooks
import useStyles from './mainStyles';

// Contexts

import { useTheme } from 'src/contexts/themeContext/themeContext';

// Pages
import Home from 'src/pages/home/home';
import LoginRegisterPage from 'src/pages/loginRegisterPage/loginRegisterPage';

interface Props {
  isAfterAuth: boolean;
}

function Main(props: Props) {
  const { theme } = useTheme();
  const classes = useStyles({ ...theme });

  return (
    <main className={classes.Main}>
      {props.isAfterAuth ? <Home /> : <LoginRegisterPage />}
    </main>
  );
}
export default React.memo(Main);
