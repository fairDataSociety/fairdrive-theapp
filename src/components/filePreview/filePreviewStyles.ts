import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from 'src/contexts/themeContext/themes';

const useStyles = makeStyles(() =>
  createStyles({
    imagePreview: {
      width: '100%',
      height: 'auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      objectFit: 'contain',
      objectPosition: 'top',
      borderRadius: '8px',
    },
    Icon: {
      width: '8rem',
      height: '8rem',
      margin: 'auto',
    },
    iconContainer: {
      position: 'relative',
      display: 'inline-block',
      width: 'auto',
    },
    mimeType: {
      color: 'white',
      bottom: '10px',
      position: 'absolute',
      textTransform: 'uppercase',
      left: '6px',
      fontSize: '15px',
    },
    queueMime: {
      fontSize: '7px',
    },
    previewMimeType: {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      margin: 'auto',
      position: 'absolute',
      width: '77px',
      height: '30px',
      fontSize: '30px',
      fontWeight: 500,
      textAlign: 'center',
      color: (style: Theme) => style.backgroundLight2,
    },
    isQueueItem: {
      width: '25px',
      height: '25px',
    },
    isPreviewSidebar: {
      width: '140px',
      height: '140px',
    },
  })
);

export default useStyles;
