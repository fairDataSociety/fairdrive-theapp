import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from 'src/contexts/themeContext/themes';

const useStyles = makeStyles(() =>
  createStyles({
    progressItem: {
      fontSize: '16px',
      marginBottom: '15px',
    },
    percentage: {
      marginBottom: '0.5rem',
      textAlign: 'left',
      fontSize: '1.5rem',
      color: (theme: Theme) => theme.backgroundWhite,
    },
    progressRoot: {
      height: '13px !important',
      overflow: 'hidden',
      position: 'relative',
      borderRadius: '5px',
      border: (theme: Theme) =>
        `1px solid ${theme.backgroundLight3} !important`,
      background: (theme: Theme) => `${theme.backgroundDark3} !important`,
    },
    progressBar: {
      top: '1px !important',
      height: '9px !important',
      background: (theme: Theme) => `${theme.backgroundDark1} !important`,
    },
    progressContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    progressLine: {
      flex: 1,
    },
    actionContainer: {
      width: '1.8rem',
      marginLeft: '4rem',
      '&:disabled': {
        cursor: 'not-allowed',
      },
    },
    cancelIcon: {
      color: (theme: Theme) => theme.backgroundLight2,
    },
    successIcon: {
      color: (theme: Theme) => theme.green,
    },
  })
);

export default useStyles;
