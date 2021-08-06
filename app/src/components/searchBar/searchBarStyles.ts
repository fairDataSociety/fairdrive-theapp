import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '../../store/themeContext/themes';
const useStyles = makeStyles(() =>
  createStyles({
    searchBar: {
      marginLeft: '2rem',
      border: (style: Theme) => `1px solid ${style.backgroundDark1}`,
      borderRadius: '0.5rem',
    },
    TextField: {
      color: (style: Theme) => style.textColorSecondary,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: '1rem',
      width: '45rem',
    },
    input: {
      font: (style: Theme) => style.typography.caption1,
      color: (style: Theme) => style.textColorSecondary,
      textAlign: 'left',
      width: '45rem',
      border: '0px',
      backgroundColor: 'transparent',
      outline: 'none',
    },
    iconContainer: {
      width: '2rem',
      height: '2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '1rem',
    },
    Icon: {
      width: '2rem',
      height: '2rem',
    },
  })
);

export default useStyles;
