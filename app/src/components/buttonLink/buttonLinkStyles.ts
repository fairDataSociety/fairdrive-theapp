import { makeStyles, createStyles } from "@material-ui/styles";
// import interface for component Props and Theme
import { Theme } from "../../store/themeContext/themes";
import { Props } from "./buttonLink";

const useStyles = makeStyles(() =>
  createStyles({
    ButtonLink: {
      // we merge Props & Theme interfaces and call this merged object "style".
      //component props and ui theme properties are available on the style object (yay auto-complete!!).
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
      textTransform: 'capitalize',
      color: '#16181D',
    },
  })
);

export default useStyles;
