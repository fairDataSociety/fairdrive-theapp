import { makeStyles, createStyles } from '@material-ui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    imagePreview: {
      width: '100%',
      height: '45rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      objectFit: 'contain',
      objectPosition: 'top',
    },
    Icon: {
      width: '8rem',
      height: '8rem',
      margin: 'auto',
    },
    iconContainer: {
      position: 'relative',
      display: 'inline-block',
      width: 'auto'
    },
    mimeType: {
      color: 'white',
      bottom: '10px',
      position: 'absolute',
      textTransform: 'uppercase',
      left: '6px',
      fontSize: '15px',
    }
  })
);

export default useStyles;
