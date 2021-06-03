import { makeStyles, createStyles } from "@material-ui/styles";
// import interface for component Props and Theme
import { Theme } from "../../store/themeContext/themes";
import { Props } from "./login";

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
    header:{
      padding:"1rem 0 1rem 0",
      font: (style: Props & Theme) => style.typography.body1,
      marginBottom:"2rem"
    },
    flexer: {
      margin: "3rem",
    },
    title: {
      margin: "20px",
      fontWeight: 'bold',
      font: (style: Props & Theme) => style.typography.h3,
      color:(style: Props & Theme) => style.textColorPrimary,
      letterSpacing: '0',
      lineHeight: '36px',
      marginBottom: '20px',
      textAlign: 'center',
    },
    errormsg: {
    },
    buttons:{
      display:"flex",
      flexDirection: "row",
    }
  })
);

export default useStyles;
