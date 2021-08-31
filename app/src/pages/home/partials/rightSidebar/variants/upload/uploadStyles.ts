import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from 'src/contexts/themeContext/themes';
import { Props } from './upload';

const useStyles = makeStyles(() =>
  createStyles({
    modalContainer: {
      height: 'auto',
      width: '40rem',
      display: 'flex',
      overflow: 'hidden',
      position: 'relative',
      marginLeft: 'calc(100% - 40rem)',
      overflowX: 'hidden',
      overflowY: 'auto',
      flexDirection: 'column',
    },
    fileModal: {
      padding: '5rem',
      backgroundColor: (style: Props & Theme) => style.backgroundDark3,
      color: (style: Props & Theme) => style.textColorPrimary,
      border: (style: Props & Theme) => `1px solid ${style.backgroundDark3}`,
      height: '100%',
      width: '40rem',
      margin: '0rem',
      justifyContent: 'flex-end',
      textAlign: 'center',
      // display: "flex",
      flexDirection: 'column',
      alignItems: 'left',
      // cursor: 'pointer',
      overflowX: 'hidden',
      // right: (props: Props & Theme) => (props.visible ? '25rem' : '0rem'),
      transitionProperty: 'right',
      transitionDuration: '.2s',
      transitionTimingFunction: 'cubic-bezier(0.820, 0.085, 0.395, 0.895)',
      //overflowY: 'auto',
    },
    titleWrapper: {
      position: 'relative',
      height: '5rem',
      width: '100%',
      flexDirection: 'column',
      alignItems: 'left',
      textAlign: 'left',
    },
    title: {
      marginTop: '2rem',
      padding: '1rem 1rem 0.5rem 0rem',
      font: (style: Props & Theme) => style.typography.h6,
      color: (style: Props & Theme) => style.textColorHoverSelected,
    },
    fileLocation: {
      font: (style: Props & Theme) => style.typography.caption2,
      color: (style: Props & Theme) => style.textColorSecondary,
    },
    headerWrapper: {
      flexDirection: 'row',
      display: 'flex',
      position: 'relative',
      marginBottom: '1.5rem',
      textAlign: 'left',
      alignItems: 'center',
    },
    header: {
      fontSize: '2rem',
      float: 'left',
      width: '90%',
    },
    headerIcon: {
      width: '4rem',
      marginRight: '1.5rem',
    },
    closeIcon: {
      float: 'right',
      width: '2rem',
      marginTop: '2rem',
    },
    iconContainer: {
      width: '100%',
      height: '45rem',
      marginTop: '1rem',
      marginBottom: '3rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      borderRadius: '50%',
    },
    imagePreview: {
      width: '100%',
      height: '45rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    Icon: {
      width: '8rem',
      height: '8rem',
      margin: 'auto',
    },
    fileInfoContainer: {
      font: (style: Props & Theme) => style.typography.body1,
      paddingTop: '3.5rem',
      display: 'flex',
      flexDirection: 'row',
      height: '20rem',
      width: '100%',
    },
    leftContainer: {
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'left',
      width: '50%',
    },
    divider: {
      borderBottom: (style: Props & Theme) =>
        `2.5px solid ${style.backgroundDark1}`,
      margin: '0rem 0rem 2rem 0rem',
      position: 'relative',
    },
    rightContainer: {
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'right',
      width: '50%',
    },
    label: {
      font: (style: Props & Theme) => style.typography.body3,
      color: (style: Props & Theme) => style.textColorPrimary,
      marginBottom: '0.5rem',
    },
    value: {
      font: (style: Props & Theme) => style.typography.caption1,
      color: (style: Props & Theme) => style.textColorSecondary,
    },
    pair: {
      paddingBottom: '2rem',
    },
    icon: {
      width: '5rem',
      height: '5rem',
      boxSizing: 'border-box',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      border: (style: Props & Theme) => `1px solid ${style.backgroundLight3}`,
      margin: '1.6rem',
      padding: '1rem',
      '&:hover': {
        //font: (style: Props & Theme) => style.typography.body3,
        border: (style: Props & Theme) => `1px solid ${style.backgroundWhite}`,
      },
    },
    actionBar: {
      width: '100%',
      flexDirection: 'row',
    },
    uploadInput: {
      opacity: '0',
      width: '0',
      height: '0',
    },
    uploadDescription: {
      marginTop: '3rem',
      fontSize: '1.6rem',
    },
    filesPlaceHolder: {
      border: (style: Props & Theme) => `1px solid ${style.backgroundLight3}`,
      flexDirection: 'column',
      flex: '1',
      alignSelf: 'stretch',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '30px 0',
      borderRadius: '0.5px',

      '&:hover': {
        background: (style: Props & Theme) => style.backgroundDark1,
        cursor: 'pointer',
      },
    },
  })
);

export default useStyles;
