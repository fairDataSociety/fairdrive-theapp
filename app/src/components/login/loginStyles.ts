import { makeStyles, createStyles } from "@material-ui/styles";
// import interface for component Props and Theme
import { Theme } from "../../store/themeContext/themes";
import { Props } from "./login";

const useStyles = makeStyles(() =>
  createStyles({
    Login: {
      backgroundColor: (style: Props & Theme) => style.backgroundWhite,
      paddingTop:"10rem",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyItems: "center",
      alignItems: "center",
      overflowX: "hidden",
      overflowY: "auto",
    },
    header:{
      padding:"1rem 0 1rem 0",
      font: (style: Props & Theme) => style.typography.p1,
      marginBottom:"2rem"
    },
    flexer: {
      margin: "3rem",
    },
    title: {
      margin: "20px",
      fontWeight: 'bold',
      font: (style: Props & Theme) => style.typography.h1,
      letterSpacing: '0',
      lineHeight: '36px',
      marginBottom: '20px',
      color: '#16181D',
      textAlign: 'center',
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
