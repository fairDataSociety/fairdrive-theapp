import { makeStyles, createStyles } from "@material-ui/styles";
// import interface for component Props and Theme
import { Theme } from "../../store/themeContext/themes";
import { Props } from "./home";

const useStyles = makeStyles(() =>
  createStyles({
    Home: {
      // we merge Props & Theme interfaces and call this merged object "style".
      //component props and ui theme properties are available on the style object (yay auto-complete!!).
      backgroundColor: "transparent",
      position:"absolute",
      display:"flex",
      flexDirection:"column",
      margin: "7rem 0 0 19rem",

    },
    buttonNavBar:{
      marginLeft: "auto",
      marginRight: "0"
    },
    uploadInput:{
      opacity:"0"
    },
    Icon: {
      width: "5rem",
      height: "5rem",
    },
  })
);

export default useStyles;
