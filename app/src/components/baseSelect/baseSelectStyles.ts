import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from 'src/contexts/themeContext/themes';

const useStyles = makeStyles(() =>
  createStyles({
    selectWrapper: {
      position: 'relative',
    },
    dropdown: {
      position: 'absolute',
      right: '5rem',
    },
    indicatorIcon: {
      width: 10,
      marginLeft: '1rem',
    },
    button: {
      background: (style: Theme) => style.backgroundDark1,
      color: (style: Theme) => style.textColorPrimary,
      font: (style: Theme) => style.typography.caption1,
      padding: '1.2rem',
      borderRadius: '0.5rem',
      height: '4rem',
      marginLeft: '2rem',
      display: 'flex',
      alignItems: 'center',
    },
  })
);

export default useStyles;
