import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "../../store/themeContext/themes";
import { Props } from "./cardGrid";

const useStyles = makeStyles(() =>
  createStyles({
    CardGrid: {
      backgroundColor: "transparent",
      alignItems: "center",
      overflowX: "hidden",
      overflowY: "auto",
      justifyContent: "space-evenly",
      display: "flex",
      flexDirection: "column",
    },

    grid: {
      display: "flex",
      flexWrap: "wrap",
      margin: "15rem 0 0 15rem",
    },
  })
);

export default useStyles;
