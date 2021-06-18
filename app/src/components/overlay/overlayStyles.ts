import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "../../store/themeContext/themes";
import { Props } from "./overlay"

const useStyles = makeStyles(() =>
	createStyles({
		Overlay: {
			position: 'fixed',
			top: 0,
			left: 0,
			width: '100vw',
			height: '100vh',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: 'rgba(73,75,80,0.51)',
			zIndex: 6
		}
	})
);

export default useStyles;
