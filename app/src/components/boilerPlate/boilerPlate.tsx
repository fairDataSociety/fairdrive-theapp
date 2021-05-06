import React, { useContext } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import useStyles from "./boilerPlateStyles";

export interface Props {}

function BoilerPlate(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);

  const classes = useStyles({ ...props, ...theme });

  return (
    <div className={classes.BoilerPlate}>
      <p>BoilerPlate Component</p>
    </div>
  );
}

export default React.memo(BoilerPlate);
