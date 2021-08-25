import { makeStyles, createStyles } from '@material-ui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    Overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(73,75,80,0.51)',
      zIndex: 6,
      cursor: 'pointer',
    },
    children: {
      position: 'absolute',
      margin: '0 auto',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%,-50%)',
      zIndex: 10,
    },
  })
);

export default useStyles;
