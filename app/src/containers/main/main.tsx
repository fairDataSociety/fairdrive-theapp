import React, { useContext } from 'react';
import useStyles from './mainStyles';
import { StoreContext } from '../../store/store';
import { ThemeContext } from '../../store/themeContext/themeContext';
import Home from '../home/home';
import LoginRegisterPage from '../loginRegisterPage/loginRegisterPage';

export interface Props {}

function Main(props: Props) {
  const { state } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });

  return (
    <div className={classes.Main}>
      {state.userData?.code === 200 ? (
        <>
          <Home></Home>
        </>
      ) : (
        <LoginRegisterPage></LoginRegisterPage>
      )}
    </div>
  );
}
export default React.memo(Main);
