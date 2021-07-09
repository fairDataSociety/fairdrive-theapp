import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '../../store/themeContext/themes';
import { Props } from './navbar';

const useStyles = makeStyles(() =>
  createStyles({
    Navbar: {
      backgroundColor: (style: Props & Theme) => style.backgroundDark3,
      color: (style: Props & Theme) => style.textColorPrimary,
      font: (style: Props & Theme) => style.typography.h4,
      paddingLeft: '1.5rem',
      width: '100%',
      height: '6rem',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      position: 'absolute',
      justifyContent: 'flex-end',
      left: 0,
      top: 0,
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
      width: '15rem',
      position: 'absolute',
      top: '-0.4rem',
      left: '0rem',
      cursor: 'pointer',
    },
    navItems: {
      display: 'flex',
      alignItems: 'center',
      margin: '0 3rem',
      cursor: 'pointer',
    },
    refer: {
      background: (style: Props & Theme) => style.backgroundLight2,
      color: (style: Props & Theme) => style.textColorPrimary,
      font: (style: Props & Theme) => style.typography.caption1,
      padding: '1.2rem',
      borderRadius: '0.5rem',
    },
    dappIcon: {
      position: 'relative',
      width: '3.5rem',
      margin: '0 1.5rem',
      fill: (style: Props & Theme) => style.backgroundLight2,
    },
    avatarButton: {
      width: '3rem',
      height: '3rem',
      borderRadius: '50%',
      border: (style: Theme & Props) => `2px solid ${style.backgroundLight2}`,
      margin: 'auto 4rem',
      objectFit: 'fill',
      display: 'flex',
      overflow: 'hidden',
    },
    blockie: {
      fill: (style: Props & Theme) => style.backgroundLight2,
      width: '100% !important',
      height: '100% !important',
      margin: 'auto',
    },
    activity: {
      position: 'relative',
      color: (style: Props & Theme) => style.backgroundLight2,
      font: (style: Props & Theme) => style.typography.caption1,
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
