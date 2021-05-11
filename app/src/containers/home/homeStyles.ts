import { makeStyles, createStyles } from "@material-ui/styles";
// import interface for component Props and Theme
import { Theme } from "../../store/themeContext/themes";
import { Props } from "./home";

const useStyles = makeStyles(() =>
  createStyles({
    Home: {
      // we merge Props & Theme interfaces and call this merged object "style".
      //component props and ui theme properties are available on the style object (yay auto-complete!!).
      backgroundColor: (style: Props & Theme) => style.backgroundWhite,
      left:"15rem",
      top:"15rem",
      width: "100%",
      height: "auto",
      position:"absolute",
      display: "flex",
    },
  })
);

export default useStyles;
