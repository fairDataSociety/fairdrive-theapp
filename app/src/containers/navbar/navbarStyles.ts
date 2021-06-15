import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '../../store/themeContext/themes';
import { Props } from './navbar';

const useStyles = makeStyles(() =>
	createStyles({
		Navbar: {
			backgroundColor: (style: Props & Theme) => style.backgroundDark3,
			color: (style: Props & Theme) => style.textColorPrimary,
			font: (style: Props & Theme) => style.typography.h4,
			paddingLeft: '1.5rem',
			width: '100%',
			height: '6rem',
			display: 'flex',
			alignItems: 'center',
			flexDirection: 'row',
			position: 'absolute',
			left: 0,
			top: 0,
		},
		walletConnectButton: {
			padding: '1rem 2rem',
			color: 'black',
			backgroundColor: 'lightgrey',
			margin: 'auto 5rem auto auto',
			borderRadius: '2rem',
		},
		logo: {
			margin: '1rem',
		},
	})
);

export default useStyles;
