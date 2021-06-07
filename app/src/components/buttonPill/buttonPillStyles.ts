import { makeStyles, createStyles } from "@material-ui/styles";
// import interface for component Props and Theme
import { Theme } from "../../store/themeContext/themes";
import { Props } from "./buttonPill";

const useStyles = makeStyles(() =>
  createStyles({
    button: {

      // custom
      minWidth: "40rem",
      maxWidth: "55rem",
      textAlign: 'center',
      boxSizing: 'border-box',
      padding: "20px 42px",
      borderRadius: "4px",
      cursor: 'pointer',
      border: "1px solid var(--dark3)", 
      backgroundColor: (style: Props & Theme) => style.backgroundLight3,
      color:(style: Props & Theme) => style.textColorPrimary,
      font: (style: Props & Theme) => style.typography.body1,
      "&:hover": {
        font: (style: Props & Theme) => style.typography.body3,
      },
      "&:active": {
        font: (style: Props & Theme) => style.typography.body2,
        border: "1px solid var(--white)", 
      },
      margin:"0 auto 2rem auto"
    },

  })
);

export default useStyles;
