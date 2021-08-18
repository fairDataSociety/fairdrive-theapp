import { makeStyles, createStyles } from '@material-ui/styles';
// import interface for component Props and Theme
import { Theme } from 'src/contexts/themeContext/themes';
import { Props } from './sidebarItem';

const useStyles = makeStyles(() =>
  createStyles({
    SidebarItem: {
      // we merge Props & Theme interfaces and call this merged object "style".
      //component props and ui theme properties are available on the style object (yay auto-complete!!).
      // backgroundColor: (style: Props & Theme) => style.backgroundDark,

      paddingTop: '2rem',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      paddingBottom: '2rem',
      font: (style: Props & Theme) => style.typography.body1,
      color: (style: Props & Theme) => style.textColorSecondary,
      '&:hover': {
        font: (style: Props & Theme) => style.typography.body3,
        color: (style: Props & Theme) => style.textColorPrimary,
        '& svg': {
          fill: (style: Props & Theme) => style.textColorPrimary,
        },
      },
      '&:active': {
        font: (style: Props & Theme) => style.typography.body2,
        color: (style: Props & Theme) => style.textColorPrimary,
        '& svg': {
          fill: (style: Props & Theme) => style.textColorPrimary,
        },
      },
    },
    activeSidebarItem: {
      color: 'teal',
    },
    Icon: {
      width: '4rem',
      height: '4rem',
      margin: 'auto auto 0.5rem auto',
      fill: (style: Props & Theme) => style.textColorSecondary,
    },
  })
);

export default useStyles;
