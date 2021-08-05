import { makeStyles, createStyles } from '@material-ui/styles';

const useStyles = makeStyles(() =>
	createStyles({
		progressItem: {
			fontSize: '16px'
		},
		percentage: {
			marginBottom: '10px'
		}
	})
);

export default useStyles;
