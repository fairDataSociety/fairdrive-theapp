import React, { useContext } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import useStyles from "./podsPreviewStyles";
import { Chevron, QuestionCircle } from "../icons/icons";

export interface Props {
  handleClick: () => void;
  heading: string;
  info: string
}

function PodActivity(props: Props) {
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });

  return (
    <div className={classes.wrapper}>
      <p className={classes.header}>{props.heading}</p>
      <p className={classes.subheader}>Most Recent Activity</p>
      <p className={classes.faq}>
        <QuestionCircle className={classes.questionIcon}/>
        <span className={classes.faqText}>{props.info}</span>
      </p>
      <p className={classes.button} onClick={props.handleClick}>
        View More
        <Chevron className={classes.icon}/>
      </p>
    </div>
  );
}

export default React.memo(PodActivity);
