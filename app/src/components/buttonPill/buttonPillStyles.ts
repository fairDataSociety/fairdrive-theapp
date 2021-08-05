import { makeStyles, createStyles } from '@material-ui/styles';
// import interface for component Props and Theme
import { Theme } from '../../store/themeContext/themes';
import { Props } from './buttonPill';

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      // custom
      minWidth: (style: Props & Theme) =>
        style.size === 'small'
          ? '10rem '
          : style.size === 'medium'
          ? '20rem'
          : '40rem',
      maxWidth: (style: Props & Theme) =>
        style.size === 'small' ? '12rem ' : '55rem',
      textAlign: 'center',
      boxSizing: 'border-box',
      borderRadius: (style: Props & Theme) =>
        style.size === 'small' ? '0' : '1rem',
      padding: '2rem',
      cursor: 'pointer',
      border: (style: Props & Theme) => `1px solid ${style.backgroundDark3}`,
      backgroundColor: (style: Props & Theme) => style.backgroundLight3,
      color: (style: Props & Theme) => style.textColorPrimary,
      font: (style: Props & Theme) => style.typography.body1,
      '&:hover': {
        font: (style: Props & Theme) =>
          style.size === 'small'
            ? style.typography.caption2
            : style.typography.body3,
        border: (style: Props & Theme) => `1px solid ${style.backgroundWhite}`,
      },
      '&:active': {
        font: (style: Props & Theme) =>
          style.size === 'small'
            ? style.typography.caption3
            : style.typography.body2,
        border: (style: Props & Theme) => `1px solid ${style.backgroundWhite}`,
      },
      margin: '0 auto 2rem auto',
    },
  })
);

export default useStyles;
