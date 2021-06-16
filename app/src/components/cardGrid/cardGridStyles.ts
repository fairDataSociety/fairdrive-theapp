import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '../../store/themeContext/themes';
import { Props } from './cardGrid';

const useStyles = makeStyles(() =>
	createStyles({
		CardGrid: {
			backgroundColor: 'transparent',
			overflowX: 'hidden',
			overflowY: 'auto',
			flexDirection: 'column',
		},

		grid: {
			display: 'flex',
			flexWrap: 'wrap',
		},
	})
);

export default useStyles;
