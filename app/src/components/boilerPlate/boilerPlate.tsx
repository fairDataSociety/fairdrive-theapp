import React, { useContext } from 'react';
import { ThemeContext } from '../../store/themeContext/themeContext';
// import { StoreContext } from '../../store/store';
import useStyles from './boilerPlateStyles';

function BoilerPlate() {
  // const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);

  const classes = useStyles({ ...theme });

  return (
    <div className={classes.BoilerPlate}>
      <p>BoilerPlate Component</p>
    </div>
  );
}

export default React.memo(BoilerPlate);
