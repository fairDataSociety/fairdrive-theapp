import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from 'src/contexts/themeContext/themes';
import { Props } from './footer';

const useStyles = makeStyles(() =>
  createStyles({
    footer: {
      backgroundColor: (style: Props & Theme) => style.backgroundDark3,
      color: (style: Props & Theme) => style.textColorPrimary,
      font: (style: Props & Theme) => style.typography.h4,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: '32px 40px',
      zIndex: 5,
    },
    brands: {
      display: 'flex',
      alignItems: 'center',
      gap: '32px',
    },
    brandsItem: {
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      '&:hover': {
        filter: 'brightness(1.6)',
      },
    },
    brandLinumLabs: {
      width: '145px',
      height: '24px',
    },
    brandFairDataSociety: {
      width: '70px',
      height: '32px',
    },
    brandSwarm: {
      width: '96px',
      height: '24px',
    },

    linkItem: {
      cursor: 'pointer',
      '&:hover': {
        filter: 'brightness(1.6)',
      },
    },
    linkIcon: {
      height: '3rem',
      margin: '0 1.5rem',
      '&:hover': {
        filter: 'brightness(1.6)',
      },
    },
    text: {
      font: (style: Props & Theme) => style.typography.caption1,
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      gap: '12px',
    },
    footerText: {
      margin: '0',
      display: 'flex',
      alignSelf: 'center',
      color: (style: Props & Theme) => style.textColorPrimary,
    },
    links: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      gap: '88px',
      '@media (max-width: 1440px)': {
        gap: '44px',
      },
    },
    link: {
      height: '3rem',
      margin: '0 1.5rem',
    },
    divider: {
      border: (style: Props & Theme) => `1px solid ${style.backgroundDark1}`,
      height: '3rem',
      width: '1px',
      margin: '0 24px',
    },
    socialMediaWrapper: {
      display: 'flex',
      alignItems: 'center',
    },
  })
);

export default useStyles;
