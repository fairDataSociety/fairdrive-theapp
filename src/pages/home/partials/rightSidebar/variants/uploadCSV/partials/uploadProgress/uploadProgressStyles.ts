import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from 'src/contexts/themeContext/themes';

const useStyles = makeStyles(() =>
  createStyles({
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
    progressLine: {
      flex: 1,
    },
  })
);

export default useStyles;
