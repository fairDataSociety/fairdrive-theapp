import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "../../store/themeContext/themes";
import { Props } from "./podsPreview";

const useStyles = makeStyles(() =>
  createStyles({
    pods: {
      display: 'flex',
    },
    wrapper: {
      backgroundColor: (style: Props & Theme) => style.backgroundDark,
      width: '42rem',
      margin: '2rem',
      height: '32rem',
      position: 'relative'
    },
    header: {
      font: (style: Props & Theme) => style.typography.h5,
      padding: '1rem 0',
      borderBottom: (style: Props & Theme) =>  `2px solid ${style.backgroundLight1}`,
      width: '17rem',
      marginBottom: '7rem', 
    },
    subheader: {
      font: (style: Props & Theme) => style.typography.h6
    },
    faq: {
      font: (style: Props & Theme) => style.typography.caption1,
      margin: '4rem 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    faqText: {
      width: '50rem'
    },
    button: {
      font: (style: Props & Theme) => style.typography.body1,
      border: (style: Props & Theme) =>  `1px solid ${style.backgroundWhite}`,
      width: '17rem',
      padding: '1.5rem 1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '0.5rem',
      marginLeft: '5rem',
      position: 'absolute',
      bottom: 0,
    },
    questionIcon: {
      width: '6rem',
      marginRight: '0.5rem'
    },
    icon: {
      margin: '0 0 0 1rem',
      height: '2rem',
      width: '2rem',
    }
  })
);

export default useStyles;
