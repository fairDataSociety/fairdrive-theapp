import { makeStyles, createStyles } from '@material-ui/styles';
// import interface for component Props and Theme
import { Theme } from 'src/contexts/themeContext/themes';

const useStyles = makeStyles(() =>
  createStyles({
    Login: {
      backgroundColor: (style: Theme) => style.backgroundDark,
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
    registerContainer: {
      padding: '0 30rem',
      width: '70%',
      display: 'flex',
      flexDirection: 'column',
      justifyItems: 'center',
      alignItems: 'center',
      overflowX: 'hidden',
      overflowY: 'auto',
    },
    title: {
      fontWeight: 'bold',
      font: (style: Theme) => style.typography.h4,
      color: (style: Theme) => style.textColorPrimary,
      textAlign: 'center',
    },
    description: {
      font: (style: Theme) => style.typography.body1,
      color: (style: Theme) => style.textColorPrimary,
      marginBottom: '10rem',
    },
    errormsg: {
      // from bodyBold in Fairdrive:
      color: (style: Theme) => style.red,
    },
    buttons: {
      display: 'flex',
      flexDirection: 'row',
    },
  })
);

export default useStyles;
