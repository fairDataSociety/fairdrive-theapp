import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from 'src/contexts/themeContext/themes';
import { Props } from './BaseActionButton';

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.1s ease',
      borderRadius: '8px',
      minWidth: '40px',
      padding: (style: Props & Theme) =>
        style.hasDropdownInitiator || style.children ? '12px' : '',
      height: '40px',
    },
    action_outlined: {
      border: (style: Props & Theme) => `1px solid ${style.backgroundLight2}`,
      background: (style: Props & Theme) => style.backgroundDark2,
      color: (style: Props & Theme) => style.backgroundLight1,
      font: (style: Props & Theme) => style.typography.caption1,

      '&:hover': {
        border: (style: Props & Theme) => `1px solid ${style.backgroundLight2}`,
        background: (style: Props & Theme) => style.backgroundDark1,
        color: (style: Props & Theme) => style.backgroundLight1,
        font: (style: Props & Theme) => style.typography.caption3,
      },
      '&:active': {
        color: (style: Props & Theme) => style.backgroundLight1,
        background: (style: Props & Theme) => style.backgroundDark1,
        border: (style: Props & Theme) => `1px solid ${style.backgroundLight1}`,
        font: (style: Props & Theme) => style.typography.caption3,
      },
      '&:disabled': {
        color: (style: Props & Theme) => style.backgroundDark1,
        background: (style: Props & Theme) => style.backgroundDark4,
        border: (style: Props & Theme) => `1px solid ${style.backgroundDark1}`,
        font: (style: Props & Theme) => style.typography.caption1,
      },
    },
    action_outlined_without_text: {
      border: (style: Props & Theme) => `1px solid ${style.backgroundLight3}`,
      background: (style: Props & Theme) => style.backgroundDark4,
      color: (style: Props & Theme) => style.backgroundLight1,
      font: (style: Props & Theme) => style.typography.caption1,

      '&:hover': {
        border: (style: Props & Theme) => `1px solid ${style.backgroundLight2}`,
        background: (style: Props & Theme) => style.backgroundDark1,
        color: (style: Props & Theme) => style.backgroundLight1,
        font: (style: Props & Theme) => style.typography.caption3,
      },
      '&:active': {
        color: (style: Props & Theme) => style.backgroundLight1,
        background: (style: Props & Theme) => style.backgroundDark1,
        border: (style: Props & Theme) => `1px solid ${style.backgroundLight1}`,
        font: (style: Props & Theme) => style.typography.caption3,
      },
      '&:disabled': {
        color: (style: Props & Theme) => style.backgroundDark1,
        background: (style: Props & Theme) => style.backgroundDark4,
        border: (style: Props & Theme) => `1px solid ${style.backgroundDark1}`,
        font: (style: Props & Theme) => style.typography.caption1,
      },
    },
    dropdownIndicator: {
      marginLeft: '14px',
      transition: '0.1s all',
      width: '12px',
      height: 'auto',

      color: (style: Props & Theme) => style.backgroundLight2,
    },
    dropdownOpen: {
      transform: 'rotate(180deg)',
    },
    labelWrapper: {
      position: 'absolute',
      bottom: '0',
    },
    icon: {
      width: '15px',
      height: '15px',
    },
    text: {
      marginLeft: '10px',
    },
  })
);

export default useStyles;
