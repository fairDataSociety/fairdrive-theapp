import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from 'src/contexts/themeContext/themes';
import { Props } from './navbar';

const useStyles = makeStyles(() =>
  createStyles({
    navbar: {
      height: '80px',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: (style: Props & Theme) => style.backgroundDark3,
    },
    left: {
      display: 'flex',
      alignItems: 'center',
      justifyItems: 'flex-start',
    },
    logoWrapper: {
      display: 'flex',
      alignContent: 'center',
      justifyContent: 'center',
      width: '120px',
      height: '100%',
    },
    logo: {
      width: '77px',
      height: '18px',
    },
    right: {
      display: 'flex',
      alignItems: 'center',
      justifyItems: 'flex-end',
      paddingRight: '30px',
      gap: '24px',
    },
    actionsWrapper: {
      display: 'flex',
      alignItems: 'center',
      gap: '21px',
    },
    dropdownContent: {
      display: 'flex',
      flexDirection: 'column',
    },
    dropdownContentHeading: {
      color: (style: Theme & Props) => style.backgroundWhite,
      fontSize: '16px',
      fontWeight: 600,
      marginBottom: '16px',
    },
    dropdownActivityContent: {
      fontSize: '16px',
      fontWeight: 400,
      color: '#B4B0E5',
    },
    dropdownProfileFooter: {
      display: 'flex',
      justifyItems: 'center',
      alignItems: 'center',
      listStyle: 'none',
      margin: 0,
      padding: 0,
      gap: '12px',
    },
    dappAndActivityGroup: {
      display: 'flex',
      gap: '12px',
      justifyItems: 'center',
      alignItems: 'center',
    },
    icon: {
      fill: (style: Props & Theme) => style.backgroundLight2,
      cursor: 'pointer',
    },
  })
);

export default useStyles;
