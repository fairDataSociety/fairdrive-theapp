import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from 'src/contexts/themeContext/themes';

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      backgroundColor: (style: Theme) => style.backgroundDark2,
      border: (style: Theme) => `1px solid ${style.backgroundLight3}`,
      borderRadius: '8px',
      width: '320px',
      height: '280px',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      color: (style: Theme) => style.backgroundLight1,
      font: (style: Theme) => style.typography.h5,
      marginBottom: '8px',
      marginTop: '32px',
    },

    subtitle: {
      color: (style: Theme) => style.backgroundLight2,
    },
  })
);

export default useStyles;
