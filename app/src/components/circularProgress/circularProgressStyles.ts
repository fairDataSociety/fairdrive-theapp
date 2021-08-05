import { makeStyles, createStyles } from '@material-ui/styles';
// import interface for component Props and Theme
import { Theme } from '../../store/themeContext/themes';
import { Props } from './circularProgress';

const useStyles = makeStyles(() =>
  createStyles({
    BoilerPlate: {
      // we merge Props & Theme interfaces and call this merged object "style".
      //component props and ui theme properties are available on the style object (yay auto-complete!!).
      backgroundColor: (style: Props & Theme) => style.backgroundDark4,
      font: (style: Props & Theme) => style.typography.bodyNumbers,
      width: '10rem',
      height: '10rem',
      margin: '1rem',
    },
  })
);

export default useStyles;
