import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "../../store/themeContext/themes";
import { Props } from "./podSidebar";

const useStyles = makeStyles(() =>
  createStyles({
    podDrawer: {
      // we merge Props & Theme interfaces and call this merged object "style".
      //component props and ui theme properties are available on the style object (yay auto-complete!!).
      backgroundColor: (style: Props & Theme) => style.backgroundDark4,
      height: "100vh",
      display:"flex",
      alignItems:"left",
      overflow: 'hidden',
      position: "relative",
      flexDirection: "column",
      padding:"1rem",
      font: (style: Props & Theme) => style.typography.caption1,
      width: (props: Props & Theme) =>"30rem",
      left: (props: Props & Theme) => props.isOpen? "0": "-30rem",
      zIndex: 1,
      transitionProperty: "left",
      transitionDuration: ".2s",
      transitionTimingFunction: "cubic-bezier(0.820, 0.085, 0.395, 0.895)",
    },
    rowButtons:{
      display:"flex",
      alignItems:"center",
      flexDirection: "row",
    },
    divider: {
      borderBottom: "2.5px  solid var(--dark1)",
      margin: "0 2.5rem 0 2.5rem",
    },
  
    podButton: {
      minWidth: (style: Props & Theme) =>"20rem",
      maxWidth:  (style: Props & Theme) => "55rem",
      overflow: 'auto',
      textAlign: 'center',
      boxSizing: 'border-box',
      borderRadius: (style: Props & Theme) => "0.5rem",
      cursor: 'pointer',
      border:"1px solid var(--light3)", 
      padding:"1.5rem",
      backgroundColor: (style: Props & Theme) => style.backgroundDark2,
      color:(style: Props & Theme) => style.textColorPrimary,
      font: (style: Props & Theme) => style.typography.body2,
      "&:hover": {
        //font: (style: Props & Theme) => style.typography.body3,
        border: "1px solid var(--white)", 
      },
      "&:active": {
        font: (style: Props & Theme) =>  style.typography.body2,
        border: "1px solid var(--white)", 
      },
      margin:"2rem auto 1rem 3rem",
      opacity: (props: Props & Theme) => props.route === "Overview" ? 0: 1,
      display: (props: Props & Theme) => props.route === "Overview" ? "none": "block",
      transitionProperty: "display, opacity",
      transitionDuration: ".2s",
      transitionTimingFunction: "cubic-bezier(0.820, 0.085, 0.395, 0.895)",
    },
    podInfoWrapper: {
      flexDirection: "row",
    },
    podInfo: {
      marginLeft:"1rem",
      marginTop: (props: Props & Theme) => props.route === "Overview" ? "5rem":  props.route !== "Explore" ?'2.5rem': '2.5rem',
      transitionProperty: "margin-top",
      transitionDuration: ".2s",
      transitionTimingFunction: "cubic-bezier(0.820, 0.085, 0.395, 0.895)",
    },
    information:{
      overflow:"hidden",
      float:"right",
      width:'22rem',
      height: (props: Props & Theme) => props.route === "Overview"? "11rem":  props.route !== "Explore" ? '5rem': '2.5rem',
      color:(style: Props & Theme) => style.textColorSecondary,
      font: (style: Props & Theme) => style.typography.caption1,
      margin: "2rem 2rem 1rem 0.1rem",
      paddingRight: "2rem",
      transitionProperty: "height",
      transitionDuration: ".2s",
      transitionTimingFunction: "ease-out",

    },
    pods:{
      padding:"1rem",
      overflow:"scroll",
      height:"32rem"
    },
    // PODROW STYLES
    podRow:{
      height: "8rem",
      width: "100%",
      //alignItems: "left",
      textAlign: 'left',
      position: 'static',
      padding:"3rem 0rem 1rem 0",
      cursor: 'pointer',
      //border:"1px solid var(--dark3)", 
      //backgroundColor: (style: Props & Theme) => style.backgroundLight3,
      color:(style: Props & Theme) => style.textColorSecondary,
      font: (style: Props & Theme) => style.typography.body1,
      "&:hover": {
        font: (style: Props & Theme) => style.typography.body3,
        color:(style: Props & Theme) => style.textColorHoverSelected,
      },
      "&:active": {
        font: (style: Props & Theme) => style.typography.body2,
        color:(style: Props & Theme) => style.textColorHoverSelected,
        backgroundColour:(style: Props & Theme) => style.backgroundLight3,
      },
    },
    podChevron: {
      float:"right",
      marginTop:"0.8rem",
    },
    modalContainer: {
			left: 'calc(100% - 65rem)',
			top: 'calc(100% - 65rem)',
			overflowX: 'hidden',
			overflowY: 'auto',
		},
  })
);

export default useStyles;
