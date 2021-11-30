import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from 'src/contexts/themeContext/themes';
import { Props } from './overview';

const useStyles = makeStyles(() =>
  createStyles({
    Home: {
      backgroundColor: 'transparent',
      overflow: 'hidden',
      position: 'absolute',
      display: 'flex',
      width: '89%',
      maxHeight: '75%',
      flexDirection: 'column',
      margin: '1rem 0 0 0',
      marginLeft: '20rem',
      transitionProperty: 'margin-left',
      transitionDuration: '.2s',
      transitionTimingFunction: 'cubic-bezier(0.820, 0.085, 0.395, 0.895)',
    },
    flex: {
      display: 'flex',
      justifyContent: 'flex-start',
    },
    buttonNavBar: {
      marginLeft: 'auto',
      marginRight: '2rem',
    },
    uploadInput: {
      opacity: '0',
      width: '0',
      height: '0',
    },
    Icon: {
      width: '5rem',
      height: '5rem',
      margin: '0.5rem',
    },
    modalContainer: {
      marginLeft: 'calc(100% - 50rem)',
      overflowX: 'hidden',
      overflowY: 'auto',
    },
  })
);

export default useStyles;
