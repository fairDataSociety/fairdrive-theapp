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
      margin: "6rem 0 0 12rem",

    },
    buttonNavBar:{
      marginLeft: "auto",
      marginRight: "2rem"
    },
    uploadInput:{
      opacity:"0",
      width:"0",
      height:"0"
    },
    Icon: {
      width: "5rem",
      height: "5rem",
      margin:"0.5rem"
    },
    modalContainer:{
      marginLeft: "calc(100% - 50rem)",
      overflowX: "hidden",
      overflowY: "auto",
    },
  })
);

export default useStyles;
