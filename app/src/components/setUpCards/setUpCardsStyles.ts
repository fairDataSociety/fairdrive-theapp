import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '../../store/themeContext/themes';

const useStyles = makeStyles(() =>
  createStyles({
    cards: {
      display: 'flex',
    },
    container: {
      backgroundColor: (style: Theme) => style.backgroundDark4,
      borderRadius: '1rem',
      width: '50rem',
      height: '36.5rem',
      padding: '4rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      margin: '1rem',
      border: (style: Theme) => `2px solid ${style.backgroundDark2}`,
    },
    icon: {
      fill: (style: Theme) => style.backgroundLight2,
      width: '7rem',
      height: '7rem',
    },
    header: {
      font: (style: Theme) => style.typography.h6,
    },
    body: {
      font: (style: Theme) => style.typography.body1,
      color: (style: Theme) => style.textColorSecondary,
    },
    button: {
      font: (style: Theme) => style.typography.body1,
      border: (style: Theme) => `1px solid ${style.textColorPrimary}`,
      borderRadius: '0.5rem',
      padding: '1rem 2rem',
    },
  })
);

export default useStyles;
