import { makeStyles, createStyles } from '@material-ui/styles';
// import interface for component Props and Theme
import { Theme } from 'src/contexts/themeContext/themes';

const useStyles = makeStyles(() =>
  createStyles({
    secondLevelNavigation: {
      display: 'flex',
      position: 'relative',
      textAlign: 'left',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '24px',
    },
    left: {
      display: 'flex',
      gap: '20px',
    },
    right: {
      display: 'flex',
      gap: '8px',
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
    disclaimer: {
      marginBottom: '24px',
      color: (style: Theme) => style.textColorSecondary,
      font: (style: Theme) => style.typography.caption2,
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
      width: '32px',
      height: '32px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#B4B0E5',
      backgroundColor: '#5C5685',
      borderRadius: '100%',
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
  })
);

export default useStyles;
