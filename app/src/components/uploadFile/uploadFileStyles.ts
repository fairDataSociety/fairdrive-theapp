import { makeStyles, createStyles } from "@material-ui/styles";
// import interface for component Props and Theme
import { Theme } from "../../store/themeContext/themes";
import { Props } from "./uploadFile";

const useStyles = makeStyles(() =>
  createStyles({
    flexer: {
      margin: "40px",
    },
    dialogBox: {
      backgroundColor: (style: Props & Theme) => style.backgroundDark3,
      width: "500px",
      height: "500px",
      display: "flex",
      flexDirection: "column",
      justifyItems: "center",
      alignItems: "center",
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
    dialogText: {
      // from bodyDefault in Fairdrive:
      fontFamily: 'Work Sans',
      fontWeight: 'normal', //TODO can this be thinner???
      fontSize: '20px',
      letterSpacing: '0',
      lineHeight: '19px',
      // custom
      width: "205px",
      textAlign: 'left',
      paddingBottom: '5px',
      border: "0px",
      borderBottom: "1px solid #16181D",
      backgroundColor: "transparent",
      color:"#16181D",
      outline: 'none',
    },
  })
);

export default useStyles;
