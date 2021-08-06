import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '../../store/themeContext/themes';

const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      backgroundColor: (style: Theme) => style.backgroundDark1,
      borderRadius: '1rem',
      width: '20rem',
      padding: '2rem',
      position: 'absolute',
      top: 'calc(100% - 65rem)',
      left: 'calc(100% - 110rem)',
    },
    white: {
      font: (style: Theme) => style.typography.body1,
      color: (style: Theme) => style.backgroundWhite,
      padding: '1rem',
    },
    red: {
      font: (style: Theme) => style.typography.body1,
      color: (style: Theme) => style.red,
      padding: '1rem',
    },
  })
);

export default useStyles;
