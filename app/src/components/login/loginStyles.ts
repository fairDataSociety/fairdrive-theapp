import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from 'src/contexts/themeContext/themes';
import { Props } from './login';

const useStyles = makeStyles(() =>
  createStyles({
    Login: {
      backgroundColor: (style: Props & Theme) => style.backgroundDark,
      display: 'flex',
      flexDirection: 'row',
      justifyItems: 'center',
      alignItems: 'center',
      overflowX: 'hidden',
      overflowY: 'auto',
      textAlign: 'center',
    },
    imageContainer: {
      width: '30%',
      height: '100%',
    },
    image: {
      height: '100%',
      width: '100%',
      objectFit: 'cover',
    },
    loginContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyItems: 'center',
      alignItems: 'center',
      width: '70%',
      margin: 'auto',
      padding: '0 30rem',
    },
    header: {
      padding: '1rem 0 1rem 0',
      font: (style: Props & Theme) => style.typography.caption1,
      marginBottom: '2rem',
    },
    title: {
      margin: '20px',
      fontWeight: 'bold',
      font: (style: Props & Theme) => style.typography.h4,
      color: (style: Props & Theme) => style.textColorPrimary,
      letterSpacing: '0',
      lineHeight: '36px',
      marginBottom: '20px',
      textAlign: 'center',
    },
    errormsg: {},
    buttons: {
      display: 'flex',
      flexDirection: 'row',
    },
    bottomTextField: {
      marginBottom: 0,
    },
    feedbackContainer: {
      height: '6rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    feedbackMessage: {
      font: (style: Theme & Props) => style.typography.caption1,
    },
    error: {
      color: (style: Theme & Props) => style.red,
    },
    spinner: {
      fill: (style: Theme & Props) => style.textColorPrimary,
      stroke: (style: Theme & Props) => style.textColorPrimary,
      width: '2rem',
      margin: 'auto',
    },
  })
);

export default useStyles;
