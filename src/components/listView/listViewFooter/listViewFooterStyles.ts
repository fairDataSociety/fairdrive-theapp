import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from 'src/contexts/themeContext/themes';
import { Props } from './listViewFooter';

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
      cursor: 'pointer',
    },
    arrowRight: {
      width: '10px',
      height: 'auto',
      transform: 'rotate(270deg)',
      cursor: 'pointer',
    },
  })
);

export default useStyles;
