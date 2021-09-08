import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from 'src/contexts/themeContext/themes';

const useStyles = makeStyles(() =>
  createStyles({
    cardWrapper: {
      cursor: 'pointer',
      position: 'relative',
      padding: '24px',
      width: '290px',
      height: '248px',
      borderRadius: '8px',
      background: (style: Theme) => style.backgroundDark4,
      border: (style: Theme) => `1px solid ${style.backgroundDark1}`,
      '&:hover': {
        background: (style: Theme) => style.backgroundDark2,
        border: (style: Theme) => `1px solid ${style.backgroundLight3}`,
      },
    },
    cardContent: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
    },
    cardWrapperClicked: {
      background: (style: Theme) => style.backgroundDark1,
    },
    cardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '25px',
    },
    cardBody: {},
    cardFooter: {
      paddingTop: '20px',
      marginTop: '12px',
      display: 'flex',
      justifyContent: 'space-between',
      borderTop: (style: Theme) => `1px solid ${style.backgroundDark2}`,
    },
    cardFooterEntryTitle: {
      textTransform: 'uppercase',
      color: (style: Theme) => style.backgroundLight3,
      marginBottom: '8px',
      fontSize: '10px',
      fontWeight: 500,
    },
    cardFooterEntryValue: {
      textTransform: 'uppercase',
      color: (style: Theme) => style.backgroundLight2,
      fontSize: '12px',
      fontWeight: 400,
    },
    title: {
      color: (style: Theme) => style.backgroundLight1,
      fontSize: '16px',
      fontStyle: 'normal',
      fontWeight: 500,
    },
    titleHighlightMatchingPhrase: {},
    dropdownIconWrapper: {
      position: 'absolute',
      top: '27px',
      right: '27px',
    },
  })
);

export default useStyles;
