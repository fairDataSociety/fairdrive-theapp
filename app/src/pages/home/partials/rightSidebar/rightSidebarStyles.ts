import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from 'src/contexts/themeContext/themes';
import { Props } from './rightSidebar';

const useStyles = makeStyles(() =>
  createStyles({
    sidebar: {},
    contentWrapper: {},
    headerWrapper: {},
    headerIcon: {},
    header: {},
    icon: {},
    sidebarContent: {},
  })
);

export default useStyles;
