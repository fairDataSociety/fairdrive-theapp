import { makeStyles, createStyles } from '@material-ui/styles';
// import interface for component Props and Theme
import { Theme } from 'src/contexts/themeContext/themes';

const useStyles = makeStyles(() =>
  createStyles({
    midWrapper: {
      padding: '2rem 2rem 0rem 0rem',
      margin: '20px 0 20px 0',
      display: 'flex',
      position: 'relative',
      textAlign: 'left',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    titleWrapper: {
      display: 'flex',
      alignItems: 'center',
      gap: '7px',
    },
    midHeader: {
      font: (style: Theme) => style.typography.h5,
      color: (style: Theme) => style.textColorHoverSelected,
      //margin: "2rem 1.5rem 2rem 0rem",
      float: 'left',
      margin: '0',
    },
    divider: {
      borderBottom: (style: Theme) => `2.5px solid ${style.backgroundWhite}`,
      width: '13rem',
    },
    infoWrapper: {
      flexDirection: 'row',
      display: 'flex',
      gap: '5px',
      alignItems: 'center',
    },
    infoIcon: {
      width: '2rem',
      height: '2rem',
      margin: '0',
      float: 'left',
    },
    shareIcon: {
      width: '4rem',
      height: '4rem',
      // margin: "1rem 0 1rem 1rem",
      float: 'left',
    },
    information: {
      overflow: 'hidden',
      float: 'left',
      color: (style: Theme) => style.textColorSecondary,
      font: (style: Theme) => style.typography.caption1,
      margin: '0',
      paddingRight: '1rem',
      transitionProperty: 'height',
      transitionDuration: '.2s',
      transitionTimingFunction: 'ease-out',
    },
    flex: {
      display: 'flex',
      gap: '20px',
      cursor: 'pointer',
    },
    actionButtons: {
      display: 'flex',
      gap: '0px',
    },
    iconContainer: {
      float: 'left',
      width: '5rem',
      height: '5rem',
      marginRight: '1rem',
      margin: '1rem',
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      position: 'relative',
      color: (style: Theme) => style.backgroundLight3,
      background: (style: Theme) => style.backgroundDark4,
      border: (style: Theme) => `1px solid ${style.backgroundLight3}`,
      borderRadius: '1rem',
      '&:hover': {
        color: (style: Theme) => style.backgroundLight2,
        border: (style: Theme) => `2px solid ${style.backgroundLight2}`,
        '& svg': {
          fill: (style: Theme) => style.backgroundLight2,
        },
      },
      '&:active': {
        border: (style: Theme) => `2px solid ${style.backgroundWhite}`,
        color: (style: Theme) => style.textColorPrimary,
        '& svg': {
          fill: (style: Theme) => style.textColorPrimary,
        },
      },
    },
    buttonWithIcon: {
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      marginRight: '1rem',
      minWidth: '8rem',
      maxWidth: '25rem',
      overflow: 'auto',
      textAlign: 'center',
      boxSizing: 'border-box',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      border: (style: Theme) => `1px solid ${style.backgroundLight3}`,
      padding: '1.2rem 1.5rem 1.2rem 1.5rem',
      backgroundColor: (style: Theme) => style.backgroundDark3,
      color: (style: Theme) => style.textColorPrimary,
      font: (style: Theme) => style.typography.caption2,
      '&:hover': {
        //font: (style:  Theme) => style.typography.body3,
        border: (style: Theme) => `1px solid ${style.backgroundWhite}`,
      },
      '&:active': {
        font: (style: Theme) => style.typography.caption1,
        border: (style: Theme) => `1px solid ${style.backgroundWhite}`,
      },
      float: 'left',
    },
    Icon: {
      width: '2rem',
      height: '2rem',
    },
  })
);

export default useStyles;
