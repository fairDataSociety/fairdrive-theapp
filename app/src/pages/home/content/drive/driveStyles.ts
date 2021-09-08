import { makeStyles, createStyles } from '@material-ui/styles';
// import interface for component Props and Theme
import { Theme } from 'src/contexts/themeContext/themes';
import { Props } from './drive';

const useStyles = makeStyles(() =>
  createStyles({
    layoutContent: {
      // overflowY: 'auto',
      padding: '25px',
      height: 'calc(100vh - 76px - 80px - 89px - 64px - 13px)',
    },
    Drive: {
      //component props and ui theme properties are available on the style object (yay auto-complete!!).
      backgroundColor: (style: Props & Theme) => style.backgroundDark,
      position: 'absolute',
      display: 'flex',
      left: '0',
      right: '0',
      // 100vh - topNavBar - header - footer
      height: 'calc(100vh - 76px - 80px - 89px)',
      flexDirection: 'column',
      margin: '0 0 0 0',
      paddingLeft: (props: Props & Theme) =>
        props.isPodBarOpen ? '336px' : '120px',
      transitionProperty: 'padding',
      transitionDuration: '.2s',
      transitionTimingFunction: 'cubic-bezier(0.820, 0.085, 0.395, 0.895)',
    },
    navBarWrapper: {
      transitionProperty: 'margin-right',
      transitionDuration: '.2s',
      transitionTimingFunction: 'cubic-bezier(0.820, 0.085, 0.395, 0.895)',
      backgroundColor: (style: Props & Theme) => style.backgroundDark4,
    },
    headerWrapper: {
      padding: '2rem 2rem 2rem 0rem',
      width: '100%',
      flexDirection: 'row',

      //marginBottom: "2rem",
      height: '10rem',
      display: 'flex',
      position: 'relative',
      textAlign: 'left',
    },

    header: {
      font: (style: Props & Theme) => style.typography.h6,
      color: (style: Props & Theme) => style.textColorHoverSelected,
      //margin: "2rem 1.5rem 2rem 0rem",
      float: 'left',
      width: '90%',
      margin: '2.5rem 1.5rem 1.5rem 0rem',
    },
    headerButton: {
      float: 'left',
      width: '8rem',
      height: '5rem',
      boxSizing: 'border-box',
      flexDirection: 'row',
      display: 'flex',
      backgroundColor: (style: Props & Theme) => style.backgroundDark4,
      borderRadius: '0.5rem',
      cursor: 'pointer',
      border: (style: Props & Theme) => `1px solid ${style.backgroundLight3}`,
      margin: '1.6rem',
      padding: '1.5rem',
      '&:hover': {
        //font: (style: Props & Theme) => style.typography.body3,
        border: (style: Props & Theme) => `1px solid ${style.backgroundWhite}`,
      },
    },
    folder: {
      float: 'left',
      width: '2rem',
      height: '2rem',
      marginRight: '0.5rem',
    },
    buttonIcon: {
      float: 'left',
      width: '1.5rem',
      height: '1.5rem',
      marginRight: '0.8rem',
      marginTop: '0.2rem',
    },
    chev: {
      float: 'right',
      width: '1rem',
      height: '1rem',
      marginLeft: '1.5rem',
      marginTop: '0.5rem',
      transform: 'rotate(90deg)',
    },
    buttonNavBar: {
      margin: '0 auto 0 0',
      height: '8rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    cardGrid: {
      width: '100%',
      height: '100%',
      paddingBottom: '50px',
      display: 'flex',
      flexWrap: 'wrap',
      overflowY: 'auto',
      justifyContent: 'flex-start',
      '& > div:not(:nth-child(4n))': {
        marginRight: '24px',
        marginBottom: '24px',
      },
    },
    uploadInput: {
      opacity: '0',
      width: '0',
      height: '0',
    },
    divider: {
      borderBottom: (style: Props & Theme) =>
        `2.5px solid ${style.backgroundWhite}`,
      width: '13rem',
    },
    Icon: {
      width: '5rem',
      height: '5rem',
      margin: '0.5rem',
    },
    searchDivider: {
      display: 'flex',
      color: '#9AA8FF',
      font: (style: Theme) => style.typography.h5,
      marginLeft: '1.6rem',
      gap: '10px',
      alignItems: 'center',
      marginBottom: '20px',
    },
    searchIcon: {
      fill: '#9AA8FF',
      color: '#9AA8FF',
    },
    noSearchQueryMatches: {
      font: (style: Theme) => style.typography.h5,
      color: (style: Props & Theme) => style.backgroundWhite,
      marginLeft: '1.6rem',
    },
    modalContainer: {
      marginLeft: 'calc(100% - 45rem)',
      overflowX: 'hidden',
      overflowY: 'auto',
    },
    emptyStateWrapper: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '89px 0',
    },
  })
);

export default useStyles;
