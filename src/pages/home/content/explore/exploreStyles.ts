import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from 'src/contexts/themeContext/themes';

const useStyles = makeStyles(() =>
  createStyles({
    explore_container: {
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      width: '90%',
      maxHeight: '75%',
      margin: '1rem 0 0 0',
      marginLeft: '20rem',
      backgroundColor: 'transparent',
      overflow: 'scroll',
      transitionProperty: 'margin-left',
      transitionDuration: '.2s',
      transitionTimingFunction: 'cubic-bezier(0.820, 0.085, 0.395, 0.895)',
    },
    explore_title: {
      marginBottom: '40px',
    },
    explore_card_container: {
      width: '100%',
      display: 'flex',
      justifyContent: 'start',
      alignItems: 'start',
      flexWrap: 'wrap',
    },
    explore_card: {
      display: 'flex',
      justifyContent: 'start',
      alignItems: 'start',
      width: '48%',
      margin: '0px 25px 25px 0px',
      padding: '20px',
      color: (style: Theme) => style.textColorPrimary,
      backgroundColor: (style: Theme) => style.backgroundDark4,
      border: (style: Theme) => `2px solid ${style.backgroundDark2}`,
      borderRadius: '8px',
    },
    explore_card_content: {
      marginLeft: '25px',
    },
    explore_card_title: {
      marginBottom: '12px',
    },
    explore_card_description: {
      marginRight: '25px',
      marginBottom: '25px',
      lineHeight: '20px',
    },
    explore_card_button: {
      display: 'inline-block',
      minWidth: '150px',
      padding: '1rem 2rem',
      border: (style: Theme) => `1px solid ${style.textColorPrimary}`,
      borderRadius: '0.5rem',
      font: (style: Theme) => style.typography.body1,
      textAlign: 'center',
    },
    searchDivider: {
      display: 'flex',
      color: '#9AA8FF',
      font: (style: Theme) => style.typography.h5,
      marginLeft: '1.6rem',
      gap: '10px',
      alignItems: 'center',
      marginBottom: '20px',
    },
    searchIcon: {
      fill: '#9AA8FF',
      color: '#9AA8FF',
    },
  })
);

export default useStyles;
