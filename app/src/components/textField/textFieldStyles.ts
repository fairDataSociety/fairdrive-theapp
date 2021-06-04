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
      backgroundColor: (style: Props & Theme) => style.backgroundDark2,
      paddingBottom: '1rem',
      border: "1px solid var(--light3)",
      borderRadius:"1rem",
      marginBottom:"2.5rem",
      textAlign: 'left',
      padding:"1rem",
      color:"#16181D",
    },
    input: {
      width:"40rem",
      height:"2.5rem",
      color:(style: Props & Theme) => style.textColorPrimary,
      outline: 'none',
      backgroundColor: (style: Props & Theme) => style.backgroundDark2,
    },
  })
);

export default useStyles;
