import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from 'src/contexts/themeContext/themes';

const useStyles = makeStyles(() =>
  createStyles({
    Home: {
      height: 'calc(100vh - 6rem)',
      backgroundColor: 'transparent',
      display: 'flex',
      flexDirection: 'row',
      width: '100vw',
    },
    buttonNavBar: {
      margin: '0 auto 0 0',
      height: '8rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    cardGrid: {
      width: '100%',
      height: '100%',
    },
    uploadInput: {
      opacity: '0',
      width: '0',
      height: '0',
    },
    Icon: {
      width: '5rem',
      height: '5rem',
      margin: '0.5rem',
    },
    modalContainer: {
      marginLeft: 'calc(100% - 45rem)',
      overflowX: 'hidden',
      overflowY: 'auto',
    },
    loadingDriveWrapper: {
      paddingLeft: '120px',

      height: 'calc(100vh - 76px - 80px - 89px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      left: '0',
      right: '0',
      position: 'absolute',
      margin: '0 0 0 0',
      transitionProperty: 'padding',
      transitionDuration: '.2s',
      transitionTimingFunction: 'cubic-bezier(0.820, 0.085, 0.395, 0.895)',
    },
    loadingDrivePodBarOpen: {
      paddingLeft: '336px',
    },
    loadingDrive: {
      backgroundColor: (style: Theme) => style.backgroundDark2,
      border: (style: Theme) => `1px solid ${style.backgroundLight3}`,
      borderRadius: '8px',
      width: '320px',
      height: '280px',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    loadingDriveIcon: {
      width: '40px',
      height: '40px',
      marginBottom: '32px',
    },
    loadingDriveTitle: {
      color: (style: Theme) => style.backgroundLight1,
      font: (style: Theme) => style.typography.h5,
      marginBottom: '8px',
    },

    loadingDriveCaption: {
      color: (style: Theme) => style.backgroundLight2,
    },
  })
);

export default useStyles;
