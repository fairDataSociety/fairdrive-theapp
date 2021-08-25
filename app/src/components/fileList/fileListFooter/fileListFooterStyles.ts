import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from 'src/contexts/themeContext/themes';
import { Props } from './fileListFooter';

const useStyles = makeStyles(() =>
  createStyles({
    footerWrapper: {
      backgroundColor: (style: Props & Theme) => style.backgroundDark2,
      display: 'flex',
      justifyContent: 'flex-end',
      alignContent: 'center',
      padding: '20px',
      gap: '40px',
    },
    rowPerPage: {
      display: 'flex',
      alignItems: 'center',
    },
    pagination: {
      display: 'flex',
      alignItems: 'center',
      gap: '30px',
    },
    indicatorGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    arrowLeft: {
      width: '10px',
      height: 'auto',
      transform: 'rotate(90deg)',
    },
    arrowRight: {
      width: '10px',
      height: 'auto',
      transform: 'rotate(270deg)',
    },
  })
);

export default useStyles;
