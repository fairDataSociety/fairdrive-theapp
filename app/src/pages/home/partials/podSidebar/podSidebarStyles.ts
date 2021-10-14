import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from 'src/contexts/themeContext/themes';
import { Props } from './podSidebar';

const useStyles = makeStyles(() =>
  createStyles({
    podDrawer: {
      backgroundColor: (style: Props & Theme) => style.backgroundDark4,
      height: 'calc(100vh - 89px - 80px)',
      display: 'flex',
      alignItems: 'left',
      overflow: 'hidden',
      position: 'relative',
      flexDirection: 'column',
      padding: '1rem',
      font: (style: Props & Theme) => style.typography.caption1,
      width: '216px',
      left: (props: Props & Theme) => (props.isOpen ? '0' : '-216px'),
      zIndex: 1,
      transitionProperty: 'left',
      transitionDuration: '.2s',
      transitionTimingFunction: 'cubic-bezier(0.820, 0.085, 0.395, 0.895)',
    },
    rowButtons: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
    },
    buttonWrapper: {
      margin: '16px 32px',
    },
    divider: {
      borderBottom: (style: Props & Theme) =>
        `2.5px solid ${style.backgroundDark1}`,
      margin: '0 2.5rem 0 2.5rem',
    },

    podButton: {
      minWidth: '20rem',
      maxWidth: '55rem',
      overflow: 'auto',
      textAlign: 'center',
      boxSizing: 'border-box',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      border: (style: Props & Theme) => `1px solid ${style.backgroundDark3}`,
      padding: '1.5rem',
      backgroundColor: (style: Props & Theme) => style.backgroundDark2,
      color: (style: Props & Theme) => style.textColorPrimary,
      font: (style: Props & Theme) => style.typography.body2,
      '&:hover': {
        //font: (style: Props & Theme) => style.typography.body3,
        border: (style: Props & Theme) => `1px solid ${style.backgroundWhite}`,
      },
      '&:active': {
        font: (style: Props & Theme) => style.typography.body2,
        border: (style: Props & Theme) => `1px solid ${style.backgroundWhite}`,
      },
      margin: '2rem auto 1rem 3rem',
      opacity: (props: Props & Theme) => (props.route === 'Overview' ? 0 : 1),
      display: (props: Props & Theme) =>
        props.route === 'Overview' ? 'none' : 'block',
      transitionProperty: 'display, opacity',
      transitionDuration: '.2s',
      transitionTimingFunction: 'cubic-bezier(0.820, 0.085, 0.395, 0.895)',
    },
    podInfoWrapper: {
      margin: '18px 0',
      display: 'flex',
      gap: '12px',
      alignItems: 'center',
    },
    podInfo: {
      marginLeft: '1rem',
    },
    information: {
      color: (style: Props & Theme) => style.textColorSecondary,
      font: (style: Props & Theme) => style.typography.caption1,
      transitionProperty: 'height',
      transitionDuration: '.2s',
      transitionTimingFunction: 'ease-out',
    },
    pods: {
      padding: '1rem',
      minHeight: '28rem',
      overflowX: 'hidden',
      height: 'auto',
      overflowY: 'auto',
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
    // PODROW STYLES
    podRow: {
      height: '8rem',
      width: '100%',
      //alignItems: "left",
      textAlign: 'left',
      position: 'static',
      padding: '3rem 0rem 1rem 0',
      cursor: 'pointer',
      color: (style: Props & Theme) => style.textColorSecondary,
      font: (style: Props & Theme) => style.typography.body1,
      '&:hover': {
        font: (style: Props & Theme) => style.typography.body3,
        color: (style: Props & Theme) => style.textColorHoverSelected,
      },
      '&:active': {
        font: (style: Props & Theme) => style.typography.body2,
        color: (style: Props & Theme) => style.textColorHoverSelected,
        backgroundColour: (style: Props & Theme) => style.backgroundLight3,
      },
    },
    podChevron: {
      float: 'right',
      marginTop: '0.8rem',
    },
    modalContainer: {
      left: 'calc(100% - 65rem)',
      top: 'calc(100% - 65rem)',
      overflowX: 'hidden',
      overflowY: 'auto',
    },
  })
);

export default useStyles;
