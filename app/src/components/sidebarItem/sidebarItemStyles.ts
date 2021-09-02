import { makeStyles, createStyles } from '@material-ui/styles';
// import interface for component Props and Theme
import { Theme } from 'src/contexts/themeContext/themes';
import { Props } from './sidebarItem';

const useStyles = makeStyles(() =>
  createStyles({
    SidebarItem: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'relative',
      cursor: 'pointer',
      width: '100%',
      height: '82px',
      transition: '0.1s all',
      font: (style: Props & Theme) => style.typography.body1,
      color: (style: Props & Theme) => style.textColorSecondary,
      '&:hover': {
        font: (style: Props & Theme) => style.typography.body3,
        color: (style: Props & Theme) => style.textColorPrimary,
        backgroundColor: (style: Props & Theme) => style.backgroundDark2,
        '&::after': {
          content: '""',
          display: 'block',
          position: 'absolute',
          right: '0',
          width: '4px',
          height: '100%',
          background: (style: Props & Theme) => style.backgroundWhite,
        },
        '& svg': {
          fill: (style: Props & Theme) => style.textColorPrimary,
        },
      },
    },
    active: {
      font: (style: Props & Theme) => style.typography.body2,
      color: (style: Props & Theme) => style.textColorPrimary,
      backgroundColor: (style: Props & Theme) => style.backgroundDark2,
      '& svg': {
        fill: (style: Props & Theme) => style.textColorPrimary,
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        right: '0',
        width: '4px',
        height: '100%',
        background: (style: Props & Theme) => style.backgroundLight2,
      },
    },
    disabled: {
      cursor: 'not-allowed',
      color: (style: Props & Theme) => style.backgroundLight2,
      backgroundColor: (style: Props & Theme) => style.backgroundDark3,
      '& svg': {
        fill: (style: Props & Theme) => style.backgroundLight2,
      },
      '&:hover': {
        color: (style: Props & Theme) => style.backgroundLight2,
        backgroundColor: (style: Props & Theme) => style.backgroundDark3,
        '&::after': {
          content: '""',
          display: 'none',
        },
      },
    },
    Icon: {
      width: '24px',
      height: '24px',
      marginBottom: '12px',
      fill: (style: Props & Theme) => style.textColorSecondary,
    },
  })
);

export default useStyles;
