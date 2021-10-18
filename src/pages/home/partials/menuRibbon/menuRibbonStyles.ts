import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from 'src/contexts/themeContext/themes';
import { Props } from './menuRibbon';

const useStyles = makeStyles(() =>
  createStyles({
    Sidebar: {
      backgroundColor: (style: Props & Theme) => style.backgroundDark3,
      width: '120px',
      height: 'calc(100vh - 6rem)',
      position: 'relative',
      display: 'flex',
      zIndex: 2,
      flexDirection: 'column',
    },
  })
);

export default useStyles;
