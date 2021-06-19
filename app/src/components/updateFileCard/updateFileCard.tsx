import React, { useContext } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import useStyles from "./updateFileCardStyles";

export interface Props {}

function UpdateFileCard(props: Props) {
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });

  const buttons = [
    {button: <div className={classes.white}>Rename File</div>},
    {button: <div className={classes.white}>Duplicate File</div>},
    {button: <div className={classes.white}>Export File</div>},
    {button: <div className={classes.white}>Download File</div>},
    {button: <div className={classes.red}>Delete File</div>},
  ]

  return (
    <div className={classes.wrapper}>
      {buttons.map((b) => {
        return (
          <li>
            <button>
              {b.button}
            </button>
          </li>
        );
      })}
    </div>
  );
}

export default React.memo(UpdateFileCard);
