import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from 'src/contexts/themeContext/themes';
import { Props } from './openInDapp';

const useStyles = makeStyles(() =>
  createStyles({
    text: {
      color: (style: Props & Theme) => style.yellow,
      font: (style: Props & Theme) => style.typography.body1,
    },
  })
);

export default useStyles;
