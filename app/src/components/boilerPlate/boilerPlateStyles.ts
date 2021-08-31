import { makeStyles, createStyles } from '@material-ui/styles';
// import interface for component Props and Theme
import { Theme } from 'src/contexts/themeContext/themes';

const useStyles = makeStyles(() =>
  createStyles({
    BoilerPlate: {
      // we merge Props & Theme interfaces and call this merged object "style".
      //component props and ui theme properties are available on the style object (yay auto-complete!!).
      backgroundColor: (style: Theme) => style.backgroundDark,
    },
  })
);

export default useStyles;
