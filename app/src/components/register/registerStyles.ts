import { makeStyles, createStyles } from "@material-ui/styles";
// import interface for component Props and Theme
import { Theme } from "../../store/themeContext/themes";
import { Props } from "./register";

const useStyles = makeStyles(() =>
  createStyles({
    Login: {
      backgroundColor: (style: Props & Theme) => style.backgroundDark,
      paddingTop:"10rem",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyItems: "center",
      alignItems: "center",
      overflowX: "hidden",
      overflowY: "auto",
    },
    title: {
      fontWeight: 'bold',
      font: (style: Props & Theme) => style.typography.h1,
      color:(style: Props & Theme) => style.textColorMain,
      textAlign: 'center',
    },
    description: {
      font: (style: Props & Theme) => style.typography.p1,
      color:(style: Props & Theme) => style.textColorMain,
      marginBottom: "10rem",
    },
    errormsg: {
      // from bodyBold in Fairdrive:
      fontFamily: 'Work Sans',
      fontWeight: 'bold',
      fontSize: '16px',
      letterSpacing: '0',
      // custom
      color: '#f63333',
      textAlign: 'center',
      margin: "0px 0px 0px 0px",
      lineHeight: '14px',
    },
    buttons:{
      display:"flex",
      flexDirection: "row",
    }
  })
);

export default useStyles;
