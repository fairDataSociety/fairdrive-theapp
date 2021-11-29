import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from 'src/contexts/themeContext/themes';
import { Props } from './listViewBody';

const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      padding: '2.2rem',
      display: 'flex',
      flexDirection: 'column',
      borderTop: (style: Props & Theme) => `1px solid ${style.backgroundDark2}`,
      backgroundColor: (style: Props & Theme) => style.backgroundDark3,
      '&:nth-child(2n + 1)': {
        backgroundColor: (style: Props & Theme) => style.backgroundDark4,
      },
    },
  })
);

export default useStyles;
