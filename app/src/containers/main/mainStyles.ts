import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '../../store/themeContext/themes';
import { Props } from './main';
const useStyles = makeStyles(() =>
	createStyles({
		Main: {

		},

		loginRegisterButtons: {
			padding: '23rem 0 30rem 0',
			backgroundColor: (style: Props & Theme) => style.backgroundDark,
			width: 'auto',
			display: 'flex',
			alignItems: 'center',
			flexDirection: 'column',
			overflowX: 'hidden',
			overflowY: 'auto',
		},
		App: {
			backgroundColor: (style: Props & Theme) => style.backgroundDark,
		},
	})
);

export default useStyles;
