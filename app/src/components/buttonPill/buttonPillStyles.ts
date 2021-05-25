import { makeStyles, createStyles } from "@material-ui/styles";
// import interface for component Props and Theme
import { Theme } from "../../store/themeContext/themes";
import { Props } from "./buttonPill";

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      fontWeight: 'bold',
      fontSize: '16px',
      letterSpacing: '0',
      lineHeight: '19px',
      // custom
      minWidth: "40rem",
      maxWidth: "55rem",
      textAlign: 'center',
      boxSizing: 'border-box',
      padding: "20px 42px",
      borderRadius: "4px",
      cursor: 'pointer',
      border: "1px solid var(--grey)", 
      backgroundColor: (style: Props & Theme) => style.backgroundGrey,
      color:(style: Props & Theme) => style.textColorMain,
      margin:"0 auto 2rem auto"
    },

  })
);

export default useStyles;
