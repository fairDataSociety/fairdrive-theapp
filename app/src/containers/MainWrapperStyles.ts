import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '../store/themeContext/themes';

const useStyles = makeStyles(() =>
	createStyles({
		App: {
			backgroundColor: (theme: Theme) => theme.backgroundDark,
			height: '100vh',
			color: 'white',
			fontSize: '2rem',
			overflow: 'hidden',
		},
		routeContainer: {
			width: 'calc(100% - 12rem)',
			height: 'calc(100% - 6rem)',
			position: 'absolute',
			left: '12rem',
			top: '6rem',
		},
	})
);

export default useStyles;
