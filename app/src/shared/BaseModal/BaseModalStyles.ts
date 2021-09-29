import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from 'src/contexts/themeContext/themes';

const useStyles = makeStyles(() =>
  createStyles({
    overlay: {},
    modal: {
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
    title: {},
    folderIcon: {},
    closeIcon: {},
    body: {},
    footer: {},
  })
);

export default useStyles;
