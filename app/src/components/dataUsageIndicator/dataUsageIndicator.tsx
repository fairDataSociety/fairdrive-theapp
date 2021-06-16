import React, { useContext } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import useStyles from "./dataUsageIndicatorStyles";
import CircularProgress from "../circularProgress/circularProgress";

export interface Props {
  heading: string;
  usedSpace: string;
  spaceLeft: string;
  handleClick: () => void;
}

function DataUsageIndicator(props: Props) {
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });

  const percentage = 80;

  return (
    // <div className={classes.wrapper}>
    //   <CircularProgress percentage={percentage} />
    //   <div className={classes.description}>
    //     <div className={classes.header}>{props.heading}</div>
    //     <div className={classes.layout}>
    //       <span className={classes.bold}>{props.usedSpace}</span>
    //       of
    //       <span className={classes.bold}>{props.spaceLeft}</span>
    //       remaining
    //     </div>
    //   </div>
    // </div>

    // Uncomment to view populated component
    // This is demo version
    <div className={classes.wrapper}>
      <CircularProgress percentage={percentage} />
      <div className={classes.description}>
        <div className={classes.header}>Storage</div>
        <div className={classes.layout}>
          <span className={classes.bold}>2.4GB</span>
          of
          <span className={classes.bold}>150GB</span>
          remaining
        </div>
      </div>
    </div>
  );
}

export default React.memo(DataUsageIndicator);
