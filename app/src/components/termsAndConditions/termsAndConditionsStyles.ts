import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from 'src/contexts/themeContext/themes';

const useStyles = makeStyles(() =>
  createStyles({
    TermsAndConditions: {
      backgroundColor: (style: Theme) => style.backgroundDark,
      height: '100%',
      width: '100%',
      padding: '20rem 20rem 10rem 20rem',
      overflow: 'scroll',
    },
    title: {
      font: (style: Theme) => style.typography.h6,
      marginBottom: '2rem',
    },
    paragraph: {
      font: (style: Theme) => style.typography.caption1,
      opacity: 0.6,
      marginBottom: '6rem',
    },
  })
);

export default useStyles;
