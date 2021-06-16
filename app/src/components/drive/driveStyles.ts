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
      margin: "0 0 0 14rem",
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
