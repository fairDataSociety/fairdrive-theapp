import { makeStyles, createStyles } from "@material-ui/styles";
// import interface for component Props and Theme
import { Theme } from "../../store/themeContext/themes";
import { Props } from "./seedPhrase";

const useStyles = makeStyles(() =>
  createStyles({
    SeedPhrase: {
      backgroundColor: (style: Props & Theme) => style.backgroundWhite,
      paddingTop:"10rem",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyItems: "center",
      alignItems: "center",
      overflowX: "hidden",
      overflowY: "auto",
    },
    word: {
      
    }
  })
);

export default useStyles;
