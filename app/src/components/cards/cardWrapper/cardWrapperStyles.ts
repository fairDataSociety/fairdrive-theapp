import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '../../../store/themeContext/themes';
import { Props } from './cardWrapper';
const height = {
  big: '60rem',
  regular: '31rem',
  small: '16rem',
};
const width = {
  big: '60rem',
  regular: '34rem',
  small: '16rem',
};
const useStyles = makeStyles(() =>
  createStyles({
    CardWrapper: {
      background: (style: Props & Theme) => style.backgroundDark4,
      width: (style: Props & Theme) => width[style.size] ?? width.regular,
      height: (style: Props & Theme) => height[style.size] ?? height.regular,
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
