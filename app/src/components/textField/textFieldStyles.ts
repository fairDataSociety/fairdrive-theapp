import { makeStyles, createStyles } from "@material-ui/styles";
// import interface for component Props and Theme
import { Theme } from "../../store/themeContext/themes";
import { Props } from "./textField";

const useStyles = makeStyles(() =>
  createStyles({
    TextField: {
      width:"40rem",
      height:"4rem",
      display: "flex",
      flexDirection: "column",
      placeItems: "center",
      backgroundColor: (style: Props & Theme) => style.disabled?style.backgroundDark1: style.backgroundDark2,
      paddingBottom: '1rem',
      border:(style: Props & Theme) => style.disabled?"1px solid var(--dark1)": "1px solid var(--light3)",
      borderRadius:"1rem",
      marginBottom:"2.5rem",
      textAlign: 'left',
      padding:"1rem",
      font: (style: Props & Theme) => style.typography.body2,
      color:(style: Props & Theme) => style.textColorPrimary,
      "&:hover": {
        border:(style: Props & Theme) => style.disabled?"1px solid var(--dark1)": "1px solid var(--white)", 
        color:"var(--white)",
      },
      "&:focus":{
        color:"var(--white)",
        border: "1px solid var(--light2)", 
      },
      "&:invalid":{
        color:"var(--white)",
        border: "1px solid var(--red)", 
      }
    },
    
  })
);

export default useStyles;
