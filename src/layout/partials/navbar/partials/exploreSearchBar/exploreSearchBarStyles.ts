import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from 'src/contexts/themeContext/themes';
const useStyles = makeStyles(() =>
  createStyles({
    searchBar: {
      border: (style: Theme) => `1px solid ${style.backgroundDark1}`,
      background: (style: Theme) => style.backgroundDark4,
      width: '512px',
      height: '44px',
      padding: '12px 16px 12px 12px',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      transition: '0.1s all',
    },
    input: {
      font: '12px',
      fontWeight: 400,
      color: (style: Theme) => style.backgroundLight2,
      textAlign: 'left',
      paddingRight: '16px',
      paddingLeft: '16px',

      width: '100%',
      border: '0px',
      backgroundColor: 'transparent',
      outline: 'none',

      '&:disabled': {
        cursor: 'not-allowed',
      },
    },
    iconContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    SearchIcon: {
      width: '20px',
      height: '20px',
      fill: (style: Theme) => style.backgroundLight3,
    },
    Icon: {
      width: '16px',
      height: '16px',
      fill: (style: Theme) => style.backgroundLight3,
    },
    closeIcon: {
      cursor: 'pointer',
    },
    focused: {
      '& svg': {
        fill: (style: Theme) => `${style.backgroundLight2} !important`,
      },
      '& input': {
        caretColor: (style: Theme) => `${style.backgroundLight2} !important`,
      },
    },
    filled: {
      border: '1px solid #9AA8FF !important',

      '& svg': {
        fill: (style: Theme) => `${style.backgroundWhite} !important`,
      },
      '& input': {
        color: (style: Theme) => `${style.backgroundWhite} !important`,
        fontWeight: 600,
      },
    },
    disabled: {
      border: (style: Theme) =>
        `1px solid ${style.backgroundLight3} !important`,
      background: (style: Theme) => style.backgroundDark2,
      cursor: 'not-allowed',

      '& input': {
        color: (style: Theme) => style.backgroundLight3,
      },

      '& svg': {
        color: (style: Theme) => style.backgroundLight3,
      },
    },
  })
);

export default useStyles;
