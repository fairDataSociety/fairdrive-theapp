import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from 'src/contexts/themeContext/themes';

const useStyles = makeStyles(() =>
  createStyles({
    sidebar: {
      width: '25%',
      height: '100%',
      position: 'fixed',
      right: '0',
      top: '0',
      background: (style: Theme) => style.backgroundDark2,
      padding: '48px',
      zIndex: 1000,
      boxShadow: '-10px 0px 13px rgba(0, 0, 0, 0.17)',
    },
    headerWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: '24px',
      marginBottom: '24px',
      borderBottom: (style: Theme) => `1px solid ${style.backgroundLight3}`,
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '14.8px',
      font: (style: Theme) => style.typography.body3,
    },
    icon: {
      width: '15px',
      height: '15px',
      cursor: 'pointer',
    },
    // content styles
    imageContainer: {
      borderBottom: (style: Theme) => `1px solid ${style.backgroundLight3}`,
      paddingBottom: '24px',
      marginBottom: '24px',
    },
    titleWrapper: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '24px',
      gap: '5px',
    },
    title: {
      font: (style: Theme) => style.typography.body3,
      color: (style: Theme) => style.backgroundWhite,
    },
    fileLocation: {
      color: (style: Theme) => style.backgroundLight2,
    },
    detailsWrapper: {
      display: 'flex',
      flexWrap: 'wrap',
      marginBottom: '24px',
    },
    details: {
      width: '50%',
      marginBottom: '24px',
      '&:nth-child(even)': {
        textAlign: 'right',
      },
    },
    label: {
      color: (style: Theme) => style.backgroundLight1,
      font: (style: Theme) => style.typography.subtitleLarge,
    },
    value: {
      color: (style: Theme) => style.backgroundLight2,
      font: (style: Theme) => style.typography.subtitleSmall,
    },
    actionsWrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      justifyContent: 'center',
      alignItems: 'center',
    },
    action: {
      width: '100%',
      maxWidth: '204px',
    },
    // upload
    uploadBlockWrapper: {
      padding: '0 20px',
      height: '280px',
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
    },
    uploadBlock: {
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      borderRadius: '8px',
      border: (style: Theme) => `1px solid ${style.backgroundLight3}`,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      gap: '50px',
      cursor: 'pointer',
    },
    uploadText: {
      color: (style: Theme) => style.backgroundLight1,
    },
    uploadEntriesWrapper: {
      marginBottom: '24px',
    },
    draggedFilesList: {
      listStyle: 'none',
      width: '100%',
      margin: '0',
      padding: '0',
      height: '280px',
      overflowY: 'auto',
    },
    draggedFilesItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',

      marginBottom: '15px',
    },
    draggedFilesContent: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    draggedFilesImage: {
      borderRadius: '100%',
      width: '25px',
      height: '25px',
    },
    draggedFilesRemove: {
      cursor: 'pointer',
    },
    draggedFilesCaption: {
      fontSize: 'small',
    },
  })
);

export default useStyles;
