import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '../../../store/themeContext/themes';
import { Props } from './cardBody';

const useStyles = makeStyles(() =>
  createStyles({
    CardBody: {
      color: (style: Theme & Props) => style.textColorPrimary,
      font: (style: Theme & Props) => style.typography.caption2,
      borderTop: (style: Props & Theme) => `1px solid ${style.backgroundDark2}`,
      width: '100%',
      backgroundColor: 'transparent',
      paddingTop: '1rem',
      display: 'flex',
      flexDirection: 'row',
    },
    body: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
    },
    size: {
      font: (style: Theme & Props) => style.typography.subtitleSmall,
      color: (style: Theme & Props) => style.backgroundLight2,
      width: '10rem',
      flexDirection: 'column',
      textAlign: 'left',
    },
    dateCreated: {
      color: (style: Theme & Props) => style.backgroundLight2,
      font: (style: Theme & Props) => style.typography.subtitleSmall,
      flexDirection: 'column',
      alignContent: 'right',
      textAlign: 'left',
    },
    label: {
      color: (style: Theme & Props) => style.backgroundLight3,
      font: (style: Theme & Props) => style.typography.caption2,
      margin: '1rem 0',
    },
  })
);

export default useStyles;
