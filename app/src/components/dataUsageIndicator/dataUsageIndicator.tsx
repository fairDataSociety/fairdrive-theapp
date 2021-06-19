import React, { useContext } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import useStyles from "./dataUsageIndicatorStyles";
import CircularProgress from "../circularProgress/circularProgress";
import { QuestionCircle } from "../icons/icons";

export interface Props {
  // uncomment when populating with real values
  // heading: string;
  // usedSpace: string;
  // spaceLeft: string;
  // handleClick: () => void;
}

function DataUsageIndicator(props: Props) {
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });

  const percentage = 80;

  return (
    // <div className={classes.container}>
    // <div className={classes.heading}>Your Storage</div>
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
    //  </div>
    // <div className={classes.refermessage}>
    //    <QuestionCircle className={classes.icon} />
    //    <p>Refer A friend to gain more storage. Read up on how to do this on our community channels</p>
    //  </div>
    //  <button className={classes.button}>Refer a friend</button>
    // </div>

    // Uncomment to view populated component
    // This is demo version
    <div className={classes.container}>
      <div className={classes.heading}>Your Storage</div>
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
      <div className={classes.refermessage}>
        <QuestionCircle className={classes.icon} />
        <p>
          Refer A friend to gain more storage. Read up on how to do this on our
          community channels
        </p>
      </div>
      <button className={classes.button}>Refer a friend</button>
    </div>
  );
}

export default React.memo(DataUsageIndicator);
