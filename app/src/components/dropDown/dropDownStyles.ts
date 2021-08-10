import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '../../store/themeContext/themes';
import { Props } from './dropDown';

const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      position: "absolute",
      backgroundColor: (style: Props & Theme) => style.backgroundDark1,
      font: (style: Props & Theme) => style.typography.body3,
      width: (style: Props & Theme) => {
        switch (style.variant) {
          case 'primary':
            return '25rem';
          case 'secondary':
            return '36rem';
          case 'tertiary':
            return '36rem';
        }
      },
      height: 'auto',
      border: (style: Props & Theme) => `1px solid ${style.backgroundDark2}`,
      borderRadius: '1rem',
      margin: '2rem',
      padding: '2rem',
      textAlign: 'left',
      display: 'flex',
      flexDirection: 'column',
      alignSelf: 'center',
      marginLeft: 'calc(100% - 10rem)',
      zIndex: 1,
    },
    heading: {
      color: (style: Theme & Props) => style.textColorPrimary,
      font: (style: Theme & Props) => style.typography.body3,
      marginBottom: "2rem",
    },
    subheading: {
      color: (style: Theme & Props) => style.textColorPrimary,
      font: (style: Theme & Props) => style.typography.body3,
    },
    divider: {
      height: '5px',
      borderBottom: (style: Props & Theme) => {
        switch (style.variant) {
          case 'primary':
            return `2px solid ${style.backgroundWhite}`;
          case 'secondary':
            return `2px solid ${style.backgroundWhite}`;
          case 'tertiary':
            return 'none';
        }
      },
      width: '100%',
      margin: '1rem 0',
    },
    body: {
      font: (style: Props & Theme) => style.typography.body1,
    },
  })
);

export default useStyles;
