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
      display:"flex",
      flexDirection:"column",
      margin: "7rem 0 0 2rem",
      marginLeft: (props: Props & Theme) => props.isPodBarOpen? "50rem": "17rem",
	  transitionProperty: "margin-left",
      transitionDuration: ".2s",
      transitionTimingFunction: "cubic-bezier(0.820, 0.085, 0.395, 0.895)",
    },
    buttonNavBar: {
			margin: '0 auto 0 0',
			height: '8rem',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'flex-start',
		},
		cardGrid: {
			width: '100%',
			height: '100%',
		},
		uploadInput: {
			opacity: '0',
			width: '0',
			height: '0',
		},
		Icon: {
			width: '5rem',
			height: '5rem',
			margin: '0.5rem',
		},
		modalContainer: {
			marginLeft: 'calc(100% - 45rem)',
			overflowX: 'hidden',
			overflowY: 'auto',
		},
  })
);

export default useStyles;
