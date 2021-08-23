import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from 'src/contexts/themeContext/themes';

const useStyles = makeStyles(() =>
  createStyles({
    App: {
      backgroundColor: (theme: Theme) => theme.backgroundDark,
      height: '100vh',
      fontSize: '2rem',
      overflow: 'hidden',
      color: (theme: Theme) => theme.textColorPrimary,
      display: 'flex',
      flexDirection: 'column',
    },
    routeContainer: {
      width: 'calc(100% - 12rem)',
      height: 'calc(100% - 6rem)',
      position: 'absolute',
      left: '12rem',
      top: '6rem',
    },
  })
);

export default useStyles;
