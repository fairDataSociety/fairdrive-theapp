import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from 'src/contexts/themeContext/themes';
import { Props } from './explore';

const useStyles = makeStyles(() =>
  createStyles({
    Home: {
      backgroundColor: 'transparent',
      overflow: 'hidden',
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      margin: '1rem 0 0 0',
      marginLeft: (props: Props & Theme) =>
        props.isPodBarOpen ? '50rem' : '17rem',
      transitionProperty: 'margin-left',
      transitionDuration: '.2s',
      transitionTimingFunction: 'cubic-bezier(0.820, 0.085, 0.395, 0.895)',
    },
    flex: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  })
);

export default useStyles;
