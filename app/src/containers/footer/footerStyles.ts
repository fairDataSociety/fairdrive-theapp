import zIndex from '@material-ui/core/styles/zIndex';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '../../store/themeContext/themes';
import { Props } from './footer';

const useStyles = makeStyles(() =>
	createStyles({
		footer: {
			backgroundColor: (style: Props & Theme) => style.backgroundDark,
			color: (style: Props & Theme) => style.textColorPrimary,
			font: (style: Props & Theme) => style.typography.h4,
			width: '100%',
			height: '6rem',
			display: 'flex',
			alignItems: 'center',
			flexDirection: 'row',
			position: 'absolute',
			justifyContent: 'space-between',
			left: 0,
			bottom: 0,
            zIndex:5
		},
        text: {
            color: (style: Props & Theme) => style.textColorSecondary,
            font: (style: Props & Theme) => style.typography.caption1,
            display: 'flex',
			alignItems: 'center',
			flexDirection: 'row',
            margin: '0 1rem',
        },
        footerText: {
            margin: '0 1rem'
        },
        links: {
            display: 'flex',
			alignItems: 'center',
			flexDirection: 'row',
            margin: '0 1rem',
        },
        link: {
            height: '3rem',
            margin: '0 1.5rem',
        },
        divider: {
            border: '1px solid var(--dark1)',
            height: '3rem',
            width: '1px',
            margin: '0 0.5rem',
        },
	})
);

export default useStyles;
