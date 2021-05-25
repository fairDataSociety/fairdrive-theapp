import { makeStyles, createStyles } from "@material-ui/styles";
// import interface for component Props and Theme
import { Theme } from "../../store/themeContext/themes";
import { Props } from "./seedPhraseConfirm";

const useStyles = makeStyles(() =>
  createStyles({
    Login: {
      backgroundColor: (style: Props & Theme) => style.backgroundDark,
      color:(style: Props & Theme) => style.textColorMain,
      paddingTop:"10rem",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyItems: "center",
      alignItems: "center",
      overflowX: "hidden",
      overflowY: "auto",
    },
    flexer: {
      margin: "40px",
    },
    title: {
      margin: "20px",
      fontFamily: 'Work Sans',
      fontWeight: 'bold',
      fontSize: '34px',
      letterSpacing: '0',
      lineHeight: '36px',
      marginBottom: '20px',
      color: '#16181D',
      textAlign: 'center',
    },
    description: {
      // position: 'static',
      // width: '640px',
      // height: '40px',
      // left: '0px',
      // top: '56px',
      
      fontFamily: 'Tomorrow',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '16px',
      lineHeight: '20px',

      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
      letterSpacing: '0.0168em',
      // fontFeatureSettings: 'tnum' on, 'lnum' on,

      color: '#16181D',

      flex: 'none',
      flexGrow: 0,
      margin: '16px 0px',
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
