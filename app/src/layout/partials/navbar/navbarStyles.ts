import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from 'src/contexts/themeContext/themes';
import { Props } from './navbar';

const useStyles = makeStyles(() =>
  createStyles({
    serverSelection: {
      position: 'relative',
    },
    serverSelectionDropDown: {
      position: 'absolute',
      right: '5rem',
    },
    navbarLeftSide: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    Navbar: {
      backgroundColor: (style: Props & Theme) => style.backgroundDark3,
      color: (style: Props & Theme) => style.textColorPrimary,
      font: (style: Props & Theme) => style.typography.h4,
      padding: '0 22px',
      width: '100%',
      height: '80px',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    walletConnectButton: {
      padding: '1rem 2rem',
      color: 'black',
      backgroundColor: 'lightgrey',
      margin: 'auto 5rem auto auto',
      borderRadius: '2rem',
    },
    logo: {
      color: (style: Props & Theme) => style.textColorPrimary,
      width: '77px',
      height: 'auto',
      cursor: 'pointer',
    },
    blockiesContainer: {
      display: 'flex',
    },
    navItems: {
      display: 'flex',
      alignItems: 'center',
      margin: '0 3rem',
      cursor: 'pointer',
    },
    indicatorIcon: {
      width: 10,
      marginLeft: '1rem',
    },
    refer: {
      background: (style: Props & Theme) => style.backgroundDark1,
      color: (style: Props & Theme) => style.textColorPrimary,
      font: (style: Props & Theme) => style.typography.caption1,
      padding: '1.2rem',
      borderRadius: '0.5rem',
    },
    serverSelectButton: {
      background: (style: Props & Theme) => style.backgroundDark1,
      color: (style: Props & Theme) => style.textColorPrimary,
      font: (style: Props & Theme) => style.typography.caption1,
      padding: '1.2rem',
      borderRadius: '0.5rem',
      height: '4rem',
      marginLeft: '2rem',
      display: 'flex',
      alignItems: 'center',
    },
    dappIcon: {
      position: 'relative',
      width: '3.5rem',
      margin: '0 1.5rem',
      fill: (style: Props & Theme) => style.backgroundLight2,
    },
    blockie: {
      fill: (style: Props & Theme) => style.backgroundLight2,
      width: '4rem',
      height: '4rem',
      marginLeft: '1rem',
      marginRight: '1.5rem',
    },
    profileIcon: {
      position: 'relative',
      width: '4rem',
      height: '4rem',
      marginLeft: '1rem',
      marginRight: '1.5rem',
    },
    activity: {
      position: 'relative',
      color: (style: Props & Theme) => style.backgroundLight2,
      font: (style: Props & Theme) => style.typography.caption1,
      marginLeft: '1rem',
    },
    dropdown: {
      position: 'absolute',
      top: '5rem',
      right: '40rem',
    },
    listItem: {
      margin: '1.5rem 0',
    },
    themeIcon: {
      display: 'flex',
      margin: 'auto',
      width: '2.5rem',
      height: '2.5rem',
      fill: (style: Props & Theme) => style.textColorPrimary,
      alignItems: 'center',
      cursor: 'pointer',
      userSelect: 'none',
    },
  })
);

export default useStyles;
