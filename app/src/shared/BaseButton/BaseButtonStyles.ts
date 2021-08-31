import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from 'src/contexts/themeContext/themes';
import { Props } from './BaseButton';

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      transition: 'all 0.1s ease',
      borderRadius: '4px',
    },
    primary: {
      background: (style: Props & Theme) => style.backgroundLight3,
      color: (style: Props & Theme) => style.backgroundWhite,
      font: (style: Props & Theme) => style.typography.caption1,

      '&:hover': {
        background: (style: Props & Theme) => style.backgroundLight2,
        font: (style: Props & Theme) => style.typography.caption3,
      },
      '&:disabled': {
        cursor: 'not-allowed',
        border: (style: Props & Theme) => `1px solid ${style.backgroundDark3}`,
        background: (style: Props & Theme) => style.backgroundDark4,
        color: (style: Props & Theme) => style.backgroundDark3,
        font: (style: Props & Theme) => style.typography.caption3,
      },
      '&:active': {
        border: (style: Props & Theme) => `1px solid ${style.backgroundLight2}`,
        background: (style: Props & Theme) => style.backgroundLight3,
        font: (style: Props & Theme) => style.typography.caption3,
      },
    },
    primary_outlined: {
      border: (style: Props & Theme) => `1px solid ${style.backgroundLight2}`,
      background: 'transparent',
      color: (style: Props & Theme) => style.backgroundLight1,
      font: (style: Props & Theme) => style.typography.caption1,

      '&:hover': {
        border: (style: Props & Theme) => `1px solid ${style.backgroundLight1}`,
        background: (style: Props & Theme) => style.backgroundDark2,
        color: (style: Props & Theme) => style.backgroundWhite,
        font: (style: Props & Theme) => style.typography.caption3,
      },
      '&:disabled': {
        cursor: 'not-allowed',
        border: (style: Props & Theme) => `1px solid ${style.backgroundLight3}`,
        background: 'transparent',
        color: (style: Props & Theme) => style.backgroundLight3,
        font: (style: Props & Theme) => style.typography.caption1,
      },
      '&:active': {
        border: (style: Props & Theme) => `1px solid ${style.backgroundLight1}`,
        background: (style: Props & Theme) => style.backgroundDark2,
        color: (style: Props & Theme) => style.backgroundLight1,
        font: (style: Props & Theme) => style.typography.caption3,
      },
    },
    alternative: {
      background: (style: Props & Theme) => style.backgroundDark1,
      color: (style: Props & Theme) => style.backgroundLight1,
      font: (style: Props & Theme) => style.typography.caption1,

      '&:hover': {
        color: (style: Props & Theme) => style.backgroundWhite,
        font: (style: Props & Theme) => style.typography.caption3,
      },
      '&:active': {
        border: (style: Props & Theme) => `1px solid ${style.backgroundLight3}`,
        color: (style: Props & Theme) => style.backgroundLight1,
        font: (style: Props & Theme) => style.typography.caption3,
      },
    },
    teritary: {
      background: (style: Props & Theme) => style.backgroundDark,
      color: (style: Props & Theme) => style.backgroundLight1,
      font: (style: Props & Theme) => style.typography.caption1,

      '&:hover': {
        color: (style: Props & Theme) => style.backgroundWhite,
        font: (style: Props & Theme) => style.typography.caption3,
      },
      '&:active': {
        color: (style: Props & Theme) => style.backgroundWhite,
        font: (style: Props & Theme) => style.typography.caption3,
      },
    },
    teritary_outlined: {
      border: (style: Props & Theme) => `1px solid ${style.backgroundLight2}`,
      background: (style: Props & Theme) => style.backgroundDark,
      color: (style: Props & Theme) => style.backgroundLight1,
      font: (style: Props & Theme) => style.typography.caption1,

      '&:hover': {
        border: (style: Props & Theme) => `1px solid ${style.backgroundLight1}`,
        background: (style: Props & Theme) => style.backgroundDark2,
        color: (style: Props & Theme) => style.backgroundWhite,
        font: (style: Props & Theme) => style.typography.caption3,
      },
      '&:active': {
        color: (style: Props & Theme) => style.backgroundLight1,
        font: (style: Props & Theme) => style.typography.caption3,
      },
    },
    action_outlined: {
      border: (style: Props & Theme) => `1px solid ${style.backgroundLight2}`,
      background: (style: Props & Theme) => style.backgroundDark2,
      color: (style: Props & Theme) => style.backgroundLight1,
      font: (style: Props & Theme) => style.typography.caption1,
      flexDirection: 'row-reverse',

      '&:hover': {
        border: (style: Props & Theme) => `1px solid ${style.backgroundLight1}`,
        background: (style: Props & Theme) => style.backgroundDark2,
        color: (style: Props & Theme) => style.backgroundWhite,
        font: (style: Props & Theme) => style.typography.caption3,
      },
      '&:active': {
        color: (style: Props & Theme) => style.backgroundLight1,
        font: (style: Props & Theme) => style.typography.caption3,
      },
    },
    big: {
      padding: '16px 36px',
    },
    medium: {
      padding: '12px 24px',
    },
    small: {
      padding: '8px 12px',
    },
    icon: {
      width: '4px',
      height: '8px',
    },
    fluid: {
      width: '100%',
    },
  })
);

export default useStyles;
