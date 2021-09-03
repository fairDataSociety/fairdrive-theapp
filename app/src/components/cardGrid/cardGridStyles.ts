import { makeStyles, createStyles } from '@material-ui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    CardGrid: {
      backgroundColor: 'transparent',
      overflowX: 'hidden',
      overflowY: 'auto',
      flexDirection: 'column',
      '&::-webkit-scrollbar': {
        width: '5px',
      },
      '&::-webkit-scrollbar-track': {
        background: '#ddd',
      },
      '&::-webkit-scrollbar-thumb': {
        background: '#666',
      },
    },

    grid: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      overflowY: 'auto',
    },
  })
);

export default useStyles;
