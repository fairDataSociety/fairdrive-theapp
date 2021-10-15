import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from 'src/contexts/themeContext/themes';

const useStyles = makeStyles(() =>
  createStyles({
    menuElement: {
      height: '60px',
      width: '100%',
      //alignItems: "left",
      textAlign: 'left',
      position: 'static',
      padding: '8px 18px ',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: (style: Theme) => style.textColorSecondary,
      font: (style: Theme) => style.typography.body1,
      '&:hover': {
        font: (style: Theme) => style.typography.body3,
        color: (style: Theme) => style.textColorHoverSelected,
      },
      '&:active': {
        font: (style: Theme) => style.typography.body2,
        color: (style: Theme) => style.textColorHoverSelected,
        backgroundColour: (style: Theme) => style.backgroundLight3,
      },
    },
    menuElementActive: {
      background: (style: Theme) => style.backgroundDark3,
      font: (style: Theme) => style.typography.body2,
      color: (style: Theme) => style.backgroundWhite,
    },
    menuElementDisabled: {
      cursor: 'not-allowed',
    },
    podChevron: {
      float: 'right',
      marginTop: '0.8rem',
    },
  })
);

export default useStyles;
