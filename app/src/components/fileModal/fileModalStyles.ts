import { makeStyles, createStyles } from "@material-ui/styles";
// import interface for component Props and Theme
import { Theme } from "../../store/themeContext/themes";
import { Props } from "./fileModal";

const useStyles = makeStyles(() =>
  createStyles({
    modalContainer:{
      height: "100%",
      width:"50rem",
      marginLeft: "calc(100% - 50rem)",
    },
    fileModal:{
      padding:"3.5rem",
      background: (style: Props & Theme) => style.backgroundWhite,
      border: "1px solid var(--grey)",
      height: "100%",
      width:"50rem",
      margin: "0rem",
      justifyContent: "flex-end",
      textAlign: "center",
      // display: "flex",
      flexDirection: "column",
      alignItems: "left",
      cursor:"pointer"
    },
    title:{
      font:(style: Props & Theme) => style.typography.p2,
    },
    header:{
      font:(style: Props & Theme) => style.typography.p2,
      borderBottom: "1px solid var(--grey)",
      padding:"1rem"

    },
    iconContainer: {
      margin: "0 1rem 0 1rem",
      width: "100%",
      height: "50rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
    },
    Icon: {
      width: "8rem",
      height: "8rem",
      margin: "auto",
    },
    fileInfoContainer:{
      font:(style: Props & Theme) => style.typography.h3,
      paddingTop:"3.5rem",
      display: "flex",
      flexDirection: "row",
      height:"20rem",
      width:"100%"
    },
    leftContainer:{
      display: "flex",
      flexDirection: "column",
      textAlign:"left",
      width:"50%"
    },
    rightContainer:{
      display: "flex",
      flexDirection: "column",
      textAlign:"right",
      width:"50%"
    },
    label:{
      fontWeight: "bold",
    },
    pair:{
      paddingBottom:"2rem"
    }
  })
);

export default useStyles;
