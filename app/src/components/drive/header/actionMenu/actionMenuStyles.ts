import { makeStyles, createStyles } from '@material-ui/styles';
// import interface for component Props and Theme
import { Theme } from 'src/contexts/themeContext/themes';

const useStyles = makeStyles(() =>
  createStyles({
    actionWrapper: {
      border: (style: Theme) => `1px solid ${style.backgroundLight3}`,
      padding: '10px 50px 10px 10px',
      width: 'fit-content',
      display: 'flex',
      position: 'relative',
      flexDirection: 'column',
      borderRadius: '1rem',
      gap: '20px',
      marginLeft: '1.6rem',
    },

    actionRow: {
      flexDirection: 'row',
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: '10px',
      textAlign: 'left',
      position: 'static',
      cursor: 'pointer',
      color: (style: Theme) => style.textColorSecondary,
      font: (style: Theme) => style.typography.body2,
    },
    actionButton: {
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
    actionText: {
      float: 'left',
      color: (style: Theme) => style.textColorHoverSelected,
      font: (style: Theme) => style.typography.caption2,
    },
    buttonIcon: {
      float: 'left',
      width: '1.5rem',
      height: '1.5rem',
      marginRight: '0.8rem',
      marginTop: '0.2rem',
    },
    closeIcon: {
      position: 'absolute',
      cursor: 'pointer',
      top: '9%',
      right: '5%',
    },
    disclaimer: {
      margin: '20px 0 20px 0',
      color: (style: Theme) => style.textColorSecondary,
      font: (style: Theme) => style.typography.caption2,
      marginLeft: '1.6rem',
    },
  })
);

export default useStyles;
