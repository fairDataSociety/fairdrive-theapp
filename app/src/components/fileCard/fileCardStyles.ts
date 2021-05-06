import { makeStyles, createStyles } from "@material-ui/styles";
// import interface for component Props and Theme
import { Theme } from "../../store/themeContext/themes";
import { Props } from "./fileCard";

const useStyles = makeStyles(() =>
  createStyles({
    fileCard: {
      // we merge Props & Theme interfaces and call this merged object "style".
      //component props and ui theme properties are available on the style object (yay auto-complete!!).

        backgroundColor:"#88898E",
        width: "45rem",
        height: "5rem",
        display: "flex",
        flexDirection: "row",
        justifyItems: "center",
        alignItems: "center",
        color: "#EEF0FF",
        border: "1px solid #CED0DD",
        boxSizing: "border-box",
        borderRadius: "8px",
        cursor: "pointer",
    },
    fileName:{
      marginRight:"1rem",
      font: (style: Theme & Props) => style.typography.p1,
    },
    fileSize:{
      marginRight:"1rem",
      color:"#CED0DD"
    },
    iconContainer: {
      width: "15%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    icon: {
      fill: "#88898E",
      marginRight: "1rem",
    },
  })
);

export default useStyles;
