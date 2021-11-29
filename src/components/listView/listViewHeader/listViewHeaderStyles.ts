import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from 'src/contexts/themeContext/themes';
import { Props } from './listViewHeader';

const useStyles = makeStyles(() =>
  createStyles({
    headerwrapper: {
      backgroundColor: (style: Props & Theme) => style.backgroundDark2,
      display: 'flex',
      padding: '20px',
    },
  })
);

export default useStyles;
