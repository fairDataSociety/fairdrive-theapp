import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "../../store/themeContext/themes";
import { Props } from "./main";
const useStyles = makeStyles(() =>
  createStyles({
    Main: {
      padding:"23rem 0 30rem 0",
      backgroundColor: (style: Props & Theme) => style.backgroundDark,
      width: "auto",
      height: "100vh",
      display:"flex",
      alignItems:"center",
      flexDirection: "column",
      overflowX: "hidden",
      overflowY: "auto",
    },
    test:{
      cursor:"pointer"
    },
    App:{
      backgroundColor: (style: Props & Theme) => style.backgroundDark,
    }
  })
);

export default useStyles;
