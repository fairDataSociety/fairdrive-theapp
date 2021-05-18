import { makeStyles, createStyles } from "@material-ui/styles";
// import interface for component Props and Theme
import { Theme } from "../../store/themeContext/themes";
import { Props } from "./textField";

const useStyles = makeStyles(() =>
  createStyles({
    TextField: {
      display: "flex",
      background: ' #EEF0FF',
      flexDirection: "column",
      placeItems: "center",
      margin: '4rem 0 0 0',
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
      width:"40rem",
      height:"5rem",
      textAlign: 'left',
      paddingBottom: '1rem',
      border: "1px solid var(--black)",
      backgroundColor: "transparent",
      borderRadius:"1rem",
      padding:"1rem",
      color:"#16181D",
      outline: 'none',
      background:"transparent",
    },
  })
);

export default useStyles;
