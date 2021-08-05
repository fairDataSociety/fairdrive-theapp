import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '../../store/themeContext/themes';
import { Props } from './fileCard';

const useStyles = makeStyles(() =>
  createStyles({
    dropdown: {
      position: 'absolute',
      top: '5rem',
      right: '6rem',
    },
    listItem: {
      color: (style: Theme & Props) => style.textColorPrimary,
      font: (style: Theme & Props) => style.typography.body1,
      margin: '2rem 0',
    },
  })
);

export default useStyles;
