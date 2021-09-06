import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from 'src/contexts/themeContext/themes';
import { Props } from './BaseDropdown';

const useStyles = makeStyles(() =>
  createStyles({
    dropdownWrapper: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    },
    dropdown: {
      position: 'absolute',
      bottom: '0',
      zIndex: 1000,
      transform: 'translateY(105%)',
      right: '0',
      transition: '0.1s all',
      display: 'none',
      opacity: 0,
      background: (style: Theme & Props) => style.backgroundDark1,
      padding: '24px',
      borderRadius: '8px',
      height: 'auto',
      border: (style: Theme & Props) => `1px solid ${style.backgroundLight2}`,
    },
    sizeRegular: {
      width: '200px',
    },
    sizeBig: {
      width: '288px',
    },
    dropdownMoveToRight: {
      left: '0',
      transform: 'translate(0%, 105%)',
    },
    dropdownOpen: {
      display: 'block',
      opacity: 1,
    },
    dropdownItem: {
      color: (style: Theme & Props) => style.textColorPrimary,
      font: (style: Theme & Props) => style.typography.body1,
      cursor: 'pointer',
      marginBottom: '16px',
      '&:hover': {
        font: (style: Theme & Props) => style.typography.body3,
      },
      '&:last-of-type': {
        marginBottom: '0',
      },
    },
    dropdownItemDisabled: {
      cursor: 'not-allowed',
    },
    dropdownItemDangerVariant: {
      color: '#FF3864!important',
    },
    dropdownFooter: {
      borderTop: (style: Theme & Props) =>
        `1px solid ${style.backgroundLight3}`,
      width: '100%',
      paddingTop: '16px',
      marginTop: '16px',
    },
    dropdownHeaderWrapper: {
      borderBottom: (style: Theme & Props) =>
        `1px solid ${style.backgroundLight3}`,
      paddingBottom: '16px',
      marginBottom: '16px',
    },
    dropdownHeading: {
      color: (style: Theme & Props) => style.backgroundWhite,
      fontSize: '16px',
      fontWeight: 600,
    },
  })
);

export default useStyles;
