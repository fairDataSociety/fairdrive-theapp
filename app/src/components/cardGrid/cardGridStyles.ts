import { makeStyles, createStyles } from '@material-ui/styles';

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
