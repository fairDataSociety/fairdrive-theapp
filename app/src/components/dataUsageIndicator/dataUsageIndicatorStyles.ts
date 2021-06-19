import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "../../store/themeContext/themes";
import { Props } from "./dataUsageIndicator";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      height: '45rem',
      display: 'flex',
      alignItems: 'space-between',
      flexDirection: 'column',
      margin: '2rem 1rem 2rem 2rem',
    },
    heading: {
      font: (style: Props & Theme) => style.typography.h5,
      padding: '1rem 0',
      borderBottom: '2px solid var(--light1)',
      width: '20rem',
      marginBottom: '2rem',
    },
    wrapper: {
      backgroundColor: (style: Props & Theme) => style.backgroundDark4,
      width: '60rem', 
      height: '15rem',
      padding: '4rem',
      display: 'flex',
      alignItems: 'center',
      borderRadius: '1rem',
      border: '2px solid var(--dark2)'
    },
    description: {
      margin: '3rem',
    },
    header: {
      font: (style: Props & Theme) => style.typography.h6,
      margin: '2rem 0 1rem 1rem',
    },
    layout: {
      font: (style: Props & Theme) => style.typography.body1,
      color: (style: Props & Theme) => style.textColorSecondary,
      marginBottom: '1rem',
    },
    bold: {
      width: '100%',
      font: (style: Props & Theme) => style.typography.body3,
      margin: '0 1rem',
    },
    refermessage: {
      font: (style: Props & Theme) => style.typography.caption1,
      width: '60rem', 
      display: 'flex',
      height: '2.5rem',
      alignItems: 'center',
      marginTop: '3rem'
    },
    icon: {
      width: '2.5rem'
    },
    button: {
     background: (style: Props & Theme) => style.backgroundLight3,
     padding: '1.5rem',
     borderRadius: '0.5rem',
     marginTop: '3rem',
     width: '20rem'
    }
  })
);

export default useStyles;
