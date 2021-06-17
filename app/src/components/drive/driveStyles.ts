import { makeStyles, createStyles } from "@material-ui/styles";
// import interface for component Props and Theme
import { Theme } from "../../store/themeContext/themes";
import { Props } from "./drive";

const useStyles = makeStyles(() =>
  createStyles({
    BoilerPlate: {
      // we merge Props & Theme interfaces and call this merged object "style".
      //component props and ui theme properties are available on the style object (yay auto-complete!!).
      backgroundColor: (style: Props & Theme) => style.backgroundDark,
      position: "absolute",
      display: "flex",
      flexDirection: "column",
      margin: "0 0 0 2rem",
      marginLeft: (props: Props & Theme) =>
        props.isPodBarOpen ? "50rem" : "17rem",
      transitionProperty: "margin-left",
      transitionDuration: ".2s",
      transitionTimingFunction: "cubic-bezier(0.820, 0.085, 0.395, 0.895)",
    },
	headerWrapper: {
		padding: '2rem 2rem 2rem 0rem',
		width: "100%",
		flexDirection: "row",
		//marginBottom: "2rem",
		height:"10rem",
		display:"flex",
		position:'relative',
		marginBottom: "4rem",
		textAlign: 'left',
	},
	header: {
		font: (style: Props & Theme) => style.typography.h6,
		color: (style: Props & Theme) => style.textColorHoverSelected,
		//margin: "2rem 1.5rem 2rem 0rem",
		float: 'left',
		width: "90%",
		margin: "2.5rem 1.5rem 1.5rem 0rem",
	},
	headerButton: {
		float:'left',
		width: "8rem",
		height: "5rem",
		boxSizing: 'border-box',
		flexDirection: "row",
		display:"flex",
		backgroundColor: (style: Props & Theme) => style.backgroundDark4,
		borderRadius: (style: Props & Theme) => "0.5rem",
		cursor: 'pointer',
		border:"1px solid var(--light3)", 
		margin:"1.6rem",
		padding:"1.5rem",
		"&:hover": {
			//font: (style: Props & Theme) => style.typography.body3,
			border: "1px solid var(--white)", 
		
		  }, 
	},
	folder: {
		float:'left',
		width: '2rem',
		height: "2rem",
		marginRight: "0.5rem",
	},
	chev: {
		float:'right',
		width: '1rem',
		height: "1rem",
		marginLeft: "1.5rem",
		marginTop: "0.5rem",
		transform: "rotate(90deg)"
	},
    buttonNavBar: {
      margin: "0 auto 0 0",
      height: "8rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    cardGrid: {
      width: "100%",
      height: "100%",
    },
    uploadInput: {
      opacity: "0",
      width: "0",
      height: "0",
    },
    Icon: {
      width: "5rem",
      height: "5rem",
      margin: "0.5rem",
    },
    modalContainer: {
      marginLeft: "calc(100% - 45rem)",
      overflowX: "hidden",
      overflowY: "auto",
    },
  })
);

export default useStyles;
