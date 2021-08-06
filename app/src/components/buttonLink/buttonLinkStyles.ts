import { makeStyles, createStyles } from '@material-ui/styles';
// import interface for component Props and Theme
import { Theme } from '../../store/themeContext/themes';
import { Props } from './buttonLink';

const useStyles = makeStyles(() =>
  createStyles({
    ButtonLink: {
      // we merge Props & Theme interfaces and call this merged object "style".
      //component props and ui theme properties are available on the style object (yay auto-complete!!).
      fontSize: '16px',
      letterSpacing: '0',
      lineHeight: '19px',
      // custom
      minWidth: '40rem',
      maxWidth: '55rem',
      textAlign: 'center',
      boxSizing: 'border-box',
      padding: '2rem',
      borderRadius: '4px',
      cursor: 'pointer',
      border: (style: Props & Theme) => `1px solid ${style.backgroundDark3}`,
      backgroundColor: (style: Props & Theme) => style.backgroundLight3,
      color: (style: Props & Theme) => style.textColorPrimary,
      font: (style: Props & Theme) => style.typography.body1,
      '&:hover': {
        font: (style: Props & Theme) => style.typography.body3,
      },
      '&:active': {
        font: (style: Props & Theme) => style.typography.body2,
        border: (style: Props & Theme) => `1px solid ${style.backgroundWhite}`,
      },
      textTransform: 'capitalize',
    },
  })
);

export default useStyles;
