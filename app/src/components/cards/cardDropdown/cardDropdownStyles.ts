import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from 'src/contexts/themeContext/themes';

const useStyles = makeStyles(() =>
  createStyles({
    dropdown: {
      position: 'absolute',
      top: '0.2rem',
      right: '5rem',
    },
    listItem: {
      color: (style: Theme) => style.textColorPrimary,
      font: (style: Theme) => style.typography.body1,
      margin: '2rem 0',
    },
  })
);

export default useStyles;
