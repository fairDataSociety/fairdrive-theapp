import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "../../store/themeContext/themes";
import { Props } from "./updateFileCard";

const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
          backgroundColor: (style: Props & Theme) => style.backgroundDark1,
          borderRadius: '1rem',
          width: '20rem',
          padding: '2rem',
          position: 'absolute',
          top: 'calc(100% - 65rem)',
          left: 'calc(100% - 110rem)'
    },
    white: {
      font:  (style: Props & Theme) => style.typography.body1,
      color:  (style: Props & Theme) => style.backgroundWhite,
      padding: '1rem'
    },
    red: {
      font:  (style: Props & Theme) => style.typography.body1,
      color:  (style: Props & Theme) => style.red,
      padding: '1rem'
    },
  })
);

export default useStyles;
