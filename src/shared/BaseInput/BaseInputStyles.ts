import { makeStyles, createStyles } from '@material-ui/styles';

import { Theme } from 'src/contexts/themeContext/themes';

const useStyles = makeStyles(() =>
  createStyles({
    inputGroupWrapper: {
      width: '100%',
    },
    inputWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: '4px',
      height: '40px',
      padding: '0 12px',
      cursor: 'pointer',
      background: (style: Theme) => style.backgroundDark4,
      border: (style: Theme) => `1px solid ${style.backgroundLight3}`,
      '&:hover': {
        background: (style: Theme) => style.backgroundDark1,

        border: (style: Theme) => `1px solid ${style.backgroundLight1}`,
      },
    },
    inputWrapperFocus: {
      background: (style: Theme) => style.backgroundDark2,

      border: (style: Theme) => `1px solid ${style.backgroundLight2}`,
    },
    inputWrapperDisabled: {
      cursor: 'not-allowed',
      background: 'transparent!important',
      color: '#9AA8FF',
      border: (style: Theme) => `1px solid ${style.backgroundDark2}!important`,
      '&:hover': {
        background: 'transparent!important',

        border: (style: Theme) =>
          `1px solid ${style.backgroundDark2}!important`,
      },
    },
    inputSuccess: {
      border: (style: Theme) => `1px solid ${style.green}`,
    },
    inputError: {
      border: (style: Theme) => `1px solid ${style.red}`,
    },
    label: {
      textTransform: 'uppercase',
      fontSize: '10px',
      color: (style: Theme) => style.backgroundLight2,
      fontWeight: 500,
    },
    labelWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px',
    },
    feedbackMessage: {
      textAlign: 'right',
      textTransform: 'uppercase',
      fontSize: '12px',
      background: (style: Theme) => style.backgroundWhite,
      fontWeight: 500,
    },
    input: {
      fontSize: '12px',
      width: 'calc(100% - 30px)',
      color: (style: Theme) => style.backgroundWhite,

      '&:placeholder': {
        color: (style: Theme) => style.backgroundLight1,
      },
      '&:focus': {
        color: (style: Theme) => style.backgroundWhite,
      },

      '&:disabled': {
        cursor: 'not-allowed',
        color: '#9AA8FF',
      },
    },

    inputIcon: {
      width: '16px',
      color: (style: Theme) => style.backgroundLight2,
    },
    icon: {
      width: '100%',
    },
    iconSuccess: {
      color: (style: Theme) => style.green,
    },
    iconFailed: {
      color: (style: Theme) => style.red,
    },
  })
);

export default useStyles;
