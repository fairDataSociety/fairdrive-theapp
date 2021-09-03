import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from 'src/contexts/themeContext/themes';
import { Props } from './cardWrapper';

const useStyles = makeStyles(() =>
  createStyles({
    CardWrapper: {
      background: (style: Props & Theme) => style.backgroundDark4,
      width: '272px',
      height: '248px',
      margin: (style: Props & Theme) =>
        style.size === 'big' ? '0rem' : '1.5rem',
      border: (style: Props & Theme) => `1px solid ${style.backgroundDark1}`,
      // left:"10rem",
      borderRadius: '1rem',
      padding: '3rem',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'left',
      cursor: 'pointer',
      justifyContent: 'space-between',
      position: 'relative',
    },
  })
);

export default useStyles;
