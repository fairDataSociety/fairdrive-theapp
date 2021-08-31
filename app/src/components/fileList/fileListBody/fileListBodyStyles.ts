import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from 'src/contexts/themeContext/themes';
import { Props } from './fileListBody';

const useStyles = makeStyles(() =>
  createStyles({
    fileWrapper: {
      padding: '16px',
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
      paddingRight: '20px',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
    fileInfo: {
      textOverflow: 'ellipsis',
      width: '13%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      color: (style: Props & Theme) => style.backgroundLight2,
    },
    highlightMatchedPhrase: {
      color: '#9AA8FF',
      textDecoration: 'underline',
    },
    kebab: {
      position: 'relative',
      cursor: 'pointer',
    },
    listItem: {
      color: (style: Theme & Props) => style.textColorPrimary,
      font: (style: Theme & Props) => style.typography.body1,
      margin: '2rem 0',
    },
    dropdown: {
      bottom: '0',
      left: '-75px',
      position: 'absolute',
    },
  })
);

export default useStyles;
