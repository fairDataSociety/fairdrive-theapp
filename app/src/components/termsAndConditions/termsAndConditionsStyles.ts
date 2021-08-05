import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '../../store/themeContext/themes';
import { Props } from './termsAndConditions';

const useStyles = makeStyles(() =>
  createStyles({
    TermsAndConditions: {
      backgroundColor: (style: Props & Theme) => style.backgroundDark,
      height: '100%',
      width: '100%',
      padding: '20rem 20rem 10rem 20rem',
      overflow: 'scroll',
    },
    title: {
      font: (style: Theme & Props) => style.typography.h6,
      marginBottom: '2rem',
    },
    paragraph: {
      font: (style: Theme & Props) => style.typography.caption1,
      opacity: 0.6,
      marginBottom: '6rem',
    },
  })
);

export default useStyles;
