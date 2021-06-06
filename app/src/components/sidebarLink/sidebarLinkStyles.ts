import { makeStyles, createStyles } from "@material-ui/styles";
// import interface for component Props and Theme
import { Theme } from "../../store/themeContext/themes";
import { Props } from "./sidebarLink";

const useStyles = makeStyles(() =>
  createStyles({
    SidebarLink: {
      // we merge Props & Theme interfaces and call this merged object "style".
      //component props and ui theme properties are available on the style object (yay auto-complete!!).
      // backgroundColor: (style: Props & Theme) => style.backgroundDark,

      paddingTop:"2rem",
      display: "flex",
      alignItems:"center",
      flexDirection:"column",
      paddingBottom:"2rem",
      font: (style: Props & Theme) => style.typography.h6,
      color:(style: Props & Theme) => style.textColorSecondary,
      "&:hover": {
        font: (style: Props & Theme) => style.typography.h5,
        color:(style: Props & Theme) => style.textColorPrimary,
        '& svg': {
          fill:(style: Props & Theme) => style.textColorPrimary
        }
      },
      "&:active": {
        font: (style: Props & Theme) => style.typography.h5,
        color:(style: Props & Theme) => style.textColorPrimary,
        '& svg': {
          fill:(style: Props & Theme) => style.textColorPrimary
        }
      },
    },

    Icon: {
      width: "4rem",
      height: "4rem",
      margin: "auto auto 0.5rem auto",
      fill:(style: Props & Theme) => style.textColorSecondary,
      
    },
  })
);

export default useStyles;
