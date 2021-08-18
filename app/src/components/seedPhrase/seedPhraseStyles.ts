import { makeStyles, createStyles } from '@material-ui/styles';
// import interface for component Props and Theme
import { Theme } from 'src/contexts/themeContext/themes';
import { Props } from './seedPhrase';

const useStyles = makeStyles(() =>
  createStyles({
    SeedPhrase: {
      backgroundColor: (style: Props & Theme) => style.backgroundDark,
      color: (style: Props & Theme) => style.textColorPrimary,
      display: 'flex',
      flexDirection: 'row',
      marginBottom: '2rem',
    },
  })
);

export default useStyles;
