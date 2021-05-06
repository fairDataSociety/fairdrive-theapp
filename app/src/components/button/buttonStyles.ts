import { makeStyles, createStyles } from "@material-ui/styles";
// import interface for component Props and Theme
import { Theme } from "../../store/themeContext/themes";
import { Props } from "./button";

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      // from bodyBold in Fairdrive:
      fontWeight: 'bold',
      fontSize: '16px',
      letterSpacing: '0',
      lineHeight: '19px',
      // custom
      minWidth: "200px",
      maxWidth: "280px",
      textAlign: 'center',
      boxSizing: 'border-box',
      padding: "20px 42px",
      borderRadius: "4px",
      cursor: 'pointer',
      border: "1px solid #16181D", 
      backgroundColor: (style: Props & Theme) => style.backgroundGrey,
      "&:hover": {
        color: "#EEF0FF"
      },
      margin:"0 auto 2rem auto"
    },
  })
);

export default useStyles;
