import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from 'src/contexts/themeContext/themes';
import { Props } from './fileList';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      backgroundColor: (style: Props & Theme) => style.backgroundDark,
      border: (style: Props & Theme) => `1px solid ${style.backgroundDark2}`,
      borderRadius: '1rem',
      width: '100%',
      transitionProperty: 'margin-left',
      transitionDuration: '.7s',
      transitionTimingFunction: 'cubic-bezier(0.820, 0.085, 0.395, 0.895)',

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
    headerwrapper: {
      backgroundColor: (style: Props & Theme) => style.backgroundDark2,
      display: 'flex',
      padding: '2rem',
    },
    wrapper: {
      display: 'flex',
      backgroundColor: (style: Props & Theme) => style.backgroundDark4,
    },
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
  })
);

export default useStyles;
