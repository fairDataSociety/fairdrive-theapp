import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from 'src/contexts/themeContext/themes';
import { Props } from './fileListHeader';

const useStyles = makeStyles(() =>
  createStyles({
    headerwrapper: {
      backgroundColor: (style: Props & Theme) => style.backgroundDark2,
      display: 'flex',
      padding: '20px',
    },
    fileName: {
      width: '45%',
    },
    fileInfo: { width: '13%' },
  })
);

export default useStyles;
