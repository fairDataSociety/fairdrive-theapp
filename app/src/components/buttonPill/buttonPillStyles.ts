import { makeStyles, createStyles } from "@material-ui/styles";
// import interface for component Props and Theme
import { Theme } from "../../store/themeContext/themes";
import { Props } from "./buttonPill";

const useStyles = makeStyles(() =>
  createStyles({
    button: {

      // custom
      minWidth: (style: Props & Theme) => style.size ==="small"? "10rem ":"20rem",
      maxWidth:  (style: Props & Theme) => style.size ==="small"? "12rem ": "55rem",
      textAlign: 'center',
      boxSizing: 'border-box',
      borderRadius: (style: Props & Theme) => style.size ==="small"? "0" : "1rem",
      padding:"1rem",
      cursor: 'pointer',
      border:"1px solid var(--dark3)", 
      backgroundColor: (style: Props & Theme) => style.backgroundLight3,
      color:(style: Props & Theme) => style.textColorPrimary,
      font: (style: Props & Theme) => style.typography.body1,
      "&:hover": {
        font: (style: Props & Theme) => style.size ==="small"? style.typography.caption2: style.typography.body3,
        border: "1px solid var(--white)", 
      },
      "&:active": {
        font: (style: Props & Theme) => style.size ==="small"? style.typography.caption3: style.typography.body2,
        border: "1px solid var(--white)", 
      },
      margin:"0 auto 2rem auto"
    },

  })
);

export default useStyles;
