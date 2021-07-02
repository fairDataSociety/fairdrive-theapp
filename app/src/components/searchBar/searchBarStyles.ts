import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '../../store/themeContext/themes';
import { Props } from './searchBar';

const useStyles = makeStyles(() =>
	createStyles({
		searchBar: {
			marginLeft: '2rem',
			border: (style: Props & Theme) =>  `1px solid ${style.backgroundDark1}`,
			borderRadius: '0.5rem',
		},
		TextField: {
			color: (style: Props & Theme) => style.textColorSecondary,
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			padding: '1rem',
			width: '45rem',
		},
		input: {
			font: (style: Props & Theme) => style.typography.caption1,
			color: (style: Props & Theme) => style.textColorSecondary,
			textAlign: 'left',
			width: '45rem',
			border: '0px',
			backgroundColor: 'transparent',
			outline: 'none',
		},
		iconContainer: {
			width: '2rem',
			height: '2rem',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			marginRight: '1rem',
		},
		Icon: {
			width: '2rem',
			height: '2rem',
		},
	})
);

export default useStyles;
