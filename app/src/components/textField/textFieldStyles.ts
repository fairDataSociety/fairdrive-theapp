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
      padding: '2rem',
      border:(style: Props & Theme) => style.disabled?"1px solid var(--dark1)": "1px solid var(--light3)",
      borderRadius:"0.5rem",
      marginBottom:"2.5rem",
      textAlign: 'left',
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
    input: {
      background: (style: Props & Theme) => style.backgroundDark2,
      border: (style: Props & Theme) => `1px solid ${style.backgroundLight3}`,
      padding: "1.5rem",
      width: "100%",
      marginBottom: "2rem",
      borderRadius: '0.5rem'
    },
  })
);

export default useStyles;
