import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from 'src/contexts/themeContext/themes';
import { Props } from './topLevelNavigation';

const useStyles = makeStyles(() =>
  createStyles({
    topLevelNavigation: {
      width: '100%',
      padding: '0 24px',
      height: '76px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    left: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      justifyItems: 'flex-start',
    },
    right: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      justifyItems: 'flex-end',
    },
    name: {
      font: (style: Theme & Props) => style.typography.h5,
      color: (style: Theme & Props) => style.backgroundWhite,
    },
    directoryPath: {
      marginLeft: '1 0px',
      color: (style: Theme & Props) => style.backgroundLight2,
      font: (style: Theme & Props) => style.typography.body1,
    },
  })
);

export default useStyles;
