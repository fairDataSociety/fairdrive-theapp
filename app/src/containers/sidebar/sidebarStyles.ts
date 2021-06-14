import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '../../store/themeContext/themes';
import { Props } from './sidebar';

const useStyles = makeStyles(() =>
	createStyles({
		Sidebar: {
			backgroundColor: (style: Props & Theme) => style.backgroundDark3,
			width: '12rem',
			height: 'calc(100vh - 6rem)',
			position: 'absolute',
			display: 'flex',
			left: 0,
			top: '6rem',
			flexDirection: 'column',
			alignItems: 'center',
		},
		walletConnectButton: {
			padding: '1rem 2rem',
			color: 'black',
			backgroundColor: 'lightgrey',
			margin: 'auto 5rem auto auto',
			borderRadius: '2rem',
		},
	})
);

export default useStyles;
