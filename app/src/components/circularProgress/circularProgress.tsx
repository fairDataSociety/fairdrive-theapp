import React, { useContext } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import useStyles from "./circularProgressStyles";

export interface Props {
  percentage: number;
}

function CircularProgress(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });

  const percentage = 66;

  return (
    <div className={classes.BoilerPlate}>
      <CircularProgressbar
        value={percentage}
        text={`${props.percentage}%`}
        styles={buildStyles({
          rotation: 0.25,
          strokeLinecap: "round",
          textSize: "16px",
          pathTransitionDuration: 0.5,
          pathColor: `rgba(130,132,142, ${percentage / 100})`,
          textColor: "#EEF0FF",
          trailColor: "#27292E",
          backgroundColor: "#3e98c7",
          // borderRadius: '5px',
        })}
      />
    </div>
  );
}

export default React.memo(CircularProgress);
