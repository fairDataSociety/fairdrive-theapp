import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "../../store/themeContext/themes";
import { Props } from "./toggle";

const useStyles = makeStyles(() =>
  createStyles({
    toggleContainer: {
        display:"flex",
        overflow: 'auto',
        position: "relative",
        top: (style: Props & Theme) => style.show ? "0": "-10rem",
        height: (style: Props & Theme) => style.show ? "auto": "0",
        transitionProperty: "height, top",
        transitionDuration: ".2s",
        transitionTimingFunction: "cubic-bezier(0.820, 0.085, 0.395, 0.895)",
        marginBottom: "1rem",
    },
    switch: {
      margin: "3rem",
      //opacity: (style: Props & Theme) => style.show ? 1: 0,
    
    },
    left: {
        minWidth: (style: Props & Theme) => "20rem",
        maxWidth:  (style: Props & Theme) =>  "55rem",
        textAlign: 'center',
        boxSizing: 'border-box',
        borderRadius: (style: Props & Theme) =>  "0.5rem 0rem 0rem 0.5rem",
        padding:"1.5rem",
        cursor: 'pointer',
        border:(style: Props & Theme) => style.isLeft ?  "1px solid var(--white)": "1px solid var(--light3)" ,
        backgroundColor: (style: Props & Theme) => style.isLeft ?  style.backgroundLight3 :style.backgroundDark1,
        color:(style: Props & Theme) => style.textColorPrimary,
        font: (style: Props & Theme) => style.typography.body2,
        "&:hover": {
          //font: (style: Props & Theme) => style.typography.body3,
          border: "1px solid var(--white)", 
        },
        margin:"0 auto 2rem auto",
        transitionProperty: "border, backgroundColor",
        transitionDuration: ".2s",
        transitionTimingFunction: "ease-out",
    },
    right: {
        minWidth: (style: Props & Theme) => "20rem",
        maxWidth:  (style: Props & Theme) =>  "55rem",
        textAlign: 'center',
        boxSizing: 'border-box',
        borderRadius: (style: Props & Theme) =>  "0rem 0.5rem 0.5rem 0rem",
        padding:"1.5rem",
        cursor: 'pointer',
        border:(style: Props & Theme) => style.isLeft ?  "1px solid var(--light3)" :  "1px solid var(--white)", 
        backgroundColor: (style: Props & Theme) => style.isLeft ?  style.backgroundDark1  :style.backgroundLight3,
        color:(style: Props & Theme) => style.textColorPrimary,
        font: (style: Props & Theme) => style.typography.body2,
        "&:hover": {
          //font: (style: Props & Theme) => style.typography.body3,
          border: "1px solid var(--white)", 
        },
        margin:"0 auto 2rem auto",
        transitionProperty: "border, backgroundColor",
        transitionDuration: ".2s",
        transitionTimingFunction: "ease-out",
    }
  })
);

export default useStyles;
