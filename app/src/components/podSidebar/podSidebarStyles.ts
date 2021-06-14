import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "../../store/themeContext/themes";
import { Props } from "./podSidebar";

const useStyles = makeStyles(() =>
  createStyles({
    BoilerPlate: {
      // we merge Props & Theme interfaces and call this merged object "style".
      //component props and ui theme properties are available on the style object (yay auto-complete!!).
      backgroundColor: (style: Props & Theme) => style.backgroundDark4,
      height: "100vh",
      display:"flex",
      alignItems:"center",
      flexDirection: "column",
      padding:"2rem",
      width:"28rem",
      font: (style: Props & Theme) => style.typography.caption1,
    },
    rowButtons:{
      display:"flex",
      alignItems:"center",
      flexDirection: "row",
    },
    switchPods:{
      borderBottom:"1px  solid var(--dark1)",
      paddingBottom:"2rem"
    },
    pods:{
      padding:"1rem"
    }
  })
);

export default useStyles;
