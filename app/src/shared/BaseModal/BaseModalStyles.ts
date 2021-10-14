import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from 'src/contexts/themeContext/themes';

const useStyles = makeStyles(() =>
  createStyles({
    overlay: {
      backgroundColor: (theme: Theme) => theme.backgroundDark4,
      opacity: 0.8,
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 1400,
    },
    modal: {
      position: 'absolute',
      zIndex: 1401,
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      padding: '24px',
      background: (theme: Theme) => theme.backgroundDark3,
      borderRadius: '8px',
      width: '448px',
      minHeight: '208px',
    },
    header: {
      paddingBottom: '16px',
      marginBottom: '16px',
      borderBottom: (theme: Theme) => `1px solid ${theme.backgroundLight3}`,
      justifyContent: 'space-between',
      display: 'flex',
      alignItems: 'center',
    },
    titleGroup: {
      color: (theme: Theme) => theme.backgroundLight1,
      fontSize: '20px',
      fontWeight: 600,
      display: 'flex',
      gap: '12px',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    title: {
      fontSize: '16px',
    },
    folderIcon: {},
    closeIcon: {
      cursor: 'pointer',
      stroke: (theme: Theme) => theme.backgroundWhite,
      height: '15px',
      width: '15px',
    },
    textBelowBody: {
      fontSize: '12px',
      fontWeight: 600,
      marginTop: '16px',
      color: (theme: Theme) => theme.backgroundWhite,
    },
    body: {},
    footer: {
      marginTop: '24px',
      display: 'flex',
      justifyContent: 'center',
    },
  })
);

export default useStyles;
