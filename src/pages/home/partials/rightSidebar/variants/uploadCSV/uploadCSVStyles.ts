import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from 'src/contexts/themeContext/themes';

const useStyles = makeStyles(() =>
  createStyles({
    divider: {
      borderBottom: (style: Theme) => `2.5px solid ${style.backgroundDark1}`,
      margin: '0rem 0rem 2rem 0rem',
      position: 'relative',
    },
    tableName: {
      margin: '20px 0',
    },
    tableNameInput: {
      width: '100%',
    },
    progressWrapper: {
      margin: '20px 0',
      paddingTop: '10px',
      borderTop: (style: Theme) => `1px solid ${style.backgroundLight3}`,
    },
  })
);

export default useStyles;
