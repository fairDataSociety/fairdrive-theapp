import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from 'src/contexts/themeContext/themes';

const useStyles = makeStyles(() =>
  createStyles({
    name: {
      width: '30%',
      overflow: 'hidden',
    },
    check: {
      width: '10%',
      textAlign: 'center',
    },
    domain: {
      width: '30%',
      overflow: 'hidden',
    },
    date: {
      width: '20%',
    },
    loading: {
      display: 'flex',
      '& > *': {
        margin: 'auto',
      },
    },
    row: {
      padding: '8px',
      display: 'flex',
      borderTop: (style: Theme) => `1px solid ${style.backgroundDark2}`,
      backgroundColor: (style: Theme) => style.backgroundDark3,
      '&:nth-child(2n + 1)': {
        backgroundColor: (style: Theme) => style.backgroundDark4,
      },
    },
  })
);

export default useStyles;
