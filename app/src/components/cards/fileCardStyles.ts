import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from 'src/contexts/themeContext/themes';
import { Props } from './fileCard';

const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      position: 'relative',
    },
    dropdown: {
      position: 'absolute',
      top: '0.2rem',
      right: '5rem',
    },
    listItem: {
      color: (style: Theme & Props) => style.textColorPrimary,
      font: (style: Theme & Props) => style.typography.body1,
      margin: '2rem 0',
    },
    kebabIcon: {
      cursor: 'pointer',
      position: 'absolute',
      top: 0,
      right: '1rem',
      height: '6rem',
      margin: '2rem',
      zIndex: 1,
    },
  })
);

export default useStyles;
