import { makeStyles, createStyles } from '@material-ui/styles';
// import interface for component Props and Theme
import { Theme } from '../../store/themeContext/themes';
import { Props } from './buttonNavbar';

const useStyles = makeStyles(() =>
  createStyles({
    BoilerPlate: {
      // we merge Props & Theme interfaces and call this merged object "style".
      //component props and ui theme properties are available on the style object (yay auto-complete!!).
      backgroundColor: (style: Props & Theme) => style.backgroundDark,
    },
    uploadInput: {
      opacity: '0',
      width: '0',
      height: '0',
    },
    Icon: {
      width: '2.5rem',
      height: '2.5rem',
    },
    iconContainerWrapper: {
      float: 'left',
      flexDirection: 'row',
      width: '30rem',
    },
    iconContainer: {
      float: 'left',
      width: '5rem',
      height: '5rem',
      margin: '1rem',
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      color: (style: Props & Theme) => style.backgroundLight3,
      background: (style: Props & Theme) => style.backgroundDark4,
      border: (style: Props & Theme) => `2px solid ${style.backgroundLight3}`,
      borderRadius: '1rem',
      '&:hover': {
        color: (style: Props & Theme) => style.backgroundLight2,
        border: (style: Props & Theme) => `2px solid ${style.backgroundLight2}`,
        '& svg': {
          fill: (style: Props & Theme) => style.backgroundLight2,
        },
      },
      '&:active': {
        border: (style: Props & Theme) => `2px solid ${style.backgroundWhite}`,
        color: (style: Props & Theme) => style.textColorPrimary,
        '& svg': {
          fill: (style: Props & Theme) => style.textColorPrimary,
        },
      },
    },
    modalContainer: {
      marginLeft: 'calc(100% - 45rem)',
      overflowX: 'hidden',
      overflowY: 'auto',
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
    chev: {
      float: 'right',
      width: '1rem',
      height: '1rem',
      marginLeft: '1.5rem',
      marginTop: '0.5rem',
      transform: 'rotate(90deg)',
    },
  })
);

export default useStyles;
