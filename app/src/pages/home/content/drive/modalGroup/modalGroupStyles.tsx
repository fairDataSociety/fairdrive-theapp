import { makeStyles, createStyles } from '@material-ui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    modalContainer: {
      marginLeft: 'calc(100% - 45rem)',
      overflowX: 'hidden',
      overflowY: 'auto',
    },
  })
);

export default useStyles;
