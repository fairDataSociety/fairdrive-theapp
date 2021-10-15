import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from 'src/contexts/themeContext/themes';
// import { Props } from './dataUsageIndicator';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      height: '45rem',
      display: 'flex',
      alignItems: 'space-between',
      flexDirection: 'column',
      margin: '2rem 1rem 2rem 2rem',
    },
    heading: {
      font: (style: Theme) => style.typography.h5,
      padding: '1rem 0',
      borderBottom: (style: Theme) => `2px solid ${style.backgroundLight1}`,
      width: '20rem',
      marginBottom: '2rem',
    },
    wrapper: {
      backgroundColor: (style: Theme) => style.backgroundDark4,
      width: '60rem',
      height: '15rem',
      padding: '4rem',
      display: 'flex',
      alignItems: 'center',
      borderRadius: '1rem',
      border: (style: Theme) => `2px solid ${style.backgroundDark2}`,
    },
    description: {
      margin: '3rem',
    },
    header: {
      font: (style: Theme) => style.typography.h6,
      margin: '2rem 0 1rem 1rem',
    },
    layout: {
      font: (style: Theme) => style.typography.body1,
      color: (style: Theme) => style.textColorSecondary,
      marginBottom: '1rem',
    },
    bold: {
      width: '100%',
      font: (style: Theme) => style.typography.body3,
      margin: '0 1rem',
    },
    refermessage: {
      font: (style: Theme) => style.typography.caption1,
      width: '60rem',
      display: 'flex',
      height: '2.5rem',
      alignItems: 'center',
      marginTop: '3rem',
    },
    icon: {
      width: '2.5rem',
    },
    button: {
      background: (style: Theme) => style.backgroundLight3,
      padding: '1.5rem',
      borderRadius: '0.5rem',
      marginTop: '3rem',
      width: '20rem',
    },
  })
);

export default useStyles;
