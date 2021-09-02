import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from 'src/contexts/themeContext/themes';
import { Props } from './BaseDropdown';

const useStyles = makeStyles(() =>
  createStyles({
    dropdownWrapper: {
      position: 'relative',
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
      width: '200px',
      height: 'auto',
      border: (style: Theme & Props) => `1px solid ${style.backgroundLight2}`,
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
  })
);

export default useStyles;
