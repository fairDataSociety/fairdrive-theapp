import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from 'src/contexts/themeContext/themes';
import { Props } from './fileListBody';

const useStyles = makeStyles(() =>
  createStyles({
    fileWrapper: {
      padding: '2rem',
      display: 'flex',
      alignItems: 'center',
      borderTop: (style: Props & Theme) => `1px solid ${style.backgroundDark2}`,
      backgroundColor: (style: Props & Theme) => style.backgroundDark3,
      '&:nth-child(2n + 1)': {
        backgroundColor: (style: Props & Theme) => style.backgroundDark4,
      },
    },
    fileContainer: {},
    fileName: {
      width: '45%',
    },
    fileInfo: { width: '13%' },
    highlightMatchedPhrase: {
      color: '#9AA8FF',
      textDecoration: 'underline',
    },
  })
);

export default useStyles;
