import React, { useContext } from "react";
import { ThemeContext } from "../../../store/themeContext/themeContext";
import useStyles from "./cardBodyStyles";

export interface Props {
  fileSize: string;
  dateCreated: string;
}

function CardBody(props: Props) {
  const { theme } = useContext(ThemeContext);

  const classes = useStyles({ ...props, ...theme });

  return (
    <div className={classes.CardBody}>
      <p>{props.fileSize}</p>
      <p>{props.dateCreated}</p>
    </div>
  );
}

export default React.memo(CardBody);
