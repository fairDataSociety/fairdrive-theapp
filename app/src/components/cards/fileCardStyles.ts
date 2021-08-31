import { makeStyles, createStyles } from '@material-ui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      position: 'relative',
    },
    kebabIcon: {
      cursor: 'pointer',
      position: 'absolute',
      top: 0,
      right: '1rem',
      height: '6rem',
      margin: '2rem',
      zIndex: 1,
    },
  })
);

export default useStyles;
