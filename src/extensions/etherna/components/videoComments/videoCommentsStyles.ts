import { makeStyles, createStyles } from '@material-ui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      position: 'fixed',
      top: 0,
      bottom: 0,
      right: 0,
      width: '400px',
      padding: '2rem',
      background: '#444',
      zIndex: 10,
      boxShadow: '0 5px 15px 5px rgba(0, 0, 0, 0.5)',
    },
    commentsList: {
      position: 'relative',
      display: 'flex',
      marginTop: '30px',
      flexDirection: 'column',
      overflowY: 'auto',

      '& > * + *': {
        marginTop: '15px',
      },
    },
    comment: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      fontSize: '1.8rem',
      fontWeight: 500,
    },
    commentTime: {
      fontSize: '1.2rem',
      fontWeight: 400,
      color: '#aaa',
    },
    close: {
      position: 'absolute',
      left: '5px',
      top: '5px',
      padding: '0 10px',
      fontSize: '3rem',
    },
  })
);

export default useStyles;
