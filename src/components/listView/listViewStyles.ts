import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from 'src/contexts/themeContext/themes';
import { Props } from './listView';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      backgroundColor: (style: Props & Theme) => style.backgroundDark,
      border: (style: Props & Theme) => `1px solid ${style.backgroundDark2}`,
      borderRadius: '1rem',
      width: '100%',
      height: '100%',
      overflowY: 'auto',
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
  })
);

export default useStyles;
