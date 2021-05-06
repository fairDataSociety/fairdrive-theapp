import { makeStyles, createStyles } from "@material-ui/styles";
// import interface for component Props and Theme
import { Theme } from "../../store/themeContext/themes";
import { Props } from "./textField";

const useStyles = makeStyles(() =>
  createStyles({
    TextField: {
      width: "75vw",
      display: "flex",
      flexDirection: "column",
      placeItems: "center center",
      marginBottom: '40px',
      color:"#16181D",
    },
    input: {
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
