import { makeStyles, createStyles } from "@material-ui/styles";
// import interface for component Props and Theme
import { Theme } from "../../store/themeContext/themes";
import { Props } from "./seedPhrase";

const useStyles = makeStyles(() =>
  createStyles({
    SeedPhrase: {
      backgroundColor: (style: Props & Theme) => style.backgroundWhite,
      height: "100vh",
      width: '100vh',
      display: "flex",
      flexDirection: 'column',
    },
    word: {
      width: '50%',
      flex: '50%',
    }
  })
);

export default useStyles;
