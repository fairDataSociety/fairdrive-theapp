import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "../../store/themeContext/themes";
import { Props } from "./getStarted";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      backgroundColor: (style: Props & Theme) => style.backgroundDark3,
      borderRadius: "2rem",
      width: '51rem',
      height: '36.5rem',
      padding: '4rem 3rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    icon: {
      fill: (style: Props & Theme) => style.backgroundLight2,
      width: '7rem',
      height: '7rem'
    },
    header: {
      font: (style: Props & Theme) => style.typography.h2,
    },
    body: {
      font: (style: Props & Theme) => style.typography.h4,
      color: (style: Props & Theme) => style.textColorSecondary,
    },
    button: {
      font: (style: Props & Theme) => style.typography.h4,
      border: (style: Props & Theme) => `1px solid ${style.textColorPrimary}`,
      borderRadius: '0.5rem',
      padding: '1rem 2rem',

    },
  })
);

export default useStyles;
