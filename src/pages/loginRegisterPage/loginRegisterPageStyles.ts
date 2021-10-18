import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from 'src/contexts/themeContext/themes';

const useStyles = makeStyles(() =>
  createStyles({
    Main: {
      display: 'flex',
    },

    loginRegisterButtons: {
      padding: '23rem 0 30rem 0',
      backgroundColor: (style: Theme) => style.backgroundDark,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      overflowX: 'hidden',
      overflowY: 'auto',
    },
    App: {
      backgroundColor: (style: Theme) => style.backgroundDark,
    },
  })
);

export default useStyles;
