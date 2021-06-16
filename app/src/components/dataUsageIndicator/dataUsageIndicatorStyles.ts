import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "../../store/themeContext/themes";
import { Props } from "./dataUsageIndicator";

const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      backgroundColor: (style: Props & Theme) => style.backgroundDark4,
      margin: '20rem 5rem',
      width: '75rem', 
      height: '20rem',
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
    button: {
     marginLeft: '7rem'
    }
  })
);

export default useStyles;
